export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

export interface GetUsersData {
  users: {
    data: User[];
  };
}

export interface GetUsersVars {
  limit: number;
}
