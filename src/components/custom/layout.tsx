import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <div className="grow">{children}</div>
    </main>
  );
}
