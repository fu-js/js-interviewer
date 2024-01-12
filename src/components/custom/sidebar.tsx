import {
  AreaChartIcon,
  LampDeskIcon,
  ListChecks,
  LoaderIcon,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="fixed w-60 h-screen border-r border-border flex flex-col gap-1 p-4">
      <Link
        href="/"
        className="flex items-center px-3 py-2 pr-5 font-bold text-xl"
      >
        <span className="text-red-500">JS</span>&nbsp;
        <span className="-mt-[.5px]">Coordinator</span>
      </Link>
      <Link
        href="/checkin"
        className="flex items-center gap-3 px-3 py-2 pr-5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900"
      >
        <ListChecks size={20} />
        Checkin table
      </Link>
      <Link
        href="/coordinator"
        className="flex items-center gap-3 px-3 py-2 pr-5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900"
      >
        <LoaderIcon size={20} />
        Coordinator table
      </Link>
      <Link
        href="/interview"
        className="flex items-center gap-3 px-3 py-2 pr-5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900"
      >
        <LampDeskIcon size={20} />
        Interview desk
      </Link>
      <Link
        href="/admin"
        className="flex items-center gap-3 px-3 py-2 pr-5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900"
      >
        <AreaChartIcon size={20} />
        Analysis
      </Link>
    </div>
  );
}
