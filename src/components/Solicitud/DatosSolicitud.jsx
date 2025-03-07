import { CardToggle } from "../Cards";
import { Label, Input, Select, TextInvalidate } from "../Forms";
import { useFormContext, useFieldArray } from "react-hook-form";
import { DataField } from "../DataField";
import { Modal } from "../Modal";
import {
  TruckIcon,
  CalendarDaysIcon,
  PresentationChartBarIcon,
  UserCircleIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import { useUnidadesGross } from "../../context/UnidadesGrossContext";
import Button from "../Buttons";
import { ss_cambios_atributos } from "../../API/backend";
function DatosSolicitud() {
  const [filteredData, setFilteredData] = useState([]);
  const { handleModalShow, handleModalClose } = useModal();
  const { unidadesGross, getUnidadesGross } = useUnidadesGross();
  const [search, setSearch] = useState("");
  const [unidad, setUnidad] = useState();
  const [atributos, setAtributos] = useState();
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext();
  useEffect(() => {
    getUnidadesGross();
    getAtributos();
  }, []);
  useEffect(() => {
    setFilteredData(unidadesGross.reverse());
  }, [unidadesGross]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = unidadesGross.filter((item) =>
        item.trazabilidad
          .toString()
          .replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3")
          .includes(search)
      );
      setFilteredData(result);
    }, 300); // Agrega un debounce de 300ms
    return () => clearTimeout(timeout);
  }, [search]);
  const handleSelectUnidad = (data) => {
    console.log(data);
    setValue(
      "trazabilidad",
      data.trazabilidad.toString().replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3")
    );
    setValue("selectUnidad", data, { shouldDirty: true });
    //setUnidad(data);
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "modificaciones",
  });
  useEffect(() => {
    if (fields.length === 0) {
      append(
        {
          id: "",
          atributo: "",
          valor_actual: "",
          valor_nuevo: "",
        },
        { shouldFocus: false }
      );
    }
  }, [fields, append]);
  useEffect(() => {
    setUnidad(watch('selectUnidad'));
  },[watch('selectUnidad')])
  const getAtributos = async () => {
    const res = await ss_cambios_atributos.getData();
    setAtributos(res);
  };
  return (
    <>
      <CardToggle
        className={"lg:max-w-[1000px] mx-auto mb-5"}
        title={"Datos de la Solicitud"}
      >
        <Input
        label={"Seleccionar trazabilidad"}
          placeholder={"Buscar trazabilidad"}
          onClick={() => handleModalShow("findTrazabilidad")}
          {...register("trazabilidad", {
            required: {
              value: "Debe seleccionar una trazabilidad",
              message: "Debe seleccionar una trazabilidad",
            },
          })}
        />
        {errors.trazabilidad && (
          <TextInvalidate message={errors.trazabilidad.message} />
        )}
        <div className="mt-4 columns-2">
          <DataField
            icon={<TruckIcon className="w-4" />}
            label={"Modelo"}
            value={unidad?.modelo}
          />
          <DataField
            icon={<CalendarDaysIcon className="w-4" />}
            label={"Fecha entrega"}
            value={unidad?.gestoria.f_disp_estimada}
          />
          <DataField
            icon={<PresentationChartBarIcon className="w-4" />}
            label={"Status"}
            value={unidad?.status}
          />
          <DataField
            icon={<UserCircleIcon className="w-4" />}
            label={"Vendedor"}
            value={unidad?.gestoria.vendedor}
          />
        </div>
        <DataField
          icon={<UserCircleIcon className="w-4" />}
          label={"Cliente"}
          value={unidad?.gestoria.selectedCliente.razon_social}
        />
        <Modal
          modalId={"findTrazabilidad"}
          title={"Buscar Trazabilidad"}
          variant="primary"
          icon={<TruckIcon width={"24px"} />}
        >
          <div className="mt-4">
            <p className="mt-1 text-sm text-gray-700">
              Seleccione una Trazabilidad.
            </p>
            <Input
              type="search"
              label="Trazabilidad"
              no_label
              placeholder="Buscar Trazabilidad"
              onInput={(e) => setSearch(e.target.value)}
              {...register("getTrazabilidad", {})}
            />
            <ul className="mt-2 max-h-[500px] overflow-y-auto">
              {filteredData.map((unidad) => (
                <li
                  className="mt-2 text-sm text-gray-600 rounded border border-gray-300 px-4 py-1 cursor-pointer hover:bg-indigo-100"
                  key={unidad.trazabilidad}
                  onClick={() => {
                    handleSelectUnidad(unidad);
                    handleModalClose();
                  }}
                >
                  <p>{`Id: ${unidad.trazabilidad
                    .toString()
                    .replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3")} - Modelo: ${
                    unidad.modelo
                  }`}</p>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      </CardToggle>
      {unidad && atributos && (
        <CardToggle
          className={"lg:max-w-[1000px] mx-auto mb-5"}
          title={"Modificaciones"}
        >
          <table className="min-w-full divide-y-2 divide-gray-300 text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap p-0.5 font-medium text-gray-700 ">
                  Atributo
                </th>
                <th className="whitespace-nowrap p-0.5 font-medium text-gray-700">
                  Valor actual
                </th>
                <th className="whitespace-nowrap p-0.5 font-medium text-gray-700">
                  Modificación
                </th>
                <th className="w-10 whitespace-nowrap p-0.5 font-medium text-gray-700">
                  <TrashIcon className="w-4" />
                </th>
              </tr>
            </thead>
            <tbody className="">
              {fields.map((item, index) => (
                <tr key={index}>
                  <th className="whitespace-nowrap p-0.5 text-gray-700">
                    <Select
                    label={"Atributo"}
                    no_label
                      placeholder={"Seleccione un atributo"}
                      {...register(`modificaciones.${index}.atributo`, {
                        required: true,
                        onChange: (e) => {
                            const attr = e.target.value
                            console.log(unidad[attr])
                            setValue(
                              `modificaciones.${index}.valor_actual`,
                              unidad[attr]
                            );
  
                        },
                      })}
                    >
                      {atributos.map((item) => (
                        <option
                          key={item["id_atributo"]}
                          value={item["id_atributo"]}
                        >
                          {item["atributo"]}
                        </option>
                      ))}
                    </Select>
                  </th>
                  <td className="whitespace-nowrap p-0.5 text-gray-700">
                    <Input
                      type={"text"}
                      label={"Valor actual"}
                    no_label
                      placeholder={"Valor actual"}
                      disabled={true}
                      //value={unidad[watch(`modificaciones.${index}.atributo`)]}
                      {...register(`modificaciones.${index}.valor_actual`, {
                        required: true,
                      })}
                    />
                  </td>
                  <td className="whitespace-nowrap p-0.5 text-gray-700">
                    <Input
                    label={"nuevo valor"}
                    no_label
                      type={"text"}
                      placeholder={"Valor Nuevo"}
                      {...register(`modificaciones.${index}.valor_nuevo`, {
                        required: true,
                      })}
                    />
                  </td>
                  <td className="whitespace-nowrap p-0.5 font-medium text-gray-700">
                    <Button
                      icon={<TrashIcon className="w-4" />}
                      variant={"redOutline"}
                      hidden_text
                      text="Eliminar Etapa"
                      onClick={() => {
                        remove(index);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {errors.submit && <TextInvalidate message={errors.submit.message} />}
          {errors.modificaciones && (
            <TextInvalidate message={"Complete la información"} />
          )}
          <div className="text-center mt-3">
            <Button
              className={"min-w-40"}
              icon={<PlusIcon className="w-4" />}
              variant={"success"}
              text="Agregar Atributo"
              onClick={() =>
                append({
                  id: "",
                  atributo: "",
                  valor_actual: "",
                  valor_nuevo: "",
                })
              }
            >
              <PlusIcon width={"20px"} />
            </Button>
          </div>
        </CardToggle>
      )}
    </>
  );
}
export default DatosSolicitud;
