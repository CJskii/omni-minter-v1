interface MintDataProps {
  user: {
    address: string;
    isInvited: boolean;
    referredBy: string;
  };
}

export async function updateMintData({ user }: MintDataProps) {
  const response = await fetch("/api/mint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ethereumAddress: user.address,
      isInvited: user.isInvited,
      referredBy: user.referredBy,
    }),
  });
  return response;
}
