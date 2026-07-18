"use client";

export default function RepositorySearch({
value,
onChange
}:{
value:string;
onChange:(v:string)=>void;
}){

return(

<input
value={value}
onChange={(e)=>onChange(e.target.value)}
placeholder="Search repository..."
style={{
width:"100%",
padding:12,
marginBottom:18,
background:"#161616",
border:"1px solid #393939",
color:"#fff",
boxSizing:"border-box"
}}
/>

);

}
