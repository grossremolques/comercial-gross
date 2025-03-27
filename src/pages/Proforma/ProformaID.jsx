import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/Generales/Buttons";
import { BoxComponentScrolling } from "../../components/BoxComponent";
import FormularioProforma from "../../templates/FormularioProforma";
import { PencilSquareIcon, DocumentIcon } from "@heroicons/react/24/solid";
import { ss_proforma, ss_formas_pago, ss_producto } from "../../API/backend";
import { useModal } from "../../context/ModalContext";
import { ModalLoading, ModalSuccess } from "../../components/Modal";
import { useNavigate } from "react-router-dom";

export function ProformaID() {
  const navigate = useNavigate();
  const { handleModalClose, handleModalShow } = useModal();
  const [disabled, setDisabled] = useState(true);
  const location = useLocation();
  const { proformaData } = location.state || {};
  const modalsId = { loading: "loading", success: "success" };
  const [data, setData] = useState(proformaData);

  const onSubmit = async ({ data, dirtyFields, reset,watch }) => {
    handleModalShow(modalsId.loading);
    const updates = {}
    //obtener datos del "fieldArray" Formas de Pagos y Modelos
     const actionsFormasPago = getActionsInArray(
      data.formaPago,
      proformaData.formaPago
    );
    const actionsModelos = getActionsInArray(
      data.modelos,
      proformaData.modelos
    );
    updates["formaPago"] = actionsFormasPago.update;
    updates["modelos"] = actionsModelos.update;
    delete dirtyFields.formaPago;
    delete dirtyFields.modelos;
    //obtener los datos a actualizar
    for (let item in dirtyFields) {
      if (dirtyFields[item]) {
        updates[item] = data[item];
      }
    }
    //actualizar los datos en la base de datos
    try {
      const { status } = await ss_proforma.updateData({
        colName: "id",
        id: proformaData.id,
        values: updates,
      });
      //agregar las nuevas formas de pago y modelos
      for (const item of actionsFormasPago.append) {
        item['id_factura'] = data.id;
        const { result, status } = await ss_formas_pago.postData({ data: item, includeId: true });
      }
      for (const item of actionsModelos.append) {
        item['id_proforma'] = data.id;
        const { result, status } = await ss_producto.postData({ data: item, includeId: true });
      }
      //actualizar las formas de pago y modelos
      await Promise.all(actionsFormasPago.update.map(async (item) => {
        const { status } = await ss_formas_pago.updateData({
          colName: "id",
          id: item.id,
          values: item,
        });
      }));
      await Promise.all(actionsModelos.update.map(async (item) => {
        const { status } = await ss_producto.updateData({
          colName: "id",
          id: item.id,
          values: item,
        });
      }));
      //eliminar las formas de pago y modelos (desactivar)
      await Promise.all(actionsFormasPago.remove.map(async (item) => {
        const res = await ss_formas_pago.disactive({
          colName: "id",
          id: item.id,
        });
      }));
      await Promise.all(actionsModelos.remove.map(async (item) => {
        const res = await ss_producto.disactive({
          colName: "id",
          id: item.id,
        });
      }));
      
      handleModalClose();
      handleModalShow(modalsId.success);
      // 🔹 Resetear el formulario con los valores actualizados
      setData(watch());
      reset(watch()); 
      setDisabled(true)
    } catch (err) {
      console.error(err);
      return;
    };
  };
  const onError = async (data) => {
    console.log(data);
  };
  const getActionsInArray = (actualsValues, defaultValues = []) => {
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
      const hasRemoved = !actualsValues.some((actual) => actual.id === origin.id);
      if (hasRemoved) arr.remove.push(origin);
  
      actualsValues.forEach((actual) => {
        if (actual.id === origin.id && JSON.stringify(actual) !== JSON.stringify(origin)) {
          arr.update.push(actual);
        }
      });
    });
    return arr;
  };
  return (
    <>
      <BoxComponentScrolling title="Creando Proforma">
        <FormularioProforma
          defaultValues={proformaData}
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
                navigate("/proformas", { state: { refresh: true } });
              }}
            />
          </div>
        </ModalSuccess>
        <div className="fixed bottom-[15px] left-8">
          <div className="flex gap-2">
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
          <Button
              className={"min-w-40"}
              type="button"
              variant="blue"
              text="Ver documento"
              icon={<DocumentIcon className="w-4" />}
              onClick={() => {
                navigate("/pdf-proforma", { state: { pdfData: data } });
              }}
            />
          </div>
          
          
        </div>
      </BoxComponentScrolling>
    </>
  );
}
