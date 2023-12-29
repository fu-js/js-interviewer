import Layout from "@/components/custom/layout";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Interview() {
  return (
    <Layout>
      <main className="p-5">
        <div className="absolute right-2 top-2">
          <ModeToggle />
        </div>
        <Button asChild size="lg">
          <Link href="/">
            <ChevronLeftIcon className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <h1 className="text-4xl text-center p-5 font-bold">Interview table</h1>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          {[...Array.from({ length: 10 }, (_, i) => i)].map((i) => (
            <div className="flex justify-center items-center">
              <Button asChild size="lg">
                <Link href={"/interview/" + (i + 1)}>
                  {"Interview desk " + (i + 1)}
                  <ChevronRightIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
