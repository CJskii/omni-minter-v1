import { useState, useEffect } from "react";
import { activeChains } from "../../constants/chainsConfig";
import { useNetwork } from "wagmi";
import { Network } from "../../types/network";

export const useNetworkSelection = (
  initialNetwork: Network,
  filterFn: (network: Network) => boolean = () => true
) => {
  const { chain } = useNetwork();
  const [selectedNetwork, setSelectedNetwork] = useState(
    initialNetwork || activeChains[0]
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (chain?.name) {
      const updatedNetwork =
        activeChains.find((net) => net.name === chain.name) || activeChains[0];
      setSelectedNetwork(updatedNetwork);
    }
  }, [chain]);

  const filteredChains = activeChains.filter(
    (network) =>
      filterFn(network) &&
      network.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onNetworkSelect = (network: Network) => {
    setSelectedNetwork(network);
  };

  const onSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const onClose = (dialogId: string) => {
    const dialog = document.getElementById(dialogId);
    if (dialog instanceof HTMLDialogElement) {
      dialog.close();
    }
  };

  return {
    selectedNetwork,
    onNetworkSelect,
    searchTerm,
    onSearchChange,
    filteredChains,
    onClose,
  };
};
