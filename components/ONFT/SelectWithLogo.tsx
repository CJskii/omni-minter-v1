import { networks } from "../../constants/networkConfig";

const SelectWithLogo: React.FC = () => {
  return (
    <select style={{ display: "flex", alignItems: "center" }}>
      <option disabled selected value="">
        Select Network
      </option>
      {networks.map((network) => (
        <option
          key={network.name}
          value={network.name}
          style={{
            background: `url(${network.logo}) no-repeat left center`,
            paddingLeft: "30px",
          }}
        >
          {network.name}
        </option>
      ))}
    </select>
  );
};

export default SelectWithLogo;
