export async function updateBridgeData({
  address,
  type,
}: {
  address: string;
  type: string;
}) {
  const response = await fetch("/api/bridge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ethereumAddress: address, bridgeType: type }),
  });
  return response;
}
