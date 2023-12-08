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
    router.pathname === "/layerzero/gas-refuel";
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
          <Link
            href="/layerzero/onft-mint"
            className={`btn ${
              router.pathname === "/layerzero/onft-mint" ? "btn-active" : ""
            }`}
          >
            Mint
          </Link>
          <Link
            href="/layerzero/onft-bridge"
            className={`btn ${
              router.pathname === "/layerzero/onft-bridge" ? "btn-active" : ""
            }`}
          >
            Bridge
          </Link>
          <Link
            href="/layerzero/gas-refuel"
            className={`btn ${
              router.pathname === "/layerzero/gas-refuel" ? "btn-active" : ""
            }`}
          >
            Gas Refuel
          </Link>
          <Link
            href="/leaderboard"
            className={`btn ${
              router.pathname === "/leaderboard" ? "btn-active" : ""
            }`}
          >
            Leaderboard
          </Link>
          <Link
            href="/faq"
            className={`btn ${router.pathname === "/faq" ? "btn-active" : ""}`}
          >
            FAQ
          </Link>
        </div>
      </div>
      <div className="navbar-end max-lg:hidden">
        {showConnectButton && <CustomButton />}
      </div>
      <div className="dropdown dropdown-end">
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
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64"
          >
            <li onClick={() => setExpanded(false)}>
              <Link href="/layerzero/onft-mint">Mint</Link>
            </li>
            <li onClick={() => setExpanded(false)}>
              <Link href="/layerzero/onft-bridge">Bridge</Link>
            </li>
            <li onClick={() => setExpanded(false)}>
              <Link href="/layerzero/gas-refuel">Gas Refuel</Link>
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
