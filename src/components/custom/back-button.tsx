import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function BackButton({ href }: { href: string }) {
  return (
    <Button asChild variant="ghost">
      <Link href={href}>
        <ChevronLeftIcon className="mr-2 -mt-[1px] h-4 w-4" />
        Back
      </Link>
    </Button>
  );
}
