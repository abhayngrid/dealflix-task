import { ACTIVE_DEALS, DASHBOARD_STATS } from "@/constants/dashboard";

export default function DashboardPage() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => (
          <div
            key={stat.id}
            className="
                rounded-xl
                border
                bg-white
                p-5
              "
          >
            <p className="text-sm text-zinc-500">{stat.title}</p>

            <h2 className="mt-2 text-3xl font-bold">{stat.value}</h2>

            <p className="mt-2 text-sm text-green-600">{stat.change}</p>
          </div>
        ))}
      </div>

      <div
        className="
          mt-8
          rounded-xl
          border
          bg-white
        "
      >
        <div className="border-b p-4 font-semibold">Active Deals</div>

        {ACTIVE_DEALS.map((deal) => (
          <div
            key={deal.id}
            className="
                flex
                items-center
                border-b
                p-4
                last:border-b-0
              "
          >
            <div>
              <h3 className="font-medium">{deal.title}</h3>

              <p className="text-sm text-zinc-500">{deal.city}</p>
            </div>

            <div className="ml-auto">{deal.price}</div>

            <div className="ml-6">{deal.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
