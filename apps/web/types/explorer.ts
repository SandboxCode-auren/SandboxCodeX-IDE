export interface ExplorerNode{
  name:string;
  path:string;
  type:"file"|"directory";
  children?:ExplorerNode[];
}
