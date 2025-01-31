import { Font } from "@react-pdf/renderer";
import ChakraPetchRegular from './assets/fonts/ChakraPetch-Regular.ttf'
import ChakraPetchBold from './assets/fonts/ChakraPetch-Bold.ttf'

// 🔥 Registrar la fuente con la ruta correcta
Font.register({
  family: "ChakraPetch",
  src: ChakraPetchRegular,
  fontWeight: "regular",
});
Font.register({
    family: "ChakraPetch",
    src: ChakraPetchBold,
    fontWeight: "bold",
  });
