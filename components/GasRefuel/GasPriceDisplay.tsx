import { GasPriceProps } from "../../common/types/gas-refuel";

const GasPriceDisplay: React.FC<GasPriceProps> = ({
  label,
  amount,
  currencySymbol,
  usdValue,
}) => {
  return (
    <div className="flex justify-between gap-4">
      <p className="flex items-center">{label}:</p>
      <p className="text-right">
        ~{amount} {currencySymbol} <br></br>
        {usdValue && (
          <span className="opacity-70"> {`($${usdValue} USD)`}</span>
        )}
      </p>
    </div>
  );
};

export default GasPriceDisplay;
