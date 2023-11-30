export async function callEmailSubscribeAPI({
  emailAddress,
  ethereumAddress,
}: {
  emailAddress: string;
  ethereumAddress: string;
}) {
  const response = await fetch("/api/emailSubscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emailAddress, ethereumAddress }),
  });
  return response;
}
