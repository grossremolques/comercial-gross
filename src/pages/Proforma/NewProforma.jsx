import { BoxComponentScrolling } from "../../components/BoxComponent";
import FormularioProforma from "../../templates/FormularioProforma";
import { ss_proforma, ss_formas_pago } from "../../API/backend";
import { ModalLoading, ModalSuccess } from "../../components/Modal";
import { useModal } from "../../context/ModalContext";
import Button from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import FormularioCliente from "../../templates/FormularioCliente";
export function NewProforma() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { handleModalClose, handleModalShow } = useModal();
  const modalsId = { loading: "loading", success: "success" };
  const [data, setData] = useState();

  const onSubmit = async ({ data }) => {
    handleModalShow(modalsId.loading);
    try {
      const { result, status } = await ss_proforma.postData({
        data: data,
        user: user,
        includeId: true,
      });
      if (status === 200) {
        try {
          for (const item of data.formaPago) {
            item["id_factura"] = data.id;
            const { result, status } = await ss_formas_pago.postData({
              data: item,
              includeId: true,
            });
          }
          handleModalClose();
          handleModalShow(modalsId.success);
        } catch (err) {
          console.log(err);
        }
      }
      setData(data);
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
        <FormularioProforma
          onSubmit={onSubmit}
          onError={onError}
          isDisabled={false}
          defaultValues={{ vendedor: user.alias }}
        />
        <FormularioCliente
          isDisabled={false}
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
                navigate("/pdf-proforma", { state: { pdfData: data } });
              }}
            />
          </div>
        </ModalSuccess>
      </BoxComponentScrolling>
    </>
  );
}
