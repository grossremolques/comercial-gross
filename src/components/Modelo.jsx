import { Input, TextInvalidate } from "./Generales/Forms";
import { TruckIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { useModal } from "../context/ModalContext";
import { useAtributos } from "../context/Attributes/AtributosContext";
import { useFormContext } from "react-hook-form";
export function Modelo({inputName}) {
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const { handleModalShow, handleModalClose } = useModal();
  const { modelos, getModelos } = useAtributos();
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  useEffect(() => {
    //getModelos();
  }, []);
  useEffect(() => {
    setFilteredData(modelos);
  }, [modelos]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = modelos.filter((item) =>
        item.modelo.value.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(result);
    }, 300); // Agrega un debounce de 300ms
    return () => clearTimeout(timeout);
  }, [search]);
  function handleSelectedModelo(data) {
    const modelos = watch('modelos')[0];
    setValue(`${inputName}selectedModelo`, data)
    for (let attr in modelos) {
      if (data[attr]) setValue(`${inputName}${attr}`, data[attr].value, { shouldDirty: true });
    }
  }
  return (
    <>
      <Input
        label={"Seleccionar modelo"}
        placeholder={"Buscar Modelo"}
        onClick={() => handleModalShow("findModelo")}
        readOnly={true}
        {...register(`${inputName}modelo`, {
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
          label="Buscar modelo"
          no_label
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
