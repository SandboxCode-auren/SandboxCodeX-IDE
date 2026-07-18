import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const FILE=path.join(
process.cwd(),
"../../storage/users/users.json"
);

export async function POST(req:NextRequest){

const session=await getServerSession(authOptions);

if(!session){

return NextResponse.json(
{error:"Unauthorized"},
{status:401}
);

}

const body=await req.json();

const users=JSON.parse(
fs.readFileSync(FILE,"utf8")
);

const user=users.find(
(u:any)=>u.email===session.user?.email
);

if(!user){

return NextResponse.json(
{error:"User not found"},
{status:404}
);

}

user.username=body.username??user.username;
user.avatar=body.avatar??user.avatar;

fs.writeFileSync(
FILE,
JSON.stringify(users,null,2)
);

return NextResponse.json({
ok:true
});

}
