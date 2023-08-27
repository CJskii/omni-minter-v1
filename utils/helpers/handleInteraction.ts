import { updateMintData } from "../api/mintAPI";
import { updateBridgeData } from "../api/bridgeAPI";

const handleApiResponse = (response: any, operation: string) => {
  if (response.status === 200) {
    console.log(`${operation} data updated`);
  } else {
    console.log(`${operation} data update failed`);
    console.log(response);
  }
};

const handleInteraction = async ({
  address,
  isInvited = false,
  operation,
}: {
  address: string;
  isInvited?: boolean;
  operation: string;
}) => {
  const user = { address, isInvited };
  switch (operation) {
    case "new_mint":
      updateMintData({ user }).then((response) =>
        handleApiResponse(response, "Mint")
      );
      break;
    case "new_bridge":
      updateBridgeData(address).then((response) =>
        handleApiResponse(response, "Bridge")
      );
      break;
    default:
      break;
  }
};

export default handleInteraction;
