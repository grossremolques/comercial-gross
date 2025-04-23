import { useFormContext, useFieldArray } from "react-hook-form";
import { CardToggle } from "../Cards";
import { Input, Select } from "../Generales/Forms";
import { useAtributos } from "../../context/Attributes/AtributosContext";
import { useEffect, useState } from "react";
import { Modelo } from "../Modelo";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import Button from "../Generales/Buttons";
function DatosProducto() {
  const { register, watch, control, setValue } = useFormContext({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "modelos",
  });
  const defaultValue = {
    id: "",
    cantidad: 1,
    largo: "",
    ancho: "",
    alto: "",
    capacidad: "",
    cant_puertas_laterales: "",
    altura_baranda: "",
    puerta_trasera: "",
    piso: "",
    espesor: "",
    cumbrera_lateral: "",
    cajon: "",
    tara: "",
    traba_puerta: "",
    cilindro: "",
    modelo: "",
    selectedModelo: {},
  };
  useEffect(() => {
    if (fields.length === 0) {
      append(defaultValue, { shouldFocus: false });
    }
  }, [fields, append]);
  const {
    modelos,
    atributos
  } = useAtributos();
  const handleSelection = ({ data, inputName }) => {
    const modelos = watch("modelos")[0];
    setValue(`${inputName}selectedModelo`, data);
    for (let attr in modelos) {
      if (data[attr])
        setValue(`${inputName}${attr}`, data[attr].value, {
          shouldDirty: true,
        });
    }
  };
  const RenderOptions = ({ atributo }) => {
    return (
      <>
        {atributos.map(
          (item) =>
            item.atributo === atributo &&
            item.active == true && (
              <option key={item.id} value={item.valor}>
                {item.valor}
              </option>
            )
        )}
        <option value={"N/A"}>
                {"N/A"}
              </option>
      </>
    );
  };
  return (
    <>
      {atributos.length>0 && modelos.length> 0 ? (
        <CardToggle
          className={"lg:max-w-[1000px] mx-auto my-4"}
          title={"Datos del Producto"}
        >
          {fields.map((item, index) => (
            <div
              key={index}
              className="border border-amber-400 px-2 pb-4 pt-2 rounded-md bg-amber-100/40 mb-3"
            >
              <div className="flex gap-2 items-end">
                <Modelo
                  inputName={`modelos.${index}.`}
                  handleSelection={handleSelection}
                />
                <Input
                  type="number"
                  label={"Cantidad"}
                  className="basis-1/3"
                  {...register(`modelos.${index}.cantidad`, {
                    required: true,
                  })}
                />
                <Button
                  icon={<TrashIcon className="w-4" />}
                  variant={"redOutline"}
                  hidden_text
                  text="Eliminar Modelo"
                  onClick={() => {
                    remove(index);
                  }}
                />
              </div>
              <h3 className="font-medium text-md mt-2 mb-2 text-indigo-700">
                Medidas
              </h3>
              <div className="columns-4 gap-2">
                <Input
                  type="number"
                  label={"Largo"}
                  disabled={
                    watch(`modelos.${index}.selectedModelo.largo.type`) ===
                    "Fijo"
                  }
                  {...register(`modelos.${index}.largo`, { required: true })}
                />
                <Input
                  type="number"
                  label={"Ancho"}
                  disabled={
                    watch(`modelos.${index}.selectedModelo.ancho.type`) ===
                    "Fijo"
                  }
                  {...register(`modelos.${index}.ancho`, { required: true })}
                />

                <Input
                  type="number"
                  label={"Alto"}
                  disabled={
                    watch(`modelos.${index}.selectedModelo.alto.type`) ===
                    "Fijo"
                  }
                  {...register(`modelos.${index}.alto`, { required: true })}
                />
                <Select
                  label={"Capacidad"}
                  disabled={
                    watch(`modelos.${index}.selectedModelo.capacidad.type`) ===
                    "Fijo"
                  }
                  {...register(`modelos.${index}.capacidad`, {
                    required: true,
                  })}
                >
                  <RenderOptions atributo={"capacidad"} />
                </Select>
              </div>
              <h3 className="font-medium text-md mt-2 mb-2 text-indigo-700">
                Características
              </h3>
              <div>
                <div className="columns-5 gap-2">
                  <Input
                    type="number"
                    label={"Cant. ptas. lat"}
                    disabled={
                      watch(
                        `modelos.${index}.selectedModelo.cant_puertas_laterales.type`
                      ) === "Fijo"
                    }
                    {...register(`modelos.${index}.cant_puertas_laterales`, {
                      required: true,
                    })}
                  />
                  <Input
                    type="number"
                    label={"Altura de baranda"}
                    disabled={
                      watch(
                        `modelos.${index}.selectedModelo.altura_baranda.type`
                      ) === "Fijo"
                    }
                    {...register(`modelos.${index}.altura_baranda`, {
                      required: true,
                    })}
                  />

                  <Select
                    label={"Puerta trasera"}
                    disabled={
                      watch(
                        `modelos.${index}.selectedModelo.puerta_trasera.type`
                      ) === "Fijo"
                    }
                    {...register(`modelos.${index}.puerta_trasera`, {
                      required: true,
                    })}
                  >
                    <RenderOptions atributo={"puerta_trasera"} />
                  </Select>
                  <Select
                    label={"Piso"}
                    disabled={
                      watch(`modelos.${index}.selectedModelo.piso.type`) ===
                      "Fijo"
                    }
                    {...register(`modelos.${index}.piso`, { required: true })}
                  >
                    <RenderOptions atributo={"piso"} />
                  </Select>
                  <Select
                    disabled={
                      watch(`modelos.${index}.selectedModelo.espesor.type`) ===
                      "Fijo"
                    }
                    label={"Espesor"}
                    {...register(`modelos.${index}.espesor`, {
                      required: true,
                    })}
                  >
                    <RenderOptions atributo={"espesor"} />
                  </Select>
                </div>
                <div className="columns-5 mt-3 gap-2">
                  <Select
                    disabled={
                      watch(
                        `modelos.${index}.selectedModelo.cumbrera_lateral.type`
                      ) === "Fijo"
                    }
                    label={"Cumbrera lateral"}
                    {...register(`modelos.${index}.cumbrera_lateral`, {
                      required: true,
                    })}
                  >
                    <RenderOptions atributo={"cumbrera"} />
                  </Select>
                  <Input
                    type="number"
                    label={"Cajon de herramientas"}
                    disabled={
                      watch(`modelos.${index}.selectedModelo.cajon.type`) ===
                      "Fijo"
                    }
                    {...register(`modelos.${index}.cajon`, {
                      required: true,
                    })}
                  />
                  <Input
                    type="number"
                    label={"Tara"}
                    disabled={
                      watch(`modelos.${index}.selectedModelo.tara.type`) ===
                      "Fijo"
                    }
                    {...register(`modelos.${index}.tara`, { required: true })}
                  />

                  <Select
                    disabled={
                      watch(
                        `modelos.${index}.selectedModelo.traba_puerta.type`
                      ) === "Fijo"
                    }
                    label={"Traba de puerta"}
                    {...register(`modelos.${index}.traba_puerta`, {
                      required: true,
                    })}
                  >
                    <RenderOptions atributo={"mecanismo"} />
                  </Select>

                  <Select
                    disabled={
                      watch(`modelos.${index}.selectedModelo.cilindro.type`) ===
                      "Fijo"
                    }
                    label={"Cilindro"}
                    {...register(`modelos.${index}.cilindro`, {
                      required: true,
                    })}
                  >
                    <RenderOptions atributo={"cilindro"} />
                  </Select>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 text-sm font-semibold text-indigo-500 px-4 py-2 hover:bg-slate-200 rounded-md cursor-pointer"
            onClick={() => append(defaultValue)}
          >
            <div className="flex gap-2">
              <PlusCircleIcon className="w-5" />
              Agregar otro modelo
            </div>
          </button>
        </CardToggle>
      ): <div role="alert" className="border-s-4 border-red-700 bg-red-50 p-4">
      <div className="flex items-center gap-2 text-red-700">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
          <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
    
        <strong className="font-medium"> Algo anda mal </strong>
      </div>
    
      <p className="mt-2 text-sm text-red-700">
        No se ha podido cargar los atributos del producto, por favor recargue la pagina o vuelva a intentarlo mas tarde.
      </p>
    </div>}
    </>
  );
}
export default DatosProducto;
