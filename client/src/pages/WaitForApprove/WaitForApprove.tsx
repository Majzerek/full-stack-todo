import { Link } from "react-router-dom"


export const WaitForApprove = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="font-bold text-4xl text-center">We're sorry, but your account is still waiting to be confirmed.</h1>
      <h2 className="font-bold text-3xl text-center">Try again later.</h2>
      <Link to={'/login'} className='text-red-400 transition-colors hover:text-blue-500 uppercase text-3xl'>back</Link>
    </div>
  )
}
