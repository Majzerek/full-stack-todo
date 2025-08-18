import {
  Loader,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Wrapper,
} from "@/components";
import { useUsers } from "@/hooks/useUsers";
import UsersList from "./components/UsersList";
import AwaitingUsersList from "./components/AwaitingUsersList";

const Users = () => {
  const { usersStat, setRefetch, loading } = useUsers();
  if (!usersStat) return;
  if (loading) {
    return (
      <Wrapper>
        <h1 className="text-3xl  my-2">Users</h1>
        <Loader />
      </Wrapper>);
  };
  return (
    <Wrapper>
      <h1 className="text-3xl my-2">Users</h1>
      <div className="flex flex-col items-center gap-6 ">
        <Tabs
          defaultValue="users-list"
          className="w-[80%] sm:w-[70vw] md:w-[85vw] m-5 transition-all "
        >
          <TabsList>
            <TabsTrigger value="users-list">Users List</TabsTrigger>
            <TabsTrigger value="awaiting-users">Awaiting Users</TabsTrigger>
          </TabsList>
          <TabsContent value="users-list">
            <UsersList usersList={usersStat} loading={loading} />
          </TabsContent>
          <TabsContent value="awaiting-users">
            <AwaitingUsersList
              usersList={usersStat}
              refesetRefetch={setRefetch}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Wrapper>
  );
};

export default Users;
