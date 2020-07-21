export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  password?: string;
  deviceToken?: string;
  isOnline?: boolean;
  color?: string;
}
