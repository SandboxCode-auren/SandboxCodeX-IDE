import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(){

const session=await getServerSession(authOptions);

if(!session){

return NextResponse.json(
{error:"Unauthorized"},
{status:401}
);

}

return NextResponse.json({

name:session.user?.name,

email:session.user?.email,

image:session.user?.image

});

}
