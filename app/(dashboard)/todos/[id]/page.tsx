import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/todos");

  const todos = await res.json();

  return todos.map((todo: any) => ({
    id: todo.id,
  }));
}

async function getTodo(id: number) {
  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    next: {
      revalidate: 0,
    },
  });

  if(!response.ok){
    notFound();
  }

  return response.json();
}

export default async function TodoDetail({ params }: any) {
  const todo = await getTodo(params.id);

  return (
    <main>
      <nav>
        <h3>Detail</h3>
      </nav>
      <div className={`card ${todo.status}`}>
        <h4>{todo.title}</h4>
        <small>{todo.user_email}</small>
        <p>{todo.description}</p>
        <div className={`pill ${todo.status}`}>{todo.status}</div>
      </div>
    </main>
  );
}
