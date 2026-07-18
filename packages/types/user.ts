export interface User {

  id: string;

  username: string;

  email: string;

  passwordHash: string;

  githubId?: string;

  avatar?: string;

  createdAt: string;

}
