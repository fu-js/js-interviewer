import Sidebar from "./sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <div className="grow ml-60">{children}</div>
      <Toaster />
    </main>
  );
}
