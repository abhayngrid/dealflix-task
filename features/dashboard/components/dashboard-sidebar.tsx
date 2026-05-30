import Link from "next/link";

export function DashboardSidebar() {
  return (
    <aside
      className="
        hidden
        w-64
        border-r
        bg-white
        lg:flex
        lg:flex-col
      "
    >
      <div className="p-6">
        <div className="flex items-end">
          <div className="mr-1 h-2.5 w-2.5 rounded-full bg-[#7ac943]" />

          <span className="text-[26px] font-bold">dealflix</span>
        </div>
      </div>

      <nav className="px-4">
        <Link
          href="/dashboard"
          className="block rounded-lg px-4 py-3 hover:bg-zinc-100"
        >
          Dashboard
        </Link>

        <Link
          href="/deals"
          className="block rounded-lg px-4 py-3 hover:bg-zinc-100"
        >
          Deals
        </Link>

        <Link
          href="/buyers"
          className="block rounded-lg px-4 py-3 hover:bg-zinc-100"
        >
          Buyers
        </Link>

        <Link
          href="/payouts"
          className="block rounded-lg px-4 py-3 hover:bg-zinc-100"
        >
          Payouts
        </Link>

        <Link
          href="/settings"
          className="block rounded-lg px-4 py-3 hover:bg-zinc-100"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}
