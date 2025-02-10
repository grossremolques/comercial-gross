import { useForm } from "react-hook-form";
import { InfoCliente } from "../../templates/InfoCliente";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useAtrubutos } from "../../context/Attributes/AtributosContext";
import Button from "../../components/Buttons";
import { ModalLoading, Modal } from "../../components/Modal";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import { ss_formas_pago, ss_proforma } from "../../API/backend";
import { InfoProducto } from "../../templates/InfoProducto";
import { InfoPago } from "../../templates/InfoPago";
export function NewProforma() {
  const STORAGE_KEY = "data-new-proforma";
  const dataLocalStorage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  console.log(dataLocalStorage)
  const [data, setData] = useState({});
  const { handleModalShow, handleModalClose } = useModal();
  //const [dataModelo, setDataModelo] = useState();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: dataLocalStorage,
  });
  const watchedValues = watch();
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues));
  }, [watchedValues]);
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
  //const [selectClient, setSelectClient] = useState({});
  /* useEffect(() => {
    console.log(selectClient)
    setValue("cliente", selectClient);
    setValue("razon_social", selectClient?.razon_social);
    setValue("id_cliente", selectClient?.id);
  }, [selectClient]); */

  /* useEffect(() => {
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
  }, [dataModelo]); */

  return (
    <div className="">
      <form
        className="overflow-y-auto"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <InfoCliente
          register={register}
          errors={errors}
          setValue={setValue}
          data={dataLocalStorage}
        />
         <InfoProducto
          register={register}
          errors={errors}
          watch={watch}
          data={dataLocalStorage}
          reset={reset}
        />
        {/*<InfoPago
          register={register}
          errors={errors}
          watch={watch}
          control={control}
          setValue={setValue}
          
        /> */}
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
          modalId={"modal-save-success"}
          variant="success"
          title={"Registro exitoso"}
          icon={<CheckBadgeIcon width={"24px"} />}
        >
          <p className="mt-4 text-sm text-green-700">
            Los datos se han guardo exitosamente
            <br />
            <strong>
              En el siguiente link podras encontrar el documento de la Factura
              Proforma
            </strong>
          </p>
          <Button
            className={"w-full mt-4"}
            type="button"
            variant="success"
            onClick={() => {
              handleModalClose();
              navigate("/pdf-proforma", { state: { pdfData: data } });
            }}
          >
            Factura Proforma
          </Button>
        </Modal>
      </form>
    </div>
  );
}
