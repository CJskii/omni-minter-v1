import Image from "next/image";
import { NetworkModalProps } from "../../../types/network";

const NetworkModal = ({
  selectedNetwork,
  onNetworkSelect,
  searchTerm,
  onSearchChange,
  filteredChains,
  dialogId,
  onClose,
  title,
  contractProvider,
}: NetworkModalProps) => {
  // TODO: Implement filtering of available networks based on contract provider
  return (
    <>
      <button
        className="w-full"
        onClick={() => {
          const elem = document.getElementById(dialogId);
          if (elem instanceof HTMLDialogElement) {
            elem.showModal();
          }
        }}
      >
        <div className="w-full">
          <a className="flex gap-[15px] py-2 justify-start px-4 items-center border-base-100 border-[1px]">
            <Image
              src={selectedNetwork.iconUrl || ""}
              width={30}
              height={30}
              alt={selectedNetwork.name}
            />
            <div className="flex flex-col justify-start items-start text-lg">
              <span className="text-neutral">NETWORK</span>
              <span className="font-bold">{selectedNetwork.name}</span>
            </div>
          </a>
        </div>
      </button>

      <dialog id={dialogId} className="modal">
        <form method="dialog" className="modal-box p-0 h-[75vh] scrollbar-hide">
          <h3 className="font-bold text-lg py-2 px-4">
            Select {title} Network
          </h3>
          <input
            type="text"
            className="input input-bordered w-full mb-2 text-sm"
            placeholder="Search for a network..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <ul className="menu bg-base-200 w-full bg-transparent rounded-box scrollbar-hide">
            {filteredChains.map((network) => (
              <li
                className="w-full"
                key={network.name}
                onClick={() => {
                  onNetworkSelect(network);
                  onClose(dialogId);
                }}
              >
                <a className="flex gap-4">
                  <Image
                    src={network.iconUrl || ""}
                    width={30}
                    height={30}
                    alt={network.name}
                  />
                  <div className="flex flex-col text-lg">
                    <span className="text-neutral-content">{network.name}</span>
                    <span className="text-neutral">
                      {network.nativeCurrency.symbol}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default NetworkModal;
