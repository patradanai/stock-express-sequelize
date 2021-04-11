export interface User {
  fname: string;
  lname: string;
  email: string;
  password: string;
  nicename: string;
}

export interface ResUser extends Request {
  userId: number;
}
