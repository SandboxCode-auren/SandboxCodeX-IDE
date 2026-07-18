"use client";

import { useMenu } from "./MenuContext";

export default function Hamburger(){

const { setOpen } = useMenu();

return(

<button
onClick={()=>setOpen(true)}
style={{
background:"transparent",
border:"none",
fontSize:30,
color:"#fff",
cursor:"pointer"
}}
>
☰
</button>

);

}
