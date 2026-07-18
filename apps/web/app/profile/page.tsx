import ProfileCard from "@/components/auth/ProfileCard";

export default function Profile(){

return(

<div
style={{
display:"flex",
justifyContent:"center",
padding:40
}}
>

<div
style={{
width:420,
background:"#262626",
padding:30,
borderRadius:10
}}
>

<h2>Profile</h2>

<ProfileCard/>

</div>

</div>

);

}
