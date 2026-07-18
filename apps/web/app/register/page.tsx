import RegisterForm from "@/components/auth/RegisterForm";

export default function Register(){

return(

<div
style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
height:"100vh",
background:"#161616"
}}
>

<div
style={{
width:400,
background:"#262626",
padding:30,
borderRadius:8
}}
>

<h2>Create account</h2>

<RegisterForm/>

</div>

</div>

);

}
