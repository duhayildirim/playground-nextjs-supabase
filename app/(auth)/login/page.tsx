"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setError("");
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <main>
      <h3>Log in:</h3>
      <div className="container mx-auto">
        <div className="grid gap-4">
          <div className="grid">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={data?.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <label htmlFor="description">Password</label>
            <input
              type="password"
              name="password"
              value={data?.password}
              onChange={handleChange}
            />
          </div>
          {error && (
            <div className="grid">
              <span style={{ color: "red" }}></span>
            </div>
          )}
          <div>
            <button className="bg-secondary" onClick={handleSubmit}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
