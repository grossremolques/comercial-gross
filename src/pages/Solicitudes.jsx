import TableComponent from "../components/TableComponent";
import { useState, useEffect } from "react";
import GoogleSheet from "google-sheet-package";
import { Input } from "../components/Forms";
import Button from "../components/Buttons";
import { useForm } from "react-hook-form";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
export default function Solicitudes() {
    const {
        register,
        handleSubmit,
      } = useForm({
        defaultValues: {},
      });
  const [dataFiltered, setDataFiltered] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
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
      name: "Trazabilidad",
      width: "150px",
      selector: (row) =>
        row.trazabilidad
          .toString()
          .replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3"),
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => row.cliente,
      sortable: true,
    },
    {
      name: "Modelo",
      selector: (row) => row.modelo,
      sortable: true,
    },
    {
      name: "Registrado por",
      selector: (row) => row.registrado_por,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];
  const conditionalRowStyles = [
    {
      when: (row) => row.status === "Aceptado", //lime-100
      style: {
        backgroundColor: "#ecfccb",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "Rechazado",
      style: {
        backgroundColor: "#fee2e2", //Red-100
        color: "#b91c1c",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
  const ss_registro = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_CAMBIO,
    rowHead: 1,
    nameSheet: "Registro",
  });
  const getSolicitudes = async () => {
    const res = await ss_registro.getData();
    setSolicitudes(res.reverse());
    setDataFiltered(res);
  };
  useEffect(() => {
    getSolicitudes();
  }, []);
  const handleFilter = (data) => {
    data.trazabilidadQuery = data.trazabilidadQuery.replace(".", "").replace("-", "")
    console.log(data);
    setDataFiltered(solicitudes.filter(item => {
        return item.trazabilidad.toString().includes(data.trazabilidadQuery) &&
        item.cliente.toLowerCase().includes(data.clienteQuery.toLowerCase()) &&
        item.modelo.toLowerCase().includes(data.modeloQuery.toLowerCase())
      }))
  };
  return (
    <div className="w-full mx-auto px-20">
    <h1 className="font-medium text-3xl text-center text-gray-700 mb-10">
      Solicitudes de Cambio
    </h1>
    <form onSubmit={handleSubmit(handleFilter)} className="flex gap-1 my-6 w-full">
        <Input
            placeholder={"Cliente"}
            {...register("clienteQuery")}
          />
           <Input
            placeholder={"Trazabilidad"}
            {...register("trazabilidadQuery")}
          />
           <Input
            placeholder={"Modelo"}
            {...register("modeloQuery")}
          />
          <Button className={'w-130'} type={'submit'} variant={'primary'}>
            <div className="flex gap-1 justify-center">
                <FunnelIcon width={'16px'}/>
                Filtrar
            </div>
            
            </Button>
            <Button className={'w-130'} type={'submit'} variant={'success'}>
            <NavLink to={'/solicitar-cambio'}>Crear Solictud</NavLink>
            </Button>
    </form>
      <TableComponent
        data={dataFiltered}
        columns={columns}
        handleOnRowClick={(data) => console.log(data)}
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
}
