import * as yup from 'yup';
import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, ErrorMsg, Input, Label, Loader } from "@/components"
import { useAlertContext, useAuthContext } from "@/context"
import type { UpdateInfoType } from "@/types";
import { useState } from "react";
import { emailRegex } from '@/utils/helpers/regex';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';


const validationSchema: yup.ObjectSchema<UpdateInfoType> = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name must contain at lest 2 characters").max(20, "Name can contain max 20 characters"),

  surname: yup.string().required("Surname is required").min(2, "Surname must contain at lest 2 characters").max(20, "Surname can contain max 20 characters"),

  email: yup.string().required("Email is required").matches(emailRegex, "Please provide valid email").min(9, "Email must contain at lest 9 characters").max(35, "Email is too long, max 35 characters"),

  phoneNumber: yup.string().optional(),

  joined: yup.string().optional(),

  personalAddress: yup.object().shape({
    town: yup.string().required("Town is required").min(2, "Town must contain at lest 2 characters").max(15, "Town contains too many characters, max 15"),
    street: yup.string().required("Street name is required").min(3, "Street must contain at lest 3 characters").max(15, "Street contains too many characters, max 15"),
    buildingNumber: yup.string().required("Building number is required").min(1, "Min 1 character or number").max(5, "Building number contains too many characters, max 5"),
    apartmentNumber: yup.string().optional().max(5, "Apartment number contains too many characters, max 5"),
    postCode: yup.string().required("PostCode is required").min(4, "Street must contain at lest 4 characters").max(10, "PostCode contains too many characters, max 10"),
  }),
});
type UpdateProps = {
  userInfo: UpdateInfoType;
  userID: string | null;
}
const UpdateInfo = ({userInfo,userID}: UpdateProps) => {
  
  const { logout } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<UpdateInfoType>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      name: userInfo?.name || '',
      surname: userInfo?.surname || '',
      email: userInfo?.email || '',
      phoneNumber: userInfo?.phoneNumber || '',
      joined: userInfo?.joined || '',
      personalAddress: {
        town: "",
        street: "",
        buildingNumber: "",
        apartmentNumber: "",
        postCode: "",
      }
    }
  });
  const { showErrorAlert, showSuccessAlert } = useAlertContext();

  const onSubmit = async (values: UpdateInfoType) => {
    setIsLoading(true);
    await axios.post(`http://localhost:4040/user/${userID}/update`, values)
      .then((res) => {
        setIsLoading(false)
        showSuccessAlert(`${res.data.message} LOG-OUT in 3s`)
        logout()
        setTimeout(()=> window.location.reload(), 3000)
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        showErrorAlert(err.response.data.message)
      })
  };


  if (!userInfo) return null;

  return (
    <Card className='shadow-md shadow-sidebar-primary transition-all'>
      <CardHeader>
        <CardTitle>Update Info</CardTitle>
        <CardDescription>
          Change your info and add more here. After saving, <span className='font-bold'>you&apos;ll be logged out.</span>

        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} >
        <CardContent className='grid md:grid-cols-3 gap-6'>
          <div className="flex flex-col h-max gap-3  ">
            <Label htmlFor="tabs-new-name"><Badge>Name: </Badge></Label>
            <Input id="tabs-new-name" type="text" name='name' control={control} placeholder={'Current ' + userInfo.name} />
            <ErrorMsg bool={errors.name} message={errors.name?.message} />
          </div>
          <div className="flex flex-col h-max gap-3">
            <Label htmlFor="tabs-new-surname"><Badge>Surname:</Badge> </Label>
            <Input id="tabs-new-surname" type="text" name="surname" control={control} placeholder={'Current: ' + userInfo.surname} />
            <ErrorMsg bool={errors.surname} message={errors.surname?.message} />
          </div>
          <div className="flex flex-col h-max gap-3">
            <Label htmlFor="tabs-new-email"><Badge>Email:</Badge> </Label>
            <Input id="tabs-email" type="text" name="email" control={control} placeholder={'Current: ' + userInfo.email} />
            <ErrorMsg bool={errors.email} message={errors.email?.message} />
          </div>
          <div className="flex flex-col h-max gap-3">
            <Label htmlFor="tabs-new-phoneNumber"><Badge>Phone Number: </Badge> </Label>
            <Input id="tabs-phoneNumber" type="text" name="phoneNumber" control={control} placeholder={userInfo.phoneNumber ? userInfo.phoneNumber : 'None'} />
            <ErrorMsg bool={errors.phoneNumber} message={errors.phoneNumber?.message} />
          </div>
          <div className="flex flex-col h-max gap-3">
            <Label htmlFor="tabs-new-town"><Badge>Town: </Badge> </Label>
            <Input id="tabs-town" type="text" name="personalAddress.town" control={control} placeholder={userInfo.personalAddress?.town ? userInfo.personalAddress?.town : 'None'} />
            <ErrorMsg bool={errors.personalAddress?.town} message={errors.personalAddress?.town?.message} />
          </div>
          <div className="flex flex-col h-max gap-3">
            <Label htmlFor="tabs-new-street"><Badge>Street: </Badge> </Label>
            <Input id="tabs-street" type="text" name="personalAddress.street" control={control} placeholder={userInfo.personalAddress?.street ? userInfo.personalAddress?.street : 'None'} />
            <ErrorMsg bool={errors.personalAddress?.street} message={errors.personalAddress?.street?.message} />
          </div>
          <div className="flex flex-col h-max gap-3">
            <Label htmlFor="tabs-new-buildingNumber"><Badge>Building Number: </Badge> </Label>
            <Input id="tabs-buildingNumber" type="text" name="personalAddress.buildingNumber" control={control} placeholder={userInfo.personalAddress?.buildingNumber ? userInfo.personalAddress?.buildingNumber : 'None'} />
            <ErrorMsg bool={errors.personalAddress?.buildingNumber} message={errors.personalAddress?.buildingNumber?.message} />
          </div>
          <div className="flex flex-col h-max gap-3">
            <Label htmlFor="tabs-new-postCode"><Badge>Post-Code: </Badge> </Label>
            <Input id="tabs-postCode" type="text" name="personalAddress.postCode" control={control} placeholder={userInfo.personalAddress?.postCode ? userInfo.personalAddress?.postCode : 'None'} />
            <ErrorMsg bool={errors.personalAddress?.postCode} message={errors.personalAddress?.postCode?.message} />
          </div>
          <div className="flex flex-col h-max gap-3">
            <Label htmlFor="tabs-new-apartmentNumber"><Badge>Apartment Number(Optional): </Badge> </Label>
            <Input id="tabs-apartmentNumber" type="text" name="personalAddress.apartmentNumber" control={control} placeholder={userInfo.personalAddress?.apartmentNumber ? userInfo.personalAddress?.apartmentNumber : 'None'} />
            <ErrorMsg bool={errors.personalAddress?.apartmentNumber} message={errors.personalAddress?.apartmentNumber?.message} />
          </div>

        </CardContent>
        <div className="flex w-full items-center justify-center mt-5">
          <Button type='submit' variant={isLoading ? 'ghost' : 'default'} >{isLoading ? <Loader /> : 'Save'}</Button>
        </div>
      </form>
      <CardFooter className='flex justify-center w-full'>
        <p >Remember to save updated info</p>
      </CardFooter>
    </Card>
  )
}
export default UpdateInfo