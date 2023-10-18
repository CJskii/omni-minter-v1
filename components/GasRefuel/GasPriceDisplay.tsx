type GasPriceProps = {
  label: string;
  amount: string;
  currencySymbol: string;
  usdValue?: string;
};

const GasPriceDisplay: React.FC<GasPriceProps> = ({
  label,
  amount,
  currencySymbol,
  usdValue,
}) => {
  return (
    <div className="flex justify-between gap-4">
      <p>{label}:</p>
      <p>
        ~{amount} {currencySymbol}
        {usdValue && (
          <span className="text-yellow-300"> {`($${usdValue} USD)`}</span>
        )}
      </p>
    </div>
  );
};

export default GasPriceDisplay;
