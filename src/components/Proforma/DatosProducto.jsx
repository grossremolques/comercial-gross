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
              <div>
                <Label label={"Largo"} htmlFor={"largo"} />
                <Input
                  type="number"
                  disabled={modelo?.largo?.type === "Fijo"}
                  {...register("largo", { required: true })}
                />
              </div>
              <div>
                <Label label={"Ancho"} htmlFor={"ancho"} />
                <Input
                  type="number"
                  disabled={modelo?.ancho?.type === "Fijo"}
                  {...register("ancho", { required: true })}
                />
              </div>
              <div>
                <Label label={"Alto"} htmlFor={"alto"} />
                <Input
                  type="number"
                  disabled={modelo?.alto?.type === "Fijo"}
                  {...register("alto", { required: true })}
                />
              </div>
              <div>
                <Label label={"Capacidad"} htmlFor={"capacidad"} />
                <Select
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
            </div>
            <h3 className="font-medium text-lg mt-4 mb-2 text-gray-700">
              Características
            </h3>
            <div>
              <div className="columns-5 gap-2">
                <Label
                  label={"Cant. ptas. lat"}
                  htmlFor={"cant_puertas_laterales"}
                />
                <Input
                  type="number"
                  disabled={modelo?.cant_puertas_laterales?.type === "Fijo"}
                  {...register("cant_puertas_laterales", { required: true })}
                />

                <Label label={"Altura de baranda"} htmlFor={"altura_baranda"} />
                <Input
                  type="number"
                  disabled={modelo?.altura_baranda?.type === "Fijo"}
                  {...register("altura_baranda", { required: true })}
                />

                <Label label={"Puerta trasera"} htmlFor={"puerta_trasera"} />
                <Select
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
                <Label label={"Piso"} htmlFor={"piso"} />
                <Select
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
                <Label label={"Espesor"} htmlFor={"espesor"} />
                <Select
                  disabled={modelo?.espesor?.type === "Fijo"}
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
                <Label
                  label={"Cumbrera lateral"}
                  htmlFor={"cumbrera_lateral"}
                />
                <Select
                  disabled={modelo?.cumbrera_lateral?.type === "Fijo"}
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
                  type="number"
                  disabled={modelo?.cajon?.type === "Fijo"}
                  {...register("cajon", { required: true })}
                />

                <Label label={"Tara"} htmlFor={"tara"} />
                <Input
                  type="number"
                  disabled={modelo?.tara?.type === "Fijo"}
                  {...register("tara", { required: true })}
                />

                <Label label={"Traba de puerta"} htmlFor={"traba_puerta"} />
                <Select
                  disabled={modelo?.traba_puerta?.type === "Fijo"}
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
                  disabled={modelo?.cilindro?.type === "Fijo"}
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
