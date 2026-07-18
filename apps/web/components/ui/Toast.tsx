"use client";

import { useEffect } from "react";

export default function Toast({
show,
message,
onClose
}:{
show:boolean;
message:string;
onClose:()=>void;
}){

useEffect(()=>{

if(!show) return;

const t=setTimeout(onClose,2500);

return()=>clearTimeout(t);

},[show,onClose]);

if(!show) return null;

return(

<div
style={{
position:"fixed",
left:"50%",
bottom:30,
transform:"translateX(-50%)",
background:"#0F62FE",
color:"#fff",
padding:"12px 18px",
borderRadius:8,
fontWeight:600,
zIndex:9999,
boxShadow:"0 8px 25px rgba(0,0,0,.4)"
}}
>

{message}

</div>

);

}
