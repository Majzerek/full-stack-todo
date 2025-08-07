export type RegisterFormType = {
  name: string;
  surname: string;
  email: string;
  phoneNumber?: string;
  password: string;
  confirmPassword: string;
  role: string;
};
export type UpdateInfoType = Omit<RegisterFormType, 'confirmPassword' | "password" | "role"> & {
  joined?: string;
  personalAddress?: {
    street: string;
    postCode: string;
    town: string;
    buildingNumber: string;
    apartmentNumber?: string;
  }
}

