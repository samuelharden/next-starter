type MarqueeBandProps = {
  items: string[];
  className?: string;
  speed?: number;
};

const itemRowClassName =
  'flex shrink-0 items-center px-8 font-variable text-sm font-light tracking-[0.2em] text-ink/50 uppercase sm:text-base';

function MarqueeItems({ items, idPrefix }: { items: string[]; idPrefix: string }) {
  return (
    <>
      {items.map((item, index) => (
        <span
          key={`${idPrefix}-${item}-${index}`}
          className="flex shrink-0 items-center"
        >
          {index > 0 ? (
            <span
              className="mx-6 text-brand/80"
              aria-hidden
            >
              ·
            </span>
          ) : null}
          <span>{item}</span>
        </span>
      ))}
    </>
  );
}

export function MarqueeBand({ items, className, speed = 35 }: MarqueeBandProps) {
  return (
    <section
      className={
        className
          ? `marquee-band flex h-18 items-center overflow-hidden border-y border-ink/8 ${className}`
          : 'marquee-band flex h-18 items-center overflow-hidden border-y border-ink/8'
      }
      aria-label="Feature-Schwerpunkte"
    >
      <div
        className="marquee-band__track flex w-max animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className={itemRowClassName}>
          <MarqueeItems
            items={items}
            idPrefix="a"
          />
        </div>
        <div
          className={`marquee-band__duplicate ${itemRowClassName}`}
          aria-hidden
        >
          <MarqueeItems
            items={items}
            idPrefix="b"
          />
        </div>
      </div>
    </section>
  );
}
