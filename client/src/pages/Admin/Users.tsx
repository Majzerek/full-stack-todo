import { Card, Loader, Tabs, TabsContent, TabsList, TabsTrigger, Wrapper } from '@/components'
import { useUsers } from '@/hooks/useUsers';
import { lazy, Suspense } from 'react';


export const Users = () => {

  const {usersStat, setRefetch} = useUsers();
  if (!usersStat) return null;

  const UsersList = lazy(() => import('./components/usersList'));
  const AwaitingUsers = lazy(() => import('./components/awaitingUsersList'))

  return (
    <Wrapper>
      <h1 className='text-2xl'>Users</h1>
      <div className="flex flex-col items-center gap-6 ">
        <Tabs defaultValue="users-list" className='w-[80%] sm:w-[70vw] md:w-[85vw] m-5 transition-all '>
          <TabsList>
            <TabsTrigger value="users-list" >Users List</TabsTrigger>
            <TabsTrigger value="awaiting-users" >Awaiting Users</TabsTrigger>
          </TabsList>
          <TabsContent value="users-list" >

            <Suspense fallback={<Card><Loader /></Card>}>
              <UsersList usersList={usersStat} />
            </Suspense>
          </TabsContent>
          <TabsContent value="awaiting-users">

            <Suspense fallback={<Card><Loader /></Card>}>
              <AwaitingUsers usersList={usersStat} refesetRefetch={setRefetch}/>
            </Suspense>

          </TabsContent>
        </Tabs>
      </div>
    </Wrapper>
  )
}
