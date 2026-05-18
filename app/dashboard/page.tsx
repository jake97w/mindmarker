import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">M</span>
          </div>
          <span className="font-semibold text-slate-900">MindMarker</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">
            {user?.emailAddresses[0]?.emailAddress}
          </span>
          <UserButton />
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
          </h1>
          <p className="mt-2 text-slate-500">
            Your MindMarker dashboard. Analyses you run are saved here.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: "Analyses Run", value: "—" },
            { label: "Avg. Risk Score", value: "—" },
            { label: "Last Analysis", value: "—" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-slate-200 p-6"
            >
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-8 text-white">
          <h2 className="text-xl font-semibold mb-2">Run a new analysis</h2>
          <p className="text-indigo-200 mb-6 text-sm">
            Paste any text sample to receive a cognitive language report.
          </p>
          <Link
            href="/analyze"
            className="inline-block bg-white text-indigo-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Go to analyser →
          </Link>
        </div>
      </main>
    </div>
  );
}
