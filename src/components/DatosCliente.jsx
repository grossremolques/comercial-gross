import { Input, Select } from "./Generales/Forms";
import { useFormContext } from "react-hook-form";
import Button from "./Generales/Buttons";
import { useEffect, useState } from "react";
import { useClientes } from "../context/ClientesContext";
import { ss_localidades } from "../API/backend";
export default function DatosClientes() {
  const { client } = useClientes();
  const [localidades, setLocalidades] = useState(null);
  const [filterLocalidades, setFilterLocalidades] = useState(null);
  const {
    register,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useFormContext();
  useEffect(() => {
    getLocalidades();
    
  }, []);
  useEffect(() => {
    reset(client);
    setValue('localidad', client.localidad)
    console.log(client)
  }, [client]);
  /* useEffect(() => {
    
  }, [watch("cod_postal")]); */

  const getLocalidades = async () => {
    try {
      const res = await ss_localidades.getData();
      if (res) {
        setLocalidades(res);
        setFilterLocalidades(res)
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleCodPostal = () => {
    const cod_postal = watch("cod_postal")
    if(localidades) {
      setFilterLocalidades(localidades.filter(item => item.cod_postal === cod_postal))
    }
  }
  return (
    <>
      {filterLocalidades && (
        <>
          <div className="flex flex-col gap-2">
            <Input
              label="Razón Social"
              {...register("razon_social", { required: true })}
            />
            <Input label="CUIT" {...register("cuit", { required: true })} />
            <Input
              label="Código Postal"
              type="number"
              {...register("cod_postal", { required: true, onChange: handleCodPostal })}
            />
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
            <Input
              label="Provincia"
              type="text"
              {...register("provincia", { required: true })}
            />
            <Input
              label="Domicilio"
              type="text"
              {...register("domicilio", { required: true })}
            />
            <Input
              label="Telefono"
              type="text"
              {...register("tel", { required: true })}
            />
            <Input label="Email" type="text" {...register("email")} />
          </div>
          <Button
            className={"w-full mt-3 float-end"}
            type="submit"
            variant="blueOutline"
            text="Guardar"
            onClick={() => {}}
          />
        </>
      )}
    </>
  );
}
