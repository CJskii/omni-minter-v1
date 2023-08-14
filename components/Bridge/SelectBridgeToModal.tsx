import Image from "next/image";
import { useState, useEffect } from "react";
import { activeChains } from "../../constants/chainsConfig";

type Network = {
  id: number;
  name: string;
  network: string;
  iconUrl?: string;
  iconBackground?: string;
  nativeCurrency: {
    decimals: number;
    name: string;
    symbol: string;
  };
  [key: string]: any;
};

interface BridgeProps {
  setToNetwork: (key: string) => void;
  fromNetwork: string;
}

const SelectBridgeToModal = (props: BridgeProps) => {
  const { fromNetwork, setToNetwork } = props;
  const defaultNetwork =
    activeChains.find((net) => net.name === "Sepolia") || activeChains[0];
  const [selectedNetwork, setSelectedNetwork] =
    useState<Network>(defaultNetwork);

  useEffect(() => {
    setToNetwork(selectedNetwork.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <button
        className="btn-square w-full"
        onClick={() => (window as any).toNetworkModal.showModal()}
      >
        <div className="w-full">
          <a className="flex gap-[15px] py-2 justify-start px-4 items-center border-base-100 border-[1px]">
            <Image
              src={selectedNetwork.iconUrl ? selectedNetwork.iconUrl : ""}
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
      <dialog id="toNetworkModal" className="modal">
        <form method="dialog" className="modal-box p-0">
          <h3 className="font-bold text-lg py-2 px-4">Select To Network</h3>{" "}
          <ul className="menu bg-base-200 w-full bg-transparent rounded-box scrollbar-hide">
            {activeChains
              .filter((net) => net.name !== fromNetwork)
              .map((network) => (
                <li
                  className="w-full"
                  key={network.name}
                  onClick={() => setToNetwork(network.name)}
                >
                  <a
                    className="flex gap-4"
                    onClick={() => {
                      setSelectedNetwork(network);
                      (window as any).toNetworkModal.close();
                    }}
                  >
                    <Image
                      src={network.iconUrl ? network.iconUrl : ""}
                      width={30}
                      height={30}
                      alt={network.name}
                    />
                    <div className="flex flex-col text-lg">
                      <span className="text-neutral-content">
                        {network.name}
                      </span>
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
    </div>
  );
};

export default SelectBridgeToModal;
