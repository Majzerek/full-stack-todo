// temp
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};
export const getUserId = ():string | null => {
  return localStorage.getItem("userId")
}
export const getUserName = ():string | null => {
  return localStorage.getItem("userName")
}
export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName")
  localStorage.removeItem("userStatus")
};
