export type DocSection = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  markdown: string;
};

export const sidebarGroups = [
  {
    title: "Bắt đầu",
    items: ["gioi-thieu", "quickstart"],
  },
  {
    title: "Cài đặt",
    items: ["cai-dat", "bien-moi-truong"],
  },
  {
    title: "Tính năng",
    items: ["workspace-ai", "explorer", "repositories"],
  },
  {
    title: "Hướng dẫn",
    items: ["workflow", "mdx"],
  },
  {
    title: "Tham chiếu CLI",
    items: ["cli"],
  },
  {
    title: "Trợ giúp",
    items: ["faq", "support"],
  },
];

export const docs: DocSection[] = [
  {
    id: "gioi-thieu",
    title: "Giới thiệu SandboxCodeX-IDE",
    category: "Bắt đầu",
    excerpt: "Tổng quan về workspace AI software engineering và các khối chức năng chính.",
    markdown: `# Giới thiệu SandboxCodeX-IDE

SandboxCodeX-IDE là workspace dành cho phát triển phần mềm với AI, kết hợp quản lý repository, explorer, terminal, tác vụ và runtime trong một giao diện thống nhất.

## Kiến trúc trải nghiệm

Giao diện tài liệu này được tối ưu cho chế độ tối, đọc nhanh và tra cứu theo ngữ cảnh. Sidebar bên trái dùng để điều hướng theo nhóm, nội dung ở giữa tập trung vào Markdown/MDX, còn mục lục bên phải giúp nhảy nhanh tới từng phần.

### Thành phần chính

- Workspace dashboard để theo dõi trạng thái tổng quan.
- Repository manager để import, tìm kiếm và đánh dấu yêu thích.
- Explorer để duyệt cấu trúc file.
- Console runtime để chạy lệnh và quan sát output.

## Khi nào nên dùng

Sử dụng SandboxCodeX-IDE khi bạn muốn chuẩn hóa luồng làm việc AI-assisted engineering từ khám phá codebase, lập kế hoạch, chạy lệnh đến tạo artifact.
`,
  },
  {
    id: "quickstart",
    title: "Quickstart",
    category: "Bắt đầu",
    excerpt: "Chạy môi trường web trong vài lệnh pnpm.",
    markdown: `# Quickstart

Làm theo các bước dưới đây để khởi động ứng dụng web.

## Yêu cầu

- Node.js phiên bản LTS.
- pnpm theo phiên bản khai báo trong workspace.

## Chạy local

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

## Build production

\`\`\`bash
pnpm build
pnpm --filter web start
\`\`\`

### Gợi ý

Mở trình duyệt tại \`http://localhost:3000\` và truy cập \`/docs\` để xem trang tài liệu.
`,
  },
  {
    id: "cai-dat",
    title: "Cài đặt",
    category: "Cài đặt",
    excerpt: "Thiết lập workspace và dependency cho dự án.",
    markdown: `# Cài đặt

SandboxCodeX-IDE dùng monorepo với pnpm workspace và Next.js cho ứng dụng web.

## Cài dependency

\`\`\`bash
pnpm install
\`\`\`

## Kiểm tra dự án

\`\`\`bash
pnpm doctor
pnpm lint
\`\`\`

## Cấu trúc thư mục

\`\`\`txt
apps/web        # Next.js application
services/*      # Các service backend
packages/*      # Package dùng chung
docs/*          # Tài liệu nền của dự án
\`\`\`
`,
  },
  {
    id: "bien-moi-truong",
    title: "Biến môi trường",
    category: "Cài đặt",
    excerpt: "Các biến môi trường thường dùng khi chạy ứng dụng.",
    markdown: `# Biến môi trường

Tạo file \`.env.local\` trong \`apps/web\` nếu cần cấu hình xác thực hoặc API.

## Ví dụ

\`\`\`bash
NEXTAUTH_SECRET="change-me"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

## Bảo mật

Không commit secret thật lên repository. Hãy dùng biến môi trường của nền tảng deploy cho production.
`,
  },
  {
    id: "workspace-ai",
    title: "Workspace AI",
    category: "Tính năng",
    excerpt: "Khu vực điều phối tác vụ AI, runtime và artifact.",
    markdown: `# Workspace AI

Workspace AI gom các thông tin quan trọng vào một bảng điều khiển duy nhất.

## Task Queue

Theo dõi các tác vụ đang chờ, đang chạy và đã hoàn tất.

## Runtime

Hiển thị trạng thái runtime để biết môi trường có sẵn sàng xử lý lệnh hay không.

## Artifacts

Lưu lại kết quả đáng chú ý như bản build, báo cáo kiểm thử hoặc file sinh ra từ workflow.
`,
  },
  {
    id: "explorer",
    title: "Explorer",
    category: "Tính năng",
    excerpt: "Duyệt file và thư mục trong repository.",
    markdown: `# Explorer

Explorer giúp duyệt cấu trúc repository theo dạng cây.

## Tìm file nhanh

Dùng thanh tìm kiếm để lọc node trong cây file.

## Trạng thái node

File và thư mục được hiển thị bằng icon, indentation và trạng thái mở rộng để giúp đọc cấu trúc nhanh hơn.
`,
  },
  {
    id: "repositories",
    title: "Repositories",
    category: "Tính năng",
    excerpt: "Quản lý danh sách repository trong workspace.",
    markdown: `# Repositories

Màn hình Repositories cho phép xem danh sách dự án, import repository mới và đánh dấu yêu thích.

## Import repository

\`\`\`bash
# Ví dụ URL Git
https://github.com/example/project.git
\`\`\`

## Lọc danh sách

Sử dụng ô tìm kiếm để lọc theo tên, mô tả hoặc trạng thái.
`,
  },
  {
    id: "workflow",
    title: "Workflow đề xuất",
    category: "Hướng dẫn",
    excerpt: "Luồng làm việc gợi ý từ khám phá đến kiểm thử.",
    markdown: `# Workflow đề xuất

## 1. Khám phá

Đọc README, docs và cấu trúc thư mục chính.

## 2. Lập kế hoạch

Chia tác vụ thành các bước nhỏ, có tiêu chí hoàn thành rõ ràng.

## 3. Thực thi

Sửa code, chạy kiểm thử, ghi lại thay đổi và artifact.

## 4. Tổng kết

Tóm tắt file thay đổi, test đã chạy và các giới hạn môi trường nếu có.
`,
  },
  {
    id: "mdx",
    title: "Viết tài liệu MDX",
    category: "Hướng dẫn",
    excerpt: "Quy ước viết Markdown/MDX cho trang docs.",
    markdown: `# Viết tài liệu MDX

Nội dung tài liệu nên được viết bằng Markdown hoặc MDX để dễ review và tái sử dụng.

## Quy ước heading

Mỗi trang có một H1 duy nhất, các phần chính dùng H2 và tiểu mục dùng H3.

## Code block

Luôn khai báo ngôn ngữ cho code block để syntax highlighting hoạt động tốt.

\`\`\`tsx
export function Example() {
  return <div>SandboxCodeX</div>;
}
\`\`\`
`,
  },
  {
    id: "cli",
    title: "Tham chiếu CLI",
    category: "Tham chiếu CLI",
    excerpt: "Các lệnh CLI thường dùng trong workspace.",
    markdown: `# Tham chiếu CLI

## Development

\`\`\`bash
pnpm dev
\`\`\`

## Build

\`\`\`bash
pnpm build
\`\`\`

## Lint

\`\`\`bash
pnpm lint
\`\`\`

## Doctor

\`\`\`bash
pnpm doctor
\`\`\`
`,
  },
  {
    id: "faq",
    title: "FAQ",
    category: "Trợ giúp",
    excerpt: "Câu hỏi thường gặp khi dùng SandboxCodeX-IDE.",
    markdown: `# FAQ

## Trang docs có hỗ trợ tìm kiếm không?

Có. Thanh tìm kiếm phía trên lọc nhanh toàn bộ mục tài liệu có trong bộ dữ liệu hiện tại.

## Có thể copy Markdown cho LLM không?

Có. Nút \`Copy page as Markdown for LLMs\` sao chép toàn bộ nội dung trang đang xem.

## Chatbot AI đã kết nối model thật chưa?

Khung chatbot hiện là giao diện sẵn sàng tích hợp. Bạn có thể nối API nội bộ hoặc provider AI trong bước tiếp theo.
`,
  },
  {
    id: "support",
    title: "Hỗ trợ",
    category: "Trợ giúp",
    excerpt: "Kênh cộng đồng và cách gửi phản hồi.",
    markdown: `# Hỗ trợ

## GitHub

Mở issue cho bug, đề xuất tính năng hoặc tài liệu cần bổ sung.

## Discord

Dùng kênh cộng đồng để hỏi đáp nhanh và chia sẻ workflow.

## Báo cáo lỗi tốt

Một báo cáo tốt nên có phiên bản, bước tái hiện, kết quả mong muốn, kết quả thực tế và log liên quan.
`,
  },
];

export const docById = new Map(docs.map((doc) => [doc.id, doc]));
