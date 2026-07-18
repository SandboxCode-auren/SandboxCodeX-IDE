"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function UserMenu(){

const{data:session}=useSession();

if(!session){

return(

<Link
href="/login"
style={{
color:"#78A9FF",
textDecoration:"none",
fontSize:13
}}
>

Login

</Link>

);

}

return(

<div
style={{
display:"flex",
alignItems:"center",
gap:10
}}
>

<img
src={session.user?.image||"https://github.githubassets.com/favicons/favicon.png"}
width={34}
height={34}
style={{
borderRadius:"50%"
}}
/>

<div
style={{
fontSize:12
}}
>

<div>

{session.user?.name}

</div>

<div
style={{
color:"#8D8D8D"
}}
>

{session.user?.email}

</div>

</div>

<button

onClick={()=>signOut({

callbackUrl:"/login"

})}

style={{

padding:"8px 14px",

background:"#393939",

color:"#fff",

border:0,

cursor:"pointer"

}}

>

Logout

</button>

</div>

);

}
