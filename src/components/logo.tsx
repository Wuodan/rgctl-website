/**
 * rgctl brand lockup (icon + wordmark).
 *
 * Kept inline rather than as an <img> so the mark follows the site theme:
 * the navy stroke and near-black wordmark are remapped through
 * `--logo-mark` / `--logo-word` in globals.css, while the accent follows the
 * site's button blue (`--primary`) in both themes. The wordmark uses Poppins
 * (`--font-logo`), the face the SVG was drawn for, and `textLength` keeps the
 * lockup width stable when the webfont is still swapping in.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="160 370 740 250"
      className={className}
      role="img"
      aria-label="rgctl"
      focusable="false"
    >
      {/* Icon */}
      <g
        fill="none"
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          x="180"
          y="390"
          width="210"
          height="210"
          rx="42"
          stroke="var(--logo-mark)"
        />
        <path
          d="M296 390V466 M296 516V600 M312 390V466 M312 516V600"
          stroke="var(--logo-mark)"
        />
        <circle cx="303" cy="491" r="25" stroke="var(--logo-mark)" />
        <path d="M213 438 L276 491 L213 544" stroke="var(--logo-mark)" />
        <path d="M323 447.5 A48 48 0 0 1 323 534.5" stroke="var(--primary)" />
      </g>
      {/* Wordmark */}
      <text
        x="462"
        y="555"
        style={{
          fontFamily:
            "var(--font-logo), Poppins, Montserrat, 'Helvetica Neue', Arial, sans-serif",
        }}
        fontWeight={600}
        fontSize={190}
        textLength={422}
        lengthAdjust="spacing"
      >
        <tspan fill="var(--logo-word)">rg</tspan>
        <tspan fill="var(--primary)">ctl</tspan>
      </text>
    </svg>
  );
}
