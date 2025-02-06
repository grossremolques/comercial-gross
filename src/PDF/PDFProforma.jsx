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
  textHeader: {
    alignItems: "flex-end",
    color: "#222",
    lineHeight: "20px",
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: "700",
  },
  title: {
    color: "#333",
    fontSize: 12,
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
    fontSize: 13,
    fontWeight: "bold",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    fontSize: 10,
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
    fontSize: 9,
    textAlign: "center",
    borderRight: "1px solid gray",
  },
  cellHeaderNone: {
    flex: 1, // Distribuir espacio equitativamente
    padding: 8,
    fontSize: 9,
    textAlign: "center",
  },
  cellRight: {
    flex: 1, // Distribuir espacio equitativamente
    padding: 5,
    fontSize: 9,
    textAlign: "center",
    borderBottom: "1px solid gray",
  },
  cellNone: {
    flex: 1, // Distribuir espacio equitativamente
    padding: 5,
    fontSize: 9,
    textAlign: "center",
    borderBottom: "1px solid gray",
  },
  headerFooter: {
    flexDirection: "row",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export function PDFProforma() {
  const location = useLocation();
  const { pdfData } = {
    "largo": 10300,
    "ancho": 2500,
    "alto": 1900,
    "puerta_trasera": "N/A",
    "capacidad": "N/A",
    "piso": "N/A",
    "espesor": 0,
    "cumbrera_lateral": "Cumbrera p/destape",
    "cant_puertas_laterales": 0,
    "altura_baranda": 0,
    "cajon": 0,
    "cilindro": "N/A",
    "tara": 0,
    "traba_puerta": "N/A",
    "cliente": "ZAGO MARINO FERNANDO",
    "id_cliente": 9,
    "modelo": "Acoplado D2-D2 Tolva",
    "fecha_estimada": "20/02/2025",
    "vencimiento": "06/03/2025",
    "selectFormaPago": "a 150 días",
    "precio": 12350000,
    "iva": 2593500,
    "total": 14943500,
    "formaPago": [
        {
            "forma_pago": "Contado",
            "metodo_pago": "Efectivo",
            "id_factura": 4,
            "fecha_creacion": "06/02/2025"
        },
        {
            "forma_pago": "a 150 días",
            "metodo_pago": "e-Cheq",
            "id_factura": 4,
            "fecha_creacion": "06/02/2025"
        }
    ],
    "id": 4,
    "registrado_por": "KATHE",
    "fecha_creacion": "06/02/2025"
}
  
  //location.state || {};
  return (
    <>
      <div className="w-full text-center mt-5 mb-10">
        <Button className="" variant={"primaryOutline"}>
          <NavLink to={"/solicitudes"}>Ir al inicio</NavLink>
        </Button>
      </div>
      <PDFViewer width={"100%"} height={"500px"}>
            <Document>
              <Page size={"A4"} style={styles.page}>
                <View style={styles.header}>
                  <Image src={Logo} style={styles.logo} />
                  <Image src={LogoISO} style={styles.logo} />
                </View>
                <Text style={styles.title}>FACTURA PROFORMA</Text>
                <View style={styles.body}>
                  
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
                        Nombre___________________________
                      </Text>
                      <Text style={[styles.cell, { fontSize: 10 }]}>
                        Nombre___________________________
                      </Text>
                      <Text style={[styles.cell, { fontSize: 10 }]}>
                        Nombre___________________________
                      </Text>
                    </View>
                    <View style={[styles.row, { border: "none" }]}>
                      <Text style={[styles.cell, { fontSize: 10 }]}>
                        Firma______________________________
                      </Text>
                      <Text style={[styles.cell, { fontSize: 10 }]}>
                        Firma______________________________
                      </Text>
                      <Text style={[styles.cell, { fontSize: 10 }]}>
                        Firma______________________________
                      </Text>
                    </View>
                  </View>
                </View>
              </Page>
            </Document>
          </PDFViewer>
    </>
  );
}
