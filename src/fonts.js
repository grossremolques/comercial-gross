import { Font } from "@react-pdf/renderer";

// 🔥 Registrar la fuente con la ruta correcta
Font.register({
  family: "ChakraPetch",
  src: "/fonts/ChakraPetch-Regular.ttf",
  fontWeight: "regular",
});
Font.register({
    family: "ChakraPetch",
    src: "/fonts/ChakraPetch-Bold.ttf",
    fontWeight: "bold",
  });
  Font.register({
    family: "Cairo",
    src: "/fonts/Cairo-VariableFont_slnt,wght.ttf",
  });
