import CustomButton from "./CustomButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 border-orange-700">
      <div className="navbar-start">
        <div className="dropdown">
          <a className="btn btn-ghost normal-case text-3xl">Mintly</a>
        </div>
      </div>
      <div className="navbar-center flex gap-8 text-xl">
        <div className="btn-group">
          <button className="btn btn-active">ONFT Bridge</button>
          <button className="btn">OFT Bridge</button>
          <button className="btn">Button</button>
        </div>
      </div>
      <div className="navbar-end">
        <CustomButton />
      </div>
    </div>
  );
};

export default Navbar;
