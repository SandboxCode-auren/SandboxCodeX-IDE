"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm(){

const[account,setAccount]=useState("");
const[password,setPassword]=useState("");
const[loading,setLoading]=useState(false);
const[error,setError]=useState("");

async function login(){

setLoading(true);
setError("");

const res=await signIn("credentials",{

account,
password,

redirect:false,

callbackUrl:"/"

});

setLoading(false);

if(res?.error){

setError("Sai tài khoản hoặc mật khẩu");
return;

}

location.href="/";

}

return(

<div
style={{
display:"grid",
gap:16
}}
>

<input

placeholder="Email hoặc Username"

value={account}

onChange={e=>setAccount(e.target.value)}

style={{
padding:14,
background:"#161616",
border:"1px solid #393939",
color:"#fff"
}}

/>

<input

type="password"

placeholder="Password"

value={password}

onChange={e=>setPassword(e.target.value)}

style={{
padding:14,
background:"#161616",
border:"1px solid #393939",
color:"#fff"
}}

/>

{

error&&(

<div
style={{
color:"#FA4D56",
fontSize:13
}}
>

{error}

</div>

)

}

<button

onClick={login}

disabled={loading}

style={{

padding:14,

background:"#0F62FE",

color:"#fff",

border:0,

cursor:"pointer"

}}

>

{

loading

?

"Signing in..."

:

"Sign in"

}

</button>

<button

onClick={()=>signIn("github")}

style={{

padding:14,

background:"#24292F",

color:"#fff",

border:0,

cursor:"pointer"

}}

>

Continue with GitHub

</button>

</div>

);

}
