import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import Logo from "../assets/Logos/logoGross.png";
import LogoISO from "../assets/Logos/LogoISO9001.png";
import "../fonts";
import { useLocation } from "react-router-dom";
import Button from "../components/Buttons";
import { NavLink } from "react-router-dom";
import { useAtrubutos } from "../context/Attributes/AtributosContext";
import { useEffect, useState } from "react";
const pdfData = {
  largo: 10300,
  ancho: 2500,
  alto: 1900,
  ejes: "D2-D2",
  puerta_trasera: "N/A",
  capacidad: "N/A",
  piso: "N/A",
  espesor: 0,
  cumbrera_lateral: "Cumbrera p/destape",
  cant_puertas_laterales: 0,
  altura_baranda: 0,
  cajon: 0,
  cilindro: "N/A",
  tara: 0,
  traba_puerta: "N/A",
  cliente: "ZAGO MARINO FERNANDO",
  id_cliente: 9,
  modelo: "Acoplado D2-D2 Tolva",
  fecha_estimada: "20/02/2025",
  vencimiento: "06/03/2025",
  selectFormaPago: "a 150 días",
  precio: 12350000,
  iva: 2593500,
  total: 14943500,
  formaPago: [
    {
      forma_pago: "Contado",
      metodo_pago: "Efectivo",
      id_factura: 4,
      fecha_creacion: "06/02/2025",
    },
    {
      forma_pago: "a 150 días",
      metodo_pago: "e-Cheq",
      id_factura: 4,
      fecha_creacion: "06/02/2025",
    },
  ],
  id: 4,
  registrado_por: "KATHE",
  fecha_creacion: "06/02/2025",
};
const styles = StyleSheet.create({
  page: {
    padding: 15,
    fontFamily: "ChakraPetch",
    fontSize: 11,
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
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rowClientes: { display: "flex", flexDirection: "row", gap: 10, marginBottom: 5 },
  cellData: {
    flex: 1,
    borderBottom: "1px solid #ddd",
  },
  rowCaracteristics: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
  },
  precio: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  spacing: { flex: 1, borderBottom: "1px dotted #666", marginHorizontal: 4 },
  footer: {
    textAlign: "center",
    fontSize: 9,
    borderTop: "1px solid #ddd",
    paddingTop: 10,
  },
});

export function PDFProforma() {
  const { modelos, getModelos } = useAtrubutos();
  const [modelo, setModelo] = useState({});
  const [test, setTest] = useState([]);
  useEffect(() => {
    getModelos();
  }, []);
  useEffect(() => {
    setModelo(modelos.find((item) => item.modelo.value === pdfData.modelo));
    getDefinitions();
  }, [modelos]);
  function getDefinitions() {
    let arr = [];
    for (let item in modelo) {
      if (modelo[item].isInProforma) {
        modelo[item]["attr"] = item;
        arr.push(modelo[item]);
      }
    }
    setTest(arr);
  }
  const Paragrap = () => {
    return (
      <Text style={{ marginBottom: 10 }}>
        Un{" "}
        <Text
          style={{ fontWeight: "bold" }}
        >{`${modelo.tipo.value} ${modelo.carrozado.value}`}</Text>
        , nuevo, marca GROSS, material COMÚN; con configuración de ejes{" "}
        <Text style={{ fontWeight: "bold" }}>{modelo.ejes.value}</Text>, ejes
        tubulares, mazas tipo disco, y campanas de freno de 8 pulgadas;{" "}
        <Text style={{ fontWeight: "bold" }}>
          17 llantas de ACERO de 9.00 × 22.5 pulgadas
        </Text>
        ; suspensión mecánica; sistema de frenos neumático ABS; luces
        reglamentarias LED de 24 [V]. Con chasis color{" "}
        <Text style={{ fontWeight: "bold" }}>Negro Titanium Gross</Text> y
        carrozado color <Text>a elección</Text>.
      </Text>
    );
  };
  //const location = useLocation();
  //location.state || {};
  return (
    <>
      {" "}
      {test.length > 0 && (
        <>
          <div className="w-full text-center mt-5 mb-10">
            <Button className="" variant={"primaryOutline"}>
              <NavLink to={"/solicitudes"}>Ir al inicio</NavLink>
            </Button>
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
                  <View style={{ marginBottom: 20 }}>
                    {/* Cliente */}
                    <Text style={styles.tableSubtitle}>Datos del Cliente:</Text>
                    <View style={styles.rowClientes}>
                      <Text style={{ marginRight: "10px" }}>Razón Social:</Text>
                      <Text
                        style={styles.cellData}
                      >
                        {pdfData.cliente}
                      </Text>
                    </View>
                    <View
                      style={{ display: "flex", flexDirection: "row", gap: 0, width: '100%' }}
                    >
                      <View style={[styles.rowClientes, { width: "50%" }]}>
                        <Text style={{}}>
                          CUIT:
                        </Text>
                        <Text
                          style={styles.cellData}
                        >
                          {'20-12345679-5'}
                        </Text>
                      </View>
                      <View style={[styles.rowClientes, { width: "50%" }]}>
                        <Text style={{}}>
                          Código postal:
                        </Text>
                        <Text
                          style={styles.cellData}
                        >
                          {3900}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.rowClientes}>
                      <Text style={{ marginRight: "10px" }}>Domicilio:</Text>
                      <Text
                        style={styles.cellData}
                      >
                        {'Villa Fontana 1574'}
                      </Text>
                    </View>
                    <View
                      style={{ display: "flex", flexDirection: "row", gap: 0, width: '100%' }}
                    >
                      <View style={[styles.rowClientes, { width: "50%" }]}>
                        <Text style={{}}>
                          Localidad:
                        </Text>
                        <Text
                          style={styles.cellData}
                        >
                          {'Parana'}
                        </Text>
                      </View>
                      <View style={[styles.rowClientes, { width: "50%" }]}>
                        <Text style={{}}>
                          Provincia:
                        </Text>
                        <Text
                          style={styles.cellData}
                        >
                          {'Entre Ríos'}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{ display: "flex", flexDirection: "row", gap: 0, width: '100%' }}
                    >
                      <View style={[styles.rowClientes, { width: "50%" }]}>
                        <Text style={{}}>
                          Telefono:
                        </Text>
                        <Text
                          style={styles.cellData}
                        >
                          {'343-492-0056'}
                        </Text>
                      </View>
                      <View style={[styles.rowClientes, { width: "50%" }]}>
                        <Text style={{}}>
                          Email:
                        </Text>
                        <Text
                          style={styles.cellData}
                        >
                          {'stertz@stertz.com.ar'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ marginBottom: 20 }}>
                    {/* Unidad */}
                    {<Paragrap />}
                    <View>
                      <Text style={styles.tableSubtitle}>Medidas:</Text>
                      {test.map(
                        (item) =>
                          item.clasification === "medidas" &&
                          pdfData[item.attr] != "N/A" &&
                          pdfData[item.attr] != 0 && (
                            <View style={styles.rowCaracteristics}>
                              <Text style={{ textTransform: "capitalize" }}>
                                {item.attr}
                              </Text>
                              <Text>{pdfData[item.attr]}</Text>
                            </View>
                          )
                      )}
                    </View>
                    <View>
                      <Text style={styles.tableSubtitle}>Características:</Text>
                      {test.length > 0 &&
                        test.map(
                          (item) =>
                            item.clasification === "caracteristicas" &&
                            pdfData[item.attr] != "N/A" &&
                            pdfData[item.attr] != 0 && (
                              <View style={styles.rowCaracteristics}>
                                <Text style={{ textTransform: "capitalize" }}>
                                  {item.attr}
                                </Text>
                                <Text>{pdfData[item.attr]}</Text>
                              </View>
                            )
                        )}
                    </View>
                  </View>
                  {/* Precio y forma de pago */}
                  <View style={styles.precio}>
                    <View style={styles.row}>
                      <Text>Precio:</Text>
                      <Text style={styles.spacing}></Text>
                      <Text>$ {pdfData.precio}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text>I.V.A:</Text>
                      <Text style={styles.spacing}></Text>
                      <Text>$ {pdfData.iva}</Text>
                    </View>
                    <View style={[styles.row, { fontWeight: "bold" }]}>
                      <Text>Total:</Text>
                      <Text style={styles.spacing}></Text>
                      <Text>$ {pdfData.total}</Text>
                    </View>
                  </View>
                  {/* Clausulas */}
                  <View style={styles.clausula}>
                    {/* clausula */}
                    <Text style={{ fontWeight: "bold", marginBottom: 15 }}>
                      El origen del bien consignado en la presente factura
                      proforma responde al requisito de origen nacional en
                      virtud de lo dispuesto en la resolución Nº 94/2004
                      articulo Nº 5 del Ministerio de economía y Producción –
                      Subsecretaria de la pequeña y mediana empresa y desarrollo
                      social
                    </Text>
                    <Text style={{ marginBottom: 5 }}>
                      - Hacemos constar, con carácter de declaración jurada, que
                      los bienes detallados en el presente documento son de
                      Producción Nacional.
                    </Text>
                    <Text style={{ marginBottom: 5 }}>
                      - Los formularios para la inscripción de la unidad, no
                      están incluidos en el valor arriba detallado
                    </Text>
                    <Text>
                      - Esta unidad quedará congelado al momento del pago total
                      de la misma, el valor podrá variar sin previo aviso
                    </Text>
                  </View>
                </View>
                {/* Pie de Página */}
                <View
                  style={{
                    position: "absolute",
                    bottom: 30,
                    left: 0,
                    width: "100%",
                  }}
                >
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
