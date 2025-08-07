import { Tabs, TabsContent, TabsList, TabsTrigger, Wrapper } from '@/components';
import { useUserData } from '@/hooks/useUserData';
import { Account } from './components/account';
import { UpdateInfo } from './components/updateInfo';
import { useMemo, useState } from 'react';
import axios from 'axios';
import type { UpdateInfoType } from '@/types';
import { useUserContext } from '@/context';


export const Profile = () => {
  
  const { userName } = useUserData();
  const {userInfo} = useUserContext();
  

  if (!userInfo) return;
  return (
    <Wrapper>
      <h1 className='text-center text-4xl font-bold my-10' >Profile {userName?.toUpperCase()}</h1>

      <div className="flex flex-col items-center gap-6 ">
        <Tabs defaultValue="account" className='w-full sm:w-[70vw] md:w-[85vw] m-5 transition-all '>
          <TabsList>
            <TabsTrigger value="account" >{userName?.toUpperCase()} Info</TabsTrigger>
            <TabsTrigger value="update" >Update Profil</TabsTrigger>
          </TabsList>
          <TabsContent value="account">

            <Account userInfo={userInfo} />

          </TabsContent>
          <TabsContent value="update">

            <UpdateInfo userInfo={userInfo} />

          </TabsContent>
        </Tabs>
      </div>
    </Wrapper >
  )
}
