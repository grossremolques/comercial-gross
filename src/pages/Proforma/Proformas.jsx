import TableComponent from "../../components/TableComponent";
import { useState, useEffect } from "react";
import { Input } from "../../components/Forms";
import Button from "../../components/Buttons";
import { useForm } from "react-hook-form";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ss_proforma } from "../../API/backend";
import { useClientes } from "../../context/ClientesContext";
export default function Proformas() {
  const { clientes, getClientes } = useClientes();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {},
  });
  const [dataFiltered, setDataFiltered] = useState([]);
  const [proformas, setProformas] = useState([]);
  const columns = [
    {
      name: "Id",
      width: "80px",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Fecha",
      width: "120px",
      selector: (row) => row.fecha_creacion,
      sortable: true,
    },

    {
      name: "Cliente",
      width: "270px",
      selector: (row) => row.cliente?.razon_social,
      sortable: true,
    },
    {
      name: "Modelo",
      selector: (row) => row.modelo,
      sortable: true,
    },
    {
      name: "Registrado por",
      width: "180px",
      selector: (row) => row.registrado_por,
      sortable: true,
    },
    {
      name: "Precio",
      width: "180px",
      selector: (row) =>
        row.precio.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        }),
      sortable: true,
    },
  ];

  const getProformas = async () => {
    try {
      const dataProformas = await ss_proforma.getData();
      const clients = [];
      dataProformas.map((item) => {
        clients.push(clientes.find((cliente) => cliente.id == item.id_cliente));
      });
      clients.map((cliente) => {
        dataProformas.map((proforma) => {
          if (cliente.id == proforma.id_cliente) {
            proforma["cliente"] = cliente;
          }
        });
      });
      setProformas(dataProformas.reverse());
      setDataFiltered(dataProformas.reverse());
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getClientes();
  }, []);
  useEffect(() => {
    if (clientes.length > 0) getProformas();
  }, [clientes]);
  const handleFilter = (data) => {
    data.trazabilidadQuery = data.trazabilidadQuery
      .replace(".", "")
      .replace("-", "");
    console.log(data);
    setDataFiltered(
      proformas.filter((item) => {
        return (
          item.trazabilidad.toString().includes(data.trazabilidadQuery) &&
          item.cliente
            .toLowerCase()
            .includes(data.clienteQuery.toLowerCase()) &&
          item.modelo.toLowerCase().includes(data.modeloQuery.toLowerCase())
        );
      })
    );
  };
  const openProforma = (data) => {
    navigate(`/proforma/${data.id}`, { state: { proformaData: data } });
  };
  return (
    <div className="w-full mx-auto">
      <h1 className="font-medium text-3xl text-center text-gray-700 mb-10">
        Facturas Proformas
      </h1>
      <form
        onSubmit={handleSubmit(handleFilter)}
        className="flex gap-1 my-6 w-full"
      >
        <Input placeholder={"Cliente"} {...register("clienteQuery")} />
        <Input
          placeholder={"Trazabilidad"}
          {...register("trazabilidadQuery")}
        />
        <Input placeholder={"Modelo"} {...register("modeloQuery")} />
        <Button className={"w-130"} type={"submit"} variant={"primary"}>
          <div className="flex gap-1 justify-center">
            <FunnelIcon width={"16px"} />
            Filtrar
          </div>
        </Button>
        <Button className={"w-130"} type={"submit"} variant={"success"}>
          <NavLink to={"/new-proforma"}>Crear Proforma</NavLink>
        </Button>
      </form>
      <TableComponent
        data={dataFiltered}
        columns={columns}
        handleOnRowClick={openProforma}
      />
    </div>
  );
}
