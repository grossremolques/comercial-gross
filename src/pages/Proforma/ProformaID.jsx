import { useLocation } from "react-router-dom";
import GoogleSheet from "google-sheet-package";
import { useEffect, useState } from "react";
import { InfoProducto } from "../../templates/InfoProducto";
import Button from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InfoCliente } from "../../templates/InfoCliente";
import { InfoPago } from "../../templates/InfoPago";
import { DocumentIcon } from "@heroicons/react/24/solid";
export function ProformaID() {
  const [selectClient, setSelectClient] = useState({});
  //const [dataModelo, setDataModelo] = useState();
  const navigate = useNavigate();
  const [cambios, setCambios] = useState([]);
  const location = useLocation();
  const { proformaData } = location.state || {};
  const id = location.pathname.replace("/proforma/", "");
  if (!proformaData) {
    console.log(id);
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: proformaData,
  });
  const handleOpenPDF = () => {
    navigate("/pdf-proforma", { state: { pdfData: proformaData } });
  };
  useEffect(() => {}, []);
  return (
    <>
      {proformaData && (
        <>
          <div
            className=" overflow-y-auto"
            style={{ height: "calc(100vh - 10rem)" }}
          >
            <InfoCliente
              register={register}
              errors={errors}
              setValue={setValue}
              data={proformaData}
            />
            <InfoProducto
              register={register}
              errors={errors}
              watch={watch}
              reset={reset}
              data={proformaData}
              setValue={setValue}
            />
            <InfoPago
              register={register}
              errors={errors}
              watch={watch}
              control={control}
              setValue={setValue}
              data={proformaData}
            />
          </div>
          <div className="fixed bottom-0 left-0 w-full flex px-10 py-3 bg-gray-800/70">
            <div className="flex gap-2 ml-auto">
              <Button
                className="ml-auto w-50"
                variant={"primary"}
                type="submit"
                //onSubmit={handleSubmit(onSubmit, onError)}
              >
                Guardar
              </Button>
              <Button
                className="ml-auto w-50"
                variant={"rose"}
                type="button"
                onClick={handleOpenPDF}
                //onSubmit={handleSubmit(onSubmit, onError)}
              >
                <div className="flex gap-1 justify-center">
                  <DocumentIcon className="w-5" /> Imprimir
                </div>
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
