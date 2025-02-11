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
const styles = StyleSheet.create({
  page: {
    padding: 15,
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
    marginTop: 7,
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
    gap: 6,
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
  const location = useLocation();
  const { pdfData } = location.state || {};
  const [proformaValues, setProformaValues] = useState([]);

  useEffect(() => {
    getProformaValues();
  }, []);
  function getProformaValues() {
    let arr = [];
    for (let item in pdfData.dataModelo) {
      if (pdfData.dataModelo[item].isInProforma) {
        pdfData.dataModelo[item]["attr"] = item;
        arr.push(pdfData.dataModelo[item]);
      }
    }
    setProformaValues(arr);
  }
  const Paragrap = () => {
    return (
      <Text style={{ marginBottom: 10 }}>
        Un{" "}
        <Text
          style={{ fontWeight: "bold" }}
        >{`${pdfData.dataModelo.tipo.value} ${pdfData.dataModelo.carrozado.value}`}</Text>
        , nuevo, marca GROSS, material COMÚN; con configuración de ejes{" "}
        <Text style={{ fontWeight: "bold" }}>
          {pdfData.dataModelo.ejes.value}
        </Text>
        , ejes tubulares, mazas tipo disco, y campanas de freno de 8 pulgadas;{" "}
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
  return (
    <>
      {proformaValues.length > 0 && (
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
                  {/* Cliente */}
                  <View style={{ marginBottom: 15 }}>
                    <Text style={styles.tableSubtitle}>Datos del Cliente:</Text>
                    <View style={styles.rowClientes}>
                      <Text style={{ marginRight: "10px" }}>Razón Social:</Text>
                      <Text style={styles.cellData}>
                        {pdfData.cliente.razon_social}
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
                          {pdfData.cliente.cuit}
                        </Text>
                      </View>
                      <View style={[styles.rowClientes, { width: "50%" }]}>
                        <Text style={{}}>Código postal:</Text>
                        <Text style={styles.cellData}>
                          {pdfData.cliente.cod_postal}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.rowClientes}>
                      <Text style={{ marginRight: "10px" }}>Domicilio:</Text>
                      <Text style={styles.cellData}>
                        {`${pdfData.cliente.calle} ${pdfData.cliente.num}`}
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
                          {pdfData.cliente.localidad}
                        </Text>
                      </View>
                      <View style={[styles.rowClientes, { width: "50%" }]}>
                        <Text style={{}}>Provincia:</Text>
                        <Text style={styles.cellData}>
                          {pdfData.cliente.provincia}
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
                          {pdfData.cliente.tel}
                        </Text>
                      </View>
                      <View style={[styles.rowClientes, { width: "50%" }]}>
                        <Text style={{}}>Email:</Text>
                        <Text style={styles.cellData}>
                          {pdfData.cliente.email}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ marginBottom: 15 }}>
                    {<Paragrap />}
                    <Text style={styles.tableSubtitle}>Características:</Text>
                    <View style={{ display: "flex", flexDirection: 'row', flexWrap: "wrap"}}>
                    {proformaValues.map(
                          (item) =>
                            pdfData[item.attr] != "N/A" &&
                            pdfData[item.attr] != 0 && (
                              <View
                                style={[styles.rowCaracteristics, { width: "50%" }]}
                                key={item.attr}
                              >
                                <Text
                                  style={{
                                    textTransform: "capitalize",
                                    width: 150,
                                  }}
                                >
                                  {item.attr.replace(/_/g, " ")}:
                                </Text>
                                <Text style={{ fontWeight: "bold" }}>
                                  {pdfData[item.attr]}
                                </Text>
                              </View>
                            )
                        )}
                    </View>
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
                        {pdfData.iva.toLocaleString("es-AR", {
                          style: "currency",
                          currency: "ARS",
                        })}
                      </Text>
                    </View>
                    <View style={[styles.row, { fontWeight: "bold" }]}>
                      <Text>Total:</Text>
                      <Text style={styles.spacing}></Text>
                      <Text>
                        {pdfData.total.toLocaleString("es-AR", {
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
                  </View>
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: 30,
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
