const AVATARS = ['AC', 'TB', 'NE', 'KO'];

export default function SocialProof() {
  return (
    <div>
      <p className="text-xs text-mist">Trusted by people who want to take control of their money.</p>
      <div className="mt-2.5 flex items-center gap-3">
        <div className="flex -space-x-2">
          {AVATARS.map((initials) => (
            <span
              key={initials}
              className="grid h-7 w-7 place-items-center rounded-full border-2 border-bg bg-gradient-to-br from-primary to-accent text-[10px] font-semibold text-white"
            >
              {initials}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 text-xs text-slate">
          <span className="text-warning">★★★★★</span>
          4.9/5 from early users
        </div>
      </div>
    </div>
  );
}