import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/custom/mode-toggle";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className="absolute right-2 top-2">
        <ModeToggle />
      </div>
      <div className="flex flex-col justify-between gap-5">
        <Button asChild size="lg">
          <Link href="/checkin">
            Checkin table
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/coordinator">
            Coordinator table
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/interview">
            Interview desk
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
