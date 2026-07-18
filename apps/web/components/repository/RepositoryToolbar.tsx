"use client";

export default function RepositoryToolbar({
onNew,
onImport
}:{
onNew:()=>void;
onImport:()=>void;
}){

return(

<div
style={{
display:"flex",
gap:10,
marginBottom:18
}}
>

<button
onClick={onNew}
style={{
flex:1,
padding:12,
background:"#0F62FE",
color:"#fff",
border:0,
cursor:"pointer"
}}
>
New
</button>

<button
onClick={onImport}
style={{
flex:1,
padding:12,
background:"#393939",
color:"#fff",
border:0,
cursor:"pointer"
}}
>
Import
</button>

</div>

);

}
