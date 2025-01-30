import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import Logo from "../assets/Logos/logo_dark.png";
import "../fonts";
import { useLocation } from "react-router-dom";
import Button from "./Buttons";
import { NavLink } from "react-router-dom";
const styles = StyleSheet.create({
  page: {
    padding: 15,
    fontFamily: "ChakraPetch",
    fontSize: 12,
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
    height: 50,
    resizeMode: "contain",
    alignSelf: "flex-start",
  },
  textHeader: {
    alignItems: "flex-end",
    color: "#222",
    lineHeight: "20px",
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: "700",
  },
  title: {
    color: "#333",
    fontSize: 13,
    marginTop: "20px",
    textDecoration: "underline",
    textAlign: "center",
    fontWeight: "bold",
  },
  body: {
    marginLeft: "30px",
    marginRight: "30px",
  },
  section_1: {
    marginTop: "20px",
    textAlign: "right",
    lineHeight: "18px",
  },
  section_2: {},
  section_3: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    marginBottom: "10px",
  },
  subtitle: {
    marginTop: "20px",
    marginBottom: "15px",
    fontSize: "13px",
    fontWeight: "bold",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    fontSize: 11,
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid gray",
  },
  headerTable: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
    borderTop: "1px solid gray",
    borderRight: "1px solid gray",
    borderLeft: "1px solid gray",
  },
  cell: {
    flex: 1, // Distribuir espacio equitativamente
    padding: 8,
  },

  cellHeaderRight: {
    flex: 1, // Distribuir espacio equitativamente
    padding: 8,
    fontSize: 10,
    textAlign: "center",
    borderRight: "1px solid gray",
  },
  cellHeaderNone: {
    flex: 1, // Distribuir espacio equitativamente
    padding: 8,
    fontSize: 10,
    textAlign: "center",
  },
  cellRight: {
    flex: 1, // Distribuir espacio equitativamente
    padding: 5,
    fontSize: 10,
    textAlign: "center",
    borderBottom: "1px solid gray",
  },
  cellNone: {
    flex: 1, // Distribuir espacio equitativamente
    padding: 5,
    fontSize: 10,
    textAlign: "center",
    borderBottom: "1px solid gray",
  },
  headerFooter: {
    flexDirection: "row",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export function PDF() {
    const location = useLocation();
  const { pdfData } = location.state || {};
  return (
    <>
    <div className="w-full text-center mt-5 mb-20">
      <Button className="" variant={'primaryOutline'}>
        <NavLink to={'/solicitudes'}>Ir al inicio</NavLink>
      </Button>
    </div>
      {pdfData && (
        <>
          <PDFViewer width={"100%"} height={"100%"}>
            <Document>
              <Page size={"A4"} style={styles.page}>
                <View style={styles.header}>
                  <Image src={Logo} style={styles.logo} />
                  <View style={styles.textHeader}>
                    <Text style={styles.headerTitle}>ORDEN DE CAMBIO</Text>
                    <Text style={{ fontSize: 11 }}>
                      REV 01 - VIGENCIA 02-2024
                    </Text>
                  </View>
                </View>
                <Text style={styles.title}>SOLICITUD DE ORDEN DE CAMBIO</Text>
                <View style={styles.body}>
                  <View style={styles.section_1}>
                    <Text>Fecha: <Text >{pdfData.fecha_creacion}</Text></Text>
                    <Text>Id Orden: <Text style={{fontWeight: 'bold'}}>{pdfData.id}</Text></Text>
                    <Text>Trazabilidad: <Text style={{fontWeight: 'bold'}}>{pdfData.trazabilidadStr}</Text></Text>
                  </View>
                  <View style={styles.section_2}>
                    <Text style={styles.subtitle}>Detalles del Cambio</Text>
                    <View style={styles.section_3}>
                      <Text style={{ fontWeight: "bold" }}>Cliente: </Text>
                      <Text>{pdfData.cliente}</Text>
                    </View>
                    <View style={styles.section_3}>
                      <Text style={{ fontWeight: "bold" }}>Producto: </Text>
                      <Text>{pdfData.modelo}</Text>
                    </View>
                  </View>
                  <Text style={styles.subtitle}>
                    Modificaciones Solicitadas
                  </Text>
                  {/* Tabla */}
                  <View style={styles.table}>
                    {/* Encabezados */}
                    <View style={[styles.headerTable, styles.row]}>
                      <Text
                        style={[styles.cell, { borderRight: "1px solid gray" }]}
                      >
                        Características
                      </Text>
                      <Text
                        style={[styles.cell, { borderRight: "1px solid gray" }]}
                      >
                        Valor Actual
                      </Text>
                      <Text
                        style={[styles.cell, { borderRight: "1px solid gray" }]}
                      >
                        Modificación
                      </Text>
                      <Text style={styles.cell}>Aprobado</Text>
                    </View>
                    {pdfData.datosCambio.map((item, index) => (
                      <View style={styles.row} key={index}>
                        <Text
                          style={[
                            styles.cell,
                            {
                              borderRight: "1px solid gray",
                              borderLeft: "1px solid gray",
                            },
                          ]}
                        >
                          {item.atributo}
                        </Text>
                        <Text
                          style={[
                            styles.cell,
                            { borderRight: "1px solid gray" },
                          ]}
                        >
                          {item.valor_actual}
                        </Text>
                        <Text
                          style={[
                            styles.cell,
                            { borderRight: "1px solid gray" },
                          ]}
                        >
                          {item.valor_nuevo}
                        </Text>
                        <Text
                          style={[
                            styles.cell,
                            { borderRight: "1px solid gray" },
                          ]}
                        ></Text>
                      </View>
                    ))}
                  </View>
                  <Text style={styles.subtitle}>Comentarios Adicionales</Text>
                  <Text style={{ lineHeight: "18px" }}>
                    El cliente comprende que estas modificaciones pueden afectar
                    los plazos de entrega y está dispuesto a coordinar cualquier
                    ajuste necesario.
                  </Text>
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
                  <View
                    style={[styles.table, { margin: "auto", width: "85%" }]}
                  >
                    {/* Encabezados */}
                    <View style={styles.headerFooter}>
                      <Text style={styles.cell}>Solicita</Text>
                      <Text style={[styles.cell]}>Revisa</Text>
                      <Text style={[styles.cell]}>Aprueba</Text>
                    </View>
                    <View style={[styles.row, { border: "none" }]}>
                      <Text style={[styles.cell, { fontSize: 10 }]}>
                        Nombre__________________________
                      </Text>
                      <Text style={[styles.cell, { fontSize: 10 }]}>
                        Nombre__________________________
                      </Text>
                      <Text style={[styles.cell, { fontSize: 10 }]}>
                        Nombre__________________________
                      </Text>
                    </View>
                    <View style={[styles.row, { border: "none" }]}>
                      <Text style={[styles.cell, { fontSize: 10 }]}>
                        Firma_____________________________
                      </Text>
                      <Text style={[styles.cell, { fontSize: 10 }]}>
                        Firma_____________________________
                      </Text>
                      <Text style={[styles.cell, { fontSize: 10 }]}>
                        Firma_____________________________
                      </Text>
                    </View>
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
