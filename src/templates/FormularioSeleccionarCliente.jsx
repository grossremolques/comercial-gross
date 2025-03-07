import { useForm, FormProvider } from "react-hook-form";
import DatosSeleccionarCliente from "../components/DatosSeleccionarCliente";
function FormularioSeleccionarCliente({ defaultValues, onSubmit, onError }) {
  const methods = useForm({
    defaultValues: defaultValues || {},
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <fieldset disabled={false}>
          <DatosSeleccionarCliente/>
        </fieldset>
      </form>
    </FormProvider>
  );
}
export default FormularioSeleccionarCliente;
