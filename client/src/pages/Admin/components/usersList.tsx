import {
  Card,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";

import type { UsersStatisticType } from "@/types";
import { StatusEnum } from "@/types/roleEnum";
import { format } from "date-fns";
import React from "react";

type UserListProps = {
  usersList: UsersStatisticType;
};

const UsersList = ({ usersList }: UserListProps) => {
  const [status, setStatus] = React.useState<string>(StatusEnum.ACTIVE);

  return (
    <Card className="translate-all shadow-md shadow-sidebar-primary">
      <div className="flex gap-2 place-content-center ">
        <Label htmlFor="Status" className="text-xl my-auto">
          Filter:{" "}
        </Label>
        <Select
          onValueChange={(SelectValue) => setStatus(SelectValue)}
          defaultValue={StatusEnum.ACTIVE}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value={StatusEnum.ACTIVE}>
                {StatusEnum.ACTIVE}
              </SelectItem>
              <SelectItem value={StatusEnum.PENDING}>
                {StatusEnum.PENDING}
              </SelectItem>
              <SelectItem value={StatusEnum.DECLINED}>
                {StatusEnum.DECLINED}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Users NO.</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersList[status as keyof typeof usersList].users.map(
            (user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  {user.name.toUpperCase()} {user.surname.toUpperCase()}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">
                  {format(user.joined, "dd-MMMM-yyyy")}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {usersList[status as keyof typeof usersList].new}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
};

export default UsersList;
