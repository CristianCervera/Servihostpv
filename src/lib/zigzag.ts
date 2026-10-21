// The page's one motif: the torn edge of a thermal ticket.
// Returns a clip-path polygon with a serrated top and/or bottom edge.

interface ZigzagOptions {
  top?: boolean;
  bottom?: boolean;
  teeth?: number;
  depth?: number;
}

const pct = (n: number) => `${n.toFixed(3)}%`;

export function zigzag({ top = false, bottom = false, teeth = 40, depth = 10 }: ZigzagOptions): string {
  const pts: string[] = [];
  const d = `${depth}px`;

  if (top) {
    for (let i = 0; i <= teeth; i++) {
      pts.push(`${pct((i / teeth) * 100)} ${d}`);
      if (i < teeth) pts.push(`${pct(((i + 0.5) / teeth) * 100)} 0`);
    }
  } else {
    pts.push('0 0', '100% 0');
  }

  if (bottom) {
    for (let i = teeth; i >= 0; i--) {
      pts.push(`${pct((i / teeth) * 100)} calc(100% - ${d})`);
      if (i > 0) pts.push(`${pct(((i - 0.5) / teeth) * 100)} 100%`);
    }
  } else {
    pts.push('100% 100%', '0 100%');
  }

  return `polygon(${pts.join(',')})`;
}

/** Inline style for an element with class `zz`: a coarse edge on phones, a fine one from 768px. */
export function zz(opts: Omit<ZigzagOptions, 'teeth'> & { teeth?: number; teethSm?: number }): string {
  const { teeth = 48, teethSm = 18, ...rest } = opts;
  return `--zz:${zigzag({ ...rest, teeth })};--zz-sm:${zigzag({ ...rest, teeth: teethSm })}`;
}
