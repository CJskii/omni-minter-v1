export async function callDailyRewardsData() {
  const response = await fetch("/api/dailyRewards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  return response;
}
