import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="border-r flex flex-col gap-1 p-4">
      <Link
        href="/checkin"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-color"
      >
        Checkin table
      </Link>
      <Link
        href="/coordinator"
        className="flex items-center gap-3 hove p-2 rounded-lg hover:bg-color"
      >
        Coordinator table
      </Link>
      <Link
        href="/interview"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-color"
      >
        Interview desk
      </Link>
    </div>
  );
}
