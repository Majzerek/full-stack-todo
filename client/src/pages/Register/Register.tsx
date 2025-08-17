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
import { Link } from "react-router-dom";

const validationSchema: yup.ObjectSchema<RegisterFormType> = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must contain at lest 2 characters")
      .max(20, "Name can contain max 20 characters"),

    surname: yup
      .string()
      .required("Surname is required")
      .min(2, "Surname must contain at lest 2 characters")
      .max(20, "Surname can contain max 20 characters"),

    email: yup
      .string()
      .required("Email is required")
      .matches(emailRegex, "Please provide valid email")
      .min(9, "Email must contain at lest 9 characters")
      .max(35, "Email is too long, max 35 characters"),

    phoneNumber: yup.string().optional(),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(28, "Password contain too many characters, max 28")
      .matches(
        regexPassword,
        "One uppercase, One number and One special case character",
      ),

    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password"), ""], "Passwords don't match"),
    role: yup.string().default("USER"),
  });

export const Register = () => {
  const navigate = useNavigate();
  const { showSuccessAlert, showErrorAlert } = useAlertContext();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      role: "USER",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState({ password: false, confirm: false });

  const onSubmit = async (values: RegisterFormType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = values;
    setLoading(true);
    await axios
      .post("http://localhost:4040/register-user", rest)
      .then((res) => {
        setLoading(false);
        showSuccessAlert(res.data.message);
        reset();
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        showErrorAlert(err.response.data.message);
        setError(true);
        console.error(error);
      });
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-start sm:justify-center items-center overflow-auto">
      <title>App Todo Register</title>
      <h1 className="text-2xl mb-5 text-center">Register in App</h1>
      <div className=" border-2 p-5 rounded-2xl w-full md:w-[80%] m-2 ">
        <h2 className="text-xl mb-5 text-center">FORM</h2>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName" data-testId="label-name">
              Name:
            </Label>
            <Input
              control={control}
              title="Name"
              name="name"
              id="firstName"
              placeholder="First Name"
              className="w-full"
            />
            <ErrorMsg bool={errors.name} message={errors.name?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="surname" data-testId="label-surname">
              Surname:
            </Label>
            <Input
              control={control}
              title="Surname"
              name="surname"
              id="surname"
              placeholder="Last Name"
              className="w-full"
            />
            <ErrorMsg bool={errors.surname} message={errors.surname?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" data-testId="label-email">
              Email:
            </Label>
            <Input
              control={control}
              title="Email"
              name="email"
              id="email"
              placeholder="Email (Need for login)"
              className="w-full"
            />
            <ErrorMsg bool={errors.email} message={errors.email?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phoneNumber" data-testId="label-phone">
              Phone Number:
            </Label>
            <Input
              control={control}
              title="Phone-Number"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number (Optional)"
              className="w-full"
            />
            <ErrorMsg
              bool={errors.phoneNumber}
              message={errors.phoneNumber?.message}
            />
          </div>

          <div className="flex flex-col gap-2 relative h-30">
            <Label htmlFor="password" data-testId="label-pass">
              Password:
            </Label>
            <Input
              type={show.password ? "text" : "password"}
              control={control}
              title="Password"
              name="password"
              id="password"
              data-testId="input-password1"
              placeholder="Password"
              className="w-full"
            />
            <div
              className="absolute bottom-[55%] right-5 translate-y-[50%] cursor-pointer"
              onClick={() =>
                setShow((prev) => ({ ...prev, password: !prev.password }))
              }
            >
              {show.password ? <Eye /> : <EyeClosed />}
            </div>
            <ErrorMsg
              bool={errors.password}
              message={errors.password?.message}
            />
          </div>

          <div className="flex flex-col gap-2 relative h-30">
            <Label htmlFor="confirmPassword" data-testId="label-confirm">
              Confirm Password:
            </Label>
            <Input
              type={show.confirm ? "text" : "password"}
              control={control}
              title="Confirm-Password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              data-testId="input-password2"
              className="w-full"
            />
            <div
              className="absolute bottom-[55%] right-5 translate-y-[50%] cursor-pointer"
              onClick={() =>
                setShow((prev) => ({ ...prev, confirm: !prev.confirm }))
              }
            >
              {show.confirm ? <Eye /> : <EyeClosed />}
            </div>
            <ErrorMsg
              bool={errors.confirmPassword}
              message={errors.confirmPassword?.message}
            />
          </div>

          <div className="col-span-1 sm:col-span-2 flex items-center justify-center">
            {loading ? <Loader /> : <Button type="submit">Create</Button>}
          </div>
        </form>
      </div>
      <Link
        to={"/login"}
        className="text-red-400 transition-colors hover:text-blue-500 uppercase text-2xl"
      >
        back
      </Link>
    </div>
  );
};
