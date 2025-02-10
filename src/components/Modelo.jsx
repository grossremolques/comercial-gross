import { Input, Label, TextInvalidate } from "./Forms";
import { BuscarModelo } from "../templates/BuscarModelo";
import { PlusIcon, PencilIcon, TruckIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { Modal } from "./Modal";
import { useModal } from "../context/ModalContext";
import Button from "./Buttons";
import { useAtrubutos } from "../context/Attributes/AtributosContext";
export function Modelo({ register, errors, setSelectModelo }) {
  const { handleModalShow, handleModalClose } = useModal();
const {modelos, getModelos} = useAtrubutos();
  useEffect(() => {
    getModelos();
  }, []);
  
  const handleAddModelo = () => {
    console.log('➕ Add client')
  };
  const handleEditModelo = () => {
    console.log('✏️ Edit client')
  };
  return (
    <>
      <Label label={"Seleccionar modelo"} htmlFor={"modelo"} />
      <div className="flex gap-1">
      <Input
        placeholder={"Buscar Modelo"}
        onClick={() => handleModalShow("findModelo")}
        {...register("modelo", {
          required: {
            value: "Debe seleccionar un modelo",
            message: "Debe seleccionar un modelo",
          },
        })}
      />
      <Button
        onClick={handleAddModelo}
      >
        <PlusIcon width={"20px"} />
      </Button>
      <Button
        onClick={handleEditModelo}
        variant="primaryOutline"
      >
        <PencilIcon width={"20px"} />
      </Button>
      </div>
      {errors.modelo && <TextInvalidate message={errors.modelo.message} />}
      <Modal
        modalId={"findModelo"}
        title={"Buscar Modelo"}
        variant="primary"
        icon={<TruckIcon width={"24px"} />}
      >
        <div className="mt-4">
          <BuscarModelo
            data={modelos}
            setSelectModelo={setSelectModelo}
            handleModalClose={handleModalClose}
          />
        </div>
      </Modal>
    </>
  );
}
