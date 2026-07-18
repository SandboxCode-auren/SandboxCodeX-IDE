"use client";

import StatusBadge from "./StatusBadge";
import FavoriteButton from "./FavoriteButton";
import { Repository } from "@/types/repository";

export default function RepositoryCard({

repo,

onFavorite,

onRename,

onDelete

}:{

repo:Repository;

onFavorite:()=>void;

onRename:()=>void;

onDelete:()=>void;

}){

return(

<div
style={{
border:"1px solid #393939",
background:"#1F1F1F",
padding:16
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<strong>

{repo.name}

</strong>

<FavoriteButton
favorite={repo.favorite}
onClick={onFavorite}
/>

</div>

<div
style={{
marginTop:6,
fontSize:13,
color:"#8D8D8D"
}}
>

{repo.branch}

</div>

<div
style={{
marginTop:12
}}
>

<StatusBadge
status={repo.status}
/>

</div>

<div
style={{
display:"flex",
gap:8,
marginTop:16
}}
>

<button
style={{flex:1}}
onClick={onRename}
>
Rename
</button>

<button
style={{flex:1}}
onClick={onDelete}
>
Delete
</button>

</div>

</div>

);

}
