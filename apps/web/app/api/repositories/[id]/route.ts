import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE = path.join(
  process.cwd(),
  "../../storage/repositories/repositories.json"
);

function readRepos() {
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

function writeRepos(data: any[]) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const repos = readRepos();
  const repo = repos.find((r: any) => r.id === id);

  if (!repo) {
    return NextResponse.json(
      { error: "Repository not found" },
      { status: 404 }
    );
  }

  Object.assign(repo, body);

  writeRepos(repos);

  return NextResponse.json(repo);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const repos = readRepos().filter((r: any) => r.id !== id);

  writeRepos(repos);

  return NextResponse.json({ success: true });
}
