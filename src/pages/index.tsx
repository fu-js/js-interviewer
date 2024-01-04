import { Inter } from "next/font/google";
import { ModeToggle } from "@/components/custom/mode-toggle";
import Layout from "@/components/custom/layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <main
        className={`flex flex-col items-center justify-center ${inter.className}`}
      >
        <div className="absolute right-2 top-2">
          <ModeToggle />
        </div>
      </main>
    </Layout>
  );
}
