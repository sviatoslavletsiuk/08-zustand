import React from "react";

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "80vh" }}>
      <aside
        style={{
          width: "250px",
          borderRight: "1px solid #eaeaea",
          padding: "20px",
        }}
      >
        {sidebar}
      </aside>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
