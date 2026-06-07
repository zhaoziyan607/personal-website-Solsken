export function SkeletonScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#0c0b0f]">
      {/* Aurora orbs for visual continuity during load */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora-orb aurora-1" />
        <div className="aurora-orb aurora-3" />
        <div className="aurora-orb aurora-5" />
      </div>

      {/* Nav skeleton */}
      <div className="relative z-10 flex h-16 shrink-0 items-center justify-between border-b border-white/5 px-6 md:px-12">
        <div className="flex items-center gap-3">
          <div className="skel h-7 w-7 rounded-full" />
          <div className="skel h-4 w-20" />
        </div>
        <div className="hidden gap-8 md:flex">
          {[52, 44, 56, 48, 52, 44, 48].map((w, i) => (
            <div key={i} className="skel h-3" style={{ width: w }} />
          ))}
        </div>
        <div className="skel h-8 w-28 rounded-sm" />
      </div>

      {/* Hero skeleton */}
      <div className="relative z-10 flex flex-1 items-center gap-10 px-6 py-12 md:px-12 lg:gap-14 lg:px-20">
        {/* Gallery panel — hidden on mobile (same as real layout) */}
        <div className="hidden lg:block" style={{ width: '45%' }}>
          <div className="skel h-[62vh] w-full rounded-sm" />
        </div>

        {/* Text panel */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="skel h-3 w-28" />
          <div className="skel h-4 w-44" />
          <div className="skel h-11 w-56" />
          <div className="skel h-3 w-40" />
          <div className="skel mt-1 h-px w-full max-w-xs" />
          <div className="mt-1 flex flex-col gap-3">
            <div className="skel h-3 w-full max-w-lg" />
            <div className="skel h-3 w-[95%] max-w-lg" />
            <div className="skel h-3 w-[90%] max-w-lg" />
            <div className="skel h-3 w-[80%] max-w-lg" />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <div className="skel h-3 w-full max-w-md" />
            <div className="skel h-3 w-[88%] max-w-md" />
            <div className="skel h-3 w-[76%] max-w-md" />
          </div>
          <div className="skel mt-4 h-10 w-32 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
