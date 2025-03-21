import { BoxComponentScrolling } from "../../components/BoxComponent";
import FormularioProforma from "../../templates/FormularioProforma";
import { ss_proforma, ss_formas_pago, ss_producto } from "../../API/backend";
import { ModalLoading, ModalSuccess } from "../../components/Modal";
import { useModal } from "../../context/ModalContext";
import Button from "../../components/Generales/Buttons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useClientes } from "../../context/ClientesContext";
export function NewProforma() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { handleModalClose, handleModalShow } = useModal();
  const modalsId = { loading: "loading", success: "success" };
  const [data, setData] = useState();
  const { client, getClientes, clientes, setClient } = useClientes();

  const onSubmit = async ({ data }) => {
    try {
      handleModalShow(modalsId.loading);

      // 1. Registrar la proforma y obtener el ID
      const { result: registroResult, status: registroStatus } =
        await postRegistro(data);

      if (registroStatus !== 200) throw new Error("Error en postRegistro");
      // 2. Agregar el ID a los modelos y forma de pago
      data.modelos.forEach((item) => (item["id_proforma"] = data.id));
      data.formaPago.forEach(
        (item) => (item["id_factura"] = data.id)
      );
      // 3. Ejecutar las otras peticiones en paralelo
      const [productosResult, formaPagoResult] = await Promise.all([
        postProductos(data.modelos),
        postFormaPagos(data.formaPago),
      ]);
      handleModalShow(modalsId.success)
      console.log("Registro completado:", {
        registro: registroResult,
        productos: productosResult,
        formaPago: formaPagoResult,
      });
    } catch (error) {
      console.error("Error en onSubmit:", error);
      handleModalShow(modalsId.error);
    }
  };

  const postRegistro = async (data) => {
    try {
      return await ss_proforma.postData({
        data: data,
        user: user,
        includeId: true,
      });
    } catch (error) {
      console.error("Error en postRegistro:", error);
      throw error;
    }
  };

  const postProductos = async (data) => {
    try {
      return await Promise.all(
        data.map((item) =>
          ss_producto.postData({ data: item, includeId: true })
        )
      );
    } catch (error) {
      console.error("Error en postProductos:", error);
      throw error;
    }
  };

  const postFormaPagos = async (data) => {
    try {
      return await Promise.all(
        data.map((item) =>
          ss_formas_pago.postData({ data: item, includeId: true })
        )
      );
    } catch (error) {
      console.error("Error en postFormaPagos:", error);
      throw error;
    }
  };
  const onError = (e) => {console.error("Error en")}
  useEffect(() => {
    setClient("");
  }, []);
  return (
    <>
      <BoxComponentScrolling title="Creando Proforma">
        <FormularioProforma
          onSubmit={onSubmit}
          onError={onError}
          isDisabled={false}
          defaultValues={{ vendedor: user.alias }}
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
