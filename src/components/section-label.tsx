type SectionLabelProps = {
  eyebrow: string;
  label: string;
};

export function SectionLabel({ eyebrow, label }: SectionLabelProps) {
  return (
    <p className="font-heading text-xs font-bold uppercase tracking-[0.35em] text-primary">
      <span className="text-accent">{eyebrow}</span> / {label}
    </p>
  );
}
