type SkillTagProps = {
  label: string;
};

export function SkillTag({ label }: SkillTagProps) {
  return (
    <span className="border border-primary bg-transparent px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary">
      {label}
    </span>
  );
}
