import { NextResponse } from "next/server";

export async function GET(_: any, { params }: any) {
  const id = params.id;

  const res = await fetch(`http://localhost:4000/todos/${id}`);

  const todo = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      {
        error: "not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(todo, {
    status: 200,
  });
}
