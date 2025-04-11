import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp: number;
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000);
    
    return decoded.exp < now;
  } catch {
    return true;
  }
};
