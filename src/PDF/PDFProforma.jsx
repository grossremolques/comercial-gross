import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Svg,
  Path,
} from "@react-pdf/renderer";
import Logo from "../assets/Logos/logoGross.png";
import LogoISO from "../assets/Logos/LogoISO9001.png";
import "../fonts";
import { useLocation } from "react-router-dom";
import Button from "../components/Generales/Buttons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { ss_empleados } from "../API/backend";
import { useAtributos } from "../context/Attributes/AtributosContext";
import { useForm } from "react-hook-form";
const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontFamily: "ChakraPetch",
    fontSize: 10,
    color: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5 15",
    borderBottom: "1px solid #ccc",
  },
  logo: {
    height: 40,
    resizeMode: "contain",
    alignSelf: "flex-start",
  },
  body: {
    marginLeft: "30px",
    marginRight: "30px",
    position: "relative",
  },
  title: {
    color: "#333",
    fontSize: 12,
    marginTop: "20px",
    textDecoration: "underline",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  tableSubtitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 3,
  },
  rowClientes: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 5,
  },
  cellData: {
    flex: 1,
    borderBottom: "1px solid #ddd",
  },
  rowCaracteristics: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
    marginBottom: 2,
  },
  precio: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    marginBottom: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  spacing: { flex: 1, borderBottom: "1px dotted #666", marginHorizontal: 4 },
  clausula: {
    fontSize: 9,
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 10,
  },
  footer: {
    textAlign: "center",
    fontSize: 9,
    borderTop: "1px solid #ddd",
    paddingTop: 10,
  },
});

export function PDFProforma() {
  const { modelos, getModelos } = useAtributos();
  const location = useLocation();
  const { pdfData } = location.state || {};
  const [proformaValues, setProformaValues] = useState(false);
  const [vendedor, setVendedor] = useState([]);
  const { register, watch } = useForm();
  useEffect(() => {
    getModelos();
    getVendedor(pdfData.vendedor);
  }, []);
  useEffect(() => {
    getProformaValues();
  }, [modelos]);
  function getProformaValues() {
    if (modelos.length > 0) {
      pdfData.modelos.forEach((item) => {
        const completeModeloData = modelos.find(
          (elem) => elem.modelo.value === item.modelo
        );
        item.dataComplete = completeModeloData;
      });
      setProformaValues(true);
    }
  }
  const Paragrap = ({ modelo }) => {
    return (
      <Text style={{ marginTop: 7, marginBottom: 4 }}>
        <Text
          style={{ fontWeight: "bold" }}
        >{`${modelo.cantidad} ${modelo.dataComplete.tipo.value} ${modelo.dataComplete.carrozado.value}`}</Text>
        , nuevo, marca GROSS, material COMÚN;{" "}
        {modelo.dataComplete.tipo.value != "Carrocería" && (
          <>
            <Text>con configuración de ejes </Text>
            <Text style={{ fontWeight: "bold" }}>
              {modelo.dataComplete.ejes.value}
            </Text>
            , ejes tubulares, mazas tipo disco, y campanas de freno de 8
            pulgadas;{" "}
            <Text style={{ fontWeight: "bold" }}>
              {modelo.dataComplete.llantas_acero.value} llantas de ACERO de 9.00
              × 22.5 pulgadas
            </Text>
            ; suspensión mecánica; sistema de frenos neumático ABS
          </>
        )}
        luces reglamentarias LED de 24 [V]. Con chasis color{" "}
        <Text style={{ fontWeight: "bold" }}>Negro Titanium Gross</Text> y
        carrozado color <Text>a elección</Text>.
      </Text>
    );
  };
  const getVendedor = async (alias) => {
    try {
      const res = await ss_empleados.getDataById("alias", alias);
      setVendedor(res);
    } catch (error) {
      console.error(error);
    }
  };
  const ColumnDetails = ({ modelo, par = true }) => {
    for (let attr in modelo) {
      if (modelo[attr] === "N/A" || modelo[attr] === 0) delete modelo[attr];
    }
    const keys = Object.keys(modelo);
    const filtered = par
      ? keys.filter((_, index) => index % 2 === 0)
      : keys.filter((_, index) => index % 2 !== 0);
    return (
      <>
        {filtered.map(
          (attr) =>
            modelo.dataComplete[attr] &&
            attr != "modelo" && (
              <View style={styles.rowCaracteristics} key={attr}>
                <Text
                  style={{
                    textTransform: "capitalize",
                    width: 150,
                  }}
                >
                  {attr.replace(/_/g, " ")}:
                </Text>
                <Text style={{ fontWeight: "bold" }}>{modelo[attr]}</Text>
              </View>
            )
        )}
      </>
    );
  };
  const Toggle = () => {
    return (
      <label
        htmlFor="MostartCaracteristicas"
        className="group relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-green-500"
      >
        <input
          type="checkbox"
          id="MostartCaracteristicas"
          checked={watch(`show`) || false}
          className="peer sr-only"
          {...register("show")}
        />

        <span className="absolute inset-y-0 start-0 m-1 grid size-6 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </span>
      </label>
    );
  };
  return (
    <>
      {proformaValues > 0 && (
        <>
          <div className="w-full flex items-center justify-between mb-4">
            <div className="flex gap-4 border border-slate-300/60 rounded-2xl px-4 py-2 font-medium text-gray-700 shadow">
              <p>Ocultar caracteríticas en el boleto</p>
              <Toggle />
            </div>
            <Button
              className={"min-w-40"}
              type="button"
              variant="primary"
              text={<NavLink to={"/proformas"}>Ir al inicio</NavLink>}
            />
          </div>
          <PDFViewer width={"100%"} height={"800px"}>
            <Document>
              <Page size={"A4"} style={styles.page}>
                <View style={styles.header}>
                  <Image src={Logo} style={styles.logo} />
                  <Image src={LogoISO} style={styles.logo} />
                </View>
                <View style={styles.body}>
                  <Text style={styles.title}>FACTURA PROFORMA</Text>
                  {/* Cliente */}
                  <View style={{ marginBottom: 15 }}>
                    <Text style={styles.tableSubtitle}>Datos del Cliente:</Text>
                    <View style={styles.rowClientes}>
                      <Text style={{ marginRight: "10px" }}>Razón Social:</Text>
                      <Text style={styles.cellData}>
                        {pdfData.selectedCliente.razon_social}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 0,
                        width: "100%",
                      }}
                    >
                      <View style={[styles.rowClientes, { width: "50%" }]}>
                        <Text style={{}}>CUIT:</Text>
                        <Text style={styles.cellData}>
                          {pdfData.selectedCliente.cuit}
                        </Text>
                      </View>
                      <View style={[styles.rowClientes, { width: "50%" }]}>
                        <Text style={{}}>Código postal:</Text>
                        <Text style={styles.cellData}>
                          {pdfData.selectedCliente.cod_postal}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.rowClientes}>
                      <Text style={{ marginRight: "10px" }}>Domicilio:</Text>
                      <Text style={styles.cellData}>
                        {pdfData.selectedCliente.domicilio}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 0,
                        width: "100%",
                      }}
                    >
                      <View style={[styles.rowClientes, { width: "50%" }]}>
                        <Text style={{}}>Localidad:</Text>
                        <Text style={styles.cellData}>
                          {pdfData.selectedCliente.localidad}
                        </Text>
                      </View>
                      <View style={[styles.rowClientes, { width: "50%" }]}>
                        <Text style={{}}>Provincia:</Text>
                        <Text style={styles.cellData}>
                          {pdfData.selectedCliente.provincia}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 0,
                        width: "100%",
                      }}
                    >
                      <View style={[styles.rowClientes, { width: "50%" }]}>
                        <Text style={{}}>Telefono:</Text>
                        <Text style={styles.cellData}>
                          {pdfData.selectedCliente.tel}
                        </Text>
                      </View>
                      <View style={[styles.rowClientes, { width: "50%" }]}>
                        <Text style={{}}>Email:</Text>
                        <Text style={styles.cellData}>
                          {pdfData.selectedCliente.email}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ marginBottom: 15 }}>
                    {pdfData.modelos.map((modelo, index) => (
                      <View key={`${modelo}${index}`}>
                        <Paragrap modelo={modelo} />
                        {!watch(`show`) && (
                          <>
                            <Text style={styles.tableSubtitle}>
                              Características:
                            </Text>
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <View style={{ width: "50%" }}>
                                <ColumnDetails modelo={modelo} par={false} />
                              </View>
                              <View style={{ width: "50%" }}>
                                <ColumnDetails modelo={modelo} />
                              </View>
                            </View>
                          </>
                        )}
                      </View>
                    ))}
                  </View>
                  <View style={styles.precio}>
                    <View style={styles.row}>
                      <Text>Precio:</Text>
                      <Text style={styles.spacing}></Text>
                      <Text>
                        {pdfData.precio.toLocaleString("es-AR", {
                          style: "currency",
                          currency: "ARS",
                        })}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text>I.V.A:</Text>
                      <Text style={styles.spacing}></Text>
                      <Text>
                        {parseFloat(pdfData.iva).toLocaleString("es-AR", {
                          style: "currency",
                          currency: "ARS",
                        })}
                      </Text>
                    </View>
                    <View style={[styles.row, { fontWeight: "bold" }]}>
                      <Text>Total:</Text>
                      <Text style={styles.spacing}></Text>
                      <Text>
                        {parseFloat(pdfData.total).toLocaleString("es-AR", {
                          style: "currency",
                          currency: "ARS",
                        })}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.tableSubtitle}>Forma de Pago:</Text>
                      {pdfData.formaPago.map((item) =>
                        item.forma_pago != "Unidad usada" ? (
                          <View
                            key={item.id_factura}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 10,
                            }}
                          >
                            <View
                              key={item.id_factura}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 10,
                              }}
                            >
                              <Text>Forma de Pago: </Text>
                              <Text style={{ fontWeight: "bold" }}>
                                {item.forma_pago}
                              </Text>
                            </View>
                            <View
                              key={item.id_factura}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 10,
                              }}
                            >
                              <Text>Metodo de pago:</Text>
                              <Text style={{ fontWeight: "bold" }}>
                                {item.metodo_pago}
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <View
                            key={item.id_factura}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 10,
                            }}
                          >
                            <Text>Toma Unidad usada: </Text>
                            <Text style={{ fontWeight: "bold" }}>
                              {item.unidad_usada}
                            </Text>
                          </View>
                        )
                      )}
                    </View>
                    <View>
                      <Text style={styles.tableSubtitle}>Observaciones:</Text>
                      <Text style={{ marginBottom: 3 }}>
                        {pdfData.nota || "Sin Observaciones"}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: 15,
                    left: 0,
                    width: "100%",
                  }}
                >
                  <View style={styles.clausula}>
                    <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
                      El origen del bien consignado en la presente factura
                      proforma responde al requisito de origen nacional en
                      virtud de lo dispuesto en la resolución Nº 94/2004
                      articulo Nº 5 del Ministerio de economía y Producción –
                      Subsecretaria de la pequeña y mediana empresa y desarrollo
                      social
                    </Text>
                    <Text style={{ marginBottom: 3 }}>
                      - Hacemos constar, con carácter de declaración jurada, que
                      los bienes detallados en el presente documento son de
                      Producción Nacional.
                    </Text>
                    <Text style={{ marginBottom: 3 }}>
                      - Los formularios para la inscripción de la unidad, no
                      están incluidos en el valor arriba detallado
                    </Text>
                    <Text style={{ marginBottom: 3 }}>
                      - Esta unidad quedará congelado al momento del pago total
                      de la misma, el valor podrá variar sin previo aviso
                    </Text>
                    <View
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        marginBottom: 20,
                      }}
                    >
                      <Text>P/Suc. De Emilio Gross SRL.</Text>
                      <Text>{`${vendedor.nombre} ${vendedor.apellido}`}</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        fontSize: "8",
                        backgroundColor: "#f6f3f4",
                        padding: "3",
                      }}
                    >
                      <Text>
                        Asesor Comercial:{" "}
                        {`${vendedor.nombre} ${vendedor.apellido}`}
                      </Text>
                      <Text>Email: {vendedor.email_empresa}</Text>
                      <Text>Contacto: {vendedor.contacto}</Text>
                    </View>
                  </View>
                  <View style={styles.footer}>
                    <Text>Sucesores de Emilio Gross S.R.L.</Text>
                    <Text>
                      República de Entre Ríos 1880.– General Ramírez. (3164) –
                      Entre Ríos. – Argentina.
                    </Text>
                    <Text>
                      Tel./Fax: +54 (0343) 4902101/4901238 – E-mail:
                      info@grossremolques.com –Web: www.grossremolques.com
                    </Text>
                  </View>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </>
      )}
    </>
  );
}
