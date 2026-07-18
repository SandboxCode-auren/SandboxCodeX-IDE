type Props={
title:string;
value:string;
color?:string;
};

export default function StatusCard({
title,
value,
color="#24A148"
}:Props){

return(

<div
style={{
border:"1px solid #393939",
background:"#262626",
padding:16
}}
>

<div
style={{
fontSize:12,
color:"#A8A8A8",
marginBottom:10,
textTransform:"uppercase",
letterSpacing:1
}}
>
{title}
</div>

<div
style={{
display:"flex",
alignItems:"center",
gap:8,
fontWeight:600
}}
>

<div
style={{
width:8,
height:8,
background:color
}}
/>

{value}

</div>

</div>

);

}
