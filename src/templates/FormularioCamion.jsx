import { useForm } from "react-hook-form";
import Button from "../components/Generales/Buttons";
import { Modal } from "../components/Modal";
import { UserIcon, UserPlusIcon, TruckIcon } from "@heroicons/react/24/solid";
import { ss_localidades, ss_clientes } from "../API/backend";
import { useState, useEffect } from "react";
import { useClientes } from "../context/ClientesContext";
import { Input, Select, TextInvalidate } from "../components/Generales/Forms";
import { useModal } from "../context/ModalContext";
import { useCamiones } from "../context/CamionesContext";
function FormularioCamion({ handleSelectedCliente }) {
  const { handleModalClose } = useModal();
  const { client, getClientes, clientes, setClient } = useClientes();
  const [newCamion, setnewCamion] = useState(false);
  const { camion } = useCamiones();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, dirtyFields },
  } = useForm();
  const [filterLocalidades, setFilterLocalidades] = useState(null);
  const [localidades, setLocalidades] = useState(null);
  useEffect(() => {
    getLocalidades();
  }, []);
  const getLocalidades = async () => {
    try {
      const res = await ss_localidades.getData();
      if (res) {
        setLocalidades(res);
        setFilterLocalidades(res);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    reset(camion);
    setnewCamion(camion.trazabilidad === "");
  }, [camion, reset, setValue]);
  const handleCentroEje = () => {
    const l012_1 = watch("l012_1") || 0;
    const l102 = watch("l102") || 0;
    const centroEje = l012_1 - l102;
    setValue("centro_eje", centroEje, { shouldDirty: true });
  };
  const handleSendings = async (data) => {
    Object.keys(dirtyFields).forEach((key) => (dirtyFields[key] = data[key]));
    try {
      if (newCamion) {
        const { status, response } = await ss_clientes.postData({ data: data });
        if (status === 200) {
          if (handleSelectedCliente) handleSelectedCliente(response);
        }
      } else {
        console.log(dirtyFields);
        const res = await ss_clientes.updateData({
          colName: "id",
          id: parseInt(client.id),
          values: dirtyFields,
        });
        if (res.status === 200) {
          const updatedClient = { ...client, ...dirtyFields }; // Combina datos actualizados

          if (handleSelectedCliente) handleSelectedCliente(updatedClient);
        }
      }
      getClientes();
    } catch (e) {
      console.error(e);
    } finally {
      handleModalClose();
    }
  };
  const handleValidateID = (value) => {
    if (newCamion) {
      const isId = clientes.some((item) => item.id == value);
      if (isId) return "Id registrado";
    }
  };
  const handleValidateCUIT = (value) => {
    if (newCamion) {
      const isCUIT = clientes.some((item) => item.cuit == value);
      if (isCUIT) return "CUIT registrado";
    }
  };
  const onError = (err) => {
    console.error(err);
  };
  return (
    <>
      <Modal
        modalId={"modal-camion"}
        title={newCamion ? "Agregar camión" : "Modificar camión"}
        variant={newCamion ? "blue" : "pink"}
        icon={
          newCamion ? (
            <TruckIcon className="w-4.5" />
          ) : (
            <TruckIcon className="w-4.5" />
          )
        }
      >
        <div
          className="mt-4 overflow-y-auto"
          style={{ height: "calc(100vh - 300px)" }}
        >
          <form onSubmit={handleSubmit(handleSendings, onError)}>
            <fieldset className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Select
                  label={"Marca"}
                  {...register("marca", { required: true })}
                >
                  {[].map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
                <Input
                  label={"Modelo"}
                  {...register("modelo", { required: true })}
                />
              </div>
              <div className="flex gap-2">
                <Input
                  label={"Año"}
                  type={"number"}
                  {...register("anno", { required: true })}
                />

                <Select
                  label={"Ejes"}
                  {...register("ejes", { required: true })}
                >
                  {[{ descripcion: "S1-D1" }, { descripcion: "S1-D2" }].map(
                    (item) => (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                  )}
                </Select>
              </div>
              <div className="flex gap-2">
                <Input label={"VIN"} {...register("vin", { required: true })} />
                <Input
                  label={"Dominio"}
                  {...register("dominio", { required: true })}
                />
              </div>
              <div className="flex gap-2">
                <Input
                  title="Distancia entre el primer y segundo eje (Paso)"
                  label={"L012.1"}
                  type={"number"}
                  defaultValue={0}
                  {...register("l012_1", { required: true, valueAsNumber: true, onChange: handleCentroEje })}
                />
                <Input
                  title="Distancia entre el primer eje y el inicio de la carrocería"
                  label={"L102"}
                  type={"number"}
                  defaultValue={0}
                  {...register("l102", { required: true, valueAsNumber: true, onChange: handleCentroEje })}
                />
                <Input
                  label={"Centro de eje"}
                  type={"number"}
                  readOnly={true}
                  defaultValue={0}
                  {...register("centro_eje", { required: true })}
                />
              </div>
            </fieldset>
          </form>
        </div>
      </Modal>
    </>
  );
}
export default FormularioCamion;
