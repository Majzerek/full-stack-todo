import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setToken = (token: string) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7); // 7 days from now

  cookies.set("jwt_authorization", token, {
    expires,
  });
};

export const getToken = (): string | null => {
  return cookies.get("jwt_authorization");
};

export const getUserId = (): string | null => {
  return localStorage.getItem("userId");
};

export const getUserName = (): string | null => {
  return localStorage.getItem("userName");
};
export const removeToken = () => {
  cookies.remove("jwt_authorization");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userStatus");
};
