import React, { type FC, type ReactNode } from 'react'

export const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='w-screen h-screen flex items-end'>
      <div className='flex flex-col items-center w-full h-[calc(100%-55px)]'>
        {children}
      </div>
    </div>
  )
}
