import { CardToggle } from "./Cards";
import { Label, Input, TextInvalidate } from "./Forms";
import { UserGroupIcon, PlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Modal } from "./Modal";
import { useModal } from "../context/ModalContext";
import { useClientes } from "../context/ClientesContext";
import Button from "./Buttons";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { DataField } from "./DataField";
import {
  IdentificationIcon,
  HomeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  HashtagIcon,
  MapIcon,
} from "@heroicons/react/24/solid";
function DatosCliente() {
  const [disabled, setDisabled] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const { clientes, getClientes } = useClientes();
  const { handleModalShow, handleModalClose } = useModal();
  const [search, setSearch] = useState("");
  const [cliente, setCliente] = useState();
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  useEffect(() => {
    getClientes();
  }, []);
  useEffect(() => {
    setFilteredData(clientes);
  }, [clientes]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = clientes.filter((item) =>
        item.razon_social.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(result);
    }, 300); // Agrega un debounce de 300ms
    return () => clearTimeout(timeout);
  }, [search]);
  const handleAddClient = () => {
    console.log("➕ Add client");
  };
  const handleEditClient = () => {
    console.log("✏️ Edit client");
    setDisabled(false);
  };
  function handleSelectedCliente(data) {
    setValue("razon_social", data.razon_social, { shouldDirty: true });
    setValue("id_cliente", data.id, { shouldDirty: true });
    setValue('selectedCliente', data, { shouldDirty: true })
    setCliente(data);
  }
  useEffect(() => {
    const { selectedCliente } = getValues();
    if (selectedCliente) handleSelectedCliente(selectedCliente);
  }, []);
  return (
    <CardToggle
      className={"lg:max-w-[1000px] mx-auto mb-5"}
      title={"Datos del Cliente"}
    >
      
      <Label label={"Seleccionar cliente"} htmlFor={"razon_social"} />
      <div className="flex gap-1">
        <Input
          placeholder={"Buscar Cliente"}
          onClick={() => handleModalShow("findClients")}
          {...register("razon_social", {
            required: {
              value: "Debe seleccionar un cliente",
              message: "Debe seleccionar un cliente",
            },
          })}
        />
        {/* <Button
          icon={<PlusIcon className="w-4" />}
          variant={"primaryOutline"}
          hidden_text
          text="Agregar Modelo"
          onClick={handleAddClient}
        />
        <Button
          icon={<PencilIcon className="w-4" />}
          variant={"secondaryOutline"}
          hidden_text
          text="EditarModelo"
          onClick={handleEditClient}
        /> */}
      </div>
      {errors.razon_social && (
        <TextInvalidate message={errors.razon_social.message} />
      )}
        <div className="mt-4 columns-2">
          <DataField
            icon={<IdentificationIcon width={"16px"} />}
            label={"CUIT"}
            value={cliente?.cuit}
          />
          <DataField
            icon={<PhoneIcon width={"16px"} />}
            label={"Telefono"}
            value={cliente?.tel}
          />
          <DataField
            icon={<EnvelopeIcon width={"16px"} />}
            label={"Email"}
            value={cliente?.email}
          />

          <DataField
            icon={<MapPinIcon width={"16px"} />}
            label={"Localidad"}
            value={cliente?.localidad}
          />

          <DataField
            icon={<MapIcon width={"16px"} />}
            label={"Provincia"}
            value={cliente?.provincia}
          />
          <DataField
            icon={<HashtagIcon width={"16px"} />}
            label={"Codigo postal"}
            value={cliente?.cod_postal}
          />
        </div>
        <DataField
          icon={<HomeIcon width={"16px"} />}
          label={"Domicilio"}
          value={`${cliente?.calle} ${cliente?.num}`}
        />
        <Modal
          modalId={"findClients"}
          title={"Buscar Cliente"}
          variant="primary"
          icon={<UserGroupIcon width={"24px"} />}
        >
          <div className="mt-4">
            <p className="mt-1 text-sm text-gray-700">Seleccione un cliente.</p>
            <Input
              type="search"
              placeholder="Buscar Cliente"
              onInput={(e) => setSearch(e.target.value)}
              {...register("getCliente", {})}
            />
            <ul className="mt-2 max-h-[500px] overflow-y-auto">
              {filteredData.map((client) => (
                <li
                  className="mt-2 text-sm text-gray-600 rounded border border-gray-300 px-4 py-1 cursor-pointer hover:bg-indigo-100"
                  key={client.id}
                  onClick={() => {
                    handleSelectedCliente(client);
                    handleModalClose();
                  }}
                >
                  <p>{client.razon_social}</p>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
    </CardToggle>
  );
}
export default DatosCliente;
