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
  export const ss_clientes = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_CLIENTES,
    rowHead: 1,
    nameSheet: "Registro"/*  "Datos Generales" */,
  });
  export const ss_localidades = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_CLIENTES,
    rowHead: 1,
    nameSheet: "Localidades",
  });
  export const ss_empleados = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_EMPLEADOS,
    rowHead: 1,
    nameSheet: "Registro",
  });
  export const ss_solicitudes = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_CAMBIO,
    rowHead: 1,
    nameSheet: "Registro",
  });
  export const ss_unidadesGross = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_UNIDADES_GROSS,
    rowHead: 1,
    nameSheet: "Unidades",
  });
  export const ss_gestoria = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_GESTORIA,
    rowHead: 1,
    nameSheet: "Gestoría",
  });
  export const ss_cambios_atributos = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_CAMBIO,
    rowHead: 1,
    nameSheet: "Atributos",
  });
  export const ss_cambios_detalle = new GoogleSheet({
    sheetId: import.meta.env.VITE_SS_CAMBIO,
    rowHead: 1,
    nameSheet: "Detalle",
  });