import { useForm } from "react-hook-form";
import Button from "../components/Buttons";
import { Modal } from "../components/Modal";
import { UserIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { ss_localidades, ss_clientes } from "../API/backend";
import { useState, useEffect } from "react";
import { useClientes } from "../context/ClientesContext";
import { Input, Select, TextInvalidate } from "../components/Forms";
function FormularioCliente() {
  const [isDisabled, setIsDisabled] = useState(false)
  const { client, getClientes, clientes } = useClientes();
  const [newClient, setNewClient] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, dirtyFields },
  } = useForm();
  const [filterLocalidades, setFilterLocalidades] = useState(null);
  const [localidades, setLocalidades] = useState(null);
  useEffect(() => {
    getLocalidades();
  }, []);
  const getLocalidades = async () => {
    try {
      const res = await ss_localidades.getData();
      if (res) {
        setLocalidades(res);
        setFilterLocalidades(res);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    reset(client);
    setValue("localidad", client.localidad);
    setNewClient(client.razon_social === "");
  }, [client]);
  const handleCodPostal = () => {
    const cod_postal = watch("cod_postal");
    if (localidades) {
      const filtered = localidades.filter(
        (item) => item.cod_postal === cod_postal
      );
      if (filtered.length > 0) {
        setFilterLocalidades(filtered);
        setValue("provincia", filtered[0].provincia);
      }
    }
  };
  const handleSendings = async (data) => {
    
    Object.keys(dirtyFields).forEach((key) => (dirtyFields[key] = data[key]));
    try {
      if (newClient) {
        const res = await ss_clientes.postData({ data: data });
        console.log(res);
      } else {
        const res = await ss_clientes.updateData({
          colName: "id",
          id: client.id,
          values: dirtyFields,
        });        
      }
      getClientes();
    } catch (e) {
      console.error(e);
    }
  };
  /* const handleValidateID = (value) => {
    const regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(value);
    /
  }; */
  const handleValidateID = (value) => {
    const isId = clientes.some((item) => item.id == value);
    if (isId) return "Id registrado";
  };
  const handleValidateCUIT = (value) => {
    const isCUIT = clientes.some((item) => item.cuit == value);
    if (isCUIT) return "CUIT registrado";
  };
  const onError = (err) => {
    console.error(err);
  };
  return (
    <>
      <Modal
        modalId={"modal-cliente"}
        title={newClient ? "Agregar cliente" : "Modificar cliente"}
        variant={newClient ? "blue" : "pink"}
        icon={
          newClient ? (
            <UserPlusIcon className="w-4.5" />
          ) : (
            <UserIcon className="w-4.5" />
          )
        }
      >
        <div
          className="mt-4 overflow-y-auto"
          style={{ height: "calc(100vh - 300px)" }}
        >
          <form onSubmit={handleSubmit(handleSendings, onError)}>
            <fieldset disabled={isDisabled}>
              <>
                {filterLocalidades && (
                  <>
                    <div className="flex flex-col gap-2 px-1">
                      <div className="flex gap-2">
                        <div className="basis-1/3">
                          <Input
                            disabled={!newClient}
                            label="Id"
                            type="number"
                            {...register("id", {
                              required: "Campo obligatorio",
                              validate: handleValidateID,
                            })}
                          />
                          {errors.id && (
                            <TextInvalidate message={errors.id.message} />
                          )}
                        </div>
                        <div className="basis-2/3">
                          <Input
                            label="CUIT"
                            {...register("cuit", {
                              required: "Campo obligatorio",
                              pattern: {
                                value: /^[0-9]{2}-[0-9]{8}-[0-9]{1}$/,
                                message: "Patron no coincide: 20-12345678-9",
                              },
                              validate: handleValidateCUIT,
                            })}
                          />
                          {errors.cuit && (
                            <TextInvalidate message={errors.cuit.message} />
                          )}
                        </div>
                      </div>
                      <Input
                        label="Razón Social"
                        {...register("razon_social", { required: true })}
                      />
                      {errors.razon_social && (
                        <TextInvalidate message={"Campo obligatorio"} />
                      )}
                      <Input
                        label="Código Postal"
                        type="number"
                        {...register("cod_postal", {
                          required: true,
                          onChange: handleCodPostal,
                        })}
                      />
                      {errors.cod_postal && (
                        <TextInvalidate message={"Campo obligatorio"} />
                      )}
                      <Select
                        label={"Localidad"}
                        {...register("localidad", { required: true })}
                      >
                        {filterLocalidades.map((item) => (
                          <option key={item.id} value={item.localidad}>
                            {item.localidad}
                          </option>
                        ))}
                      </Select>
                      {errors.localidad && (
                        <TextInvalidate message={"Campo obligatorio"} />
                      )}
                      <Input
                        label="Provincia"
                        disabled
                        type="text"
                        {...register("provincia", { required: true })}
                      />
                      {errors.provincia && (
                        <TextInvalidate message={"Campo obligatorio"} />
                      )}
                      <Input
                        label="Domicilio"
                        type="text"
                        {...register("domicilio", { required: true })}
                      />
                      {errors.domicilio && (
                        <TextInvalidate message={"Campo obligatorio"} />
                      )}
                      <Input
                        label="Telefono"
                        type="text"
                        {...register("telefono", { required: true })}
                      />
                      {errors.telefono && (
                        <TextInvalidate message={"Campo obligatorio"} />
                      )}
                      <Input label="Email" type="text" {...register("email")} />
                      {errors.email && (
                        <TextInvalidate message={"Campo obligatorio"} />
                      )}
                    </div>
                    <Button
                      className={"w-full mt-3 float-end"}
                      type="submit"
                      variant={newClient ? "blueOutline" : "pinkOutline"}
                      text={newClient ? "Guardar" : "Actualizar"}
                      onSubmit={handleSubmit}
                    />
                  </>
                )}
              </>
            </fieldset>
          </form>
        </div>
      </Modal>
    </>
  );
}
export default FormularioCliente;
