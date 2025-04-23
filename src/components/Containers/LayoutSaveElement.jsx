
import { BoxComponentScrolling } from "../BoxComponent";
import { Modal } from "../Modal";
import { ModalLoading } from "../Modal";
import Button from "../Generales/Buttons";
export default function LayoutSaveElement({
  hedearTitle,
  children,
  modalLoadingTitle,
  modalResponsetextButton,
  handleResponseButtonClick,
  response,
}) {
  return (
    <>
      <BoxComponentScrolling title={hedearTitle} height="calc(100vh - 10rem)">
        <div className="mt-4">{children}</div>
        <ModalLoading id={"modal-loading"} title={modalLoadingTitle} />
      </BoxComponentScrolling>
      {response && (
        <Modal
          modalId={"modal-response"}
          title={
            response.type === "success" ? "¡Todo marcha bien!" : "Algo anda mal"
          }
          variant={response.type}
        >
          <div className="flex flex-col gap-4">
            {response.message}
            <Button
              className="max-w-50 mx-auto"
              text={modalResponsetextButton}
              variant={"primary"}
              onClick={handleResponseButtonClick}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
