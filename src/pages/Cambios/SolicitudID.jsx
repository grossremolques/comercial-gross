import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { PencilSquareIcon, DocumentIcon } from "@heroicons/react/24/solid";
import Button from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import FormularioSolicitud from "../../templates/FormularioSolicitud";
import { ModalLoading, ModalSuccess } from "../../components/Modal";
import { useModal } from "../../context/ModalContext";
import { ss_solicitudes, ss_cambios_detalle } from "../../API/backend";
export function SolcitudID() {
  const navigate = useNavigate();
  const { handleModalClose, handleModalShow } = useModal();
  const [disabled, setDisabled] = useState(true);
  const location = useLocation();
  const { solicitudData } = location.state || {};
  solicitudData.trazabilidad = solicitudData.trazabilidad
    .toString()
    .replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3");
  const modalsId = { loading: "loading", success: "success" };
  const [data, setData] = useState(solicitudData);
  const onSubmit = async ({ data, dirtyFields, reset, watch }) => {
    handleModalShow(modalsId.loading);
    const updates = {};
    //obtener datos del "fieldArray"
    const actionsModificaciones = getModificaciones(
      data.modificaciones,
      solicitudData.modificaciones
    );
    updates["modificaciones"] = actionsModificaciones.update;
    delete dirtyFields.modificaciones;
    //obtener los datos a actualizar
    for (let item in dirtyFields) {
      if (dirtyFields[item]) {
        updates[item] = data[item];
      }
    }
    //actualizar los datos en la base de datos
    try {
      const { status } = await ss_solicitudes.updateData({
        colName: "id",
        id: solicitudData.id,
        values: updates,
      });
      //agregar las nuevas modificaciones
      for (const item of actionsModificaciones.append) {
        item["id_orden"] = data.id;
        const { result, status } = await ss_cambios_detalle.postData({
          data: item,
          includeId: true,
        });
      }
      //actualizar las formas de pago
      await Promise.all(
        actionsModificaciones.update.map(async (item) => {
          const { status } = await ss_cambios_detalle.updateData({
            colName: "id",
            id: item.id,
            values: item,
          });
        })
      );
      //eliminar las formas de pago (desactivar)
      await Promise.all(
        actionsModificaciones.remove.map(async (item) => {
          const res = await ss_cambios_detalle.disactive({
            colName: "id",
            id: item.id,
          });
        })
      );
      handleModalClose();
      handleModalShow(modalsId.success);
      // 🔹 Resetear el formulario con los valores actualizados
      setData(watch());
      reset(watch());
      setDisabled(true); 
    } catch (err) {
      console.error(err);
      return;
    }
  };
  const getModificaciones = (actualsValues, defaultValues = []) => {
    const arr = { append: [], remove: [], update: [] };

    // Verificar si hay elementos nuevos para agregar
    if (actualsValues?.length) {
      const hasAppend = !actualsValues.every((item) => item.id);
      if (hasAppend) {
        arr.append = actualsValues.filter((item) => item.id === "");
      }
    }

    // Si defaultValues está vacío, solo retornamos los agregados
    if (defaultValues.length === 0) return arr;

    // Verificar elementos eliminados y modificados
    defaultValues.forEach((origin) => {
      const hasRemoved = !actualsValues.some(
        (actual) => actual.id === origin.id
      );
      if (hasRemoved) arr.remove.push(origin);

      actualsValues.forEach((actual) => {
        if (
          actual.id === origin.id &&
          JSON.stringify(actual) !== JSON.stringify(origin)
        ) {
          arr.update.push(actual);
        }
      });
    });

    return arr;
  };
  const onError = async (data) => {
    console.log(data);
  };
  return (
    <>
      <BoxComponentScrolling title="Solicitud">
        <FormularioSolicitud
          defaultValues={solicitudData}
          onSubmit={onSubmit}
          onError={onError}
          isDisabled={disabled}
        />
        <ModalLoading id={modalsId.loading} title={"Guardando Proforma"} />
        <ModalSuccess id={modalsId.success} title={"Proforma Guardado"}>
          <p className="mt-4 text-sm text-gray-700">
            Los datos se han actualizado exitosamente
          </p>
          <div className="text-center mt-6">
            <Button
              className={"min-w-40"}
              type="button"
              variant="primary"
              text="Ir al inicio"
              onClick={() => {
                handleModalClose();
                navigate("/solicitudes", { state: { refresh: true } });
              }}
            />
          </div>
        </ModalSuccess>
        <div className="fixed bottom-[15px] left-8">
          <div className="flex gap-2">
            {solicitudData.status === "Pendiente" && (
              <Button
                type="button"
                variant="pink"
                text="Habilitar edición"
                icon={<PencilSquareIcon className="w-4" />}
                hidden_text
                onClick={() => {
                  setDisabled(false);
                }}
              />
            )}

            <Button
              className={"min-w-40"}
              type="button"
              variant="blue"
              text="Ver documento"
              icon={<DocumentIcon className="w-4" />}
              onClick={() => {
                navigate("/pdf-cambio", { state: { pdfData: data } });
              }}
            />
          </div>
        </div>
      </BoxComponentScrolling>
    </>
  );
}
