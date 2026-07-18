export type RepositoryStatus =
  | "READY"
  | "RUNNING"
  | "WAITING"
  | "ERROR";

export interface Repository {

  id:string;

  name:string;

  branch:string;

  status:RepositoryStatus;

  favorite:boolean;

}
