"use client";

import { useState } from "react";

export default function RegisterForm(){

const[username,setUsername]=useState("");
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");

async function register(){

const res=await fetch("/api/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username,
email,
password

})

});

if(res.ok){

alert("Đăng ký thành công");

location.href="/login";

}else{

alert("Đăng ký thất bại");

}

}

return(

<div
style={{
display:"grid",
gap:14
}}
>

<input

placeholder="Username"

value={username}

onChange={e=>setUsername(e.target.value)}

/>

<input

placeholder="Email"

value={email}

onChange={e=>setEmail(e.target.value)}

/>

<input

type="password"

placeholder="Password"

value={password}

onChange={e=>setPassword(e.target.value)}

/>

<button
onClick={register}
>

Create account

</button>

</div>

);

}
