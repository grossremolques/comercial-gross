import { CardToggle } from "../components/Cards";
import { Label, Input, Select, TextInvalidate } from "../components/Forms";
import { useAtrubutos } from "../context/Attributes/AtributosContext";
import { useEffect, useState } from "react";
export const InfoProducto = ({
  register,
  errors,
  watch,
  reset,
  data,
  //setDataModelo,
  //dataModelo,
}) => {
  const [dataModelo, setDataModelo] = useState();
  const {
    getPuertasTraseras,
    puertasTraseras,
    getModelos,
    modelos,
    getCapacidad,
    capacidad,
    getPiso,
    piso,
    getCumbrera,
    cumbrera,
    getMecanismo,
    mecanismo,
    getCilindro,
    cilindro,
  } = useAtrubutos();

  useEffect(() => {
    getModelos();
    getPuertasTraseras();
    getCapacidad();
    getPiso();
    getCumbrera();
    getMecanismo();
    getCilindro();
  }, []);
  useEffect(() => {
    const res = modelos.find((item) => item.modelo.value === watch("modelo"));
    setDataModelo(res);
  }, [watch("modelo")]);
  useEffect(() => {
    reset({
      largo: dataModelo?.largo.value ? dataModelo.largo.value : data.largo,
      ancho: dataModelo?.ancho.value ?dataModelo.ancho.value : data.ancho,
      alto: dataModelo?.alto.value ? dataModelo.alto.value : data.alto,
      puerta_trasera: dataModelo?.puerta_trasera.value ? dataModelo.puerta_trasera.value : data.puerta_trasera,
      capacidad: dataModelo?.capacidad.value ? dataModelo.capacidad.value : data.capacidad,
      piso: dataModelo?.piso.value ? dataModelo.piso.value : data.piso,
      espesor: dataModelo?.espesor.value ? dataModelo.espesor.value : data.espesor,
      cumbrera_lateral: dataModelo?.cumbrera_lateral.value ? dataModelo.cumbrera_lateral.value : data.cumbrera_lateral,
      cant_puertas_laterales: dataModelo?.cant_puertas_laterales.value? dataModelo.cant_puertas_laterales.value : data.cant_puertas_laterales,
      altura_baranda: dataModelo?.altura_baranda.value ? dataModelo.altura_baranda.value : data.altura_baranda,
      cajon: dataModelo?.cajon.value ? dataModelo.cajon.value : data.cajon,
      cilindro: dataModelo?.cilindro.value ? dataModelo.cilindro.value : data.cilindro,
      tara: dataModelo?.tara.value ? dataModelo.tara.value : data.tara,
      traba_puerta: dataModelo?.traba_puerta.value ? dataModelo.traba_puerta.value : data.traba_puerta
    });
  }, [dataModelo]);
  return (
    <>
    {}
      {modelos.length > 0 && puertasTraseras.length > 0 && (
        <CardToggle
          className={"lg:max-w-[1000px] mx-auto mb-5"}
          title={"Datos del Producto"}
        >
          <Label label={"Modelo"} htmlFor={"modelo"} />
          <Select
            placeholder={"Seleccione un modelo"}
            {...register("modelo", {
              required: {
                value: "true",
                message: "Debe seleccionar un modelo",
              },
            })}
          >
            {modelos.map(
              (item) =>
                item.activo.value === "Sí" && (
                  <option key={item.modelo.value} value={item.modelo.value}>
                    {item.modelo.value}
                  </option>
                )
            )}
          </Select>
          {errors.modelo && <TextInvalidate message={errors.modelo.message} />}
          <h3 className="font-medium text-lg mt-4 mb-2 text-gray-700">
            Medidas
          </h3>
          <div className="columns-4">
            <div>
              <Label label={"Largo"} htmlFor={"largo"} />
              <Input
                readOnly={dataModelo?.largo.type === "Fijo"}
                type="number"
                {...register("largo", { required: true })}
              />
            </div>
            <div>
              <Label label={"Ancho"} htmlFor={"ancho"} />
              <Input
                readOnly={dataModelo?.ancho.type === "Fijo"}
                type="number"
                {...register("ancho", { required: true })}
              />
            </div>
            <div>
              <Label label={"Alto"} htmlFor={"alto"} />
              <Input
                readOnly={dataModelo?.alto.type === "Fijo"}
                type="number"
                {...register("alto", { required: true })}
              />
            </div>
            <div>
              <Label label={"Capacidad"} htmlFor={"capacidad"} />
              <Select
                disabled={dataModelo?.capacidad.type === "Fijo"}
                {...register("capacidad", { required: true })}
              >
                {capacidad.map((item) => (
                  <option key={item.descripcion} value={item.descripcion}>
                    {item.descripcion}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <h3 className="font-medium text-lg mt-4 mb-2 text-gray-700">
            Características
          </h3>
          <div>
            <div className="columns-5">
              <Label
                label={"Cant. ptas. lat"}
                htmlFor={"cant_puertas_laterales"}
              />
              <Input
                type="number"
                readOnly={dataModelo?.cant_puertas_laterales.type === "Fijo"}
                {...register("cant_puertas_laterales", { required: true })}
              />

              <Label label={"Altura de baranda"} htmlFor={"altura_baranda"} />
              <Input
                type="number"
                readOnly={dataModelo?.altura_baranda.type === "Fijo"}
                {...register("altura_baranda", { required: true })}
              />

              <Label label={"Puerta trasera"} htmlFor={"puerta_trasera"} />
              <Select
                disabled={dataModelo?.puerta_trasera.type === "Fijo"}
                {...register("puerta_trasera", { required: true })}
              >
                {puertasTraseras.map(
                  (item) =>
                    item.activo == "Sí" && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
              </Select>
              <Label label={"Piso"} htmlFor={"piso"} />
              <Select
                disabled={dataModelo?.piso.type === "Fijo"}
                {...register("piso", { required: true })}
              >
                {[...new Set(piso.map((item) => item.descripcion))].map(
                  (item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </Select>
              <Label label={"Espesor"} htmlFor={"espesor"} />
              <Select
                disabled={dataModelo?.espesor.type === "Fijo"}
                {...register("espesor", { required: true })}
              >
                {piso.map((item) => (
                  <option key={item.espesor} value={item.espesor}>
                    {item.espesor}
                  </option>
                ))}
              </Select>
            </div>
            <div className="columns-5 mt-3">
              <Label label={"Cumbrera lateral"} htmlFor={"cumbrera_lateral"} />
              <Select
                disabled={dataModelo?.cumbrera_lateral.type === "Fijo"}
                {...register("cumbrera_lateral", { required: true })}
              >
                {cumbrera.map((item) => (
                  <option key={item.descripcion} value={item.descripcion}>
                    {item.descripcion}
                  </option>
                ))}
              </Select>

              <Label label={"Cajon de herramientas"} htmlFor={"cajon"} />
              <Input
                readOnly={dataModelo?.cajon.type === "Fijo"}
                type="number"
                {...register("cajon", { required: true })}
              />

              <Label label={"Tara"} htmlFor={"tara"} />
              <Input
                readOnly={dataModelo?.tara?.type === "Fijo"}
                type="number"
                {...register("tara", { required: true })}
              />

              <Label label={"Traba de puerta"} htmlFor={"traba_puerta"} />
              <Select
                disabled={dataModelo?.traba_puerta.type === "Fijo"}
                {...register("traba_puerta", { required: true })}
              >
                {mecanismo.map((item) => (
                  <option key={item.descripcion} value={item.descripcion}>
                    {item.descripcion}
                  </option>
                ))}
              </Select>

              <Label label={"Cilindro"} htmlFor={"cilindro"} />
              <Select
                disabled={dataModelo?.cilindro.type === "Fijo"}
                {...register("cilindro", { required: true })}
              >
                {cilindro.map((item) => (
                  <option key={item.descripcion} value={item.descripcion}>
                    {item.descripcion}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </CardToggle>
      )}
    </>
  );
};
