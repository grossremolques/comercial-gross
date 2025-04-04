import TableComponent from "../../components/Generales/TableComponent";
import { useState, useEffect } from "react";
import { Input } from "../../components/Generales/Forms";
import Button from "../../components/Generales/Buttons";
import { useForm } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { ss_solicitudes } from "../../API/backend";
import { NoDataComponent } from "../../components/DataField";
import { useUnidadesGross } from "../../context/UnidadesGrossContext";
import { ss_cambios_detalle } from "../../API/backend";
export default function Solicitudes() {
  const STORAGE_KEY = "data-filter-solicitudes";
  const filterDataSolicitudes =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  const location = useLocation();
  const { unidadesGross, getUnidadesGross } = useUnidadesGross();
  const navigate = useNavigate();
  const { register, watch } = useForm({
    defaultValues: filterDataSolicitudes,
  });
  const watchedValues = watch();
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues));
  }, [watchedValues]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [detalles, setDetalles] = useState([]);
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
      selector: (row) =>
        row.selectUnidad?.gestoria?.selectedCliente?.razon_social,
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
      name: "Status",
      width: "120px",
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
  useEffect(() => {
    getUnidadesGross();
  }, []);
  useEffect(() => {
    if (unidadesGross.length > 0) {
      getDetalles();
      getSolicitudes();
    }
  }, [unidadesGross]);
  const getDetalles = async () => {
    try {
      const res = await ss_cambios_detalle.getData();
      setDetalles(res);
    } catch (err) {
      console.error("Error al obtener detalles:", err);
    }
  };
  const getSolicitudes = async () => {
    try {
      const dataSolicitudes = await ss_solicitudes.getData();
      dataSolicitudes.forEach((item) => {
        const dataUnidadGross = unidadesGross.find(
          (unidad) => unidad.trazabilidad === item.trazabilidad
        );
        if (dataUnidadGross) {
          item["selectUnidad"] = dataUnidadGross;
        }
        const dataDetalles = detalles.filter(
          (detalle) => detalle.id_orden === item.id
        );
        if (dataDetalles) {
          item["modificaciones"] = dataDetalles;
        }
      });
      setSolicitudes(dataSolicitudes.reverse());
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setDataFiltered(solicitudes);
  }, [solicitudes]);

  const handleFilter = () => {
    const data = watch();
    data.trazabilidadQuery = data.trazabilidadQuery
      .replace(".", "")
      .replace("-", "");
    const filter = solicitudes.filter((item) => {
      return (
        item.selectUnidad.trazabilidad.toString().includes(data.trazabilidadQuery) &&
        item.selectUnidad.gestoria?.selectedCliente?.razon_social
          .toLowerCase()
          .includes(data.clienteQuery.toLowerCase()) &&
        item.modelo.toLowerCase().includes(data.modeloQuery.toLowerCase())
      );
    });
    setDataFiltered([...filter]);
  };
  const openSolicitud = (data) => {
    navigate(`/solicitud/${data.id}`, { state: { solicitudData: data } });
  };
  useEffect(() => {
    if (location.state?.refresh) {
      getSolicitudes(); // Llamada a la API para obtener los datos más recientes
    }
  }, [location.state]);
  useEffect(() => {
    handleFilter();
  }, [
    solicitudes,
    watch("clienteQuery"),
    watch("modeloQuery"),
    watch("trazabilidadQuery"),
  ]);
  return (
    <div className="w-full mx-auto">
      <h1 className="font-medium text-3xl text-center text-gray-700 mb-10">
        Solicitudes de Cambio
      </h1>
      <form className="flex my-6 w-full justify-between">
        <div className="flex gap-2 max-w-3xl">
          <Input
            label="Cliente"
            no_label
            type="search"
            placeholder={"Cliente"}
            {...register("clienteQuery")}
          />
          <Input
            label="Trazabilidad"
            no_label
            type="search"
            placeholder={"Trazabilidad"}
            {...register("trazabilidadQuery")}
          />
          <Input
            label="Modelo"
            no_label
            type="search"
            placeholder={"Modelo"}
            {...register("modeloQuery")}
          />
        </div>
        <Button
          className={"min-w-50"}
          type="button"
          variant="success"
          text={<NavLink to={"/solicitar-cambio"}>Nueva Solicitud</NavLink>}
          icon={<PlusIcon className="w-4" />}
        />
      </form>

      <TableComponent
        data={dataFiltered}
        columns={columns}
        handleOnRowClick={openSolicitud}
        conditionalRowStyles={conditionalRowStyles}
        noDataComponent={
          <NoDataComponent
            title={"No hay Solicitudes"}
            text={
              "Puedes agregar solicitudes haciendo click en el boton de abajo"
            }
          >
            <Button
              className={"min-w-50"}
              type="button"
              variant="success"
              text={<NavLink to={"/solicitar-cambio"}>Crear Proforma</NavLink>}
              icon={<PlusIcon className="w-4" />}
            />
          </NoDataComponent>
        }
      />
    </div>
  );
}
