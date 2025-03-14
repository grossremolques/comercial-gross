import { useForm, FormProvider } from "react-hook-form";
import { Footer } from "../components/Footer";
import Button from "../components/Generales/Buttons";
import DatosSolicitud from "../components/Solicitud/DatosSolicitud";
function FormularioSolicitud({ defaultValues, onSubmit, onError, isDisabled }) {
    const methods = useForm({
      defaultValues: defaultValues || {
      },
    });
    const { formState: { dirtyFields }, unregister, reset, watch } = methods;
    const handleSendings = (data) => {
      //data.id_cliente = data.selectedCliente.id
      unregister(['getTrazabilidad', 'submit', 'trazabilidad']);
      onSubmit({data, dirtyFields, reset, watch})
    }
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSendings, onError)}>
            
          <fieldset disabled={isDisabled}>
            <DatosSolicitud/>
          <Footer>
              <div className="flex gap-2 justify-end">
                <Button
                  className={"min-w-40"}
                  type="submit"
                  variant='primary'
                  text="Guardar"
                  {...methods.register('submit', {validate: () => {
                    const data = methods.watch('modificaciones');
                    return (
                      (data && data.length > 0) ||
                      'Debe agregar un tributo a modificar'
                    );
                  }})}
                  onSubmit={methods.handleSubmit()}
                />
              </div>
            </Footer>
            </fieldset>
        </form>
      </FormProvider>
    );
  }
  export default FormularioSolicitud;