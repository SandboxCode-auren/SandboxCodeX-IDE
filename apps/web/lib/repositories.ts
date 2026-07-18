export type Repository = {
  id: string;
  name: string;
  branch: string;
  status: string;
  favorite: boolean;
};

export async function getRepositories(): Promise<Repository[]> {
  const res = await fetch("/api/repositories", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Cannot load repositories");

  return res.json();
}

export async function createRepository(name: string) {
  const res = await fetch("/api/repositories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error("Cannot create repository");

  return res.json();
}

export async function updateRepository(
  id: string,
  data: Partial<Repository>
) {
  const res = await fetch("/api/repositories/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Cannot update repository");

  return res.json();
}

export async function deleteRepository(id: string) {
  const res = await fetch("/api/repositories/" + id, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Cannot delete repository");
}
