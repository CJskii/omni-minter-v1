export const handleErrors = ({
  e,
  setErrorMessage,
}: {
  e: any;
  setErrorMessage: (message: string) => void;
}) => {
  const dataMessage = (e as any).data?.message;
  const genericMessage = (e as any)?.message;
  if (dataMessage) {
    if (
      dataMessage.includes("insufficient funds") ||
      dataMessage.includes(
        "rpc error: code = Unknown desc = rpc error: code = Internal desc = insufficient balance for transfer: unknown request"
      ) ||
      dataMessage.includes("insufficient balance for transfer")
    ) {
      return setErrorMessage(
        "You have insufficient funds to complete this transaction."
      );
    } else if (dataMessage.includes("ERC721: invalid token ID")) {
      return setErrorMessage(
        "Invalid ERC721 token ID provided. Please check and try again."
      );
    } else if (dataMessage.includes("send caller is not owner nor approved")) {
      return setErrorMessage(
        "You are not the owner of this token. Please check your NFT ID and try again."
      );
    } else if (dataMessage.includes("gas too low")) {
      return setErrorMessage(
        "Gas too low. Please try again with a higher gas limit."
      );
    } else if (
      dataMessage.includes(
        "execution reverted: Relayer: dstNativeAmt too large"
      )
    ) {
      return setErrorMessage(
        "The amount you are trying to transfer is too large. Please try again with a smaller amount."
      );
    } else if (dataMessage.includes("execution reverted")) {
      return setErrorMessage(
        "Transaction execution was reverted. Please check the transaction details."
      );
    } else {
      return setErrorMessage(dataMessage);
    }
  } else if (genericMessage) {
    if (genericMessage.includes("insufficient funds")) {
      return setErrorMessage(
        "You have insufficient funds to complete this transaction."
      );
    } else if (
      genericMessage.includes("insufficient OFT balance for transfer")
    ) {
      return setErrorMessage(
        "You have insufficient amount of tokens to complete this transaction. Please check your balance and try again."
      );
    } else if (genericMessage.includes("gas too low")) {
      return setErrorMessage(
        "Gas too low. Please try again with a higher gas limit."
      );
    } else if (genericMessage.includes("ERC721: invalid token ID")) {
      return setErrorMessage(
        "Invalid ERC721 token ID provided. Please check and try again."
      );
    } else if (
      genericMessage.includes("send caller is not owner nor approved")
    ) {
      return setErrorMessage(
        "You are not the owner of this token. Please check your NFT ID and try again."
      );
    } else if (genericMessage.includes("user rejected")) {
      return setErrorMessage(
        "Transaction rejected. Please check your wallet and try again."
      );
    } else if (genericMessage.includes("execution reverted")) {
      return setErrorMessage(
        "Transaction execution was reverted. Please check the transaction details."
      );
    } else if (genericMessage.includes("Unrecognized chain ID")) {
      return setErrorMessage(
        "Unrecognised network. Please add source chain to your wallet and try again."
      );
    } else if (genericMessage.includes("dstNativeAmt too large")) {
      return setErrorMessage(
        "The amount you are trying to transfer is too large. Please try again with a smaller amount."
      );
    } else if (genericMessage.includes("invalid arrayify value")) {
      return setErrorMessage(
        "Invalid address provided. Please check and try again."
      );
    } else {
      return setErrorMessage(
        `An error occurred: ${dataMessage ? dataMessage : genericMessage}`
      );
    }
  } else {
    return setErrorMessage("An unknown error occurred.");
  }
};
