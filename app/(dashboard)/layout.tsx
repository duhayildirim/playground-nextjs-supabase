import Navbar from "../components/Navbar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  const user = data?.session?.user;

  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  );
}
