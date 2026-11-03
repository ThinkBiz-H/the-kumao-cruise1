/** Reserves space while a lazy section chunk loads, so anchors don't jump. */
export default function SectionFallback() {
  return <div className="min-h-[60vh]" aria-hidden="true" />;
}
