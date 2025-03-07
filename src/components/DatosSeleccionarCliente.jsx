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
function DatosSeleccionarCliente() {
  const [disabled, setDisabled] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const { clientes, getClientes, setClient, client } = useClientes();
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
    if (clientes.length > 0) {
      const updateClient = clientes.find((item) => item.id === client.id);
      if (updateClient) {
        handleSelectedCliente(updateClient);
      }
    }
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
    setClient({
      id: "",
      razon_social: "",
      cuit: "",
      cod_postal: "",
      localidad: "",
      provincia: "",
      domicilio: "",
      tel: "",
      email: "",
    });
    setValue("razon_social", "");
    handleModalShow("modal-cliente");
  };
  const handleEditClient = () => {
    if (client.cuit != "") {
      handleModalShow("modal-cliente");
    }
  };
  function handleSelectedCliente(data) {
    setValue("razon_social", data.razon_social, { shouldDirty: true });
    setValue("id_cliente", data.id, { shouldDirty: true });
    setValue("selectedCliente", data, { shouldDirty: true });
    setClient(data);
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
      <div className="flex gap-2 justify-between">
        <Input
          label={"Seleccionar cliente"}
          placeholder={"Buscar Cliente"}
          onClick={() => handleModalShow("findClients")}
          {...register("razon_social", {
            required: {
              value: "Debe seleccionar un cliente",
              message: "Debe seleccionar un cliente",
            },
          })}
        />
        {/* <div className="flex gap-2">
          <Button
            className="self-end"
            icon={<PlusIcon className="w-4" />}
            variant={"primaryOutline"}
            hidden_text
            text="Agregar Modelo"
            onClick={handleAddClient}
          />
          <Button
            className="self-end"
            icon={<PencilIcon className="w-4" />}
            variant={"secondaryOutline"}
            hidden_text
            text="EditarModelo"
            onClick={handleEditClient}
          />
        </div> */}
      </div>

      {errors.razon_social && (
        <TextInvalidate message={errors.razon_social.message} />
      )}
      <div className="mt-4 columns-2">
        <DataField
          icon={<IdentificationIcon width={"16px"} />}
          label={"CUIT"}
          value={client?.cuit}
        />
        <DataField
          icon={<PhoneIcon width={"16px"} />}
          label={"Telefono"}
          value={client?.tel}
        />
        <DataField
          icon={<EnvelopeIcon width={"16px"} />}
          label={"Email"}
          value={client?.email}
        />

        <DataField
          icon={<MapPinIcon width={"16px"} />}
          label={"Localidad"}
          value={client?.localidad}
        />

        <DataField
          icon={<MapIcon width={"16px"} />}
          label={"Provincia"}
          value={client?.provincia}
        />
        <DataField
          icon={<HashtagIcon width={"16px"} />}
          label={"Codigo postal"}
          value={client?.cod_postal}
        />
      </div>
      <DataField
        icon={<HomeIcon width={"16px"} />}
        label={"Domicilio"}
        value={client?.domicilio}
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
            label="Buscar Cliente"
            no_label
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
export default DatosSeleccionarCliente;
