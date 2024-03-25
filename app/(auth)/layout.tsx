import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav>
        <h2>Todo App</h2>
        <Link href="/login"> Login</Link>
        <Link href="/signup"> Sign up</Link>
      </nav>
      {children}
    </>
  );
}

