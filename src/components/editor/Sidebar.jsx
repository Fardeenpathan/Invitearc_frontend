export default function Sidebar({
  tabs,
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="w-24 bg-[#861E1D] px-3 py-6 text-white">
      <div className="space-y-8 text-center">
        {tabs?.map((tab) => {
          const Icon = tab.icon;

          return (
            <div key={tab.id} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex h-12 w-12 items-center justify-center rounded-xl transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white text-[#861E1D] shadow-sm"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Icon className="text-[24px]" />
              </button>

              <span className="mt-2 text-[10px] uppercase tracking-[0.28em] text-white font-georgia">
                {tab.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}