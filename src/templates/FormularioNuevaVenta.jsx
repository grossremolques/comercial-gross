import { useForm, FormProvider } from "react-hook-form";
import DatosPagos from "../components/Proforma/DatosPagos";
import DatosTecnico from "../components/UnidadesGross/DatosTecnicos";
import DatosSeleccionarCliente from "../components/DatosSeleccionarCliente";
import { Footer } from "../components/Footer";
import Button from "../components/Generales/Buttons";
import DatosSeleccionarCamion from "../components/DatosSeleccionarCamion";
import { useState } from "react";
export default function FormularioNuevaVenta({
  defaultValues,
  onSubmit,
  onError,
  isDisabled,
}) {
  const [modelo, setModelo] = useState(null);
  const methods = useForm({
    defaultValues: defaultValues || {},
  });
  const {
    formState: { dirtyFields },
    unregister,
    reset,
    watch,
  } = methods;
  const handleSendings = (data) => {
    data.id_cliente = data.selectedCliente.id;
    unregister(["getCliente", "getModelo", "submit", "razon_social"]);
    onSubmit({ data, dirtyFields, reset, watch });
  };
  const getModelo = (modelo) => {
    setModelo(modelo);
  };
  return (
    <FormProvider {...methods}>
      <DatosSeleccionarCliente isDisabled={isDisabled} />
      <form onSubmit={methods.handleSubmit(handleSendings, onError)}>
        <fieldset disabled={isDisabled}>
          <DatosTecnico getModelo={getModelo} />
          <Footer>
            <div className="flex gap-2 justify-end">
              <Button
                className={"min-w-40"}
                type="submit"
                variant="primary"
                text="Guardar"
                onSubmit={methods.handleSubmit()}
              />
            </div>
          </Footer>
        </fieldset>
      </form>
      <div className={`${modelo?.tipo?.value != "Carrocería" && "sr-only"}`}>
      <DatosSeleccionarCamion isDisabled={isDisabled} modelo={modelo} /></div>
    </FormProvider>
  );
}
