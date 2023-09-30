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
    } else if (genericMessage.includes("ERC721: invalid token ID")) {
      return setErrorMessage(
        "Invalid ERC721 token ID provided. Please check and try again."
      );
    } else if (genericMessage.includes("execution reverted")) {
      return setErrorMessage(
        "Transaction execution was reverted. Please check the transaction details."
      );
    } else {
      return setErrorMessage("An error occurred");
    }
  } else {
    return setErrorMessage("An unknown error occurred.");
  }
};
