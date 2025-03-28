import { useFormContext, useFieldArray } from "react-hook-form";
import { CardToggle } from "../Cards";
import { Input, Select } from "../Generales/Forms";
import { useAtributos } from "../../context/Attributes/AtributosContext";
import { useEffect, useState } from "react";
import { Modelo } from "../Modelo";
import {
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import Button from "../Generales/Buttons";
function DatosProducto() {
  const {
    register,
    watch,
    control,
    setValue
  } = useFormContext({});
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
    puertasTraseras,
    capacidad,
    piso,
    cumbrera,
    mecanismo,
    cilindro,
  } = useAtributos();

  const handleSelection = ({data, inputName}) => {
    const modelos = watch("modelos")[0];
    setValue(`${inputName}selectedModelo`, data);
    for (let attr in modelos) {
      if (data[attr])
        setValue(`${inputName}${attr}`, data[attr].value, {
          shouldDirty: true,
        });
    }
  };
  return (
    <>
      {puertasTraseras.length > 0 &&
        capacidad.length > 0 &&
        piso.length > 0 &&
        cumbrera.length > 0 &&
        mecanismo.length > 0 &&
        cilindro.length > 0 && (
          <CardToggle
            className={"lg:max-w-[1000px] mx-auto mb-5"}
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
                      watch(
                        `modelos.${index}.selectedModelo.capacidad.type`
                      ) === "Fijo"
                    }
                    {...register(`modelos.${index}.capacidad`, {
                      required: true,
                    })}
                  >
                    {capacidad.map((item) => (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    ))}
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
                      {puertasTraseras.map(
                        (item) =>
                          item.active == true && (
                            <option
                              key={item.descripcion}
                              value={item.descripcion}
                            >
                              {item.descripcion}
                            </option>
                          )
                      )}
                    </Select>
                    <Select
                      label={"Piso"}
                      disabled={
                        watch(`modelos.${index}.selectedModelo.piso.type`) ===
                        "Fijo"
                      }
                      {...register(`modelos.${index}.piso`, { required: true })}
                    >
                      {[...new Set(piso.map((item) => item.descripcion))].map(
                        (item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        )
                      )}
                    </Select>
                    <Select
                      disabled={
                        watch(
                          `modelos.${index}.selectedModelo.espesor.type`
                        ) === "Fijo"
                      }
                      label={"Espesor"}
                      {...register(`modelos.${index}.espesor`, {
                        required: true,
                      })}
                    >
                      {piso.map((item) => (
                        <option key={item.espesor} value={item.espesor}>
                          {item.espesor}
                        </option>
                      ))}
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
                      {cumbrera.map((item) => (
                        <option key={item.descripcion} value={item.descripcion}>
                          {item.descripcion}
                        </option>
                      ))}
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
                      {mecanismo.map((item) => (
                        <option key={item.descripcion} value={item.descripcion}>
                          {item.descripcion}
                        </option>
                      ))}
                    </Select>

                    <Select
                      disabled={
                        watch(
                          `modelos.${index}.selectedModelo.cilindro.type`
                        ) === "Fijo"
                      }
                      label={"Cilindro"}
                      {...register(`modelos.${index}.cilindro`, {
                        required: true,
                      })}
                    >
                      {cilindro.map((item) => (
                        <option key={item.descripcion} value={item.descripcion}>
                          {item.descripcion}
                        </option>
                      ))}
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
        )}
    </>
  );
}
export default DatosProducto;
