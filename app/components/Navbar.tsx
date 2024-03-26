import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Navbar({ user }: any) {
  return (
    <nav>
      <h2>Todo App</h2>
      <Link href="/"> Dashboard</Link>
      <Link href="/todos"> Todos</Link>
      <Link href="/todos/create" style={{ marginRight: "auto" }}>
        Add Todo
      </Link>
      {user && (
        <div>
          <span style={{ marginRight: "auto" }}>
            {user.email.split("@")[0]}
          </span>
          <LogoutButton />
        </div>
      )}
    </nav>
  );
}
