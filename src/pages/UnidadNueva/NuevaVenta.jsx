import { useState, useEffect } from "react";
import { useModal } from "../../context/ModalContext";
import FormularioNuevaVenta from "../../templates/FormularioNuevaVenta";
import LayoutSaveElement from "../../components/Containers/LayoutSaveElement";
import { useUnidadesGross2 } from "../../context/UnidadesContext/UnidadesGrossContext2";
import { useAuth } from "../../context/AuthContext";
import { useFechas } from "../../context/FechasContext/FechasContext";
import { useGestoria2 } from "../../context/GestoriaContext/GestoriaContext2";

export default function NuevaVenta() {
  const { user } = useAuth();
  const { postFechas } = useFechas();
  const { postGestoria } = useGestoria2();
  const { postUnidades, createId } = useUnidadesGross2();
  const [state, setState] = useState({
    response: null,
    disabled: false,
  });
  const { handleModalClose, handleModalShow } = useModal();
  const onSubmit = async ({ data }) => {
    handleModalShow("modal-loading");
    /* Agregar datos faltantes */
    if (data.tipo != "Semirremolque") {
      data.modelo_eje_direccional = "N/A";
      data.altura_plato = 0;
      data.altura_trabajo = 0;
      data.alt_trbj_plato_tractor_cargado = "N/A";
    }
    if (data.tipo != "Carrocería") data.cant_arcos = 0;
    /* Crear Trazabilidad */
    try {
      const { success, error, trazabilidad } = await createId(data.tipo);
      if (success) {
        /* Guardar en REG-PL-0022 */
        data.trazabilidad = trazabilidad;
        const { success, error } = await postUnidades({
          values: data,
          user: user,
        });
        if (success) {
          /* Guardar en REG-PL-0135 */
          delete data.carrozado;
          data.pedido_produccion = data.fecha_creacion;
          const { success, error } = await postFechas({ values: data });
          if (success) {
            /* Guardar en REG-CO-0088 */
            const { success, error } = await postGestoria({ values: data });
            if (success) {
              setState((prev) => ({
                ...prev,
                response: { type: "success", message: "Guardado exitosamente" },
                disabled: true,
              }));
            }
            else {
              setState((prev) => ({
                ...prev,
                response: {
                  type: "danger",
                  message: `No se pudo guardar la unidad ${error.message}`,
                },
                disabled: true,
              }));
            }
          } else {
            setState((prev) => ({
              ...prev,
              response: {
                type: "fail",
                message: `No se pudo guardar la fecha ${error.message}`,
              },
              disabled: true,
            }));
          }
        } else {
          setState((prev) => ({
            ...prev,
            response: {
              type: "danger",
              message: `No se pudo guardar la unidad ${error.message}`,
            },
            disabled: true,
          }));
        }
      } else {
        console.log(error);
        setState((prev) => ({
          ...prev,
          response: {
            type: "danger",
            message: `No se pudo crear la trazabilidad ${error.message}`,
          },
          disabled: true,
        }));
      }
    } catch (e) {
      setState((prev) => ({
        ...prev,
        response: {
          type: "danger",
          message: `No se pudo guardar la unidad ${e.message}`,
        },
        disabled: true,
      }));
      setState();
    } finally {
      handleModalShow("modal-response");
    }
  };
  const onError = async (data) => {
    try {
      const id = await createId("Acoplado");
      console.log(id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <LayoutSaveElement
        hedearTitle={"Nueva Venta"}
        modalLoadingTitle={"Guardando..."}
        modalResponsetextButton={"Aceptar"}
        handleResponseButtonClick={handleModalClose}
        response={state.response}
      >
        <FormularioNuevaVenta
          defaultValues={{}}
          onSubmit={onSubmit}
          onError={onError}
          isDisabled={state.disabled}
        />
      </LayoutSaveElement>
    </>
  );
}
