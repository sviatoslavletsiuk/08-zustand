import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{ padding: "60px", textAlign: "center", fontFamily: "sans-serif" }}
    >
      <h1 style={{ fontSize: "3rem", color: "#333" }}>NoteHub</h1>
      <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "30px" }}>
        Ваш персональний простір для нотаток.
      </p>
      <Link
        href="/notes/filter/all"
        style={{
          padding: "12px 24px",
          backgroundColor: "#0070f3",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Перейти до нотаток
      </Link>
    </div>
  );
}
