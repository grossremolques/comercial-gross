import { CardToggle } from "../components/Cards";
import { Input, Label, Select, TextInvalidate } from "../components/Forms";
import { useForm, useFieldArray } from "react-hook-form";
import { Cliente } from "../components/Cliente";
import {
  IdentificationIcon,
  HomeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  HashtagIcon,
  MapIcon,
  PlusIcon,
  TrashIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/solid";
import { DataField } from "../components/DataField";
import { useEffect, useState } from "react";
import { useAtrubutos } from "../context/Attributes/AtributosContext";
import Button from "../components/Buttons";
import { ModalLoading, Modal } from "../components/Modal";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";
import { ss_formas_pago, ss_proforma } from "../API/backend";
import CurrencyInput from "react-currency-input-field";
function Proforma() {
  const [price, setPrice] = useState(0);
  const [data, setData] = useState({});
  const { handleModalShow, handleModalClose } = useModal();
  const [dataModelo, setDataModelo] = useState();
  const { user } = useAuth();
  const {
    getPuertasTraseras,
    puertasTraseras,
    getModelos,
    modelos,
    getCapacidad,
    capacidad,
    getPiso,
    piso,
    getCumbrera,
    cumbrera,
    getMecanismo,
    mecanismo,
    getCilindro,
    cilindro,
    getFormaPago,
    formaPago,
    getMedioPago,
    mediosPago,
  } = useAtrubutos();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      largo: "",
      ancho: "",
      alto: "",
      puerta_trasera: "",
      capacidad: "",
      piso: "",
      espesor: "",
      cumbrera_lateral: "",
      cant_puertas_laterales: "",
      altura_baranda: "",
      cajon: "",
      cilindro: "",
      tara: "",
      traba_puerta: "",
      pricio: "",
      iva: "",
      total: "",
    },
  });
  const onSubmit = async (data) => {
    handleModalShow("loading-save");
    try {
      const lastId = await ss_proforma.getLastId();
      data["id"] = lastId + 1;
      try {
        const { result, status } = await ss_proforma.postData(data, user);
        if (status === 200) {
          data.formaPago.map(async (item) => {
            item["id_factura"] = data.id;
            const { result, status } = await ss_formas_pago.postData(item);
          });
          setData(data);
          handleModalClose();
          //handleModalShow("success-save");
        }
      } catch (err) {
        console.error("Error:", err.message);
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };
  const onError = (data) => {
    console.error(data);
  };
  /* Manejo de Datos del Cliente */
  const [selectClient, setSelectClient] = useState({});
  useEffect(() => {
    setValue("cliente", selectClient.razon_social);
    setValue("id_cliente", selectClient.id);
  }, [selectClient]);
  /* Fin Cliente */
  /* Inicialización de datos, contexto de atributos */
  useEffect(() => {
    getModelos();
    getPuertasTraseras();
    getCapacidad();
    getPiso();
    getCumbrera();
    getMecanismo();
    getCilindro();
    getFormaPago();
    getMedioPago();
  }, []);
  /* Fin contexto de atributos */
  /* Manejo de valores deafault de modelos */
  useEffect(() => {
    const data = modelos.find((item) => item.modelo.value === watch("modelo"));
    setDataModelo(data);
  }, [watch("modelo")]);
  useEffect(() => {
    reset({
      largo: dataModelo?.largo.value,
      ancho: dataModelo?.ancho.value,
      alto: dataModelo?.alto.value,
      puerta_trasera: dataModelo?.puerta_trasera.value,
      capacidad: dataModelo?.capacidad.value,
      piso: dataModelo?.piso.value,
      espesor: dataModelo?.espesor.value,
      cumbrera_lateral: dataModelo?.cumbrera_lateral.value,
      cant_puertas_laterales: dataModelo?.cant_puertas_laterales.value,
      altura_baranda: dataModelo?.altura_baranda.value,
      cajon: dataModelo?.cajon.value,
      cilindro: dataModelo?.cilindro.value,
      tara: dataModelo?.tara.value,
      traba_puerta: dataModelo?.traba_puerta.value,
      cliente: selectClient.razon_social,
      id_cliente: selectClient.id,
    });
  }, [dataModelo]);
  /* Fin modelo */
  /* Manejo de Precio, IVA, y Total */
  useEffect(() => {
    setValue("precio", price);
    setValue("iva", price * 0.21);
    setValue("total", price * 1.21);
  }, [price]);
  /* Fin Precio */
  const { fields, append, remove } = useFieldArray({
    control,
    name: "formaPago",
  });
  return (
    <div className="">
      <form
        className="overflow-y-auto"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <CardToggle
          className={"lg:max-w-[1000px] mx-auto mb-5"}
          title={"Datos del Cliente"}
        >
          <div className="mt-2">
            <Cliente
              register={register}
              errors={errors}
              setValue={setValue}
              setSelectClient={setSelectClient}
            />
            <div className="mt-4 columns-2">
              <DataField
                icon={<IdentificationIcon width={"16px"} />}
                label={"CUIT"}
                value={selectClient.cuit}
              />
              <DataField
                icon={<PhoneIcon width={"16px"} />}
                label={"Telefono"}
                value={selectClient.tel}
              />
              <DataField
                icon={<EnvelopeIcon width={"16px"} />}
                label={"Email"}
                value={selectClient.email}
              />

              <DataField
                icon={<MapPinIcon width={"16px"} />}
                label={"Localidad"}
                value={selectClient.localidad}
              />

              <DataField
                icon={<MapIcon width={"16px"} />}
                label={"Provincia"}
                value={selectClient.provincia}
              />
              <DataField
                icon={<HashtagIcon width={"16px"} />}
                label={"Codigo postal"}
                value={selectClient.cod_postal}
              />
            </div>
            <DataField
              icon={<HomeIcon width={"16px"} />}
              label={"Domicilio"}
              value={`${selectClient.calle} ${selectClient.num}`}
            />
          </div>
        </CardToggle>
        <CardToggle
          className={"lg:max-w-[1000px] mx-auto mb-5"}
          title={"Datos del Producto"}
        >
          <Label label={"Modelo"} htmlFor={"modelo"} />
          <Select
            placeholder={"Seleccione un modelo"}
            {...register("modelo", {
              required: {
                value: "true",
                message: "Debe seleccionar un modelo",
              },
            })}
          >
            {modelos.map(
              (item) =>
                item.activo.value === "Sí" && (
                  <option key={item.modelo.value} value={item.modelo.value}>
                    {item.modelo.value}
                  </option>
                )
            )}
          </Select>
          {errors.modelo && <TextInvalidate message={errors.modelo.message} />}
          <h3 className="font-medium text-lg mt-4 mb-2 text-gray-700">
            Medidas
          </h3>
          <div className="columns-4">
            <div>
              <Label label={"Largo"} htmlFor={"largo"} />
              <Input
                readOnly={dataModelo?.largo.type === "Fijo"}
                type="number"
                {...register("largo", { required: true })}
              />
            </div>
            <div>
              <Label label={"Ancho"} htmlFor={"ancho"} />
              <Input
                readOnly={dataModelo?.ancho.type === "Fijo"}
                type="number"
                {...register("ancho", { required: true })}
              />
            </div>
            <div>
              <Label label={"Alto"} htmlFor={"alto"} />
              <Input
                readOnly={dataModelo?.alto.type === "Fijo"}
                type="number"
                {...register("alto", { required: true })}
              />
            </div>
            <div>
              <Label label={"Capacidad"} htmlFor={"capacidad"} />
              <Select
                disabled={dataModelo?.capacidad.type === "Fijo"}
                {...register("capacidad", { required: true })}
              >
                {capacidad.map((item) => (
                  <option key={item.descripcion} value={item.descripcion}>
                    {item.descripcion}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <h3 className="font-medium text-lg mt-4 mb-2 text-gray-700">
            Características
          </h3>
          <div>
            <div className="columns-5">
              <Label
                label={"Cant. ptas. lat"}
                htmlFor={"cant_puertas_laterales"}
              />
              <Input
                type="number"
                readOnly={dataModelo?.cant_puertas_laterales.type === "Fijo"}
                {...register("cant_puertas_laterales", { required: true })}
              />

              <Label label={"Altura de baranda"} htmlFor={"altura_baranda"} />
              <Input
                type="number"
                readOnly={dataModelo?.altura_baranda.type === "Fijo"}
                {...register("altura_baranda", { required: true })}
              />

              <Label label={"Puerta trasera"} htmlFor={"puerta_trasera"} />
              <Select
                disabled={dataModelo?.puerta_trasera.type === "Fijo"}
                {...register("puerta_trasera", { required: true })}
              >
                {puertasTraseras.map(
                  (item) =>
                    item.activo == "Sí" && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
              </Select>
              <Label label={"Piso"} htmlFor={"piso"} />
              <Select
                disabled={dataModelo?.piso.type === "Fijo"}
                {...register("piso", { required: true })}
              >
                {[...new Set(piso.map((item) => item.descripcion))].map(
                  (item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </Select>
              <Label label={"Espesor"} htmlFor={"espesor"} />
              <Select
                disabled={dataModelo?.espesor.type === "Fijo"}
                {...register("espesor", { required: true })}
              >
                {piso.map((item) => (
                  <option key={item.espesor} value={item.espesor}>
                    {item.espesor}
                  </option>
                ))}
              </Select>
            </div>
            <div className="columns-5 mt-3">
              <Label label={"Cumbrera lateral"} htmlFor={"cumbrera_lateral"} />
              <Select
                disabled={dataModelo?.cumbrera_lateral.type === "Fijo"}
                {...register("cumbrera_lateral", { required: true })}
              >
                {cumbrera.map((item) => (
                  <option key={item.descripcion} value={item.descripcion}>
                    {item.descripcion}
                  </option>
                ))}
              </Select>

              <Label label={"Cajon de herramientas"} htmlFor={"cajon"} />
              <Input
                readOnly={dataModelo?.cajon.type === "Fijo"}
                type="number"
                {...register("cajon", { required: true })}
              />

              <Label label={"Tara"} htmlFor={"tara"} />
              <Input
                readOnly={dataModelo?.tara?.type === "Fijo"}
                type="number"
                {...register("tara", { required: true })}
              />

              <Label label={"Traba de puerta"} htmlFor={"traba_puerta"} />
              <Select
                disabled={dataModelo?.traba_puerta.type === "Fijo"}
                {...register("traba_puerta", { required: true })}
              >
                {mecanismo.map((item) => (
                  <option key={item.descripcion} value={item.descripcion}>
                    {item.descripcion}
                  </option>
                ))}
              </Select>

              <Label label={"Cilindro"} htmlFor={"cilindro"} />
              <Select
                disabled={dataModelo?.cilindro.type === "Fijo"}
                {...register("cilindro", { required: true })}
              >
                {cilindro.map((item) => (
                  <option key={item.descripcion} value={item.descripcion}>
                    {item.descripcion}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </CardToggle>
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
              <Input
                type="date"
                {...register("vencimiento", { required: true })}
              />
            </div>
            <div>
              <Label label={"Precio"} htmlFor={"precio"} />
              <span className="w-full mt-1 inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm border-gray-200">
                <CurrencyInput
                  className="w-full border-0 border-r-2 border-gray-200 sm:text-sm"
                  intlConfig={{ locale: "es-AR", currency: "ARS" }}
                  decimalSeparator="."
                  groupSeparator=","
                  onValueChange={(value) => {
                    setPrice(Number(value));
                  }}
                  /* {...register("precio", {
                    required: true,
                    
                  })} */
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
                  /* {...register("iva", { required: true, })} */
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
                  /* {...register("total", {
                    required: true,
                    
                  })} */
                />
              </span>
            </div>
          </div>
          <div className="mt-4">
            <Label label={"Forma de Pago"} htmlFor={"selectFormaPago"} />
            <div className="flex gap-1">
              <Select
                placeholder={"Seleccione una formas de pago"}
                {...register("selectFormaPago", { required: true })}
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
        <div className="fixed bottom-0 left-0 w-full flex items-end px-10 py-3 bg-gray-800/70">
          <Button
            className="ml-auto w-50"
            variant={"primary"}
            type="submit"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            Guardar
          </Button>
        </div>
        <ModalLoading title={"Guardado información"} id={"loading-save"} />
        <Modal
          modalId={'modal-save-success'}
          variant="success"
          title={'Registro exitoso'}
          icon={<CheckBadgeIcon width={"24px"} />}
        >
          <p className="mt-4 text-sm text-green-700">
            Los datos se han guardo exitosamente
            <br />
            <strong>
              En el siguiente link podras encontrar el documento de la Factura Proforma
            </strong>
          </p>
          <Button
            className={"w-full mt-4"}
            type="button"
            variant="success"
            onClick={() => {
              handleModalClose();
              navigate("/pdf", { state: { pdfData: data } });
            }}
          >
            Factura Proforma
          </Button>
        </Modal>
      </form>
    </div>
  );
}
export default Proforma;
