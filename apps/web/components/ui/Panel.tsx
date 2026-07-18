type Props={
title:string;
children:React.ReactNode;
};

export default function Panel({
title,
children
}:Props){

return(

<section
style={{
border:"1px solid #393939",
marginTop:20
}}
>

<div
style={{
padding:"10px 14px",
borderBottom:"1px solid #393939",
background:"#202020",
fontFamily:"IBM Plex Mono",
fontSize:12,
letterSpacing:1
}}
>

{title}

</div>

<div
style={{
padding:16
}}
>

{children}

</div>

</section>

);

}
