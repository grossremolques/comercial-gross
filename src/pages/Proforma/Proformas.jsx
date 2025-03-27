import TableComponent from "../../components/Generales/TableComponent";
import { useState, useEffect } from "react";
import { Input } from "../../components/Generales/Forms";
import Button from "../../components/Generales/Buttons";
import { useForm } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ss_proforma } from "../../API/backend";
import { useClientes } from "../../context/ClientesContext";
import { useAtributos } from "../../context/Attributes/AtributosContext";
import { ss_formas_pago, ss_producto } from "../../API/backend";
import { useLocation } from "react-router-dom";
import { NoDataComponent } from "../../components/DataField";
export default function Proformas() {
  const STORAGE_KEY = "data-filter-proformas";
  const filterData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  const location = useLocation();
  const { clientes } = useClientes();
  const { modelos } = useAtributos();
  const [pagos, setPagos] = useState([]);
  const [productos, setProductos] = useState([]);

  const navigate = useNavigate();
  const { register, watch } = useForm({
    defaultValues: filterData,
  });

  const watchedValues = watch();
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues));
  }, [watchedValues]);

  const [dataFiltered, setDataFiltered] = useState([]);
  const [proformas, setProformas] = useState([]);

  const columns = [
    {
      name: "Id",
      width: "65px",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Fecha",
      width: "110px",
      selector: (row) => row.fecha_creacion,
      sortable: true,
    },

    {
      name: "Cliente",
      width: "260px",
      selector: (row) => row.selectedCliente?.razon_social,
      sortable: true,
    },
    {
      name: "Modelo",
      selector: (row) => {
        let modelo = row.modelos?.map(item => `${item.cantidad} ${item.modelo}`)
        return modelo?.join('\n\n');
      },
      cell: (row) => (
        <div>
          {row.modelos?.map((item, index) => (
            <div key={index} style={{ marginBottom: "8px" }}>
              {item.cantidad} {item.modelo}
            </div>
          ))}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Registrado por",
      width: "150px",
      selector: (row) => row.registrado_por,
      sortable: true,
    },
    {
      name: "Precio",
      width: "150px",
      selector: (row) =>
        row.precio.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        }),
      sortable: true,
    },
  ];
  const getPagos = async () => {
    try {
      const dataPagos = await ss_formas_pago.getData();
      setPagos(dataPagos);
    } catch (e) {
      console.log(e);
    }
  };
  const getProductos = async () => {
    try {
      const dataProductos = await ss_producto.getData();
      setProductos(dataProductos);
    } catch (e) {
      console.log(e);
    }
  };
  const getProformas = async () => {
    try {
      const dataProformas = await ss_proforma.getData();
      const clients = [];
      const formaPago = [];
      const products = [];
      dataProformas.map((item) => {
        clients.push(clientes.find((cliente) => cliente.id == item.id_cliente));
        formaPago.push(pagos.filter((pago) => pago.id_factura === item.id));
        products.push(productos.filter((product) => product.id_proforma === item.id));
      });
      clients.map((cliente) => {
        dataProformas.map((proforma) => {
          if (cliente?.id == proforma.id_cliente) {
            proforma["selectedCliente"] = cliente;
          }
        });
      });
      formaPago.map((pago) => {
        dataProformas.map((proforma) => {
          if (pago.length > 0 && pago[0].id_factura == proforma.id) {
            proforma["formaPago"] = pago;
          }
        });
      });
      products.map((product) => {
        dataProformas.map((proforma) => {
          if (product.length > 0 && product[0].id_proforma == proforma.id) {
            proforma["modelos"] = product;
          }
        });
      });
      setProformas(dataProformas);
      setDataFiltered(dataProformas.reverse());
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPagos();
    getProductos();
  }, []);
  useEffect(() => {
    if (clientes.length > 0 && productos.length>0 && pagos.length>0) getProformas();
  }, [clientes, productos, pagos]);
  const handleFilter = () => {
    const data = watch();
    setDataFiltered(
      proformas.filter((item) => {
        return (
          item.selectedCliente?.razon_social
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
  useEffect(() => {
    if (location.state?.refresh) {
      getProformas(); // Llamada a la API para obtener los datos más recientes
    }
  }, [location.state]);
  useEffect(() => {
    handleFilter();
  }, [proformas]);
  return (
    <div className="w-full mx-auto">
      <h1 className="font-medium text-3xl text-center text-gray-700 mb-10">
        Facturas Proformas
      </h1>
      <form className="flex gap-1 my-6 w-full justify-between">
        <div className="w-auto flex gap-1">
          <Input
            label={"Cliente"}
            no_label
            placeholder={"Cliente"}
            {...register("clienteQuery")}
            onInput={handleFilter}
          />
          <Input
            label={"MOdelo"}
            no_label
            placeholder={"Modelo"}
            {...register("modeloQuery")}
            onInput={handleFilter}
          />
        </div>

        <Button
          className={"min-w-50"}
          type="button"
          variant="success"
          text={<NavLink to={"/new-proforma"}>Crear Proforma</NavLink>}
          icon={<PlusIcon className="w-4" />}
        />
      </form>
      <TableComponent
        data={dataFiltered}
        columns={columns}
        handleOnRowClick={openProforma}
        noDataComponent={
          <NoDataComponent
            title={"No hay Proformas"}
            text={
              "Puedes agregar proformas haciendo click en el boton de abajo"
            }
          >
            <Button
              className={"min-w-50"}
              type="button"
              variant="success"
              text={<NavLink to={"/new-proforma"}>Crear Proforma</NavLink>}
              icon={<PlusIcon className="w-4" />}
            />
          </NoDataComponent>
        }
      />
    </div>
  );
}
