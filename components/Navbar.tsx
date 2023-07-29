import CustomButton from "./CustomButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 border-orange-700">
      <div className="navbar-start">
        <div className="dropdown">
          <div>placeholder</div>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">Mintly</a>
      </div>
      <div className="navbar-end">
        <CustomButton />
      </div>
    </div>
  );
};

export default Navbar;
