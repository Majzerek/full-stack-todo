import { Button, Card, Loader, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components'
import { useAlertContext } from '@/context'
import type { UsersStatisticType } from '@/types'
import { StatusEnum } from '@/types/roleEnum'
import axios from 'axios'
import { format } from 'date-fns'
import React from 'react'

type AwaitingUsersProps = {
  usersList: UsersStatisticType,
  refesetRefetch: (arg: boolean) => void,
}

const AwaitingUsersList = ({ usersList,refesetRefetch }: AwaitingUsersProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const {showErrorAlert, showSuccessAlert} = useAlertContext();

  const submitDecision = async (id: string, status: string) => {
    setIsLoading(true);
    await axios.post(`http://localhost:4040/users/update-status/${id}`, { status })
      .then(() => {
        setIsLoading(false)
        showSuccessAlert("Decision has been send")
        refesetRefetch(true)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
        showErrorAlert(err.data.message)
      })
  }
  return (
    <Card className='translate-all shadow-md shadow-sidebar-primary'>

      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Users NO.</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Joined</TableHead>
            <TableHead className="text-right">Decision</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? <Loader /> :
        <TableBody>
          {usersList.PENDING.users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{user.name.toUpperCase()} {user.surname.toUpperCase()}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-right">{format(user.joined, "dd-MMMM-yyyy")}</TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <Button className='bg-chart-2' onClick={() => submitDecision(user.id, StatusEnum.ACTIVE)}>Accept</Button>
                <Button variant={'destructive'}onClick={() => submitDecision(user.id, StatusEnum.DECLINED)}>Reject</Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>}
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">{usersList.PENDING.new}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  )
}

export default AwaitingUsersList