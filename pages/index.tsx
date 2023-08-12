import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import ONFTBridge from "../components/ONFT/Main";
import Image from "next/image";
import Minting from "../components/Minter/Minting";

const Home: NextPage = () => {
  return <Minting />;
};

export default Home;
