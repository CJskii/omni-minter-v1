import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Minting = dynamic(() => import("../components/Minter/Minting"), {
  loading: () => (
    <span className="loading loading-dots flex justify-center items-center"></span>
  ),
  ssr: true,
});

const Home: NextPage = () => {
  return <Minting />;
};

export default Home;
