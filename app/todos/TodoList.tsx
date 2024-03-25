import Link from "next/link";
import { notFound } from "next/navigation";

async function getTodos() {
  try {
    const res = await fetch("http://localhost:4000/todos", {
      next: {
        revalidate: 0,
      },
    });

    if (!res.ok) {
      notFound();
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching");
    return [];
  }
}

export default async function TodoList() {
  const todos = await getTodos();

  return (
    <>
      {todos.length > 0 ? (
        todos.map((todo: any) => (
          <div key={todo.id} className={`card ${todo.status}`}>
            <Link href={`/todos/${todo.id}`}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <div className={`pill ${todo.status}`}>{todo.status}</div>
            </Link>
          </div>
        ))
      ) : (
        <div>
          <p className="text-center">The list is empty.</p>
        </div>
      )}
    </>
  );
}
