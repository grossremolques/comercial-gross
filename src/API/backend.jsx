import GoogleSheet from "google-sheet-package";
export const ss_atributos = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_ESPECIFICACIONES,
  rowHead: 1,
  nameSheet: "Atributos",
});

export const ss_modelos = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_ESPECIFICACIONES,
  rowHead: 1,
  nameSheet: "Modelos",
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
  nameSheet: "Datos Generales",
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
export const ss_gestoria2 = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_GESTORIA_2,
  rowHead: 1,
  nameSheet: "Registro",
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
export const ss_producto = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_PROFORMA,
  rowHead: 1,
  nameSheet: "Producto",
});
export const ss_camiones = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_CAMIONES,
  rowHead: 1,
  nameSheet: "Propuesta",
});
export const ss_unidadesGross2 = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_UNIDADES_GROSS2,
  rowHead: 1,
  nameSheet: "Registro",
});
export const ss_fechas = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_FECHAS,
  rowHead: 1,
  nameSheet: "Registro",
});
