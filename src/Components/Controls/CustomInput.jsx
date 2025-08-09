import clsx from "clsx";
import InfoTooltip from "./InfoTooltip";

const CustomInput = ({
    label,
    value,
    onChange,
    placeholder,
    prefix,
    suffix,
    className,
    error,
    disabled,
    name,
    type = "text",
    info,
    ...props
}) => {
    return (
        <div className={`w-full ${disabled ? 'opacity-80 pointer-events-none select-none' : ''}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="flex gap-2 items-center  mb-2 text-sm font-medium  text-gray-900"
                >
                    {label}
                    {info && (<InfoTooltip content={info} id={`InputInfo_${label}`} />)}
                </label>
            )}

            <div
                className={clsx(
                    "flex items-center border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition-all overflow-hidden",
                    error ? "border-red-500" : "border-[#D2DCFF]",
                    disabled && "opacity-60 cursor-not-allowed",
                    className
                )}
            >
                {prefix && (
                    <span className="pl-3 text-[#4b5259] text-[15px] whitespace-nowrap">
                        {prefix}
                    </span>
                )}

                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={clsx(
                        "flex-1 bg-transparent border-none outline-none px-3 py-2 w-full text-[16px] font-medium text-[#434c5b]",
                        "placeholder-gray-400"
                    )}
                    {...props}
                />

                {suffix && (
                    <span className="pr-3 text-[#4b5259] text-[15px] whitespace-nowrap">
                        {suffix}
                    </span>
                )}
            </div>

            {error && <p className="mt-1 text-xs !text-red-500">{error}</p>}
        </div>
    );
};

export default CustomInput;
