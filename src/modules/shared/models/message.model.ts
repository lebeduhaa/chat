import { User } from './user.model';

export interface Message {
  id: string;
  content: string;
  user: User;
}
