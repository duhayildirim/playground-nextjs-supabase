"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [data, setData] = useState<{
    email: string;
    password: string;
    passwordConfirm: string;
  }>({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (data.password !== data.passwordConfirm) {
      return console.log("passwords mismatched");
    }

    try {
      const { data: dataUser, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${location.origin}/api/auth/callback`,
        },
      });

      if (dataUser) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h3>Sign up:</h3>
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
          <div className="grid">
            <label htmlFor="passwordConfirm">Password Confirm</label>
            <input
              type="password"
              name="passwordConfirm"
              value={data?.passwordConfirm}
              onChange={handleChange}
            />
          </div>
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
