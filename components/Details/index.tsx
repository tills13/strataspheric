export function Details({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <dl className={className}>{children}</dl>;
}
