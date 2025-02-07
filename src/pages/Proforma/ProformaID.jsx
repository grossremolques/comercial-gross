import { useLocation } from "react-router-dom";
import GoogleSheet from "google-sheet-package";
import { useEffect, useState } from "react";
import { InfoProducto } from "../../templates/DatosProdProforma";
import Button from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InfoCliente } from "../../templates/InfoCliente";
import { InfoPago } from "../../templates/InfoPago";
export function ProformaID() {
  const [selectClient, setSelectClient] = useState({});
  const [dataModelo, setDataModelo] = useState();
  const navigate = useNavigate();
  const [cambios, setCambios] = useState([]);
  const location = useLocation();
  const { proformaData } = location.state || {};
  const id = location.pathname.replace("/proforma/", "");
  //console.log(proformaData);
  if (!proformaData) {
    console.log(id);
  }
  /* Consultas */
  const ss_detalles = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_CAMBIO,
    rowHead: 1,
    nameSheet: "Detalle",
  });
  const getDetalles = async (id) => {
    try {
      const res = await ss_detalles.getData();
      const detalles = res.filter((item) => {
        return item.id_orden == id;
      });
      setCambios(detalles);
    } catch (err) {
      console.error("Error al obtener detalles:", err);
    }
  };
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
  useEffect(() => {
    setSelectClient(proformaData.cliente);
    reset({
      largo: proformaData?.largo,
      ancho: proformaData?.ancho,
      alto: proformaData?.alto,
      puerta_trasera: proformaData?.puerta_trasera,
      capacidad: proformaData?.capacidad,
      piso: proformaData?.piso,
      espesor: proformaData?.espesor,
      cumbrera_lateral: proformaData?.cumbrera_lateral,
      cant_puertas_laterales: proformaData?.cant_puertas_laterales,
      altura_baranda: proformaData?.altura_baranda,
      cajon: proformaData?.cajon,
      cilindro: proformaData?.cilindro,
      tara: proformaData?.tara,
      traba_puerta: proformaData?.traba_puerta,
      cliente: proformaData.cliente.razon_social,
      id_cliente: proformaData.cliente.id,
      modelo: proformaData?.modelo,
    });
    console.log(watch())
    getDetalles(id);
    // eslint-disable-next-line
  }, [proformaData]);
  const handleOpenPDF = () => {
    proformaData["datosCambio"] = cambios;
    proformaData["trazabilidadStr"] = proformaData.trazabilidad
      .toString()
      .replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3");
    navigate("/pdf-cambio", { state: { pdfData: proformaData } });
  };
  useEffect(() => {},[])
  return (
    <>
    {console.log(proformaData)}
      {proformaData && (
        <>
          <InfoCliente
            register={register}
            errors={errors}
            setValue={setValue}
            setSelectClient={setSelectClient}
            selectClient={selectClient}
          />
          <InfoProducto
            register={register}
            errors={errors}
            watch={watch}
            setDataModelo={setDataModelo}
            dataModelo={dataModelo}
          />
          <InfoPago
            register={register}
            errors={errors}
            watch={watch}
            control={control}
            setValue={setValue}
          />
        </>
      )}
    </>
  );
}
