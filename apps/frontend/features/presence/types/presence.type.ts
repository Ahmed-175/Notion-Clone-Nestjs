export interface IActiveUser {
  _id: string;
  username: string;
  email: string;
  picture: string;
}

export interface IPresenceContext {
  activeUsers : IActiveUser[];
}
