declare global {
  interface InfAuthLogin {
    username: string;
    password: string;
  }
  type TypeAuthUserRole = "admin" | "employee";
  interface InfAuthUser {
    id: number;
    username: string;
    role: TypeAuthUserRole;
  }
}

export {};
