"use client";

import { useEffect,useState } from "react";

export default function ProfileCard(){

const[user,setUser]=useState<any>();

const[username,setUsername]=useState("");

const[avatar,setAvatar]=useState("");

useEffect(()=>{

fetch("/api/profile")
.then(r=>r.json())
.then(data=>{

setUser(data);

setUsername(data.name??"");

setAvatar(data.image??"");

});

},[]);

async function save(){

await fetch("/api/profile/update",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username,

avatar

})

});

alert("Saved");

location.reload();

}

if(!user){

return<div>Loading...</div>;

}

return(

<div
style={{
display:"grid",
gap:14
}}
>

<img
src={
avatar||
"https://github.githubassets.com/favicons/favicon.png"
}
width={90}
height={90}
style={{
borderRadius:"50%"
}}
/>

<input

value={username}

onChange={e=>setUsername(e.target.value)}

placeholder="Username"

/>

<input

value={avatar}

onChange={e=>setAvatar(e.target.value)}

placeholder="Avatar URL"

/>

<div>

{user.email}

</div>

<button
onClick={save}
>

Save

</button>

</div>

);

}
