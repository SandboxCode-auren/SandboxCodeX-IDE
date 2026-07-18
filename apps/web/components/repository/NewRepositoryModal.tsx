"use client";

import { useState } from "react";
import { createRepository } from "@/lib/repository-api";

export default function NewRepositoryModal({
open,
onClose,
onCreated
}:{
open:boolean;
onClose:()=>void;
onCreated:()=>void;
}){

const[name,setName]=useState("");

if(!open) return null;

async function submit(){

if(!name.trim()) return;

await createRepository(name);

setName("");

onCreated();

onClose();

}

return(

<div
onClick={onClose}
style={{
position:"fixed",
inset:0,
background:"rgba(0,0,0,.55)",
display:"flex",
justifyContent:"center",
alignItems:"center",
zIndex:3000
}}
>

<div
onClick={(e)=>e.stopPropagation()}
style={{
width:360,
background:"#262626",
border:"1px solid #393939",
padding:22,
borderRadius:10
}}
>

<h2
style={{
marginTop:0,
marginBottom:18
}}
>
New Repository
</h2>

<input

value={name}

onChange={(e)=>setName(e.target.value)}

placeholder="Repository name"

style={{

width:"100%",

padding:12,

marginBottom:18,

background:"#161616",

color:"#fff",

border:"1px solid #393939",

boxSizing:"border-box"

}}

/>

<div
style={{
display:"flex",
gap:10
}}
>

<button

onClick={onClose}

style={{
flex:1,
padding:12
}}

>

Cancel

</button>

<button

onClick={submit}

style={{
flex:1,
padding:12,
background:"#0F62FE",
border:0,
color:"#fff"
}}

>

Create

</button>

</div>

</div>

</div>

);

}
