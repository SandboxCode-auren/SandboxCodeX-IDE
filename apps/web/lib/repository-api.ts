import { Repository } from "@/types/repository";

export async function getRepositories():Promise<Repository[]>{

const res=await fetch("/api/repositories",{
cache:"no-store"
});

if(!res.ok)
throw new Error("load failed");

return res.json();

}

export async function createRepository(name:string){

const res=await fetch("/api/repositories",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name
})

});

return res.json();

}

export async function updateRepository(

id:string,

body:Partial<Repository>

){

await fetch("/api/repositories/"+id,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(body)

});

}

export async function deleteRepository(id:string){

await fetch("/api/repositories/"+id,{
method:"DELETE"
});

}
