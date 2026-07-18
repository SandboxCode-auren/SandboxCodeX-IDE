export default function DashboardGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 20,
        marginTop: 24,
      }}
    >
      {children}
    </div>
  );
}
