import dynamic from "next/dynamic";
import HeadComponent from "../components/HeadComponent";
import { prisma } from "../prisma/client";
import { useAccount } from "wagmi";

const Gas = dynamic(() => import("../components/GasRefuel/Gas"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: true,
});

const GasRefuel = ({ top100Addresses }: any) => {
  const { address } = useAccount();
  const isEligible = top100Addresses.includes(address?.toLowerCase());

  return (
    <>
      <HeadComponent
        title="Mintly Gas Refuel"
        description="Refuel your account with Mintly Gas utilising Layer Zero technology!"
      />
      {isEligible ? <Gas /> : <p>You are not eligible for this feature.</p>}
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  // Fetch the top 100 users from your database
  const top100Users = await prisma.user.findMany({
    select: { ethereumAddress: true },
    orderBy: { totalPoints: "desc" },
    take: 100,
  });

  // Convert the addresses to lowercase for easier comparison
  const top100Addresses = top100Users.map((user: any) =>
    user.ethereumAddress.toLowerCase()
  );

  return {
    props: { top100Addresses },
  };
};

export default GasRefuel;
