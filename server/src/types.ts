export type Role = "regular" | "admin";

export type SessionUser = {
  id: string;
  email: string;
  role: Role;
};

export type AppBindings = {
  Variables: {
    user: SessionUser;
  };
};
