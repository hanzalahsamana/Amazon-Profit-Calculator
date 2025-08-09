import { useState } from 'react'
import CustomInput from '../Controls/CustomInput'
import Checkbox from '../Controls/Checkbox'
import { RxReload } from 'react-icons/rx'
import { calculateProfit } from '../../Api/calculateProfit'
import { useSelector } from 'react-redux'
import ButtonLoader from '../UI/ButtonLoader'
import { toast } from 'react-toastify'

const initialState = {
    ASIN: '',
    buyCost: '',
    sellingPrice: '',
    amazonFee: null,
    referralFeePercent: null,
    type: "ASIN",
}

const CalculatorForm = () => {
    const { calculation, calculationLoading } = useSelector((state) => state.calculation)
    const [calculationPayload, setCalculationPayload] = useState(initialState)
    const [errors, setErrors] = useState({})

    const handleChange = (field) => (e) => {
        const value = e.target.value
        setCalculationPayload((prev) => ({
            ...prev,
            [field]: value,
        }))

        setErrors((prev) => ({
            ...prev,
            [field]: '',
        }))
    }

    const handleCheckbox = () => {
        setCalculationPayload((prev) => ({
            ...prev,
            type: prev.type === "manual" ? "ASIN" : "manual",
        }));
        setErrors({});
    };

    const validate = () => {
        let newErrors = {}
        if (calculationPayload.type === "ASIN") {
            if (!calculationPayload.ASIN.trim()) newErrors.ASIN = 'ASIN is required'
            else if (!/^[A-Z0-9]{10}$/.test(calculationPayload.ASIN)) newErrors.ASIN = 'ASIN must be 10 characters: A–Z, 0–9 only'
        }
        if (calculationPayload.type === "manual") {
            if (!calculationPayload.buyCost) newErrors.buyCost = 'Buy Cost is required'
            if (!calculationPayload.sellingPrice) newErrors.sellingPrice = 'Selling Price is required'
            if (calculationPayload.referralFeePercent !== undefined && calculationPayload.referralFeePercent !== null && calculationPayload.referralFeePercent !== '') {
                if (Number(calculationPayload.referralFeePercent) > 100) {
                    newErrors.referralFeePercent = 'Referral Fee cannot be greater than 100';
                }
            }
        }
        return newErrors
    }

    const handleCalculate = async (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors)
            return
        }
        try {
            let FinalPayload = {}
            if (calculationPayload.type === "ASIN") {
                FinalPayload = {
                    type: "ASIN",
                    ASIN: calculationPayload.ASIN
                };
            } else if (calculationPayload.type === "manual") {
                FinalPayload = {
                    type: "manual",
                    buyCost: calculationPayload.buyCost,
                    estimatedSellingPrice: calculationPayload.sellingPrice,
                    amazonFee: calculationPayload.amazonFee,
                    referralFeePercent: calculationPayload.referralFeePercent
                };
            }

            const response = await calculateProfit(FinalPayload);

            const existingHistory = JSON.parse(localStorage.getItem("calculationHistory")) || [];

            const updatedHistory = [...existingHistory, response];
            if (updatedHistory.length > 5) {
                updatedHistory.shift();
            }
            localStorage.setItem("calculationHistory", JSON.stringify(updatedHistory));

        } catch (error) {
            console.error(error)
            toast.error(error?.response?.data?.message || error?.message)
        }

        console.log('Selected Data:', calculationPayload)
    }

    const handleReset = () => {
        setCalculationPayload(initialState)
        setErrors({})
    }

    return (
        <form
            className={`bg-white transition-all border-[0.5px] border-[#C3C8D4] max-w-[800px]  w-full p-6 ${!calculation || Object.keys(calculation).length === 0 ? 'rounded-[12px]' : 'rounded-[12px] md:rounded-e-[0px]'}`}
            onSubmit={handleCalculate}
        >
            <div className='flex flex-col gap-4'>
                <CustomInput
                    label="ASIN"
                    prefix="#"
                    value={calculationPayload.ASIN}
                    onChange={handleChange('ASIN')}
                    placeholder="e.g. B123KD4FBG"
                    info={'Amazon Unique Product Id'}
                    className={'fontDmmono'}
                    disabled={calculationPayload.type !== "ASIN"}
                    error={errors.ASIN}
                />
                <div className='flex w-full gap-2 items-center'>
                    <Checkbox
                        checked={calculationPayload.type === "ASIN"}
                        label='Fill Manuall'
                        className='w-max'
                        onChange={handleCheckbox}
                    />
                    <span className='flex-1 border-t border-gray-300'></span>
                </div>
                <div className='grid grid-cols-2 gap-3 w-auto '>
                    <CustomInput
                        label="Buy Cost"
                        type='number'
                        prefix="$"
                        value={calculationPayload.buyCost}
                        onChange={handleChange('buyCost')}
                        placeholder="e.g. 200"
                        info={'Enter the cost you pay to purchase the product'}
                        className={'fontDmmono'}
                        disabled={calculationPayload.type === "ASIN"}
                        error={errors.buyCost}
                    />
                    <CustomInput
                        label="Selling Price"
                        type='number'
                        prefix="$"
                        value={calculationPayload.sellingPrice}
                        onChange={handleChange('sellingPrice')}
                        placeholder="e.g. 300"
                        info={'Enter the price you plan to sell the product for'}
                        className={'fontDmmono'}
                        disabled={calculationPayload.type === "ASIN"}
                        error={errors.sellingPrice}
                    />
                </div>
                <div className='grid grid-cols-2 gap-3 w-auto '>
                    <CustomInput
                        label="Amazon Fee"
                        type='number'
                        prefix="$"
                        value={calculationPayload.amazonFee}
                        onChange={handleChange('amazonFee')}
                        placeholder="defult 3.5 "
                        info={'Enter Amazon fulfillment or fixed fee for the product'}
                        className={'fontDmmono'}
                        disabled={calculationPayload.type === "ASIN"}
                        error={errors.amazonFee}
                    />
                    <CustomInput
                        label="Referral Fee %"
                        prefix=""
                        suffix="%"
                        type='number'
                        value={calculationPayload.referralFeePercent}
                        onChange={handleChange('referralFeePercent')}
                        placeholder="defult 15"
                        info={'Enter Amazon referral fee percentage for the product category'}
                        className={'fontDmmono'}
                        disabled={calculationPayload.type === "ASIN"}
                        error={errors.referralFeePercent}
                    />
                </div>
            </div>
            <div className='pt-4 mt-4 border-t border-gray-300 flex gap-2'>
                <button
                    type="button"
                    className='w-max text-center py-2.5 px-3 font-medium border border-gray-300 hover:border-gray-400 cursor-pointer  rounded-[8px]'
                    onClick={handleReset}
                >
                    <RxReload />
                </button>
                <button
                    type="submit"
                    className='w-full text-center py-2.5 px-3 font-medium border border-gray-300 hover:border-gray-400 cursor-pointer  rounded-[8px]'
                >
                    {calculationLoading ? (<ButtonLoader />) : 'Calculate'}
                </button>
            </div>
        </form>
    )
}

export default CalculatorForm