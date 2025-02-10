import { Input, Label, TextInvalidate } from "./Forms";
import { BuscarCliente } from "../templates/BuscarClientes";
import { UserGroupIcon, PlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { useModal } from "../context/ModalContext";
import GoogleSheet from "google-sheet-package";
import { useClientes } from "../context/ClientesContext";
import Button from "./Buttons";
export function Cliente({ register, errors, setValue, setSelectClient }) {
  const { clientes, getClientes } = useClientes();
  //const [clientes, setClientes] = useState([]);
  //const [selectClient, setSelectClient] = useState({});
  const { handleModalShow, handleModalClose } = useModal();

  /* const ss_clientes = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_CLIENTES,
    rowHead: 1,
    nameSheet: "Registro",
  });
  const getClients = async () => {
    const res = await ss_clientes.getData();
    setClientes(res);
  }; */
  useEffect(() => {
    getClientes();
  }, []);
  
  const handleAddClient = () => {
    console.log('➕ Add client')
  };
  const handleEditClient = () => {
    console.log('✏️ Edit client')
  };
  return (
    <>
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
      <Button
        onClick={handleAddClient}
      >
        <PlusIcon width={"20px"} />
      </Button>
      <Button
        onClick={handleEditClient}
        variant="primaryOutline"
      >
        <PencilIcon width={"20px"} />
      </Button>
      </div>
      {errors.razon_social && <TextInvalidate message={errors.razon_social.message} />}
      <Modal
        modalId={"findClients"}
        title={"Buscar Cliente"}
        variant="primary"
        icon={<UserGroupIcon width={"24px"} />}
      >
        <div className="mt-4">
          <BuscarCliente
            data={clientes}
            setSelectClient={setSelectClient}
            handleModalClose={handleModalClose}
          />
        </div>
      </Modal>
    </>
  );
}
