"use client";

import { useState } from "react";
import type { ExplorerNode as Node } from "@/types/explorer";

export default function ExplorerNode({
  node,
  onOpen
}:{
  node:Node;
  onOpen:(path:string)=>void;
}){

  const [open,setOpen]=useState(true);

  if(node.type==="file"){
    return(
      <div
        onClick={()=>onOpen(node.path)}
        style={{
          padding:"4px 0 4px 18px",
          cursor:"pointer",
          color:"#D0D0D0"
        }}
      >
        📄 {node.name}
      </div>
    );
  }

  return(
    <div>
      <div
        onClick={()=>setOpen(!open)}
        style={{
          cursor:"pointer",
          fontWeight:600,
          padding:"4px 0"
        }}
      >
        {open?"📂":"📁"} {node.name}
      </div>

      {open && node.children?.map(child=>(
        <ExplorerNode
          key={child.path}
          node={child}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
