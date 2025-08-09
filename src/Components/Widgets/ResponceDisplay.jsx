import { useEffect, useRef } from 'react'
import { HiArrowDown } from 'react-icons/hi2'
import { PiApproximateEquals } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { formatNumber } from '../../../Utils/formatNumber'
import StatusCard from '../UI/StatusCard'

const ResponceDisplay = () => {
    const { calculation } = useSelector((state) => state.calculation)
    const responseRef = useRef(null)

    useEffect(() => {
        if (calculation && Object.keys(calculation).length > 0) {
            if (window.innerWidth < 1024 && responseRef.current) {
                responseRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
            }
        }
    }, [calculation])

    if (!calculation || Object.keys(calculation).length === 0) {
        return
    }

    return (
        <div ref={responseRef} className='slide-in-left flex relative flex-col bg-white w-full md:w-max md:min-w-[350px] overflow-hidden border-[#C3C8D4] border-[0.5px] border-l-1 md:border-l-0 -z-1 rounded-[12px]  md:rounded-s-[0px]'>
            <StatusCard status={calculation?.marginStatus} />
            <div className='p-5  '>
                <div className='flex justify-between py-1.5'>
                    <h1 className="text-sm font-medium !text-gray-500">Buy Cost</h1>
                    <h1 className="text-sm font-semibold text-gray-300">
                        ${formatNumber(calculation?.buyCost)}
                    </h1>
                </div>

                <div className='flex justify-between py-1.5'>
                    <h1 className="text-sm font-medium !text-gray-500">Estimated Selling Price</h1>
                    <h1 className="text-sm font-semibold text-gray-300">
                        ${formatNumber(calculation?.estimatedSellingPrice)}
                    </h1>
                </div>

                <div className='flex justify-between py-1.5'>
                    <h1 className="text-sm font-medium !text-gray-500">Amazon Fee</h1>
                    <h1 className="text-sm font-semibold text-gray-300">
                        ${formatNumber(calculation?.amazonFee)}
                    </h1>
                </div>

                <div className='flex justify-between py-1.5'>
                    <h1 className="text-sm font-medium !text-gray-500">Referral Fee</h1>
                    <h1 className="text-sm font-semibold text-gray-300 flex gap-1.5 items-center">
                        {formatNumber(calculation?.referralFeePercent)}%
                        <PiApproximateEquals />
                        ${formatNumber(calculation?.referralFee)}
                    </h1>
                </div>

                <div className='flex justify-between pt-4 pb-2 border-t border-gray-300'>
                    <div>
                        <h1 className="text-sm font-semibold text-gray-300">
                            {calculation?.profit < 0 ? "Loss" : "Profit"}
                        </h1>
                        <h1
                            className={`text-3xl font-semibold truncate max-w-[160px] ${calculation?.profit < 0 ? "!text-red-500" : "!text-gray-800"
                                }`}
                            title={`$${formatNumber(Math.abs(calculation?.profit || 0))}`}
                        >
                            ${formatNumber(Math.abs(calculation?.profit || 0))}
                        </h1>
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-gray-300" title='Return On Investment'>ROI </h1>
                        <h1
                            className="text-3xl font-semibold !text-gray-800 truncate max-w-[150px]"
                            title={`${formatNumber(calculation?.roiPercent)}%`}
                        >
                            {formatNumber(calculation?.roiPercent, 1)}%
                        </h1>
                    </div>
                </div>

                <a href='#calculation-history' className='text-[12px] text-end flex gap-2 items-center absolute bottom-[4px] right-3 !cursor-pointer'>We save your calculation history <HiArrowDown /></a>

            </div>
        </div>
    )
}

export default ResponceDisplay