import CustomButton from "./CustomButton";
import CustomButtonMobile from "./CustomButtonMobile";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="navbar bg-base-200 border-orange-700 justify-between">
      <div className="navbar-start">
        <div className="dropdown">
          <a className="btn normal-case text-3xl">Mintly</a>
        </div>
      </div>
      <div className="navbar-center flex gap-8 text-xl max-sm:hidden">
        <div className="btn-group">
          <button className="btn btn-active">ONFT Bridge</button>
          <button className="btn" disabled>
            OFT Bridge
          </button>
          <button className="btn" disabled>
            Button
          </button>
        </div>
      </div>
      <div className="navbar-end max-sm:hidden">
        <CustomButton />
      </div>
      <div className="dropdown dropdown-end">
        <label className="btn btn-circle swap swap-rotate md:hidden">
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
              <a>Bridge</a>
            </li>
            <li onClick={() => setExpanded(false)}>
              <a>FAQ</a>
            </li>
            <li onClick={() => setExpanded(false)}>
              <CustomButtonMobile />
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
