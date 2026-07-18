import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function Login(){

return(

<div
style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
minHeight:"100vh",
background:"#161616"
}}
>

<div
style={{
width:400,
padding:30,
background:"#262626",
border:"1px solid #393939",
borderRadius:10
}}
>

<h2
style={{
marginTop:0,
marginBottom:24
}}
>
Sign in
</h2>

<LoginForm/>

<div
style={{
marginTop:22,
display:"flex",
justifyContent:"space-between",
fontSize:13
}}
>

<Link
href="/register"
style={{
color:"#78A9FF",
textDecoration:"none"
}}
>
Create account
</Link>

<Link
href="/forgot-password"
style={{
color:"#78A9FF",
textDecoration:"none"
}}
>
Forgot password?
</Link>

</div>

</div>

</div>

);

}
