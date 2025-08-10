import axios from "axios"
import { useEffect, useState } from "react"


export const useUserRole = () => {

  const userId = localStorage.getItem("userId");
  const [role, setRole] = useState<string | ''>("");

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:4040/user/role/${userId}`)
      .then((res) => {
        setRole(res.data)
      })
      .catch((err) => console.error("RoleError: ",err))
    }
    fetchData()
  }, [userId])


  return role;
}