export async function createUser({
  address,
  refLink,
}: {
  address: string;
  refLink: string | null;
}) {
  console.log("createUser", address, refLink);
  const response = await fetch("/api/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ethereumAddress: address, refLink: refLink }),
  });
  return response;
}
