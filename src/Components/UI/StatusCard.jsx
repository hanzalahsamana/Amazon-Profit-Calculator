import { GoDotFill } from 'react-icons/go';
import StatusBadge from './StatusBadge';

const StatusCard = ({ status = '', className }) => {

    const StatusInfo = {
        good: {
            label: 'Great margin!',
            subText: 'This product looks highly profitable.',
            bgClass: 'bg-green-50',
        },
        normal: {
            label: 'Decent margin!',
            subText: 'Could work with volume or better sourcing.',
            bgClass: 'bg-yellow-50',
        },
        bad: {
            label: 'Low profit',
            subText: 'Consider avoiding this product.',
            bgClass: 'bg-red-50',
        }
    };

    const currentStatus = StatusInfo[status] || StatusInfo.good;

    return (


        <div className={`p-5 h-max w-full ${currentStatus?.bgClass}`}>
            <StatusBadge status={status} />
            <h1 className="text-xl font-bold text-gray-300 pt-4">{currentStatus?.label}</h1>
            <h1 className="text-sm font-medium !text-gray-700">{currentStatus?.subText}</h1>
        </div>
    )
}

export default StatusCard