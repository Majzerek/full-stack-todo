import React from 'react'


export const Wrapper:React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className='w-screen h-screen flex items-end' >
      <div className='flex flex-col items-center w-full h-[calc(100%-55px)] overflow-auto' >
        {children}
      </div>
    </div>
  )
}
