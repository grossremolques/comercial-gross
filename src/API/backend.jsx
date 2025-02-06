import GoogleSheet from "google-sheet-package";
export const ss_puerta_trasera = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_ESPECIFICACIONES,
    rowHead: 1,
    nameSheet: "Puertas Traseras",
  });
 export const ss_modelos = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_ESPECIFICACIONES,
    rowHead: 1,
    nameSheet: "Modelos",
  });
  export const ss_capacidad = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_ESPECIFICACIONES,
    rowHead: 1,
    nameSheet: "Capacidad",
  });
  export const ss_piso = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_ESPECIFICACIONES,
    rowHead: 1,
    nameSheet: "Piso",
  });
  export const ss_cumbrera = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_ESPECIFICACIONES,
    rowHead: 1,
    nameSheet: "Cumbrera",
  });
  export const ss_mecanismo = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_ESPECIFICACIONES,
    rowHead: 1,
    nameSheet: "Mecanísmo",
  });
  export const ss_cilindro = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_ESPECIFICACIONES,
    rowHead: 1,
    nameSheet: "Cilindro",
  });
  export const ss_forma_pago = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_ESPECIFICACIONES,
    rowHead: 1,
    nameSheet: "Formas de Pago",
  });
  export const ss_medio_pago = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_ESPECIFICACIONES,
    rowHead: 1,
    nameSheet: "Medios de Pago",
  });
  export const ss_proforma = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_PROFORMA,
    rowHead: 1,
    nameSheet: "Registro",
  });
  export const ss_formas_pago = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_PROFORMA,
    rowHead: 1,
    nameSheet: "Formas de Pago",
  });