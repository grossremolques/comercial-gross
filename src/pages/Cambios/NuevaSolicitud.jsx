import { useEffect, useState } from "react";
import { ModalLoading, ModalSuccess } from "../../components/Modal";
import { useModal } from "../../context/ModalContext";

import Button from "../../components/Generales/Buttons";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FormularioSolicitud from "../../templates/FormularioSolicitud";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import { ss_solicitudes, ss_cambios_detalle } from "../../API/backend";
import { Modal } from "../../components/Modal";
export function NuevaSolicitud() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { handleModalShow, handleModalClose } = useModal();
  const [response, setResponse] = useState(null);
  const modalsId = { loading: "loading", success: "success" };  
  const [data, setData] = useState({});
  
  const onSubmit = async ({ data }) => {
      handleModalShow(modalsId.loading);
      const dataPost = {
        trazabilidad: data.selectUnidad.trazabilidad,
        id_cliente: data.selectUnidad.gestoria.selectedCliente.id,
        cliente: data.selectUnidad.gestoria.selectedCliente.razon_social,
        modelo: data.selectUnidad.modelo,
      }
      try {
        const { result, status, response } = await ss_solicitudes.postData({data:dataPost, user: user, includeId: true});
        data.id = response.id;
        data.fecha_creacion = response.fecha_creacion
        if (status === 200) {
          try {
            for (const item of data.modificaciones) {
              item['id_orden'] = data.id;
              const { result, status } = await ss_cambios_detalle.postData({ data: item, includeId: true });
            };
            handleModalClose();
              handleModalShow(modalsId.success);
          }
          catch (err) {console.log(err);}
          
        }
        setData(data)
      } catch (e) {
        console.log(e);
      }
    };
    const onError = (data) => {
      console.error(data);
    };
  return (
    <>
    <BoxComponentScrolling title="Creando Proforma">
      <FormularioSolicitud
        onSubmit={onSubmit}
        onError={onError}
        isDisabled={false}
        setResponse={setResponse}
      />
      <ModalLoading id={modalsId.loading} title={"Guardando Proforma"} />
        <ModalSuccess id={modalsId.success} title={"Proforma Guardado"}>
          <p className="mt-4 text-sm text-gray-700">
            Los datos se han guardo exitosamente
            <br />
            <strong>
              Imprime el registro de la Solicitud, y entegalo al responsable de
              procesar tu pedido
            </strong>
          </p>
          <div className="text-center mt-6">
            <Button
              className={"min-w-40"}
              type="button"
              variant="success"
              text="Imprimir Solicitud"
              onClick={() => {
                handleModalClose();
                navigate("/pdf-cambio", { state: { pdfData: data } });
              }}
            />
          </div>
        </ModalSuccess>
    </BoxComponentScrolling>
    {response && (
        <Modal
          modalId={"modal-response"}
          title={
            response.type === "success" ? "¡Todo marcha bien!" : "Algo anda mal"
          }
          variant={response.type}
        >
          <div className="flex flex-col gap-4 mt-3">
            {response.message}
            <Button
              className="max-w-50 mx-auto"
              text={'Aceptar'}
              variant={"primary"}
              onClick={handleModalClose}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
