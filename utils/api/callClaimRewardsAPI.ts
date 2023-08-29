export async function callClaimRewards({
  address,
  day,
}: {
  address: string;
  day: number;
}) {
  const response = await fetch("/api/claimDailyRewards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ethereumAddress: address, rewardDay: day }),
  });
  return response;
}
