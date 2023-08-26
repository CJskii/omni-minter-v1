export async function updateBridgeData(address: string) {
  const response = await fetch("/api/bridge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ethereumAddress: address }),
  });
  return response;
}
