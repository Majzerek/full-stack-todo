import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import type { RegisterFormType } from "@/types";
import { emailRegex, regexPassword } from "@/utils/helpers/regex";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, ErrorMsg, Input, Label, Loader } from "@/components";
import { Eye, EyeClosed } from "lucide-react";
import { useAlertContext } from "@/context/alertContext";


const validationSchema: yup.ObjectSchema<RegisterFormType> = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name must contain at lest 2 characters").max(20, "Name can contain max 20 characters"),

  surname: yup.string().required("Surname is required").min(2, "Surname must contain at lest 2 characters").max(20, "Surname can contain max 20 characters"),

  email: yup.string().required("Email is required").matches(emailRegex, "Please provide valid email").min(9, "Email must contain at lest 9 characters").max(35, "Email is too long, max 35 characters"),

  phoneNumber: yup.string().optional(),

  password: yup.string().required("Password is required").matches(regexPassword, "Password must contain at least 8 characters, one uppercase, one number and one special case character").max(28, "Password contain too many characters"),

  confirmPassword: yup.string().required("Please confirm your password").oneOf([yup.ref("password"), ""], "Passwords don't match"),
  role: yup.string().default('USER'),
});

export const Register = () => {
  const navigate = useNavigate();
  const {showSuccessAlert, showErrorAlert} = useAlertContext();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<RegisterFormType>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      role: "USER",
    }
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState({ password: false, confirm: false });

  const onSubmit = async (values: RegisterFormType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = values;
    setLoading(true)
    await axios.post('http://localhost:4040/register-user', rest)
      .then(() => {
        setLoading(false)
        showSuccessAlert("You have successfully created your account!")
        reset()
        navigate('/login')
      })
      .catch((err) => {
        setLoading(false)
        showErrorAlert(err.response?.status === 409 ? 'Email address already exists' : "Something went wrong")
        setError(true)
        console.error(error)
      })
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-start sm:justify-center items-center">
 
      <h1 className="text-3xl mb-5 text-center">App Todo </h1>
      <div className=" border-2 p-5 rounded-2xl w-full md:w-[80%] m-2 sm:m-15 ">
        <h2 className="text-xl mb-5 text-center">Register</h2>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-2" onSubmit={handleSubmit(onSubmit)}>

          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">Name:</Label>
            <Input control={control} title="Name" name="name" id="firstName" placeholder="First Name" className="w-full" />
            <ErrorMsg bool={errors.name} message={errors.name?.message} />
          </div>
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="surname">Surname:</Label>
            <Input control={control} title="Surname" name="surname" id="surname" placeholder="Last Name" className="w-full" />
            <ErrorMsg bool={errors.surname} message={errors.surname?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email:</Label>
            <Input control={control} title="email" name="email" id="email" placeholder="Email (Need for login)" className="w-full" />
            <ErrorMsg bool={errors.email} message={errors.email?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phoneNumber">Phoone Number:</Label>
            <Input control={control} title="phoneNumber" name="phoneNumber" id="phoneNumber" placeholder="Phone Number (Optional)" className="w-full" />
            <ErrorMsg bool={errors.phoneNumber} message={errors.phoneNumber?.message} />
          </div>

          <div className="flex flex-col gap-2 relative h-30">
            <Label htmlFor="password">Password:</Label>
            <Input type={show.password ? 'text' : 'password'} control={control} title="password" name="password" id="password" placeholder="Password" className="w-full relative" />
            <div className="absolute w-5 h-5 bottom-[45%] right-[2%] translate-y-[-45%] translate-x-[-50%] cursor-pointer" onClick={() => setShow((prev) => ({ ...prev, password: !prev.password }))} >
              {show.password ? <Eye /> : <EyeClosed />}
            </div>
            <ErrorMsg bool={errors.password} message={errors.password?.message} />
          </div>

          <div className="flex flex-col gap-2 relative h-30">
            <Label htmlFor="confirmPassword">Confirm Password:</Label>
            <Input type={show.confirm ? 'text' : 'password'} control={control} title="confirmPassword" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" className="w-full" />
            <div className="absolute w-5 h-5 bottom-[45%] right-[2%] translate-y-[-45%] translate-x-[-50%] cursor-pointer" onClick={() => setShow((prev) => ({ ...prev, confirm: !prev.confirm }))} >
              {show.confirm ? <Eye /> : <EyeClosed />}
            </div>
            <ErrorMsg bool={errors.confirmPassword} message={errors.confirmPassword?.message} />
          </div>

          <div className="col-span-1 sm:col-span-2 flex items-center justify-center">
            {loading ? <Loader /> :
              <Button type='submit' className="">Create</Button>}
          </div>

        </form>

      </div>
    </div>
  )
}
