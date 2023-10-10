export const requestNetworkSwitch = async (
  networkChainId: number,
  openChainModal: any
) => {
  const hexChainId = `0x${parseInt(networkChainId.toString(), 10).toString(
    16
  )}`;
  try {
    if (!window.ethereum) throw new Error("Ethereum provider not found");
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexChainId }],
    });
  } catch (switchError) {
    console.error(switchError);
    if ((switchError as any).code === 4902 && openChainModal) {
      openChainModal();
    }
    throw switchError;
  }
};
