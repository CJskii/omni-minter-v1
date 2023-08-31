export async function callClaimRewards({ address }: { address: string }) {
  const response = await fetch("/api/claimDailyRewards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ethereumAddress: address }),
  });
  return response;
}
