import { useEffect } from "react";
import { UserGroupIcon, PlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Modal } from "./Modal";
import FormularioCliente from "../templates/FormularioCliente";

import { CardToggle } from "./Cards";
import { Input, TextInvalidate } from "./Generales/Forms";

import { useModal } from "../context/ModalContext";
import { useCamiones } from "../context/CamionesContext";
import Button from "./Generales/Buttons";
import { useFormContext } from "react-hook-form";

import { DataField } from "./DataField";
import {
  TruckIcon,
  CalculatorIcon,
  BookmarkSquareIcon,
  UserIcon,
  FingerPrintIcon
} from "@heroicons/react/24/solid";
import Badge from "./Generales/Badge";
import FormularioCamion from "../templates/FormularioCamion";

export default function DatosSeleccionarCamion({ isDisabled, modelo }) {
  const { filteredData, setSearch, setCamion, camion } = useCamiones(); // Consumir el contexto
  const { handleModalShow, handleModalClose } = useModal();
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const handleAddCamion = () => {
    /* Abrir Modal con formulario vacío para Agregar nuevo camion --> `FormularioCliente`*/
    setCamion({
      trazabilidad: "",
      /* datos default */
    }); // Configura un camion vacío
    handleModalShow("modal-camion"); // Abre el modal
  };
  const handleEditCamion = () => {
    /* Abrir Modal con formulario cpmpletado con los datos del camion a modificar --> `FormularioCliente`*/
    if (camion?.cuit) {
      handleModalShow("modal-camion"); // Abre el modal con los datos cargados
    } else {
      console.error("No hay un camion seleccionado para editar.");
    }
  };
  const id_camion = {...register("id_camion", { required: true })};
  const centro_eje = {...register("centro_eje", { required: true })};
  const handleSelectedCamion = (data) => {
    setValue("selectedCamion", data, { shouldDirty: true });
    setValue("id_camion", data.trazabilidad, { shouldDirty: true });
    const hasCentroEje = typeof (data?.l012_1 - data?.l102) === "number";
    setValue("centro_eje", hasCentroEje && data?.l012_1 - data?.l102, { shouldDirty: true });
    setValue("descripcion_camion", `${data.trazabilidad.toString().replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3")}: ${data.marca} - ${data.modelo}`, { shouldDirty: true }); 
    setCamion(data)
  };
  useEffect(() => {
    const { selectedCamion } = getValues();
    if (selectedCamion) handleSelectedCamion(selectedCamion);
  }, []);
  return (
    <>
      <CardToggle
        className={"lg:max-w-[1000px] mx-auto"}
        title={"Datos del Camion"}
      >
        <div className="flex gap-2 justify-between">
          <Input
            disabled={modelo?.descripcion_camion?.type === "Fijo"}
            label={"Seleccionar camion"}
            placeholder={"Buscar Camion"}
            onClick={() => handleModalShow("findCamion")}
            {...register("descripcion_camion", {
              required: {
                value: "Debe seleccionar un camion",
                message: "Debe seleccionar un camion",
              },
            })}
          />
          <div className="flex gap-2">
            <Button
              className="self-end"
              icon={<PlusIcon className="w-4" />}
              variant={"primaryOutline"}
              hidden_text
              text="Agregar Modelo"
              onClick={handleAddCamion}
            />
            <Button
              className="self-end"
              icon={<PencilIcon className="w-4" />}
              variant={"secondaryOutline"}
              hidden_text
              text="EditarModelo"
              onClick={handleEditCamion}
            />
          </div>
        </div>

        {errors.id_camion && (
          <TextInvalidate message={"Falta Seleccionar camion"} />
        )}
        <div className="mt-4 md:columns-2 mb-2">
          <DataField
            icon={<FingerPrintIcon width={"16px"} />}
            label={"Trazabilidad"}
            value={camion?.trazabilidad?.toString().replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3")}
          />
          <DataField
            icon={<TruckIcon width={"16px"} />}
            label={"Marca"}
            value={camion?.marca}
          />
          <DataField
            icon={<BookmarkSquareIcon width={"16px"} />}
            label={"Modelo"}
            value={camion?.modelo}
          />
          <DataField
            icon={<CalculatorIcon width={"16px"} />}
            label={"Centro de Eje"}
            value={typeof (camion?.l012_1 - camion?.l102) === "number" ? `✅ ${camion?.l012_1 - camion?.l102} mm` : "🚩 Faltan datos en el REG-016"}
          />
        </div>
        <DataField
          icon={<UserIcon width={"16px"} />}
          label={"Cliente"}
          value={camion?.razon_social}
        />
        <Modal
          modalId={"findCamion"}
          title={"Buscar Camion"}
          variant="primary"
          icon={<UserGroupIcon width={"24px"} />}
          size="w-sm md:w-3xl"
        >
          <div className="mt-4">
            <p className="mt-1 text-sm text-gray-700">Seleccione un camion.</p>
            <Input
              label="Buscar Camion"
              no_label
              type="search"
              placeholder="Buscar Camion"
              onInput={(e) => setSearch(e.target.value)}
            />
            <ul className="mt-2 max-h-[500px] overflow-y-auto">
              {filteredData.map((camion) => (
                <li
                  className="mt-2 text-sm text-gray-600 rounded border border-gray-300 px-4 py-1 cursor-pointer hover:bg-indigo-100"
                  key={camion.trazabilidad}
                  onClick={() => {
                    handleSelectedCamion(camion);
                    handleModalClose();
                  }}
                >
                  <span className="flex justify-between">
                    <span className="flex gap-2">
                      <Badge variant={"green"}>
                        {camion.trazabilidad
                          .toString()
                          .replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3")}
                      </Badge>
                      <Badge
                        variant={"yellow"}
                      >{`${camion.marca} - ${camion.modelo}`}</Badge>
                    </span>
                    <Badge variant={"gray"}>{camion.razon_social}</Badge>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      </CardToggle>
      <FormularioCamion handleSelectedCamion={handleSelectedCamion} />
    </>
  );
}
