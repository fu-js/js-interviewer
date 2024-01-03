import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="fixed w-52 h-screen border-r border-border flex flex-col gap-1 p-4">
      <Link
        href="/checkin"
        className="flex items-center gap-3 px-3 py-2 pr-5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900"
      >
        Checkin table
      </Link>
      <Link
        href="/coordinator"
        className="flex items-center gap-3 px-3 py-2 pr-5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900"
      >
        Coordinator table
      </Link>
      <Link
        href="/interview"
        className="flex items-center gap-3 px-3 py-2 pr-5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900"
      >
        Interview desk
      </Link>
      <Link
        href="/admin"
        className="flex items-center gap-3 px-3 py-2 pr-5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900"
      >
        Admin
      </Link>
    </div>
  );
}
