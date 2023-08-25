export async function updateMintData(address: string) {
  console.log("Updating mint data for", address);
  const response = await fetch("/api/mint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ethereumAddress: address }),
  });
  return response;
}
