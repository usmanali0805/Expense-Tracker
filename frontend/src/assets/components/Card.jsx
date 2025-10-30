import React from 'react'

const Card = ({icon , text , price ,color}) => {
  return (
    <div className='flex items-center gap-5 p-4 shadow-lg w-full'>
        <span className={`p-2.5 text-white w-fit h-fit flex justify-center ${color} rounded-full items-center`}>{icon}</span>
        <div className="flex flex-col gap-1" >
            <span className='text-sm'>{text}</span>
            <span className='font-semibold text-md'>${price}</span>
        </div>
    </div>
  )
}

export default Card