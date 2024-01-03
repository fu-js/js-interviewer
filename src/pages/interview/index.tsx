import BackButton from "@/components/custom/back-button";
import If from "@/components/custom/if";
import Layout from "@/components/custom/layout";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { Button } from "@/components/ui/button";
import fetcher from "@/lib/fetcher";
import { ChevronRightIcon, ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import useSWR from "swr";

export default function Interview() {
  const { isLoading, data } = useSWR("/api/desks", fetcher);

  return (
    <Layout>
      <main className="p-5">
        <div className="absolute right-2 top-2">
          <ModeToggle />
        </div>
        <BackButton href="/" />
        <h1 className="text-4xl text-center p-5 font-bold">Interview table</h1>
        <If condition={isLoading}>
          <div className="border flex rounded-lg p-4 border-dashed border-border justify-center items-center">
            <div className="flex gap-2 text-muted-foreground py-5">
              <ReloadIcon className="mr-2 -mt-1 h-10 w-10 animate-spin" />
              <p className="text-2xl">Loading</p>
            </div>
          </div>
        </If>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          {data &&
            data.data.map((desk: any, index: number) => (
              <InterviewDeskButton key={index} desk={desk} />
            ))}
        </div>
      </main>
    </Layout>
  );
}

function InterviewDeskButton({ desk }: { desk: any }) {
  return (
    <div className="flex justify-center items-center" key={desk.id}>
      <Button asChild size="lg">
        <Link href={"/interview/" + desk.id}>
          {desk.name}
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
