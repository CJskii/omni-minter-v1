import { updateMintData } from "../../api/mintAPI";
import { updateBridgeData } from "../../api/bridge";
import { createUser } from "../../api/createUser";
import { checkIfReferredUser } from "../../validators/checkIfReferredUser";
import { callClaimRewards } from "../../api/claimRewards";

const handleApiResponse = async (response: any, operation: string) => {
  if (response.status === 200) {
    return await response.json();
  } else {
    return await response.json();
  }
};

const handleInteraction = async ({
  address,
  isInvited = false,
  referredBy = "",
  operation,
  type = "",
}: {
  address: string;
  isInvited?: boolean;
  referredBy?: string;
  operation: string;
  type?: string;
}) => {
  let response;
  switch (operation) {
    case "new_mint":
      const user = { address, isInvited, referredBy };
      response = await updateMintData({ user });
      return handleApiResponse(response, "Mint");
    case "new_bridge":
      response = await updateBridgeData({ address, type });
      return handleApiResponse(response, "Bridge");
    case "new_user":
      const { refLink } = checkIfReferredUser();
      response = await createUser({ address, refLink });
      return handleApiResponse(response, "User");
    case "claim_daily_reward":
      response = await callClaimRewards({ address });
      return handleApiResponse(response, "Daily reward");
    default:
      break;
  }
};

export default handleInteraction;
