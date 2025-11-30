import PersonForm from "./personform";
import PersonTable from "./persontable";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl min-h-screen flex flex-col px-6">
        <header className="flex items-center justify-between py-5">
          <h1 className="text-2xl font-semibold text-white drop-shadow-md">
            Form & Table
          </h1>

          <div className="flex items-center gap-2">
            <span className="text-sm text-white/80">Language</span>
            <div className="flex overflow-hidden rounded-full border border-white/60 bg-white/20 text-xs text-white">
              <button className="px-3 py-1 bg-white/40 text-gray-800">
                EN
              </button>
              <button className="px-3 py-1 hover:bg-white/20">
                TH
              </button>
            </div>
          </div>
        </header>

        <section className="flex flex-1 items-start justify-center pt-4 pb-10 "
        >
          <div className="w-full space-y-4" >
            <PersonForm />
            <PersonTable />
          </div>
        </section>
      </div>
    </main>
  );
}
