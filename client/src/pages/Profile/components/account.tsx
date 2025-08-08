import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Label, Badge } from '@/components'
import type { UpdateInfoType } from '@/types'
import { format } from 'date-fns'

type UpdateProps = {
  userInfo: UpdateInfoType
}
const Account = ({userInfo}:UpdateProps) => {

  if(!userInfo) return
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Here is your current information.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-3  gap-6">

        <div className="gap-3">
          <Label htmlFor="tabs-name"><Badge id='name'>Full Name:</Badge> {userInfo.name} {userInfo.surname}</Label>
        </div>
        <div className="gap-3">
          <Label htmlFor="tabs-email"><Badge>Email:</Badge> {userInfo.email}</Label>
        </div>
        <div className="gap-3">
          <Label htmlFor="tabs-phone"><Badge>Phone Number:</Badge> {userInfo.phoneNumber ? "None" : userInfo.phoneNumber}</Label>
        </div>
        <div className="gap-3">
          <Label htmlFor="tabs-town"><Badge>Town:</Badge> {!userInfo.personalAddress?.town ? "None" : userInfo.personalAddress.town}</Label>
        </div>
        <div className="gap-3">
          <Label htmlFor="tabs-street"><Badge>Street:</Badge> {!userInfo.personalAddress?.street ? "None" : userInfo.personalAddress.street}</Label>
        </div>
        <div className="gap-3">
          <Label htmlFor="tabs-postCode"><Badge>PostCode:</Badge> {!userInfo.personalAddress?.postCode ? "None" : userInfo.personalAddress.postCode}</Label>
        </div>
        <div className="gap-3">
          <Label htmlFor="tabs-buildingNumber"><Badge>Building Number</Badge> {!userInfo.personalAddress?.buildingNumber ? "None" : userInfo.personalAddress.buildingNumber}</Label>
        </div>
        <div className="gap-3">
          <Label htmlFor="tabs-apartment"><Badge>Apartment Number</Badge> {!userInfo.personalAddress?.apartmentNumber ? "None" : userInfo.personalAddress.apartmentNumber}</Label>
        </div>
      </CardContent>
      <CardFooter className='flex items-center justify-center'>
        <p >Joined {format(userInfo.joined!, 'dd-MMMM-yyyy')}</p>
      </CardFooter>
    </Card>
  )
}


export default Account;