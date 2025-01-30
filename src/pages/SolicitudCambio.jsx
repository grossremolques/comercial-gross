import { useForm, useFieldArray } from "react-hook-form";
import ReactLoading from "react-loading";
import { Input, Label, Select, TextInvalidate } from "../components/Forms";
import { useEffect, useState } from "react";
import GoogleSheet from "google-sheet-package";
import { Modal } from "../components/Modal";
import { useModal } from "../context/ModalContext";
import { BuscarCliente } from "../templates/BuscarClientes";
import {
  PlusIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  ExclamationCircleIcon,
  MagnifyingGlassCircleIcon,
  ArchiveBoxIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/Buttons";
import Image from "../assets/archivo.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export function SolicitudCambio() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState({});
  const [selectClient, setSelectClient] = useState({});
  const [clientes, setClientes] = useState([]);
  const [atributos, setAtributos] = useState([]);
  const { handleModalShow, handleModalClose } = useModal();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues:
      {
        id_cliente: '',
        modelo: "",
        trazabilidadStr: "",
        cliente: "",
        selectAtributo: "",
        submit: "",
        datosCambio: [],
        trazabilidad: '',
        registrado_por: "",
        id: '',
        fecha_creacion: ""
    
    },
  });
  /* Consultas */
  const ss_clientes = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_CLIENTES,
    rowHead: 1,
    nameSheet: "Registro",
  });
  const ss_atributos = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_CAMBIO,
    rowHead: 1,
    nameSheet: "Atributos",
  });
  const ss_unidades = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_UNIDADES_GROSS,
    rowHead: 1,
    nameSheet: "Unidades",
  });
  const ss_gestoria = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_GESTORIA,
    rowHead: 1,
    nameSheet: "Gestoría",
  });
  const ss_registro = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_CAMBIO,
    rowHead: 1,
    nameSheet: "Registro",
  });
  const ss_detalles = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_CAMBIO,
    rowHead: 1,
    nameSheet: "Detalle",
  });
  const getClients = async () => {
    const res = await ss_clientes.getData();
    setClientes(res);
  };
  const getAtributos = async () => {
    const res = await ss_atributos.getData();
    setAtributos(res);
  };
  const handleData = async () => {
    handleModalShow("loadModal");
    try {
      const trazabilidad = watch("trazabilidadStr");
      const id = Number(trazabilidad.replace(".", "").replace("-", ""));
      const data = await getUnidad(id);
      handleModalClose();
      if (!data) {
        handleModalShow("errorModal");
      }
      setValue('modelo', data?.modelo)
      setData(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const getUnidad = async (id) => {
    const unidad = await ss_unidades.getDataById("trazabilidad", id);
    const gestoria = await ss_gestoria.getDataById("trazabilidad", id);
    if (!unidad || !gestoria) {
      return null;
    } else {
      return Object.assign(unidad, gestoria);
    }
  };

  useEffect(() => {
    getClients();
    getAtributos();
  }, []);
  /* Fin de Consultas */

  const onSubmit = async (data) => {
    handleModalShow("loadModalSave");
    data.trazabilidad = Number(
      data.trazabilidadStr.replace(".", "").replace("-", "")
    );
    data["registrado_por"] = user.alias;
    try {
      data["id"] = (await ss_registro.getLastId()) + 1;
      try {
        const { result, status } = await ss_registro.postData(data);
        if (status === 200) {
          data.datosCambio.map(async (item) => {
            item["id_orden"] = data.id;
            const { result, status } = await ss_detalles.postData(item);
            if (status === 200) {
              handleModalClose();
              handleModalShow("successModal");
            }
          });
        }
        console.log('final data',data);
        setData(data);
      } catch (e) {
        console.error(e);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const onError = (errors, e) => console.log("No enviado", errors);
  useEffect(() => {
    if (selectClient.id) {
      setValue("cliente", selectClient.razon_social);
      setValue("id_cliente", selectClient.id);
      handleModalClose();
    }
  }, [selectClient]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "datosCambio",
  });
  return (
    <>
      <h2 className="font-medium text-3xl text-center text-gray-700 mb-16">
        Solicitud de Cambio
      </h2>
      <form
        className="md:w-xl mx-auto"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Label label={"Trazabilidad"} htmlFor={"trazabilidadStr"} />
        <div className="flex gap-1">
          <Input
            placeholder={"Ingrese la trazabilidad. Ejem: 1.0001-25"}
            errors={errors}
            {...register("trazabilidadStr", {
              required: "El campo es obligatorio",
              pattern: {
                value: /^[1-8]([\.])[0-9]{4}([\-])[0-9]{2}/,
                message: "Formato inválido. Ejem: 1.0001-25",
              },
            })}
          />

          <Button onClick={handleData} variant="primaryOutline">
            <MagnifyingGlassIcon width={"20px"} />
          </Button>
        </div>
        {errors.trazabilidadStr && (
          <TextInvalidate message={errors.trazabilidadStr.message} />
        )}
        <article className="mt-5 rounded-xl bg-white p-4 sm:p-4 lg:p-6 flex gap-6 justify-between items-center">
          <div className="bg-gray-200 p-4 rounded-md">
            <img
              src={Image}
              alt="Icono grafico de Archivo"
              className="size-24 object-cover"
            />
          </div>

          <ul className="text-indigo-700 w-3/4">
            <li className="flex justify-between mb-2">
              <span className="font-medium text-gray-600">Modelo:</span>{" "}
              <span className={`${""}`}>{data?.modelo}</span>
            </li>
            <li className="flex justify-between mb-2">
              <span className="font-medium text-gray-600">Fecha entrega:</span>{" "}
              <span className="">{data?.f_disp_estimada}</span>
            </li>

            <li className="flex justify-between mb-2">
              <span className="font-medium text-gray-600">Status:</span>{" "}
              <span className="">{data?.status}</span>
            </li>
            <li className="flex justify-between mb-2">
              <span className="font-medium text-gray-600">Vendedor:</span>{" "}
              <span className="">{data?.vendedor}</span>
            </li>
          </ul>
        </article>
        <div className="mt-2">
          <Label label={"Seleccionar cliente"} htmlFor={"cliente"} />
          <Input
            placeholder={"Buscar Cliente"}
            onClick={() => handleModalShow("findClients")}
            {...register("cliente", {
              required: {
                value: "Debe seleccionar un cliente",
                message: "Debe seleccionar un cliente",
              },
            })}
          />
          {errors.cliente && (
            <TextInvalidate message={errors.cliente.message} />
          )}
        </div>
        <div className="mt-2">
          <Label label={"Atributo"} htmlFor={"selectAtributo"} />
          <div className="flex gap-1">
            <Select
              placeholder={"Seleccione un atributo"}
              {...register("selectAtributo", { required: true })}
            >
              {atributos.map((item) => (
                <option key={item["id_atributo"]} value={item["id_atributo"]}>
                  {item["atributo"]}
                </option>
              ))}
            </Select>
            <Button
              onClick={() =>
                append({
                  atributo: watch("selectAtributo"),
                  valor_actual: data[watch("selectAtributo")],
                })
              }
              variant="successOutline"
            >
              <PlusIcon width={"20px"} />
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full divide-y-2 divide-gray-400 text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap p-0.5 font-medium text-gray-900">
                  Atributo
                </th>
                <th className="whitespace-nowrap p-0.5 font-medium text-gray-900">
                  Valor actual
                </th>
                <th className="whitespace-nowrap p-0.5 font-medium text-gray-900">
                  Valor Nuevo
                </th>
              </tr>
            </thead>
            <tbody className="">
              {fields.map((item, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap p-0.5 text-gray-900">
                    <Input
                      type={"text"}
                      readOnly={true}
                      {...register(`datosCambio.${index}.atributo`, {
                        required: true,
                      })}
                    />
                  </td>
                  <td className="whitespace-nowrap p-0.5 text-gray-900">
                    <Input
                      type={"text"}
                      readOnly={true}
                      {...register(`datosCambio.${index}.valor_actual`, {
                        required: true,
                      })}
                    />
                  </td>
                  <td className="whitespace-nowrap p-0.5 text-gray-900">
                    <Input
                      type={"text"}
                      {...register(`datosCambio.${index}.valor_nuevo`, {
                        required: {
                          value: true,
                          message: "Debe ingresar un nuevo valor",
                        },
                      })}
                    />
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
          {errors.datosCambio && (
            <TextInvalidate
              message={"Debe agregar un nuevo valor al atributo a cambiar"}
            />
          )}
        </div>
        <Button
          className={"w-full mt-6"}
          variant="primary"
          type="submit"
          onSubmit={handleSubmit(onSubmit, onError)}
          {...register("submit", {
            validate: () => {
              const data = watch("datosCambio");
              return (
                (data && data.length > 0) ||
                "No se han seleccionado campos para modificar"
              );
            },
          })}
        >
          Enviar Solicitud
        </Button>
        <Button
          className={"w-full mt-4"}
          type="button"
          onClick={() => {
            reset({
              trazabilidadStr: "",
              cliente: "",
              selectAtributo: "",
              datosCambio: [],
            });
            setData(null);
          }}
        >
          Limpiar Formulario
        </Button>

        {errors.submit && <TextInvalidate message={errors.submit.message} />}
      </form>
      <Modal
        modalId={"findClients"}
        title={"Buscar Cliente"}
        variant="primary"
        icon={<UserGroupIcon width={"24px"} />}
      >
        <div className="mt-4">
          <BuscarCliente
            data={clientes}
            setSelectClient={setSelectClient}
            handleModalClose={handleModalClose}
          />
        </div>
      </Modal>
      <Modal
        modalId={"errorModal"}
        variant="danger"
        title={"Algo Malió Sal"}
        icon={<ExclamationCircleIcon width={"24px"} />}
      >
        {" "}
        <p className="mt-4 text-sm text-red-800">
          No se puede traer la información, verifica los siguientes puntos:
        </p>
        <ul className="mt-2 text-sm text-gray-800">
          <li className="mt-2">
            1️⃣ Verifica la trazabilidad, debe tener el siguiente formato:{" "}
            <code className="text-indigo-600">1.0001-24</code>
          </li>
          <li className="mt-2">
            2️⃣ La información debe estar tanto en el{" "}
            <code className="text-green-600">Registro de Unidades</code> como en
            el <code className="text-green-600">Registro de Gestoría</code>
          </li>
        </ul>
      </Modal>
      <Modal
        modalId={"loadModal"}
        variant="waiting"
        title={"Buscando Información"}
        icon={<MagnifyingGlassCircleIcon width={"24px"} />}
        disableXButton={true}
      >
        <div className="mx-auto mt-4">
          <ReactLoading
            type={"spin"}
            color=""
            className="mx-auto fill-blue-500"
          />
        </div>
      </Modal>
      <Modal
        modalId={"loadModalSave"}
        variant="primary"
        title={"Guardadon Información"}
        icon={<ArchiveBoxIcon width={"24px"} />}
        disableXButton={true}
      >
        <div className="mx-auto mt-4">
          <ReactLoading
            type={"spin"}
            color=""
            className="mx-auto fill-indigo-500"
          />
        </div>
      </Modal>
      <Modal
        modalId={"successModal"}
        variant="success"
        title={"Registro exitoso"}
        icon={<CheckBadgeIcon width={"24px"} />}
      >
        {" "}
        <p className="mt-4 text-sm text-green-700">
          Los datos se han guardo exitosamente
          <br />
          <strong>
            Imprime el registro de la Solicitud, y entegalo al responsable de
            procesar tu pedido
          </strong>
        </p>
        <Button
          className={"w-full mt-4"}
          type="button"
          variant="success"
          onClick={() => {
            handleModalClose();
            navigate('/pdf', {state: {pdfData: data}})
          }}
        >
          Imprimir Solicitud
        </Button>
      </Modal>
    </>
  );
}
