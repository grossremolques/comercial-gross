import { useFormContext } from "react-hook-form";
import { CardToggle } from "../Cards";
import {
  Input,
  Select,
  InputGroup,
  TextLabelGroup,
  SingleInputForGroup,
  SingleSelectForGroup,
  Textarea,
} from "../Generales/Forms";
import { useAtributos } from "../../context/Attributes/AtributosContext";
import { useEffect, useState } from "react";
import { Modelo } from "../Modelo";
export default function DatosTecnico({ getModelo }) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext({});
  const [modelo, setModelo] = useState(watch("selectedModelo"));
  const { atributos, modelos } = useAtributos();
  useEffect(() => {
    getModelo(watch("selectedModelo"));
    setModelo(watch("selectedModelo"));
  }, [watch("selectedModelo")]);

  const handleSelection = ({ data }) => {
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
  const RenderOptions = ({ atributo }) => {
    return (
      <>
        {atributos.map(
          (item) =>
            item.atributo === atributo &&
            item.active == true && (
              <option key={item.id} value={item.valor}>
                {item.valor}
              </option>
            )
        )}
        <option value={"N/A"}>
                {"N/A"}
              </option>
      </>
    );
  };
  return (
    <>
      {atributos.length > 0 && modelos.length> 0 && (
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
                <RenderOptions atributo={"cumbrera"} />
              </Select>
              <Select
                label={"Piso"}
                disabled={modelo?.piso?.type === "Fijo"}
                {...register("piso", { required: true })}
              >
                <RenderOptions atributo={"piso"} />
              </Select>
              <Select
                disabled={modelo?.espesor?.type === "Fijo"}
                label={"Espesor"}
                {...register("espesor", { required: true })}
              >
                <RenderOptions atributo={"espesor"} />
              </Select>
              <Select
                label={"Material"}
                disabled={modelo?.material?.type === "Fijo"}
                {...register("material", { required: true })}
              >
                <RenderOptions atributo={"material"} />
              </Select>
              <Select
                className="col-span-2"
                label={"Puerta trasera"}
                disabled={modelo?.puerta_trasera?.type === "Fijo"}
                {...register("puerta_trasera", { required: true })}
              >
                <RenderOptions atributo={"puerta_trasera"} />
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
                <RenderOptions atributo={"arcos"} />
              </Select>
              <Select
                label={"Arcos extremos"}
                disabled={modelo?.arcos_extremos?.type === "Fijo"}
                {...register("arcos_extremos", { required: true })}
              >
                <RenderOptions atributo={"arcos"} />
              </Select>
              <InputGroup
                label="Seguros en puertas/barandas"
                className="col-span-2"
              >
                <TextLabelGroup title={"Lateral"} />
                <SingleInputForGroup
                  disabled={modelo?.seg_lat?.type === "Fijo"}
                  label="Seguro lateral"
                  {...register("seg_lat")}
                />
                <TextLabelGroup title={"Trasero"} />
                <SingleInputForGroup
                  disabled={modelo?.seg_tras?.type === "Fijo"}
                  label="Seguro trasero"
                  {...register("seg_tras")}
                />
              </InputGroup>
              <InputGroup label="Kit de acoples" className="col-span-2">
                <TextLabelGroup title={"Tipo"} />
                <SingleInputForGroup
                  disabled={modelo?.kit_acople?.type === "Fijo"}
                  label="Tipo"
                  {...register("kit_acople")}
                />
                <TextLabelGroup title={"Adic."} />
                <SingleInputForGroup
                  disabled={modelo?.kit_acople_adicional_fijo?.type === "Fijo"}
                  label="Adicional"
                  {...register("kit_acople_adicional_fijo")}
                />
              </InputGroup>
            </div>
          </CardToggle>
          <CardToggle
            className={"lg:max-w-[1000px] mx-auto my-4 sr-only"}
            title={"Datos Ocultos"}
          >
            <Input
              type="text"
              label={"Tipo"}
              disabled={modelo?.tipo?.type === "Fijo"}
              {...register("tipo", { required: true })}
            />
            <Input
              type="text"
              label={"Eje"}
              disabled={modelo?.ejes?.type === "Fijo"}
              {...register("ejes", { required: true })}
            />
            <Input
              type="text"
              label={"Carrozado"}
              disabled={modelo?.carrozado?.type === "Fijo"}
              {...register("carrozado", { required: true })}
            />
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
                <RenderOptions atributo={"color"} />
              </Select>
              <Select
                disabled={modelo?.color_franja?.type === "Fijo"}
                label={"Franja"}
                {...register("color_franja", { required: true })}
              >
                <RenderOptions atributo={"color"} />
              </Select>
              <Select
                disabled={modelo?.color_lona?.type === "Fijo"}
                label={"Lona para destape"}
                {...register("color_lona", { required: true })}
              >
                <RenderOptions atributo={"color_lona_destape"} />
              </Select>
              <Select
                disabled={modelo?.color_chasis?.type === "Fijo"}
                label={"Chasis"}
                {...register("color_chasis", { required: true })}
              >
                <RenderOptions atributo={"color_chasis"} />
              </Select>
            </div>
          </CardToggle>
          <div
            className={`${modelo?.tipo?.value === "Carrocería" && "sr-only"}`}
          >
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
                  <RenderOptions atributo={"cajon"} />
                </Select>
                <InputGroup label="Boquillas" className="col-span-2">
                  <TextLabelGroup title={"Estándar"} />
                  <SingleInputForGroup
                    disabled={modelo?.boq_st?.type === "Fijo"}
                    label="Estándar"
                    {...register("boq_st")}
                  />
                  <TextLabelGroup title={"Oculta"} />
                  <SingleInputForGroup
                    disabled={modelo?.boq_oculta?.type === "Fijo"}
                    label="Oculta"
                    {...register("boq_oculta")}
                  />
                </InputGroup>
                <Select
                  disabled={modelo?.porta_auxilio?.type === "Fijo"}
                  label={"Porta auxilio"}
                  {...register("porta_auxilio", { required: true })}
                >
                  <RenderOptions atributo={"porta_auxilio"} />
                </Select>
                <Select
                  disabled={modelo?.suspension?.type === "Fijo"}
                  label={"Suspensión"}
                  {...register("suspension", { required: true })}
                >
                  <RenderOptions atributo={"mecanismo"} />
                </Select>
                <Select
                  disabled={modelo?.ojal_perno_rey?.type === "Fijo"}
                  label={"Ojal o Perno rey"}
                  {...register("ojal_perno_rey", { required: true })}
                >
                  <RenderOptions atributo={"ojla_perno_rey"} />
                </Select>
                <Select
                  disabled={modelo?.cilindro?.type === "Fijo"}
                  label={"Cilindro"}
                  {...register("cilindro", { required: true })}
                >
                  <RenderOptions atributo={"cilindro"} />
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
                  disabled={modelo?.peso_bruto_total?.type === "Fijo"}
                  label={"Peso bruto total"}
                  {...register("peso_bruto_total", { required: true })}
                >
                  <RenderOptions atributo={"peso_bruto_total"} />
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
                  <RenderOptions atributo={"altura_trabajo"} />
                </Select>
                <Select
                  disabled={modelo?.tipo_cabezal?.type === "Fijo"}
                  label={"Tipo de cabezal"}
                  {...register("tipo_cabezal", { required: true })}
                >
                  <RenderOptions atributo={"cabezal"} />
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
                  <RenderOptions atributo={"cajon"} />
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
                  <RenderOptions atributo={"mecanismo"} />
                </Select>

                <InputGroup label="Llantas" className="col-span-2">
                  <TextLabelGroup title={"Acero"} />
                  <SingleInputForGroup
                    label="Acero"
                    disabled={modelo?.llantas_acero?.type === "Fijo"}
                    {...register("llantas_acero")}
                  />
                  <TextLabelGroup title={"Aluminio"} />
                  <SingleInputForGroup
                    label="Aluminio"
                    type="numeber"
                    disabled={modelo?.llantas_aluminio?.type === "Fijo"}
                    {...register("llantas_aluminio", { required: true })}
                  />
                </InputGroup>
                <Select
                  disabled={modelo?.medidas?.type === "Fijo"}
                  label={"Medida"}
                  {...register("medidas", { required: true })}
                >
                  <RenderOptions atributo={"medida_llanta"} />
                </Select>
              </div>
            </CardToggle>
          </div>
          <div
            className={`${modelo?.tipo?.value != "Carrocería" && "sr-only"}`}
          >
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
                    <RenderOptions atributo={"cajon"} />
                  </SingleSelectForGroup>

                  <TextLabelGroup title={"Ubicación"} />
                  <SingleSelectForGroup
                    disabled={modelo?.cajon_carroceria_ubic_1?.type === "Fijo"}
                    label={"Cajón 1 medida"}
                    {...register("cajon_carroceria_ubic_1", { required: true })}
                  >
                    <RenderOptions atributo={"ubicacion"} />
                  </SingleSelectForGroup>
                </InputGroup>
                <InputGroup
                  label="Cajón de Herramientas 2"
                  className="col-span-3 w-full"
                >
                  <TextLabelGroup title={"Medida"} />
                  <SingleSelectForGroup
                    disabled={modelo?.cajon_carroceria_2?.type === "Fijo"}
                    label={"Cajón 2 medida"}
                    {...register("cajon_carroceria_2", { required: true })}
                  >
                    <RenderOptions atributo={"cajon"} />
                  </SingleSelectForGroup>

                  <TextLabelGroup title={"Ubicación"} />
                  <SingleSelectForGroup
                    disabled={modelo?.cajon_carroceria_ubic_2?.type === "Fijo"}
                    label={"Cajón 1 medida"}
                    {...register("cajon_carroceria_ubic_2", { required: true })}
                  >
                    <RenderOptions atributo={"ubicacion"} />
                  </SingleSelectForGroup>
                </InputGroup>
                <InputGroup
                  label="Tanques de agua"
                  className="col-span-3 w-full"
                >
                  <TextLabelGroup title={"1"} />
                  <SingleSelectForGroup
                    disabled={modelo?.tanq_agua_1?.type === "Fijo"}
                    label={"tanque 1"}
                    {...register("tanq_agua_1", { required: true })}
                  >
                    <RenderOptions atributo={"ubicacion"} />
                  </SingleSelectForGroup>

                  <TextLabelGroup title={"2"} />
                  <SingleSelectForGroup
                    disabled={modelo?.tanq_agua_2?.type === "Fijo"}
                    label={"tanque 2"}
                    {...register("tanq_agua_2", { required: true })}
                  >
                    <RenderOptions atributo={"ubicacion"} />
                  </SingleSelectForGroup>
                </InputGroup>
                <InputGroup label="Boquillas" className="col-span-2 w-full">
                  <TextLabelGroup title={"Delantera"} />
                  <SingleInputForGroup
                    label="Delantera"
                    disabled={modelo?.boq_st_delantera?.type === "Fijo"}
                    {...register("boq_st_delantera")}
                  />
                  <TextLabelGroup title={"Trasera"} />
                  <SingleInputForGroup
                    label="Trasera"
                    disabled={modelo?.boq_st_trasera?.type === "Fijo"}
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
          </div>
          <div
            className={`${
              !modelo?.carrozado?.value.toLocaleLowerCase().includes("sider") &&
              "sr-only"
            }`}
          >
            <CardToggle
              className={"lg:max-w-[1000px] mx-auto mb-4"}
              title={"Características para Siders"}
            >
              <div className="grid md:grid-cols-11 gap-2 grid-cols-3 mt-2">
                <Select
                  disabled={modelo?.lona_con_logo?.type === "Fijo"}
                  label={"Logo"}
                  {...register("lona_con_logo", { required: true })}
                >
                  {booleano.map((item) => (
                    <option key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Select>
                <Select
                  className="col-span-2"
                  disabled={modelo?.lona_color_lateral?.type === "Fijo"}
                  label={"Color de Lona"}
                  {...register("lona_color_lateral", { required: true })}
                >
                  <RenderOptions atributo={"color_lona_sider"} />
                </Select>
                <Select
                  className="col-span-2"
                  disabled={modelo?.estira_lona?.type === "Fijo"}
                  label={"Estira lona"}
                  {...register("estira_lona", { required: true })}
                >
                  <RenderOptions atributo={"estira_lona"} />
                </Select>
                <Select
                  className="col-span-2"
                  disabled={modelo?.techo?.type === "Fijo"}
                  label={"Techo"}
                  {...register("techo", { required: true })}
                >
                  <RenderOptions atributo={"techo"} />
                </Select>
                <InputGroup label="Ventilados" className="col-span-4 w-full">
                  <TextLabelGroup title={"Cantidad"} />
                  <SingleInputForGroup
                    label="Cantidad"
                    disabled={modelo?.ventilados_cant?.type === "Fijo"}
                    {...register("ventilados_cant")}
                  />

                  <TextLabelGroup title={"Luz_entre_ventilados"} />
                  <SingleInputForGroup
                    label="Luz entre ventilados"
                    disabled={modelo?.ventilados_ubic_alt?.type === "Fijo"}
                    {...register("ventilados_ubic_alt")}
                  />
                </InputGroup>
              </div>
            </CardToggle>
          </div>
          <div className={"lg:max-w-[1000px] mx-auto mb-4"}>
            <Textarea
              label="Información adicional"
              placeholder="Los requerimientos ingresados en este apartado deben estar abalados por oficina técnica, de lo contrario puede estar sugeto a revisión."
              {...register("informacion_adicional")}
            />
          </div>
        </>
      )}
    </>
  );
}
