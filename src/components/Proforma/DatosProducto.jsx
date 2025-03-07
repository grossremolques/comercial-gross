import { useFormContext } from "react-hook-form";
import { CardToggle } from "../Cards";
import { Label, Input, Select } from "../Forms";
import { useAtributos } from "../../context/Attributes/AtributosContext";
import { useEffect, useState } from "react";
import { Modelo } from "../Modelo";
function DatosProducto() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext({});
  const [modelo, setModelo] = useState(watch("selectedModelo"));
  const {
    getPuertasTraseras,
    puertasTraseras,
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
  } = useAtributos();
  useEffect(() => {
    getPuertasTraseras();
    getCapacidad();
    getPiso();
    getCumbrera();
    getMecanismo();
    getCilindro();
  }, []);

  useEffect(() => {
    setModelo(watch("selectedModelo"));
  }, [watch("selectedModelo")]);
  return (
    <>
      {puertasTraseras.length > 0 &&
        capacidad.length > 0 &&
        piso.length > 0 &&
        cumbrera.length > 0 &&
        mecanismo.length > 0 &&
        cilindro.length > 0 && (
          <CardToggle
            className={"lg:max-w-[1000px] mx-auto mb-5"}
            title={"Datos del Producto"}
          >
            <Modelo />
            <h3 className="font-medium text-lg mt-4 mb-2 text-gray-700">
              Medidas
            </h3>
            <div className="columns-4 gap-2">
              <Input
                type="number"
                label={"Largo"}
                disabled={modelo?.largo?.type === "Fijo"}
                {...register("largo", { required: true })}
              />
              <Input
                type="number"
                label={"Ancho"}
                disabled={modelo?.ancho?.type === "Fijo"}
                {...register("ancho", { required: true })}
              />

              <Input
                type="number"
                label={"Alto"}
                disabled={modelo?.alto?.type === "Fijo"}
                {...register("alto", { required: true })}
              />
              <Select
                label={"Capacidad"}
                disabled={modelo?.capacidad?.type === "Fijo"}
                {...register("capacidad", { required: true })}
              >
                {capacidad.map((item) => (
                  <option key={item.descripcion} value={item.descripcion}>
                    {item.descripcion}
                  </option>
                ))}
              </Select>
            </div>
            <h3 className="font-medium text-lg mt-4 mb-2 text-gray-700">
              Características
            </h3>
            <div>
              <div className="columns-5 gap-2">
                <Input
                  type="number"
                  label={"Cant. ptas. lat"}
                  disabled={modelo?.cant_puertas_laterales?.type === "Fijo"}
                  {...register("cant_puertas_laterales", { required: true })}
                />
                <Input
                  type="number"
                  label={"Altura de baranda"}
                  disabled={modelo?.altura_baranda?.type === "Fijo"}
                  {...register("altura_baranda", { required: true })}
                />

                <Select
                  label={"Puerta trasera"}
                  disabled={modelo?.puerta_trasera?.type === "Fijo"}
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
                <Select
                  label={"Piso"}
                  disabled={modelo?.piso?.type === "Fijo"}
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
                <Select
                  disabled={modelo?.espesor?.type === "Fijo"}
                  label={"Espesor"}
                  {...register("espesor", { required: true })}
                >
                  {piso.map((item) => (
                    <option key={item.espesor} value={item.espesor}>
                      {item.espesor}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="columns-5 mt-3 gap-2">
                <Select
                  disabled={modelo?.cumbrera_lateral?.type === "Fijo"}
                  label={"Cumbrera lateral"}
                  {...register("cumbrera_lateral", { required: true })}
                >
                  {cumbrera.map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
                <Input
                  type="number"
                  label={"Cajon de herramientas"}
                  disabled={modelo?.cajon?.type === "Fijo"}
                  {...register("cajon", { required: true })}
                />
                <Input
                  type="number"
                  label={"Tara"}
                  disabled={modelo?.tara?.type === "Fijo"}
                  {...register("tara", { required: true })}
                />

                <Select
                  disabled={modelo?.traba_puerta?.type === "Fijo"}
                  label={"Traba de puerta"}
                  {...register("traba_puerta", { required: true })}
                >
                  {mecanismo.map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>

                <Select
                  disabled={modelo?.cilindro?.type === "Fijo"}
                  label={"Cilindro"}
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
}
export default DatosProducto;
