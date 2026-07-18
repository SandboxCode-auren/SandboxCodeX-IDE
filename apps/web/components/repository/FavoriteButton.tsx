"use client";

export default function FavoriteButton({
favorite,
onClick
}:{
favorite:boolean;
onClick:()=>void;
}){

return(

<button
onClick={onClick}
style={{
background:"transparent",
border:0,
cursor:"pointer",
fontSize:18,
padding:0
}}
>

{favorite?"⭐":"☆"}

</button>

);

}
