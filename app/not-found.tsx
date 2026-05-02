import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "10rem",
          fontWeight: "900",
          margin: "0",
          background: "linear-gradient(to right, #0070f3, #00a1ff)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: "1",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "2rem",
          color: "#333",
          margin: "20px 0 10px",
        }}
      >
        Сторінку не знайдено
      </h2>
      <p
        style={{
          color: "#666",
          maxWidth: "450px",
          margin: "0 0 30px 0",
          lineHeight: "1.6",
        }}
      >
        Ми не змогли знайти те, що ви шукаєте. Можливо, категорія порожня,
        нотатку було видалено або ви помилилися в адресі.
      </p>
      <Link
        href="/notes/filter/all"
        style={{
          padding: "14px 28px",
          backgroundColor: "#0070f3",
          color: "white",
          borderRadius: "10px",
          textDecoration: "none",
          fontWeight: "600",
          transition: "all 0.2s ease",
          boxShadow: "0 4px 14px rgba(0, 112, 243, 0.39)",
          display: "inline-block",
        }}
      >
        Повернутися до нотаток
      </Link>
    </main>
  );
}
