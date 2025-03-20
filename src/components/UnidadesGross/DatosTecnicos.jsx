import { useFormContext } from "react-hook-form";
import { CardToggle } from "../Cards";
import {
  Input,
  Select,
  InputGroup,
  TextLabelGroup,
  SingleInputForGroup,
} from "../Generales/Forms";
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
          <>
            <CardToggle
              className={"lg:max-w-[1000px] mx-auto mb-5"}
              title={"Datos Técnicos"}
            >
              <Modelo />
              <div className="grid md:grid-cols-6 gap-2 grid-cols-3 mt-2">
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
                <InputGroup
                  label="Seguros en puertas/barandas"
                  className="col-span-2"
                >
                  <TextLabelGroup title={"Lateral"} />
                  <SingleInputForGroup
                    label="Seguro lateral"
                    {...register("seg_lat")}
                  />
                  <TextLabelGroup title={"Trasero"} />
                  <SingleInputForGroup
                    label="Seguro trasero"
                    {...register("seg_tras")}
                  />
                </InputGroup>
                <InputGroup label="Kit de acoples" className="col-span-2">
                  <TextLabelGroup title={"Tipo"} />
                  <SingleInputForGroup
                    label="Tipo"
                    {...register("kit_acople")}
                  />
                  <TextLabelGroup title={"Adic."} />
                  <SingleInputForGroup
                    label="Adicional"
                    {...register("kit_acople_adicional_fijo")}
                  />
                </InputGroup>
              </div>
            </CardToggle>
            <CardToggle
              className={"lg:max-w-[1000px] mx-auto mb-5"}
              title={"Opciones de colores"}
            >
              <div className="flex gap-2">
                <Select
                  disabled={modelo?.color_carrozado?.type === "Fijo"}
                  label={"Carrozado"}
                  {...register("color_carrozado", { required: true })}
                >
                  {[].map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
                <Select
                  disabled={modelo?.color_franja?.type === "Fijo"}
                  label={"Franja"}
                  {...register("color_franja", { required: true })}
                >
                  {[].map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
                <Select
                  disabled={modelo?.color_lona?.type === "Fijo"}
                  label={"Lona para destape"}
                  {...register("color_lona", { required: true })}
                >
                  {[].map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
                <Select
                  disabled={modelo?.color_chasis?.type === "Fijo"}
                  label={"Chasis"}
                  {...register("color_chasis", { required: true })}
                >
                  {[].map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
              </div>
            </CardToggle>
            <CardToggle
              className={"lg:max-w-[1000px] mx-auto mb-5"}
              title={"Características Especiales"}
            >
              <div className="grid md:grid-cols-6 gap-2 grid-cols-3 mt-2">
                <Select
                  disabled={modelo?.cajon?.type === "Fijo"}
                  label={"Cajón de Htas"}
                  {...register("cajon", { required: true })}
                >
                  {[].map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
                <InputGroup label="Boquillas" className="col-span-2">
                  <TextLabelGroup title={"Estándar"} />
                  <SingleInputForGroup
                    label="Estándar"
                    {...register("boq_st")}
                  />
                  <TextLabelGroup title={"Oculta"} />
                  <SingleInputForGroup
                    label="Oculta"
                    {...register("boq_oculta")}
                  />
                </InputGroup>
                <Select
                  disabled={modelo?.porta_auxilio?.type === "Fijo"}
                  label={"Porta auxilio"}
                  {...register("porta_auxilio", { required: true })}
                >
                  {[].map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
                <Select
                  disabled={modelo?.suspension?.type === "Fijo"}
                  label={"Suspensión"}
                  {...register("suspension", { required: true })}
                >
                  {[].map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
                <Select
                  disabled={modelo?.ojal_perno_rey?.type === "Fijo"}
                  label={"Ojal o Perno rey"}
                  {...register("ojal_perno_rey", { required: true })}
                >
                  {[].map((item) => (
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
                  {[].map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
                <Select
                  disabled={modelo?.divisor_cono?.type === "Fijo"}
                  label={"Divisor de Cono"}
                  {...register("divisor_cono", { required: true })}
                >
                  {[].map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
                <Select
                  disabled={modelo?.pbt_trabajo?.type === "Fijo"}
                  label={"Peso bruto total"}
                  {...register("pbt_trabajo", { required: true })}
                >
                  {[].map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
                <Select
                className="col-span-2"
                  disabled={modelo?.alt_trbj_plato_tractor_cargado?.type === "Fijo"}
                  label={"Alt. trabajo plato tractor"}
                  {...register("alt_trbj_plato_tractor_cargado", { required: true })}
                >
                  {[].map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
                <Select
                  disabled={modelo?.tipo_cabezal?.type === "Fijo"}
                  label={"Tipo de cabezal"}
                  {...register("tipo_cabezal", { required: true })}
                >
                  {[].map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
              </div>
            </CardToggle>
            <CardToggle
              className={"lg:max-w-[1000px] mx-auto mb-5"}
              title={"Llantas"}
            >
              <InputGroup label="Material" className="col-span-2">
                  <TextLabelGroup title={"Acero"} />
                  <SingleInputForGroup
                    label="Acero"
                    {...register("llantas_acero")}
                  />
                  <TextLabelGroup title={"Aluminio"} />
                  <SingleInputForGroup
                    label="Aluminio"
                    {...register("llantas_aluminio")}
                  />
                </InputGroup>
                <Select
                  disabled={modelo?.medidas?.type === "Fijo"}
                  label={"Medida"}
                  {...register("medidas", { required: true })}
                >
                  {[].map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
            </CardToggle>
          </>
        )}
    </>
  );
}
