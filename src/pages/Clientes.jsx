import TableComponent from "../components/Generales/TableComponent";
import { useState, useEffect } from "react";
import { Input } from "../components/Generales/Forms";
import Button from "../components/Generales/Buttons";
import { useForm } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useClientes } from "../context/ClientesContext";
import { NoDataComponent } from "../components/DataField";
import FormularioCliente from "../templates/FormularioCliente";
import { useModal } from "../context/ModalContext";
export default function CLientes() {
  const STORAGE_KEY_FILTER = "data_cliente_filter";
  const filterData = JSON.parse(localStorage.getItem(STORAGE_KEY_FILTER)) || {};
  const [dataFiltered, setDataFiltered] = useState([]);
  const { clientes, getClientes, setClient } = useClientes();
  const { handleModalClose, handleModalShow } = useModal();
  useEffect(() => {
    getClientes();
  }, []);
  useEffect(() => {
    setDataFiltered(clientes);
    handleFilter();
  }, [clientes]);
  const location = useLocation();

  const navigate = useNavigate();
  const { register, watch } = useForm({
    defaultValues: filterData,
  });

  const watchedValues = watch();
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FILTER, JSON.stringify(watchedValues));
  }, [watchedValues]);

  const columns = [
    {
      name: "Id",
      width: "80px",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Razon Social",
      selector: (row) => row.razon_social,
      sortable: true,
    },

    {
      name: "CUIT",
      width: "180px",
      selector: (row) => row.cuit,
      sortable: true,
    },
    {
      name: "Telefono",
      width: "180px",
      selector: (row) => row.tel,
      sortable: true,
    },
    {
      name: "Provincia",
      width: "220px",
      selector: (row) => row.provincia,
      sortable: true,
    },
  ];

  const handleFilter = () => {
    const data = watch();
    setDataFiltered(
      clientes.filter((item) => {
        return item.razon_social
          .toLowerCase()
          .includes(data.clienteQuery.toLowerCase());
      })
    );
  };
  const handleEditClient = (data) => {
    setClient(data);
    handleModalShow("modal-cliente");
    //navigate(`/cliente/${data.id}`, { state: { proformaData: data } });
  };
  useEffect(() => {
    if (location.state?.refresh) {
      getClientes(); // Llamada a la API para obtener los datos más recientes
    }
  }, [location.state]);
  const handleAddClient = () => {
    /* Abrir Modal con formulario vacío para Agregar nuevo cliente --> `FormularioCliente`*/
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
    }); // Configura un cliente vacío
    handleModalShow("modal-cliente"); // Abre el modal
  };
  return (
    <div className="w-full mx-auto">
      <h1 className="font-medium text-3xl text-center text-gray-700 mb-10">
        Clientes
      </h1>
      <form className="flex gap-1 my-6 w-full justify-between">
        <div className="w-1/2 flex gap-1">
          <Input
            label={"Nombre de Cliente"}
            no_label
            placeholder={"Nombre de Cliente"}
            {...register("clienteQuery")}
            onInput={handleFilter}
          />
        </div>

        <Button
          className={"min-w-50"}
          type="button"
          variant="yellow"
          text="Nuevo Cliente"
          icon={<PlusIcon className="w-4" />}
          onClick={handleAddClient}
        />
      </form>
      <TableComponent
        data={dataFiltered}
        columns={columns}
        handleOnRowClick={handleEditClient}
        noDataComponent={
          <NoDataComponent
            title={"No hay Clientes"}
            text={"Puedes agregar clientes haciendo click en el boton de abajo"}
          >
            <Button
              className={"min-w-50"}
              type="button"
              variant="success"
              text="Nuevo Cliente"
              icon={<PlusIcon className="w-4" />}
              onClick={handleAddClient}
            />
          </NoDataComponent>
        }
      />
      <FormularioCliente />
    </div>
  );
}
