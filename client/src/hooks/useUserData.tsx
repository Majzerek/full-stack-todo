import { getUserId, getUserName } from '@/services/authServices'
import type { UserProfileInfo } from '@/types';
import axios from 'axios';
import { useMemo, useState } from 'react';


export const useUserData = () => {

  const userName = getUserName();
  const userID = getUserId();
  
  return ({
    userName,
    userID
  }
  )

}
