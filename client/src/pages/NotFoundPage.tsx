import { Link } from "react-router-dom"

export const NotFoundPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-12">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Not Found 404</h1>
      <p>Yeah it's happend sometime... </p>
      <Link to={'/'} className="bg-muted p-2 rounded-2xl transition-all hover:bg-muted-foreground text-black">Go Back</Link>
    </div>
  )
}
