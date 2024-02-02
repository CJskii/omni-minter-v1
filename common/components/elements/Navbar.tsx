import CustomButton from "../../../components/Buttons/CustomButton";
import CustomButtonMobile from "../../../components/Buttons/CustomButtonMobile";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const showConnectButton =
    router.pathname === "/layerzero/onft-mint" ||
    router.pathname === "/layerzero/onft-bridge" ||
    router.pathname === "/layerzero/gas-refuel" ||
    router.pathname === "/layerzero/oft-mint-bridge" ||
    router.pathname === "/wormhole/nft-bridge" ||
    router.pathname === "/wormhole/nft-mint" ||
    router.pathname === "/wormhole/token-mint-bridge";

  return (
    <div className="navbar bg-base-200 border-orange-700 justify-between min-w-full">
      <div className="navbar-start">
        <div className="dropdown">
          <Link className="btn normal-case text-3xl" href="/">
            Mintly
          </Link>
        </div>
      </div>
      <div className="navbar-center flex gap-8 text-xl max-lg:hidden">
        <div className="btn-group">
          <div className="dropdown btn p-0 transition-none animate-none hover:bg-transparent hover:border-transparent hover:outline-0 z-[100]">
            <div
              tabIndex={20}
              role="button"
              className={`btn z-[100] m-0 p-2 hover:bg-transparent hover:border-transparent hover:text-accent ${
                router.pathname.startsWith("/layerzero/") &&
                !router.pathname.includes("gas-refuel")
                  ? "text-primary"
                  : ""
              }`}
            >
              LayerZero
            </div>
            <ul
              tabIndex={20}
              className="dropdown-content z-[100] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/layerzero/onft-mint">ONFT Mint</Link>
              </li>
              <li>
                <Link href="/layerzero/onft-bridge">ONFT Bridge</Link>
              </li>
              <li>
                <Link href="/layerzero/oft-mint-bridge">OFT Mint & Bridge</Link>
              </li>
              <li>
                <a href="https://layerzeroscan.com/" target="_blank">
                  Explorer
                </a>
              </li>
            </ul>
          </div>

          <div className="dropdown btn p-0  hover:border-transparent hover:outline-0 hover:bg-transparent z-[100]">
            <div
              tabIndex={0}
              role="button"
              className={`btn m-0 p-2 hover:bg-transparent hover:border-transparent z-[100] hover:text-accent ${
                router.pathname.startsWith("/wormhole/") ? "text-primary" : ""
              }`}
            >
              Wormhole
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-[100]"
            >
              <li>
                <Link href="/wormhole/nft-mint">NFT Mint</Link>
              </li>
              <li>
                <Link href="/wormhole/nft-bridge">NFT Bridge</Link>
              </li>
              <li>
                <Link href="/wormhole/token-mint-bridge">
                  ERC20 Mint & Bridge
                </Link>
              </li>
              <li>
                <a href="https://wormholescan.io/" target="_blank">
                  Explorer
                </a>
              </li>
            </ul>
          </div>

          <Link
            href="/layerzero/gas-refuel"
            className={`btn hover:bg-transparent  hover:border-transparent hover:text-accent ${
              router.pathname === "/layerzero/gas-refuel" ? "text-primary" : ""
            }`}
          >
            Gas Refuel
          </Link>
          <Link
            href="/leaderboard"
            className={`btn hover:bg-transparent hover:border-transparent hover:text-accent${
              router.pathname === "/leaderboard" ? "text-primary" : ""
            }`}
          >
            Leaderboard
          </Link>
          <Link
            href="/faq"
            className={`btn hover:bg-transparent  hover:border-transparent hover:text-accent${
              router.pathname === "/faq" ? "text-primary" : ""
            }`}
          >
            FAQ
          </Link>
        </div>
      </div>
      <div className="navbar-end max-lg:hidden">
        {showConnectButton ? <CustomButton /> : <div className="btn"></div>}
      </div>
      <div className="dropdown dropdown-end z-[100]">
        <label className="btn btn-circle swap swap-rotate lg:hidden">
          <input type="checkbox" />

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
            onClick={() => setExpanded(!expanded)}
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
            onClick={() => setExpanded(!expanded)}
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        </label>

        {expanded ? (
          <ul
            tabIndex={100}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-64 z-100"
          >
            <li onClick={() => setExpanded(false)}>
              <Link href="/layerzero/gas-refuel">Gas Refuel</Link>
            </li>
            <li onClick={() => setExpanded(false)}>
              <Link href="/layerzero/onft-mint">ONFT Mint</Link>
            </li>
            <li onClick={() => setExpanded(false)}>
              <Link href="/layerzero/onft-bridge">ONFT Bridge</Link>
            </li>
            <li onClick={() => setExpanded(false)}>
              <Link href="/layerzero/oft-mint-bridge">OFT Mint & Bridge</Link>
            </li>
            <li onClick={() => setExpanded(false)}>
              <Link href="/wormhole/nft-mint">wNFT Mint</Link>
            </li>
            <li onClick={() => setExpanded(false)}>
              <Link href="/wormhole/nft-bridge">wNFT Bridge</Link>
            </li>
            <li onClick={() => setExpanded(false)}>
              <Link href="/wormhole/token-mint-bridge">
                wERC20 Mint & Bridge
              </Link>
            </li>
            <li onClick={() => setExpanded(false)}>
              <Link href="/leaderboard">Leaderboard</Link>
            </li>
            <li onClick={() => setExpanded(false)}>
              <Link href="/faq">FAQ</Link>
            </li>
            {showConnectButton && (
              <li onClick={() => setExpanded(false)}>
                <CustomButtonMobile />
              </li>
            )}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
