import { updateMintData } from "../api/mintAPI";
import { updateBridgeData } from "../api/bridgeAPI";
import { createUser } from "../api/createUserAPI";
import { checkIfReferredUser } from "./checkIfReferredUser";
import { callClaimRewards } from "../api/callClaimRewardsAPI";

const handleApiResponse = (response: any, operation: string) => {
  if (response.status === 200) {
    console.log(`${operation} data updated`);
    return response;
  } else {
    console.log(`${operation} data update failed`);
    console.log(response);
    return response;
  }
};

const handleInteraction = async ({
  address,
  isInvited = false,
  referredBy = "",
  day,
  operation,
}: {
  address: string;
  isInvited?: boolean;
  referredBy?: string;
  day?: number;
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
    case "claim_daily_reward":
      if (!day) return { error: "No day provided" } as any;
      callClaimRewards({ address, day }).then((response) => {
        handleApiResponse(response, "Daily reward");
      });
      break;
    default:
      break;
  }
};

export default handleInteraction;
