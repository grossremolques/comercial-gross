import { Input, Label, TextInvalidate } from "./Forms";
import { PlusIcon, PencilIcon, TruckIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { useModal } from "../context/ModalContext";
import Button from "./Buttons";
import { useAtributos } from "../context/Attributes/AtributosContext";
import { useFormContext } from "react-hook-form";
export function Modelo() {
  const [filteredData, setFilteredData] = useState([]);
  const { handleModalShow, handleModalClose } = useModal();
  const { modelos, getModelos } = useAtributos();
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  useEffect(() => {
    getModelos();
  }, []);
  useEffect(() => {
    setFilteredData(modelos);
  }, [modelos]);
  function handleSelectedModelo(data) {
    const values = watch()
    setValue("selectedModelo", data);
    for (let attr in values) {
      if(data[attr]) setValue(attr, data[attr].value, { shouldDirty: true });
    }
  }
  return (
    <>
      <Label label={"Seleccionar modelo"} htmlFor={"modelo"} />
        <Input
          placeholder={"Buscar Modelo"}
          onClick={() => handleModalShow("findModelo")}
          readOnly={true}
          {...register("modelo", {
            required: {
              value: "Debe seleccionar un modelo",
              message: "Debe seleccionar un modelo",
            },
          })}
        />
      {errors.modelo && <TextInvalidate message={errors.modelo.message} />}
      <Modal
        modalId={"findModelo"}
        title={"Buscar Modelo"}
        variant="primary"
        icon={<TruckIcon width={"24px"} />}
      >
        <div className="mt-4">
          <p className="mt-1 text-sm text-gray-700">Seleccione un modelo.</p>
          <Input
            type="search"
            placeholder="Buscar Modelo"
            onInput={(e) => setSearch(e.target.value)}
            {...register("getModelo", {})}
          />
          <ul className="mt-2 max-h-[500px] overflow-y-auto">
            {filteredData.map(
              (item) =>
                item.activo.value === "Sí" && (
                  <li
                    className="mt-2 text-sm text-gray-600 rounded border border-gray-300 px-4 py-1 cursor-pointer hover:bg-indigo-100"
                    key={item.modelo.value}
                    onClick={() => {
                      handleSelectedModelo(item);
                      handleModalClose();
                    }}
                  >
                    <p>{item.modelo.value}</p>
                  </li>
                )
            )}
          </ul>
        </div>
      </Modal>
    </>
  );
}
