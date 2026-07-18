import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { compare } from "bcryptjs";

const USERS = path.join(
  process.cwd(),
  "../../storage/users/users.json"
);

export async function POST(req: Request) {

  const {
    account,
    password
  } = await req.json();

  if (!account || !password) {
    return NextResponse.json(
      { error: "Missing credentials" },
      { status: 400 }
    );
  }

  const users = JSON.parse(
    fs.readFileSync(USERS, "utf8")
  );

  const user = users.find(
    (u: any) =>
      u.email === account ||
      u.username === account
  );

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 401 }
    );
  }

  const ok = await compare(
    password,
    user.passwordHash
  );

  if (!ok) {
    return NextResponse.json(
      { error: "Wrong password" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  });

}
