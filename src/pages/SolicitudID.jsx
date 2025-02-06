import { useLocation } from "react-router-dom";
import GoogleSheet from "google-sheet-package";
import { useEffect, useState } from "react";
import {
  ClipboardDocumentIcon,
  PrinterIcon,
  UserIcon,
  TruckIcon,
  ArchiveBoxIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import Button from "../components/Buttons";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Cards";
import { DataField } from "../components/DataField";
export function SolcitudID() {
  const navigate = useNavigate();
  const [cambios, setCambios] = useState([]);
  const location = useLocation();
  const { solicitudData } = location.state || {};
  const id = location.pathname.replace("/solicitud/", "");
  if (!solicitudData) {
    console.log(id);
  }
  /* Consultas */
  const ss_detalles = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_CAMBIO,
    rowHead: 1,
    nameSheet: "Detalle",
  });
  const getDetalles = async (id) => {
    try {
      const res = await ss_detalles.getData();
      const detalles = res.filter((item) => {
        return item.id_orden == id;
      });
      setCambios(detalles);
    } catch (err) {
      console.error("Error al obtener detalles:", err);
    }
  };
  useEffect(() => {
    getDetalles(id);
    // eslint-disable-next-line
  }, []);
  const handleOpenPDF = () => {
    solicitudData["datosCambio"] = cambios;
    solicitudData["trazabilidadStr"] = solicitudData.trazabilidad
      .toString()
      .replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3");
    navigate("/pdf-cambio", { state: { pdfData: solicitudData } });
  };
  return (
    <>
      {cambios.length > 0 && (
        <div className=" lg:w-3/4 xl:w-1/2 mx-auto">
          <Card className={'px-6 mb-4'}>
            <h2 className="font-medium text-xl mb-5">Datos de la Orden</h2>
            <DataField
              icon={<ClipboardDocumentIcon width={"16px"} />}
              label={"ID"}
              value={solicitudData.id}
            />
            <DataField
              icon={<UserIcon width={"16px"} />}
              label={"Cliente"}
              value={solicitudData.cliente}
            />
            <DataField
              icon={<TruckIcon width={"16px"} />}
              label={"Trazabilidad"}
              value={solicitudData.trazabilidad}
            />
            <DataField
              icon={<ArchiveBoxIcon width={"16px"} />}
              label={"Modelo"}
              value={solicitudData.modelo}
            />
            <DataField
              icon={<CalendarDaysIcon width={"16px"} />}
              label={"Fecha de Creación"}
              value={solicitudData.fecha_creacion}
            />
          </Card>
          <Card className={'px-6'}>
            <h2 className="font-medium text-xl mb-5">Modificaciones</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Atributo
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Valor Anterior
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Valor Nuevo
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {cambios.map((item, index) => {
                    return (
                      <tr key={`${index}-${item.atributo}`}>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          {item.atributo}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {item.valor_actual}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {item.valor_nuevo}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
          <Button
            className={"mt-4 float-end"}
            type={"submit"}
            variant={"primary"}
            onClick={handleOpenPDF}
          >
            <div className="flex gap-1 justify-center">
              <PrinterIcon width={"16px"} />
              Imprimir
            </div>
          </Button>
        </div>
      )}
    </>
  );
}
