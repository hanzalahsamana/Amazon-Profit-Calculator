import { FaCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const StatusBadge = ({ status }) => {
    const colors = {
        good: {
            label: "Good",
            badgeClass: "bg-green-100 text-green-600",
        },
        normal: {
            label: "Normal",
            badgeClass: "bg-yellow-100 text-yellow-600",
        },
        bad: {
            label: "Bad",
            badgeClass: "bg-red-100 text-red-600",
        },
    };

    const current = colors[status?.toLowerCase()] || colors.good;

    return (
        <div className={`flex gap-1 py-[2px] justify-start text-nowrap  items-center text-sm w-max px-[13px] rounded-2xl ${current?.badgeClass}`}>
            <GoDotFill />
            {current?.label}
        </div>
    );
};

export default StatusBadge;
