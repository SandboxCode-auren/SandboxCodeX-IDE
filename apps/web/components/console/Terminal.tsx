export default function Terminal(){

const lines=[
"$ sandboxcodex init",
"Loading workspace...",
"Connecting GitHub...",
"Waiting for authentication...",
"",
"> Ready."
];

return(

<div
style={{
background:"#111",
border:"1px solid #393939",
padding:16,
fontFamily:"IBM Plex Mono",
fontSize:13,
overflow:"auto"
}}
>

{lines.map((line,index)=>(

<div
key={index}
style={{
marginBottom:8,
color:index===lines.length-1?"#24A148":"#D0D0D0"
}}
>
{line}
</div>

))}

</div>

);

}
