import { useFormContext } from "react-hook-form";
import { CardToggle } from "../Cards";
import {
  Input,
  Select,
  InputGroup,
  TextLabelGroup,
  SingleInputForGroup,
  SingleSelectForGroup,
} from "../Generales/Forms";
import { useAtributos } from "../../context/Attributes/AtributosContext";
import { useEffect, useState } from "react";
import { Modelo } from "../Modelo";
export default function DatosTecnico() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext({});
  const [modelo, setModelo] = useState(watch("selectedModelo"));
  const {
    puertasTraseras,
    piso,
    cumbrera,
    mecanismo,
    cilindro,
    arcos,
    materiales,
    colores,
    cajones,
    porta_auxilio,
    ojales,
    peso_bruto,
    trabajo_plato,
    cabezal,
    medida_llantas,
    getAllAtributes,
    allAtributes,
    ubicaciones,
  } = useAtributos();
  useEffect(() => {
    setModelo(watch("selectedModelo"));
  }, [watch("selectedModelo")]);

  const handleSelection = ({ data }) => {
    console.log("handleSelection:", data);
    const modelos = watch();
    setValue(`selectedModelo`, data);
    for (let attr in modelos) {
      if (data[attr])
        setValue(`${attr}`, data[attr].value, {
          shouldDirty: true,
        });
    }
  };
  const booleano = [
    { id: 1, descripcion: "Sí", valor: true, active: true },
    { id: 2, descripcion: "No", valor: false, active: true },
    { id: 3, descripcion: "N/A", valor: false, active: true },
  ];
  useEffect(() => {
    getAllAtributes();
  }, []);
  return (
    <>
      {allAtributes && (
        <>
          <CardToggle
            className={"lg:max-w-[1000px] mx-auto my-4"}
            title={"Datos Técnicos"}
          >
            <Modelo inputName={""} handleSelection={handleSelection} />
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
                {piso.map((item) => (
                  <option
                    key={`${item.descripcion}-${item.espesor}`}
                    value={item.descripcion}
                  >
                    {item.descripcion}
                  </option>
                ))}
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
                {materiales.map((item) => (
                  <option key={item.descripcion} value={item.descripcion}>
                    {item.descripcion}
                  </option>
                ))}
              </Select>
              <Select
                className="col-span-2"
                label={"Puerta trasera"}
                disabled={modelo?.puerta_trasera?.type === "Fijo"}
                {...register("puerta_trasera", { required: true })}
              >
                {puertasTraseras.map(
                  (item) =>
                    item.active == true && (
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
                {arcos.map(
                  (item) =>
                    item.active == true && (
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
                {arcos.map(
                  (item) =>
                    item.active == true && (
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
                <SingleInputForGroup label="Tipo" {...register("kit_acople")} />
                <TextLabelGroup title={"Adic."} />
                <SingleInputForGroup
                  label="Adicional"
                  {...register("kit_acople_adicional_fijo")}
                />
              </InputGroup>
            </div>
          </CardToggle>
          <CardToggle
            className={"lg:max-w-[1000px] mx-auto mb-4"}
            title={"Opciones de colores"}
          >
            <div className="flex gap-2">
              <Select
                disabled={modelo?.color_carrozado?.type === "Fijo"}
                label={"Carrozado"}
                {...register("color_carrozado", { required: true })}
              >
                {[
                  ...colores,
                  {
                    descripcion: "N/A",
                    active: true,
                    zona: "Carrozado y Franja",
                  },
                ].map(
                  (item) =>
                    item.active == true &&
                    item.zona == "Carrozado y Franja" && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
              </Select>
              <Select
                disabled={modelo?.color_franja?.type === "Fijo"}
                label={"Franja"}
                {...register("color_franja", { required: true })}
              >
                {[
                  ...colores,
                  {
                    descripcion: "N/A",
                    active: true,
                    zona: "Carrozado y Franja",
                  },
                ].map(
                  (item) =>
                    item.active == true &&
                    item.zona == "Carrozado y Franja" && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
              </Select>
              <Select
                disabled={modelo?.color_lona?.type === "Fijo"}
                label={"Lona para destape"}
                {...register("color_lona", { required: true })}
              >
                {[
                  ...colores,
                  { descripcion: "N/A", active: true, zona: "Lona destape" },
                ].map(
                  (item) =>
                    item.active == true &&
                    item.zona == "Lona destape" && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
              </Select>
              <Select
                disabled={modelo?.color_chasis?.type === "Fijo"}
                label={"Chasis"}
                {...register("color_chasis", { required: true })}
              >
                {[
                  ...colores,
                  { descripcion: "N/A", active: true, zona: "Chasis" },
                ].map(
                  (item) =>
                    item.active == true &&
                    item.zona == "Chasis" && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
              </Select>
            </div>
          </CardToggle>
          <CardToggle
            className={"lg:max-w-[1000px] mx-auto mb-4"}
            title={"Características Especiales"}
          >
            <div className="grid md:grid-cols-6 gap-2 grid-cols-3 mt-2">
              <Select
                disabled={modelo?.cajon?.type === "Fijo"}
                label={"Cajón de Htas"}
                {...register("cajon", { required: true })}
              >
                {cajones.map(
                  (item) =>
                    item.active == true && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
              </Select>
              <InputGroup label="Boquillas" className="col-span-2">
                <TextLabelGroup title={"Estándar"} />
                <SingleInputForGroup label="Estándar" {...register("boq_st")} />
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
                {porta_auxilio.map(
                  (item) =>
                    item.active == true && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
              </Select>
              <Select
                disabled={modelo?.suspension?.type === "Fijo"}
                label={"Suspensión"}
                {...register("suspension", { required: true })}
              >
                {mecanismo.map((item) => (
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
                {ojales.map(
                  (item) =>
                    item.active == true && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
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
              <Select
                disabled={modelo?.divisor_cono?.type === "Fijo"}
                label={"Divisor de Cono"}
                {...register("divisor_cono", { required: true })}
              >
                {booleano.map((item) => (
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
                {peso_bruto.map(
                  (item) =>
                    item.active == true && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
              </Select>
              <Select
                className="col-span-2"
                disabled={
                  modelo?.alt_trbj_plato_tractor_cargado?.type === "Fijo"
                }
                label={"Alt. trabajo plato tractor"}
                {...register("alt_trbj_plato_tractor_cargado", {
                  required: true,
                })}
              >
                {trabajo_plato.map(
                  (item) =>
                    item.active == true && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
              </Select>
              <Select
                disabled={modelo?.tipo_cabezal?.type === "Fijo"}
                label={"Tipo de cabezal"}
                {...register("tipo_cabezal", { required: true })}
              >
                {cabezal.map(
                  (item) =>
                    item.active == true && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
              </Select>
            </div>
          </CardToggle>
          <CardToggle
            className={"lg:max-w-[1000px] mx-auto mb-4"}
            title={"Accesorios y Llantas"}
          >
            <div className="grid md:grid-cols-8 gap-2 grid-cols-3 mt-2">
              <Select
                disabled={modelo?.levanta_eje?.type === "Fijo"}
                label={"Levanta eje"}
                {...register("levanta_eje", { required: true })}
              >
                {booleano.map((item) => (
                  <option key={item.descripcion} value={item.descripcion}>
                    {item.descripcion}
                  </option>
                ))}
              </Select>
              <Select
                disabled={modelo?.cajon_adicional?.type === "Fijo"}
                label={"Cajón adicional"}
                {...register("cajon_adicional", { required: true })}
              >
                {cajones.map(
                  (item) =>
                    item.active == true && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
              </Select>
              <Select
                disabled={modelo?.bulon_largo?.type === "Fijo"}
                label={"Bulón largo"}
                {...register("bulon_largo", { required: true })}
              >
                {booleano.map((item) => (
                  <option key={item.descripcion} value={item.descripcion}>
                    {item.descripcion}
                  </option>
                ))}
              </Select>
              <Select
                disabled={modelo?.rampa?.type === "Fijo"}
                label={"Rampa"}
                {...register("rampa", { required: true })}
              >
                {booleano.map((item) => (
                  <option key={item.descripcion} value={item.descripcion}>
                    {item.descripcion}
                  </option>
                ))}
              </Select>
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

              <InputGroup label="Llantas" className="col-span-2">
                <TextLabelGroup title={"Acero"} />
                <SingleInputForGroup
                  label="Acero"
                  {...register("llantas_acero")}
                />
                <TextLabelGroup title={"Aluminio"} />
                <SingleInputForGroup
                  label="Aluminio"
                  type="numeber"
                  {...register("llantas_aluminio")}
                />
              </InputGroup>
              <Select
                disabled={modelo?.medidas?.type === "Fijo"}
                label={"Medida"}
                {...register("medidas", { required: true })}
              >
                {medida_llantas.map(
                  (item) =>
                    item.active == true && (
                      <option key={item.descripcion} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    )
                )}
              </Select>
            </div>
          </CardToggle>
          <CardToggle
            className={"lg:max-w-[1000px] mx-auto mb-4"}
            title={"Características Especiales para Carrocerías"}
          >
            <div className="grid md:grid-cols-6 gap-2 grid-cols-3 mt-2">
              <InputGroup
                label="Cajón de Herramientas 1"
                className="col-span-3 w-full"
              >
                <TextLabelGroup title={"Medida"} />
                <SingleSelectForGroup
                  disabled={modelo?.cajon_carroceria_1?.type === "Fijo"}
                  label={"Cajón 1 medida"}
                  {...register("cajon_carroceria_1", { required: true })}
                >
                  {cajones.map(
                    (item) =>
                      item.active == true && (
                        <option key={item.descripcion} value={item.descripcion}>
                          {item.descripcion}
                        </option>
                      )
                  )}
                </SingleSelectForGroup>

                <TextLabelGroup title={"Ubicación"} />
                <SingleSelectForGroup
                  disabled={modelo?.cajon_carroceria_ubic_1?.type === "Fijo"}
                  label={"Cajón 1 medida"}
                  {...register("cajon_carroceria_ubic_1", { required: true })}
                >
                  {ubicaciones.map(
                    (item) =>
                      item.active == true && (
                        <option key={item.descripcion} value={item.descripcion}>
                          {item.descripcion}
                        </option>
                      )
                  )}
                </SingleSelectForGroup>
              </InputGroup>
              <InputGroup
                label="Cajón de Herramientas 2"
                className="col-span-3 w-full"
              >
                <TextLabelGroup title={"Medida"} />
                <SingleSelectForGroup
                  disabled={modelo?.cajon_carroceria_2?.type === "Fijo"}
                  label={"Cajón 3 medida"}
                  {...register("cajon_carroceria_2", { required: true })}
                >
                  {cajones.map(
                    (item) =>
                      item.active == true && (
                        <option key={item.descripcion} value={item.descripcion}>
                          {item.descripcion}
                        </option>
                      )
                  )}
                </SingleSelectForGroup>

                <TextLabelGroup title={"Ubicación"} />
                <SingleSelectForGroup
                  disabled={modelo?.cajon_carroceria_ubic_2?.type === "Fijo"}
                  label={"Cajón 1 medida"}
                  {...register("cajon_carroceria_ubic_2", { required: true })}
                >
                  {ubicaciones.map(
                    (item) =>
                      item.active == true && (
                        <option key={item.descripcion} value={item.descripcion}>
                          {item.descripcion}
                        </option>
                      )
                  )}
                </SingleSelectForGroup>
              </InputGroup>
              <InputGroup label="Tanques de agua" className="col-span-3 w-full">
                <TextLabelGroup title={"1"} />
                <SingleSelectForGroup
                  disabled={modelo?.tanq_agua_1?.type === "Fijo"}
                  label={"tanque 1"}
                  {...register("tanq_agua_1", { required: true })}
                >
                  {ubicaciones.map(
                    (item) =>
                      item.active == true && (
                        <option key={item.descripcion} value={item.descripcion}>
                          {item.descripcion}
                        </option>
                      )
                  )}
                </SingleSelectForGroup>

                <TextLabelGroup title={"2"} />
                <SingleSelectForGroup
                  disabled={modelo?.tanq_agua_2?.type === "Fijo"}
                  label={"tanque 2"}
                  {...register("tanq_agua_2", { required: true })}
                >
                  {ubicaciones.map(
                    (item) =>
                      item.active == true && (
                        <option key={item.descripcion} value={item.descripcion}>
                          {item.descripcion}
                        </option>
                      )
                  )}
                </SingleSelectForGroup>
              </InputGroup>
              <InputGroup label="Boquillas" className="col-span-2 w-full">
                <TextLabelGroup title={"Delantera"} />
                <SingleInputForGroup
                  label="Delantera"
                  {...register("boq_st_delantera")}
                />
                <TextLabelGroup title={"Trasera"} />
                <SingleInputForGroup
                  label="Trasera"
                  {...register("boq_st_trasera")}
                />
              </InputGroup>
              <Input
                type="number"
                label={"Cajon en frente"}
                disabled={modelo?.cajon_frente?.type === "Fijo"}
                {...register("cajon_frente", { required: true })}
              />
            </div>
          </CardToggle>
        </>
      )}
    </>
  );
}
