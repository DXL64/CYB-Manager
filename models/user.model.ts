export type User = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin" | "superadmin"; 
};

export const defaultUser: User = {
  id: "",
  email: "",
  name: "",
  role: "user"
}

export type Token = {
  token: string;
  expires: string; // Dạng chuỗi ISO date
};

export type Tokens = {
  access: Token;
  refresh: Token;
};

export type AuthData = {
  user: User;
  tokens: Tokens;
};

export const defaultAuthData: AuthData = {
  user: {
    id: "",
    email: "",
    name: "",
    role: "user", // Giá trị mặc định cho role là "user"
  },
  tokens: {
    access: {
      token: "",
      expires: "", // Giá trị mặc định trống cho token
    },
    refresh: {
      token: "",
      expires: "", // Giá trị mặc định trống cho refresh token
    },
  },
};
