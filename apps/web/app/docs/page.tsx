import type { Metadata } from "next";

import DocsExperience from "@/components/docs/DocsExperience";

export const metadata: Metadata = {
  title: "Documentation | SandboxCodeX",
  description: "Tài liệu SandboxCodeX-IDE với giao diện dark mode hiện đại.",
};

export default function DocsPage() {
  return <DocsExperience />;
}
