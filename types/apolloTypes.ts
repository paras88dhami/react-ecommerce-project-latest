export type UserItem = {
  id: string;
  name: string;
  username: string;
  email: string;
};

export type GetUsersData = {
  users: { data: UserItem[] };
};

export type GetUsersVars = {
  limit: number;
};
