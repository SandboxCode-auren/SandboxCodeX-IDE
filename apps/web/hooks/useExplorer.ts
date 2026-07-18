"use client";

import { useEffect,useState } from "react";
import { ExplorerNode } from "@/types/explorer";

export function useExplorer(){

const[data,setData]=useState<ExplorerNode[]>([]);
const[loading,setLoading]=useState(true);

async function refresh(){

setLoading(true);

const res=await fetch("/api/explorer");

setData(await res.json());

setLoading(false);

}

useEffect(()=>{
refresh();
},[]);

return{
data,
loading,
refresh
};

}
