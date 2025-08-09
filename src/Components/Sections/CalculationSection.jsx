import React from 'react'
import FormDescription from '../Widgets/FormDescription'
import CalculatorForm from '../Widgets/CalculatorForm'
import ResponceDisplay from '../Widgets/ResponceDisplay'

const CalculationSection = () => {

    

    return (
        <div className="flex lg:flex-row flex-col justify-start  gap-4 py-[80px] w-full px-6 md:px-[50px] ">
            <FormDescription />
            <div className="flex flex-1 justify-center py-4 lg:py-0 md:gap-0 gap-5 flex-col md:flex-row ">
                <CalculatorForm />
                <ResponceDisplay />
            </div>
        </div>
    )
}

export default CalculationSection