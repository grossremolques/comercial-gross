import { useEffect, useState } from "react";
import { CardToggle } from "../components/Cards";
import { Cliente } from "../components/Cliente";
import { DataField } from "../components/DataField";
import {
  IdentificationIcon,
  HomeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  HashtagIcon,
  MapIcon,
} from "@heroicons/react/24/solid";
export const InfoCliente = ({
  register,
  errors,
  setValue,
  data,
}) => {
  const {} = register('cliente');
  const [selectClient, setSelectClient] = useState(data.cliente);
  useEffect(() => {
    setValue('cliente', selectClient)
    setValue('razon_social' , selectClient?.razon_social);
  },[selectClient])
  return (
    <CardToggle
      className={"lg:max-w-[1000px] mx-auto mb-5"}
      title={"Datos del Cliente"}
    >
      <div className="mt-2">
        <Cliente
          register={register}
          errors={errors}
          setSelectClient={setSelectClient}
        />
        <div className="mt-4 columns-2">
          <DataField
            icon={<IdentificationIcon width={"16px"} />}
            label={"CUIT"}
            value={selectClient?.cuit}
          />
          <DataField
            icon={<PhoneIcon width={"16px"} />}
            label={"Telefono"}
            value={selectClient?.tel}
          />
          <DataField
            icon={<EnvelopeIcon width={"16px"} />}
            label={"Email"}
            value={selectClient?.email}
          />

          <DataField
            icon={<MapPinIcon width={"16px"} />}
            label={"Localidad"}
            value={selectClient?.localidad}
          />

          <DataField
            icon={<MapIcon width={"16px"} />}
            label={"Provincia"}
            value={selectClient?.provincia}
          />
          <DataField
            icon={<HashtagIcon width={"16px"} />}
            label={"Codigo postal"}
            value={selectClient?.cod_postal}
          />
        </div>
        <DataField
          icon={<HomeIcon width={"16px"} />}
          label={"Domicilio"}
          value={`${selectClient?.calle} ${selectClient?.num}`}
        />
      </div>
    </CardToggle>
  );
};
