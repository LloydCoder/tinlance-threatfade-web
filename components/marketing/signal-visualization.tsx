export function SignalVisualization() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#090c10] p-4 shadow-2xl shadow-black/30 sm:p-6">
      <div className="grid-noise pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative flex items-center justify-between border-b border-white/7 pb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/38">
        <span>Behavioral signal</span>
        <span className="text-[#b8ff5a]">monitoring</span>
      </div>
      <svg viewBox="0 0 900 330" className="relative mt-5 h-auto w-full" role="img" aria-label="Illustration of a network signal fading into a detected behavioral deviation">
        <defs>
          <linearGradient id="signalFade" x1="0" x2="1">
            <stop offset="0" stopColor="#b8ff5a" stopOpacity="0.95" />
            <stop offset="0.62" stopColor="#b8ff5a" stopOpacity="0.75" />
            <stop offset="1" stopColor="#ff6b6b" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <g opacity="0.12" stroke="white">
          <path d="M0 70H900M0 140H900M0 210H900M0 280H900" />
          <path d="M90 0V330M270 0V330M450 0V330M630 0V330M810 0V330" />
        </g>
        <path d="M0 155 C70 118 115 191 180 145 S300 105 360 150 S465 194 520 142 S590 108 630 145" fill="none" stroke="#b8ff5a" strokeWidth="3" opacity="0.85" />
        <path className="signal-line" d="M630 145 C660 145 670 146 688 154 C708 163 713 181 730 205 C748 231 774 240 800 236 C838 230 855 194 900 210" fill="none" stroke="url(#signalFade)" strokeWidth="4" />
        <circle cx="632" cy="145" r="7" fill="#b8ff5a" />
        <circle cx="632" cy="145" r="18" fill="#b8ff5a" opacity="0.1" />
        <line x1="730" y1="70" x2="730" y2="270" stroke="#ff6b6b" strokeDasharray="4 8" opacity="0.45" />
        <text x="648" y="100" fill="#8b949e" fontSize="14" fontFamily="monospace">signal reduction</text>
        <text x="745" y="288" fill="#ff8585" fontSize="14" fontFamily="monospace">behavioral deviation</text>
      </svg>
      <div className="relative grid grid-cols-3 gap-3 border-t border-white/7 pt-4 font-mono text-[10px] uppercase tracking-wider">
        <div><div className="text-white/35">State</div><div className="mt-1 text-white/75">Baseline → fade</div></div>
        <div><div className="text-white/35">Evidence</div><div className="mt-1 text-white/75">Preserved</div></div>
        <div><div className="text-white/35">Disposition</div><div className="mt-1 text-[#b8ff5a]">Investigate</div></div>
      </div>
    </div>
  );
}
