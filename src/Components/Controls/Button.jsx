
const Button = ({ action = () => { } }) => {
    return (
        <button onClick={action} className='flex items-center !h-max justify-center gap-3 bg-[#fefefe] text-gray-500  border-gray-200 border-[1.5px]  py-2 px-2 md:px-5 rounded-sm text-sm md:text-[16px] cursor-pointer hover:opacity-80 '>
            <img src="https://img.icons8.com/color/96/google-sheets.png" alt="Sheet Icon" className='w-[18px] md:w-[25px]' />Export
        </button>
    )
}

export default Button