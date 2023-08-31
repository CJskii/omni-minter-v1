import { updateMintData } from "../api/mintAPI";
import { updateBridgeData } from "../api/bridgeAPI";
import { createUser } from "../api/createUserAPI";
import { checkIfReferredUser } from "./checkIfReferredUser";
import { callClaimRewards } from "../api/callClaimRewardsAPI";

const handleApiResponse = async (response: any, operation: string) => {
  if (response.status === 200) {
    console.log(`${operation} data updated`);
    return await response.json();
  } else {
    console.log(`${operation} data update failed`);
    console.log(response);
    return { error: `${operation} data update failed` };
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
  let response;
  switch (operation) {
    case "new_mint":
      const user = { address, isInvited, referredBy };
      response = await updateMintData({ user });
      return handleApiResponse(response, "Mint");
    case "new_bridge":
      response = await updateBridgeData(address);
      return handleApiResponse(response, "Bridge");
    case "new_user":
      const { refLink } = checkIfReferredUser();
      response = await createUser({ address, refLink });
      return handleApiResponse(response, "User");
    case "claim_daily_reward":
      if (!day) return { error: "No day provided" } as any;
      response = await callClaimRewards({ address, day });
      return handleApiResponse(response, "Daily reward");
    default:
      break;
  }
};

export default handleInteraction;
