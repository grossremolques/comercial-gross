import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/Forms";
import { useModal } from "../context/ModalContext";

export const BuscarModelo = ({ data, setSelectModelo}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const { handleModalClose } = useModal();

  const { register } = useForm();
  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = data.filter((item) =>
        item.modelo.value.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(result);
    }, 300); // Agrega un debounce de 300ms
    return () => clearTimeout(timeout);
  }, [search]);
  return (
    <>
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
                  setSelectModelo(item);
                  handleModalClose();
                }}
              >
                <p>{item.modelo.value}</p>
              </li>
            )
        )}
      </ul>
    </>
  );
};
