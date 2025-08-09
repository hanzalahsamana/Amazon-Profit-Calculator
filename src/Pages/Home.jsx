import CalculationSection from "../Components/Sections/CalculationSection"
import CalculationHistory from "../Components/Sections/CalculationHistory"

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-start" >
      <CalculationSection />
      <CalculationHistory />
    </div>
  )
}

export default Home