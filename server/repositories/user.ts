interface User {
  id: number;
  username: string;
  password: string;
  role: "admin" | "employee";
}

export class UserRepository {
  private users: User[] = [
    {
      id: 1,
      username: "admin",
      password: "admin",
      role: "admin",
    },
    {
      id: 2,
      username: "employee",
      password: "employee",
      role: "employee",
    },
  ];

  async findByCredentials(
    username: string,
    password: string
  ): Promise<User | null> {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    return user || null;
  }

  async findById(id: number): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user || null;
  }
}
