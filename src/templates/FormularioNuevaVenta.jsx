import { useForm, FormProvider } from "react-hook-form";
import DatosPagos from "../components/Proforma/DatosPagos";
import DatosTecnico from "../components/UnidadesGross/DatosTecnicos";
import DatosSeleccionarCliente from "../components/DatosSeleccionarCliente";
import { Footer } from "../components/Footer";
import Button from "../components/Generales/Buttons";
import DatosSeleccionarCamion from "../components/DatosSeleccionarCamion";
export default function FormularioNuevaVenta({ defaultValues, onSubmit, onError, isDisabled }) {
  const methods = useForm({
    defaultValues: defaultValues || {
    },
  });
  const { formState: { dirtyFields }, unregister, reset, watch} = methods;
  const handleSendings = (data) => {
    console.log(data)
    data.id_cliente = data.selectedCliente.id
    unregister(['getCliente', 'getModelo', 'submit', 'razon_social']);
    onSubmit({data, dirtyFields, reset, watch})
  }
  return (
    <FormProvider {...methods}>
      
      <DatosSeleccionarCliente isDisabled={isDisabled}/>
      <form onSubmit={methods.handleSubmit(handleSendings, onError)}>
        <fieldset disabled={isDisabled}>
          <DatosTecnico />
        <Footer>
            <div className="flex gap-2 justify-end">
              <Button
                className={"min-w-40"}
                type="submit"
                variant='primary'
                text="Guardar"
                {...methods.register('submit', {validate: () => {
                  const data = methods.watch('formaPago');
                  return (
                    (data && data.length > 0) ||
                    'Debe agregar algun forma y metodo de pago'
                  );
                }})}
                onSubmit={methods.handleSubmit()}
              />
            </div>
          </Footer>
          </fieldset>
      </form>
      <DatosSeleccionarCamion isDisabled={isDisabled}/>
      
    </FormProvider>
  );
}