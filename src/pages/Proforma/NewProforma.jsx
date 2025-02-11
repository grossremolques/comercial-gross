import { useForm } from "react-hook-form";
import { InfoCliente } from "../../templates/InfoCliente";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Button from "../../components/Buttons";
import { ModalLoading, Modal } from "../../components/Modal";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import { ss_formas_pago, ss_proforma } from "../../API/backend";
import { InfoProducto } from "../../templates/InfoProducto";
import { InfoPago } from "../../templates/InfoPago";
import { useNavigate } from "react-router-dom";
export function NewProforma() {
  const navigate = useNavigate();
  const STORAGE_KEY = "data-new-proforma";
  const dataLocalStorage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  const [data, setData] = useState({});
  const { handleModalShow, handleModalClose } = useModal();
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
      data['id_cliente'] = data.cliente.id
      try {
        const { result, status } = await ss_proforma.postData(data, user);
        if (status === 200) {
          data.formaPago.map(async (item) => {
            item["id_factura"] = data.id;
            const { result, status } = await ss_formas_pago.postData(item);
          });
          setData(data);
          handleModalClose();
          handleModalShow("modal-save-success");
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

  return (
    <div className="">
      <form
        className="overflow-y-auto"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className=" overflow-y-auto" style={{ height: "calc(100vh - 10rem)" }}>
        <InfoCliente
          register={register}
          errors={errors}
          setValue={setValue}
          data={dataLocalStorage}
          watch={watch}
        />
         <InfoProducto
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          reset={reset}
          data={dataLocalStorage}
        />
        <InfoPago
          register={register}
          errors={errors}
          watch={watch}
          control={control}
          setValue={setValue}
          data={dataLocalStorage}
          
        />
        </div>
        <div className="fixed bottom-0 left-0 w-full flex items-end px-10 py-3 bg-gray-800/70">
          <Button
            className="ml-auto w-50"
            variant={"primary"}
            type="submit"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            Guardar
          </Button>
          <Button
            className="ml-auto w-50"
            variant={"dangerOutline"}
            type="button"
            onClick={() => {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
              reset({
                razon_social: "",
                modelo: "",
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
                cilindro: '',
                fecha_estimada: "",
                vencimiento: "",
                priceInput: "",
                formaPago: [],
              })
            }}
          >
            Test
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
