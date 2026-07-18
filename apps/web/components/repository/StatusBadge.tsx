export default function StatusBadge({

status

}:{

status:string

}){

const color={

READY:"#42BE65",

RUNNING:"#0F62FE",

WAITING:"#F1C21B",

ERROR:"#FA4D56"

}[status]??"#8D8D8D";

return(

<span
style={{

padding:"4px 10px",

background:color,

color:"#fff",

fontSize:11,

borderRadius:30,

fontWeight:700

}}
>

{status}

</span>

);

}
