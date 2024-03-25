import { Suspense } from "react";
import TodoList from "./TodoList";
import Loading from "../loading";

export default function Todos() {
  return (
    <main>
      <nav>
        <div>
          <h2>Todos:</h2>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <TodoList />
      </Suspense>
    </main>
  );
}
