import { Wrapper } from "@/components"
import { useUserContext } from "@/context";

export const Dashboard = () => {
  const { userName } = useUserContext();
  
  return (
    <Wrapper>
      <h1 className="mt-10 text-4xl font-bold">Welcome <span className=" bg-gradient-to-l from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text">{userName?.toUpperCase()}</span></h1>
    </Wrapper>
  )
}
