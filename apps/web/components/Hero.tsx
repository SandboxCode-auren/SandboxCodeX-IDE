export default function Hero() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "56px 24px",
        gap: 20
      }}
    >
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: 24,
          background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
          fontWeight: 700
        }}
      >
        S
      </div>

      <h1
        style={{
          margin: 0,
          fontSize: 34,
          fontWeight: 800
        }}
      >
        SandboxCodeX
      </h1>

      <p
        style={{
          maxWidth: 340,
          opacity: .75,
          lineHeight: 1.7
        }}
      >
        AI Software Engineer that can review repositories, fix bugs,
        execute tasks inside a sandbox and create Pull Requests.
      </p>

      <button
        style={{
          marginTop: 8,
          width: "100%",
          maxWidth: 320,
          padding: "16px",
          border: 0,
          borderRadius: 16,
          background: "#fff",
          color: "#000",
          fontWeight: 700,
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        Continue with GitHub
      </button>
    </section>
  );
}
