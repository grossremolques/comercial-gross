import { CardToggle } from "../Cards";
import CurrencyInput from "react-currency-input-field";
import { useAtributos } from "../../context/Attributes/AtributosContext";
import { useFieldArray } from "react-hook-form";
import { Label, Input, Select, TextInvalidate, Textarea } from "../Generales/Forms";
import Button from "../Generales/Buttons";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
function DatosPagos() {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
    control,
  } = useFormContext();
  const { getFormaPago, formaPago, getMedioPago, mediosPago } = useAtributos();
  useEffect(() => {
    getFormaPago();
    getMedioPago();
  }, []);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "formaPago",
  });

  const handlePriceChange = (value) => {
    // Convertir el valor a número
    const precio = parseFloat(value?.replace(/[^\d.-]/g, "")) || 0;

    // Calcular IVA y Total
    const iva = precio * 0.105;
    const total = precio + iva;

    // Actualizar valores en react-hook-form
    setValue("precio", value);
    setValue("iva", iva.toFixed(2));
    setValue("total", total.toFixed(2));
  };

  return (
    <>
      {formaPago.length > 0 && mediosPago.length > 0 && (
        <CardToggle
          className={"lg:max-w-[1000px] mx-auto"}
          title={"Datos de Entrega y Pago"}
        >
          <div className="w-50 mb-2">
            <Select
              placeholder={""}
              label={"Asesor Comercial"}
              {...register('vendedor', {
                required: {value: true, message: 'Seleccione el vendedor'},
              })}
            >
              {[{alias:'LEBRU'},{alias:'IGRAM'}, {alias:'LUGAL'}].map((item) => (
                <option key={item["alias"]} value={item["alias"]}>
                  {item["alias"]}
                </option>
              ))}
            </Select>
            {errors.vendedor && (
              <TextInvalidate message={errors.vendedor.message} />
            )}
          </div>
          <div className="flex gap-2">
            
            <div>
              <Input
                type="date"
                label={"Fecha entrega"}
                {...register("fecha_estimada", {
                  required: { value: true, message: "Campo obligatorio" },
                })}
              />
              {errors.fecha_estimada && (
                <TextInvalidate message={errors.fecha_estimada.message} />
              )}
            </div>
            <div>
              <Input
                type="date"
                label={"Valido hasta"}
                {...register("vencimiento", {
                  required: { value: true, message: "Campo obligatorio" },
                })}
              />
              {errors.vencimiento && (
                <TextInvalidate message={errors.vencimiento.message} />
              )}
            </div>
            <div>
              <Label label={"Precio"} htmlFor={"precio"} />
              <span className="w-full inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm border-gray-200">
                <CurrencyInput
                  className="w-full border-0 border-r-2 border-gray-200 sm:text-sm"
                  intlConfig={{ locale: "es-AR", currency: "ARS" }}
                  decimalSeparator="."
                  groupSeparator=","
                  decimalScale={2}
                  defaultValue={watch("precio") || 0} // ← Carga el valor inicial
                  {...register("precio", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  onValueChange={handlePriceChange}
                />
                <span className="ml-2 font-medium text-indigo-500 self-center">
                  IVA
                </span>
                <CurrencyInput
                  className="w-full  border-0 border-r-2 border-gray-200 sm:text-sm"
                  intlConfig={{ locale: "es-AR", currency: "ARS" }}
                  decimalSeparator="."
                  groupSeparator=","
                  decimalScale={2}
                  readOnly={true}
                  value={watch("iva") || "0.00"}
                />
                <span className="ml-2 font-medium text-indigo-500 self-center">
                  Total
                </span>
                <CurrencyInput
                  className="w-full border-0 border-gray-200 sm:text-sm"
                  intlConfig={{ locale: "es-AR", currency: "ARS" }}
                  decimalSeparator="."
                  groupSeparator=","
                  decimalScale={2}
                  readOnly={true}
                  value={watch("total") || "0.00"}
                />
              </span>
              {errors.precio && (
                <TextInvalidate message={errors.precio.message} />
              )}
            </div>
          </div>
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full divide-y-2 divide-gray-400 text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="w-10 whitespace-nowrap p-0.5 font-medium text-gray-900 ">
                    #
                  </th>
                  <th className="w-50 whitespace-nowrap p-0.5 font-medium text-gray-900">
                    Forma de Pago
                  </th>
                  <th className="whitespace-nowrap p-0.5 font-medium text-gray-900">
                    Metodo de Pago
                  </th>
                  <th className="w-10 whitespace-nowrap p-0.5 font-medium text-gray-900"></th>
                </tr>
              </thead>
              <tbody className="">
                {fields.map((item, index) => (
                  <tr key={index}>
                    <th className="whitespace-nowrap p-0.5 text-gray-900">
                      {index + 1}
                    </th>
                    <td className="whitespace-nowrap p-0.5 text-gray-900">
                      <Select
                      label="Forma de Pago"
                      no_label
                        placeholder={"Seleccione una formas de pago"}
                        {...register(`formaPago.${index}.forma_pago`, {
                          required: true,
                        })}
                      >
                        {formaPago.map((item) => (
                          <option
                            key={item["descripcion"]}
                            value={item["descripcion"]}
                          >
                            {item["descripcion"]}
                          </option>
                        ))}
                      </Select>
                    </td>
                    <td className="whitespace-nowrap p-0.5 text-gray-900">
                      {watch(`formaPago.${index}.forma_pago`) ===
                      "Unidad usada" ? (
                        <Input
                        label="Unidad usada"
                        no_label
                          type={"text"}
                          placeholder={"Describa la unidad usada"}
                          {...register(`formaPago.${index}.unidad_usada`, {
                            required: true,
                          })}
                        />
                      ) : (
                        <Select
                        label="Metodo de Pago"
                        no_label
                          placeholder={"Metodo de Pago"}
                          {...register(`formaPago.${index}.metodo_pago`, {
                            required: true,
                          })}
                        >
                          {mediosPago.map((item) => (
                            <option
                              key={item["descripcion"]}
                              value={item["descripcion"]}
                            >
                              {item["descripcion"]}
                            </option>
                          ))}
                        </Select>
                      )}
                    </td>
                    <td className="whitespace-nowrap p-0.5 font-medium text-gray-900">
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
            <div className="mt-2"> 
              <Textarea
              label={"Observaciones"}
                {...register("nota")}
              />
              
            </div>
            {errors.submit && (
              <TextInvalidate message={errors.submit.message} />
            )}
            {errors.formaPago && (
              <TextInvalidate message={"Complete la forma y metodo de pago"} />
            )}
            <div className="text-center mt-3">
              <Button
                className={"min-w-40"}
                icon={<PlusIcon className="w-4" />}
                variant={"success"}
                text="Agregar Forma de pago"
                onClick={() =>
                  append({
                    id: "",
                    formaPago: "",
                    metodo_pago: "",
                  })
                }
              >
                <PlusIcon width={"20px"} />
              </Button>
            </div>
          </div>
        </CardToggle>
      )}
    </>
  );
}
export default DatosPagos;
