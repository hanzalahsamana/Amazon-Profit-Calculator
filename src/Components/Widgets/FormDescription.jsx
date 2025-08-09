import React from 'react'

const FormDescription = () => {
    return (
        <div className='w-full max-w-full lg:max-w-[400px]'>
            <h1 className="text-[26px] font-bold ">Amazon Profit Calculator</h1>
            <h1 className="text-lg font-semibold text-gray-700 ">Your go to calculator</h1>

            <p className='fontEmber text-sm pt-3'>Enter an ASIN or your own product details to quickly check costs, fees, and profit. See if your product is worth selling before you invest</p>
            <p className=' text-end flex gap-2 py-3 !text-[#0073c7]'>Heres how we calculate your profit</p>
            <div className='flex flex-col justify-center items-start fontDmmono '>
                <p className='text-sm'>Expense = <span className='text-[11px]'>Buy Cost + Platform Fee + Referral Fee</span></p>
                <p className='text-sm'>Profit = <span className='text-[11px]'>Estimate Selling Price - Expence</span></p>
                <p className='text-sm'>ROI % = <span className='text-[11px]'>(Profit / Buy Cost) x 100</span></p>
            </div>
            <p className=' text-end flex gap-2 py-3 !text-[#0073c7]'>ROI status</p>
            <div className='flex flex-col justify-center items-start fontDmmono '>
                <p className='text-sm'>Good = <span className='text-[11px]'>ROI% &gt;= 30</span></p>
                <p className='text-sm'>Normal = <span className='text-[11px]'>ROI% = 15 - 30 </span></p>
                <p className='text-sm'>Bad = <span className='text-[11px]'>ROI%  &lt;= 15 </span></p>
            </div>
        </div>
    )
}

export default FormDescription