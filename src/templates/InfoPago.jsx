import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useAtrubutos } from "../context/Attributes/AtributosContext";
import { useFieldArray } from "react-hook-form";
import { CardToggle } from "../components/Cards";
import { Label, Input,Select, TextInvalidate } from "../components/Forms";
import Button from "../components/Buttons";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
export const InfoPago = ({ register, watch, errors, control, setValue, data }) => {
  const { getFormaPago, formaPago, getMedioPago, mediosPago } = useAtrubutos();
  useEffect(() => {
    getFormaPago();
    getMedioPago();
  }, []);
  const [price, setPrice] = useState(data.precio);
  useEffect(() => {
    setValue("precio", price);
    setValue("iva", price * 0.21);
    setValue("total", price * 1.21);
    setValue("priceInpu", price);
  }, [price]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "formaPago",
  });
  return (
    <CardToggle
      className={"lg:max-w-[1000px] mx-auto"}
      title={"Datos de Entrega y Pago"}
    >
      <div className="flex gap-2">
        <div>
          <Label label={"Fecha entrega"} htmlFor={"fecha_estimada"} />
          <Input
            type="date"
            {...register("fecha_estimada", { required: true })}
          />
        </div>
        <div>
          <Label label={"Valido hasta"} htmlFor={"vencimiento"} />
          <Input type="date" {...register("vencimiento", { required: true })} />
        </div>
        <div>
          <Label label={"Precio"} htmlFor={"precio"} />
          <span className="w-full mt-1 inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm border-gray-200">
            <CurrencyInput
              className="w-full border-0 border-r-2 border-gray-200 sm:text-sm"
              intlConfig={{ locale: "es-AR", currency: "ARS" }}
              decimalSeparator="."
              groupSeparator=","
              decimalScale={2}
              {...register("priceInput", { required: true })}
              value={price}
              onValueChange={(value) => {
                setPrice(Number(value));
              }}
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
              value={price * 0.21}
              readOnly={true}
              {...register("ivaInput", { required: true })}
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
              value={price * 1.21}
              readOnly={true}
              {...register("totalInput", { required: true })}
            />
          </span>
        </div>
      </div>
      <div className="mt-4">
        <Label label={"Forma de Pago"} htmlFor={"selectFormaPago"} />
        <div className="flex gap-1">
          <Select
            placeholder={"Seleccione una formas de pago"}
            {...register("selectFormaPago")}
          >
            {formaPago.map((item) => (
              <option key={item["descripcion"]} value={item["descripcion"]}>
                {item["descripcion"]}
              </option>
            ))}
          </Select>
          <Button
            onClick={() =>
              append({
                forma_pago: watch("selectFormaPago"),
              })
            }
            variant="successOutline"
          >
            <PlusIcon width={"20px"} />
          </Button>
        </div>
        <div className="overflow-x-auto mt-4">
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
                    <Input
                      type={"text"}
                      readOnly={true}
                      {...register(`formaPago.${index}.forma_pago`, {
                        required: true,
                      })}
                    />
                  </td>
                  <td className="whitespace-nowrap p-0.5 text-gray-900">
                    {watch(`formaPago.${index}.forma_pago`) ===
                    "Unidad usada" ? (
                      <Input
                        type={"text"}
                        placeholder={"Describa la unidad usada"}
                        {...register(`formaPago.${index}.unidad_usada`, {
                          required: true,
                        })}
                      />
                    ) : (
                      <Select
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
                      variant="dangerOutline"
                      onClick={() => remove(index)}
                    >
                      <TrashIcon className="w-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {errors.formaPago && (
            <TextInvalidate
              message={"Debe agregar un nuevo valor al atributo a cambiar"}
            />
          )}
        </div>
      </div>
    </CardToggle>
  );
};
