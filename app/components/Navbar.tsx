import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <h2>Todo App</h2>
      <Link href="/"> Dashboard</Link>
      <Link href="/todos"> Todos</Link>
    </nav>
  );
}
