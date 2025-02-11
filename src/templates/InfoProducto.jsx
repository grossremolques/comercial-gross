import { CardToggle } from "../components/Cards";
import { Label, Input, Select, TextInvalidate } from "../components/Forms";
import { useAtrubutos } from "../context/Attributes/AtributosContext";
import { useEffect, useState } from "react";
import { Modelo } from "../components/Modelo";
export const InfoProducto = ({
  register,
  errors,
  setValue,
  watch,
  reset,
  data,
}) => {
  const {} = register("dataModelo");
  const [selectModelo, setSelectModelo] = useState(data.dataModelo);
  const attr = [
    "largo",
    "ancho",
    "alto",
    "capacidad",
    "cant_puertas_laterales",
    "altura_baranda",
    "puerta_trasera",
    "piso",
    "espesor",
    "cumbrera_lateral",
    "cajon",
    "tara",
    "traba_puerta",
    "cilindro",
  ];
  useEffect(() => {
    setValue("dataModelo", selectModelo);
    setValue("modelo", selectModelo?.modelo.value);
    attr.forEach((item) => {
      setValue(
        item,
        selectModelo?.[item].type === "Fijo"
          ? selectModelo[item].value
          : data[item]
      );
    });
  }, [selectModelo]);
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
  return (
    <>
      {}
      {modelos.length > 0 && puertasTraseras.length > 0 && (
        <CardToggle
          className={"lg:max-w-[1000px] mx-auto mb-5"}
          title={"Datos del Producto"}
        >
          <Modelo
            register={register}
            errors={errors}
            setSelectModelo={setSelectModelo}
          />
          <h3 className="font-medium text-lg mt-4 mb-2 text-gray-700">
            Medidas
          </h3>
          <div className="columns-4">
            <div>
              <Label label={"Largo"} htmlFor={"largo"} />
              <Input
                readOnly={selectModelo?.largo.type === "Fijo"}
                type="number"
                {...register("largo", { required: true })}
              />
            </div>
            <div>
              <Label label={"Ancho"} htmlFor={"ancho"} />
              <Input
                readOnly={selectModelo?.ancho.type === "Fijo"}
                type="number"
                {...register("ancho", { required: true })}
              />
            </div>
            <div>
              <Label label={"Alto"} htmlFor={"alto"} />
              <Input
                readOnly={selectModelo?.alto.type === "Fijo"}
                type="number"
                {...register("alto", { required: true })}
              />
            </div>
            <div>
              <Label label={"Capacidad"} htmlFor={"capacidad"} />
              <Select
                disabled={selectModelo?.capacidad.type === "Fijo"}
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
                readOnly={selectModelo?.cant_puertas_laterales.type === "Fijo"}
                {...register("cant_puertas_laterales", { required: true })}
              />

              <Label label={"Altura de baranda"} htmlFor={"altura_baranda"} />
              <Input
                type="number"
                readOnly={selectModelo?.altura_baranda.type === "Fijo"}
                {...register("altura_baranda", { required: true })}
              />

              <Label label={"Puerta trasera"} htmlFor={"puerta_trasera"} />
              <Select
                disabled={selectModelo?.puerta_trasera.type === "Fijo"}
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
                disabled={selectModelo?.piso.type === "Fijo"}
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
                disabled={selectModelo?.espesor.type === "Fijo"}
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
                disabled={selectModelo?.cumbrera_lateral.type === "Fijo"}
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
                readOnly={selectModelo?.cajon.type === "Fijo"}
                type="number"
                {...register("cajon", { required: true })}
              />

              <Label label={"Tara"} htmlFor={"tara"} />
              <Input
                readOnly={selectModelo?.tara?.type === "Fijo"}
                type="number"
                {...register("tara", { required: true })}
              />

              <Label label={"Traba de puerta"} htmlFor={"traba_puerta"} />
              <Select
                disabled={selectModelo?.traba_puerta.type === "Fijo"}
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
                disabled={selectModelo?.cilindro.type === "Fijo"}
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
