export type RegisterFormType = {
  name: string;
  surname: string;
  email: string;
  phoneNumber?: string;
  password: string;
  confirmPassword: string;
  role: string;
};

type Address = {
  personalAddress?: {
    street: string;
    postCode: string;
    town: string;
    buildingNumber: string;
    apartmentNumber?: string;
  }
}
export type UpdateInfoType = Omit<RegisterFormType, 'confirmPassword' | "password" > & {
  joined?: string;
} & Address;

export type UserDataType = {
  id: string;
  name:string;
  surname: string;
  email: string;
  phoneNumber?: string;
  joined: string;
  status: string;
} & Address;
