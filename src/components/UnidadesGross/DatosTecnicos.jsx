import { useFormContext } from "react-hook-form";
import { CardToggle } from "../Cards";
import { Input, Select, InputGroup, TextLabelGroup, SingleInputForGroup } from "../Generales/Forms";
import { useAtributos } from "../../context/Attributes/AtributosContext";
import { useEffect, useState } from "react";
import { Modelo } from "../Modelo";
export default function DatosTecnico() {
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
            {/* Row 1 */}
            <div className="grid md:grid-cols-6 md:grid-rows-6 gap-2 grid-cols-3 mt-2">
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
              <Input
                type="number"
                label={"Alt. baranda"}
                disabled={modelo?.altura_baranda?.type === "Fijo"}
                {...register("altura_baranda", { required: true })}
              />
              <Select
                className="col-span-2"
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
              <Select
                label={"Material"}
                disabled={modelo?.material?.type === "Fijo"}
                {...register("material", { required: true })}
              >
                {[...new Set([].map((item) => item.descripcion))].map(
                  (item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </Select>
              <Select
                className="col-span-2"
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
              <Input
                type="number"
                label={"Cant. ptas. laterales"}
                disabled={modelo?.cant_puertas_laterales?.type === "Fijo"}
                {...register("cant_puertas_laterales", { required: true })}
              />
              <Select
                label={"Arcos centrales"}
                disabled={modelo?.arcos_centrales?.type === "Fijo"}
                {...register("arcos_centrales", { required: true })}
              >
                {[].map(
                  (item) =>
                    item.activo == "Sí" && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
              </Select>
              <Select
                label={"Arcos extremos"}
                disabled={modelo?.arcos_extremos?.type === "Fijo"}
                {...register("arcos_extremos", { required: true })}
              >
                {[].map(
                  (item) =>
                    item.activo == "Sí" && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
              </Select>
              <InputGroup label="Seguros en puertas/barandas" className="col-span-2">
              </InputGroup>
              <div className="col-span-2">
                <label
                  htmlFor={"seguros"}
                  className={`block text-sm font-medium text-gray-700 mb-1 `}
                >
                  {" "}
                  {"Seguros en puertas/barandas"}{" "}
                </label>
                <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-xs border-gray-200">
                  <span className="inline-block p-2 text-sm font-medium text-gray-700 bg-gray-100">
                    Lateral
                  </span>
                  <label htmlFor="UserEmail" className="sr-only"> Email </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 text-sm border-none"
                    {...register("seguros")}
                  />
                  <span className="p-2 text-sm font-medium text-gray-700 bg-gray-100">
                    Trasero
                  </span>
                  <label htmlFor="UserEmail" className="sr-only"> Email </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 text-sm border-none"
                    {...register("seguros")}
                  />
                </span>
              </div>
            </div>
            {/* Row 2 */}
            {/* <div className="flex gap-2">
              
              
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
              <div className="columns-5 gap-2">
                

                
              </div>
              <div className="columns-5 mt-3 gap-2">
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
            </div> */}
          </CardToggle>
        )}
    </>
  );
}
