import { Button, ErrorMsg, Input, Label, Loader } from '@/components';
import { useAlertContext, useAuthContext } from '@/context';
import { emailRegex, regexPassword } from '@/utils/helpers/regex';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import * as yup from 'yup';


type LoginTypes = {
  email: string,
  password: string,
};

const validationSchema: yup.ObjectSchema<LoginTypes> = yup.object().shape({
  email: yup.string().required("Email is required").matches(emailRegex, "Please provide valid email").min(9, "The email must contain at last 9 characters").max(35, "The Email is too long, max 35 characters"),
  password: yup.string().required("Password is required").matches(regexPassword, "The password must contain at least 8 characters, one uppercase, one number and one special case character").max(28, "The Password contain too many characters"),
})


export const Login = () => {

  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { showSuccessAlert, showErrorAlert } = useAlertContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
   const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<LoginTypes>({
    resolver: yupResolver(validationSchema), defaultValues: {
      email: "",
      password: ""
    }, mode: "onSubmit"
  })

  const onSubmit = async (values: LoginTypes) => {
    setLoading(true)

    await axios.post("http://127.0.0.1:4040/login", values)
      .then((res) => {
        login(res.data)
        setLoading(false)
        showSuccessAlert(`Welcome ${res.data.userName}`)
        navigate("/")
      })
      // eslint-disable-next-line consistent-return
      .catch((err) => {
        if (err.response?.status === 403) {
          return showErrorAlert("Account was blocked")
        }
        setLoading(false)
        showErrorAlert("Something went wrong")
        console.error("ERR", err)
      })
  }

  return (
  <div className="w-screen h-screen flex flex-col justify-start sm:justify-center items-center">
 
      <h1 className="text-3xl mb-5 text-center">Welcome in App Todo </h1>
      <div className=" border-2 p-5 rounded-2xl w-[300px]  m-2 sm:m-15 ">
        <h2 className="text-xl mb-5 text-center">Login</h2>

        <form className="flex flex-col gap-2 " onSubmit={handleSubmit(onSubmit)}>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email:</Label>
            <Input control={control} title="email" name="email" id="email" placeholder="Email" className="w-full" />
            <ErrorMsg bool={errors.email} message={errors.email?.message} />
          </div>

          <div className="flex flex-col gap-2 relative h-30">
            <Label htmlFor="password">Password:</Label>
            <Input type={showPassword ? 'text' : 'password'} control={control} title="password" name="password" id="password" placeholder="Password" className="w-full relative" />
            <div className="absolute w-5 h-5 bottom-[45%] right-[2%] translate-y-[-45%] translate-x-[-50%] cursor-pointer" onClick={() => setShowPassword((prev) => !prev)} >
              {showPassword ? <Eye /> : <EyeClosed />}
            </div>
            <ErrorMsg bool={errors.password} message={errors.password?.message} />
          </div>


          <div className="col-span-1 sm:col-span-2 flex items-center justify-center">
            {loading ? <Loader /> :
              <Button type='submit' className="mb-5">Log in</Button>}
          </div>

        </form>
              <p className='text-center'>Don't have an account, Register Now <Link to={'/register'} className='text-red-400 transition-colors hover:text-blue-500'>HERE</Link></p>
      </div>
    </div>
  )
}
