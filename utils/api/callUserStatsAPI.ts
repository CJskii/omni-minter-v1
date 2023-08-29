export async function callUserStats(address: string) {
  const response = await fetch("/api/userStats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ethereumAddress: address }),
  });
  return response;
}
