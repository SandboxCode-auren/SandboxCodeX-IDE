import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ROOT = path.join(
  process.cwd(),
  "../../storage/repositories"
);

type Node = {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: Node[];
};

function walk(dir: string): Node[] {
  return fs.readdirSync(dir, { withFileTypes: true }).map((entry) => {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return {
        name: entry.name,
        path: full.replace(ROOT, ""),
        type: "directory",
        children: walk(full),
      };
    }

    return {
      name: entry.name,
      path: full.replace(ROOT, ""),
      type: "file",
    };
  });
}

export async function GET() {
  if (!fs.existsSync(ROOT)) {
    fs.mkdirSync(ROOT, { recursive: true });
  }

  return NextResponse.json(walk(ROOT));
}
