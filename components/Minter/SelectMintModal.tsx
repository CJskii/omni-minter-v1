import Image from "next/image";
import { useEffect, useState } from "react";
import { activeChains } from "../../constants/chainsConfig";
import { useNetwork } from "wagmi";

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

type MintModalProps = {
  setMintNetwork: (network: string) => void;
};

const SelectMintModal = (props: MintModalProps) => {
  const defaultNetwork = activeChains[0];
  const [selectedNetwork, setSelectedNetwork] =
    useState<Network>(defaultNetwork);
  const { chain } = useNetwork();

  useEffect(() => {
    let selected = defaultNetwork;

    if (chain?.name && !chain.unsupported) {
      selected =
        activeChains.find((net) => net.name === chain.name) || defaultNetwork;
    }

    setSelectedNetwork(selected);
  }, [chain]);

  return (
    <div>
      <button
        className="btn-square w-full"
        onClick={() => (window as any).my_modal_2.showModal()}
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
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box p-0">
          <h3 className="font-bold text-lg py-2 px-4">Select Mint Network</h3>

          <ul className="menu bg-base-200 w-full bg-transparent rounded-box scrollbar-hide">
            {activeChains.map((network) => (
              <li
                className="w-full"
                key={network.name}
                onClick={() => props.setMintNetwork(network.name)}
              >
                <a
                  className="flex gap-4"
                  onClick={() => {
                    setSelectedNetwork(network);
                    (window as any).my_modal_2.close();
                  }}
                >
                  <Image
                    src={network.iconUrl ? network.iconUrl : ""}
                    width={30}
                    height={30}
                    alt={network.name}
                  />
                  <div className="flex flex-col text-lg">
                    <span className="text-neutral-content">{network.name}</span>
                    <span className="text-neutral">
                      {network.nativeCurrency.symbol}
                    </span>{" "}
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

export default SelectMintModal;
