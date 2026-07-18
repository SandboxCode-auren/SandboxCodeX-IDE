"use client";

import { useMemo, useState } from "react";

import { useRepositories } from "@/hooks/useRepositories";

import RepositoryCard from "./RepositoryCard";
import RepositorySearch from "./RepositorySearch";
import RepositoryToolbar from "./RepositoryToolbar";
import NewRepositoryModal from "./NewRepositoryModal";

import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import Toast from "@/components/ui/Toast";

export default function RepositoryList(){

const{

repos,

loading,

refresh,

updateRepository,

deleteRepository

}=useRepositories();

const[search,setSearch]=useState("");

const[open,setOpen]=useState(false);

const[toast,setToast]=useState("");

const filtered=useMemo(()=>{

return repos.filter(r=>

r.name.toLowerCase().includes(
search.toLowerCase()
)

);

},[repos,search]);

return(

<>

<RepositoryToolbar

onNew={()=>setOpen(true)}

onImport={()=>setToast("GitHub Import - Mega Pack 02")}

/>

<RepositorySearch

value={search}

onChange={setSearch}

/>

<NewRepositoryModal

open={open}

onClose={()=>setOpen(false)}

onCreated={()=>{
refresh();
setToast("Repository created");
}}

/>

{loading && <Loading />}

{!loading && filtered.length===0 && <Empty />}

<div
style={{
display:"grid",
gap:12
}}
>

{

filtered.map(repo=>(

<RepositoryCard

key={repo.id}

repo={repo}

onFavorite={async()=>{

await updateRepository(repo.id,{
favorite:!repo.favorite
});

refresh();

setToast("Favorite updated");

}}

onRename={()=>{

setToast("Rename - Mega Pack 02");

}}

onDelete={async()=>{

if(!confirm("Delete repository?"))
return;

await deleteRepository(repo.id);

refresh();

setToast("Repository deleted");

}}

 />

))

}

</div>

<Toast

show={toast!==""}

message={toast}

onClose={()=>setToast("")}

/>

</>

);

}
