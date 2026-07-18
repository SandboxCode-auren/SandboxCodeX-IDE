import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE = path.join(
  process.cwd(),
  "../../storage/repositories/repositories.json"
);

function loadRepos() {
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

function saveRepos(repos: any[]) {
  fs.writeFileSync(FILE, JSON.stringify(repos, null, 2));
}

export async function GET() {
  return NextResponse.json(loadRepos());
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const repos = loadRepos();

  const repo = {
    id: Date.now().toString(),
    name: body.name,
    branch: "main",
    status: "READY",
    favorite: false,
  };

  repos.push(repo);

  saveRepos(repos);

  return NextResponse.json(repo);
}
