import { useEffect, useRef } from "react";
import DisplayModalMessage from "./DisplayModalMessage";
import { UserRewardModal } from "../../../types/rewards";

const UserRewardModal = (props: UserRewardModal) => {
  const { showRewardModal, setShowRewardModal, isLoading, response } = props;
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    if (showRewardModal && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!showRewardModal && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [showRewardModal]);

  return (
    <div>
      <dialog ref={dialogRef} id="my_reward_modal" className="modal">
        <form
          method="dialog"
          className="modal-box p-0 flex justify-center items-center"
        >
          {isLoading && showRewardModal ? (
            <span className="loading loading-infinity w-[4rem] h-[4rem]"></span>
          ) : (
            <DisplayModalMessage
              showRewardModal={showRewardModal}
              response={response}
              setShowRewardModal={setShowRewardModal}
              dialogRef={dialogRef}
            />
          )}
        </form>
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={() => {
            if (dialogRef.current) {
              dialogRef.current.close();
            }
            setShowRewardModal(false);
          }}
        />
      </dialog>
    </div>
  );
};

export default UserRewardModal;
