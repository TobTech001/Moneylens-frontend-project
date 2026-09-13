interface AuthHeaderProps {
  eyebrow: string;
  title: string;
  subtext: string;
}

export default function AuthHeader({ eyebrow, title, subtext }: AuthHeaderProps) {
  return (
    <div className="mb-8">
      <p className="text-sm font-medium text-primary">{eyebrow}</p>
      <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate">{subtext}</p>
    </div>
  );
}