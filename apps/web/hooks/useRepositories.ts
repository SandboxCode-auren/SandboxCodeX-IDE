"use client";

import { useEffect,useState } from "react";

import {

getRepositories,

createRepository,

updateRepository,

deleteRepository

} from "@/lib/repository-api";

import { Repository } from "@/types/repository";

export function useRepositories(){

const [repos,setRepos]=useState<Repository[]>([]);

const [loading,setLoading]=useState(true);

async function refresh(){

setLoading(true);

setRepos(
await getRepositories()
);

setLoading(false);

}

useEffect(()=>{

refresh();

},[]);

return{

repos,

loading,

refresh,

createRepository,

updateRepository,

deleteRepository

};

}
