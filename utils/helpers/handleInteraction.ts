import { updateMintData } from "../api/mintAPI";
import { updateBridgeData } from "../api/bridgeAPI";
import { createUser } from "../api/createUserAPI";
import { checkIfReferredUser } from "./checkIfReferredUser";

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
  referredBy = "",
  operation,
}: {
  address: string;
  isInvited?: boolean;
  referredBy?: string;
  operation: string;
}) => {
  switch (operation) {
    case "new_mint":
      const user = { address, isInvited, referredBy };
      updateMintData({ user }).then((response) =>
        handleApiResponse(response, "Mint")
      );
      break;
    case "new_bridge":
      updateBridgeData(address).then((response) =>
        handleApiResponse(response, "Bridge")
      );
      break;
    case "new_user":
      const { refLink } = checkIfReferredUser();
      createUser({ address, refLink }).then((response) => {
        if (response.status === 201) {
          localStorage.setItem("createdUserAddress", address);
        }
      });
    default:
      break;
  }
};

export default handleInteraction;
