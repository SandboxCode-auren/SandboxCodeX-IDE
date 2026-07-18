import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";

const FILE=path.join(
process.cwd(),
"../../storage/users/users.json"
);

export async function POST(req:NextRequest){

const body=await req.json();

const{

username,
email,
password

}=body;

if(
!username||
!email||
!password
){

return NextResponse.json(
{error:"Missing fields"},
{status:400}
);

}

const users=JSON.parse(
fs.readFileSync(FILE,"utf8")
);

if(
users.find(
(u:any)=>
u.email===email||
u.username===username
)
){

return NextResponse.json(
{error:"Account exists"},
{status:400}
);

}

users.push({

id:randomUUID(),

username,

email,

passwordHash:await hash(password,10),

avatar:null

});

fs.writeFileSync(
FILE,
JSON.stringify(users,null,2)
);

return NextResponse.json({
ok:true
});

}
