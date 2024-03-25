"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTodo() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<{
    title: string;
    description: string;
    status: string;
  }>({
    title: "",
    description: "",
    status: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const AddTodo = async () => {
    setIsLoading(true);
    const newTodo = {
      title: data.title,
      description: data.description,
      status: data.status,
      user_email: "example@gmail.com",
    };

    const response = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    if (response.status === 201) {
      router.push("/todos");
    } else {
      console.log(response.status);
    }
  };

  return (
    <main>
      <h3>Add Todo:</h3>
      <div className="container mx-auto">
        <div className="grid gap-4">
          <div className="grid">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={data?.title}
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={data?.description}
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <label htmlFor="status">Priority:</label>
            <select onChange={handleChange} name="status" value={data?.status}>
              <option value="high-priority">high priority</option>
              <option value="neutral">neutral</option>
            </select>
          </div>
          <div>
            <button
              className="bg-secondary"
              disabled={isLoading}
              onClick={AddTodo}
            >
              {isLoading ? <span> Adding todo... </span> : "Create"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
