import { useForm, FormProvider } from "react-hook-form";
import DatosCliente from "../components/DatosCliente";
function FormularioClientes({ defaultValues, onSubmit, onError }) {
  const methods = useForm({
    defaultValues: defaultValues || {},
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <fieldset disabled={false}>
          <DatosCliente/>
        </fieldset>
      </form>
    </FormProvider>
  );
}
export default FormularioClientes;
