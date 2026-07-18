"use client";

import { useExplorer } from "@/hooks/useExplorer";
import ExplorerNode from "./ExplorerNode";

export default function Explorer(){

  const {data,loading}=useExplorer();

  if(loading){
    return <div style={{padding:16}}>Loading...</div>;
  }

  return(
    <div
      style={{
        padding:12,
        border:"1px solid #393939",
        background:"#1E1E1E",
        minHeight:300
      }}
    >
      {data.map(node=>(
        <ExplorerNode
          key={node.path}
          node={node}
          onOpen={(path)=>alert(path)}
        />
      ))}
    </div>
  );
}
