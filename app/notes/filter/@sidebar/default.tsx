import React from "react";
import Link from "next/link";

export default function SidebarDefault() {
  return (
    <nav style={{ padding: "1rem", borderRight: "1px solid #ccc" }}>
      <h3>Фільтри</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link href="/notes/filter/all">Усі нотатки</Link>
        </li>
        <li>
          <Link href="/notes/filter/Work">Робота</Link>
        </li>
        <li>
          <Link href="/notes/filter/Personal">Особисте</Link>
        </li>
        <li>
          <Link href="/notes/filter/Todo">Завдання</Link>
        </li>
        <li>
          <Link href="/notes/filter/Meeting">Зустрічі</Link>
        </li>
        <li>
          <Link href="/notes/filter/Shopping">Покупки</Link>
        </li>
      </ul>
    </nav>
  );
}
