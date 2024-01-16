const Step = (props: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  buttonLabel: string;
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}) => {
  const {
    label,
    placeholder,
    value,
    onChange,
    buttonLabel,
    onClick,
    disabled,
    isLoading,
  } = props;

  return (
    <div className="flex justify-center items-start flex-col py-2">
      <label htmlFor="receipentAddress" className="pb-1">
        {label}
      </label>
      <div className="flex justify-center items-center gap-2 w-full">
        <input
          type="number"
          id="recipientAddress"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input input-bordered flex-grow"
        />
        <button
          className="btn btn-primary w-[20%]"
          onClick={onClick}
          disabled={disabled}
        >
          {isLoading ? (
            <span className="loading loading-infinity"></span>
          ) : (
            buttonLabel
          )}
        </button>
      </div>
    </div>
  );
};

export default Step;
