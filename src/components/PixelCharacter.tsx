/**
 * Inline SVG pixel sprites — each <rect> is one "pixel" on a small grid.
 * To swap for real pixel-art PNGs later: replace any sprite below with
 *   <img src="/sprites/boy.png" className="pixelated w-full h-full" />
 */

interface SpriteProps {
  className?: string;
  size?: number;
}

const SKIN = '#fbd6b5';
const SKIN_SHADE = '#e9b48f';
const BLUSH = '#ff96b5';
const MOUTH = '#a13564';
const EYE = '#1a1320';
const HAIR_DARK = '#2b1d2e';
const HAIR_BROWN = '#3a2620';
const SWEATER_DARK = '#2a3050';
const SWEATER_DARK_HI = '#3d4470';
const PANTS = '#3a2e44';
const SHOES = '#1c1320';
const TOP_LIGHT = '#fff5f5';
const TOP_LIGHT_HI = '#ffe4e4';
const PANTS_LIGHT = '#d6c4f0';

/** Small helper — stamps a square pixel of color at grid (x,y). */
function P({ x, y, c, w = 1, h = 1 }: { x: number; y: number; c: string; w?: number; h?: number }) {
  return <rect x={x} y={y} width={w} height={h} fill={c} />;
}

/** Boyfriend chibi — 16w × 22h grid */
export function BoySprite({ className = '', size = 160 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 16 22"
      style={{ width: size, height: (size * 22) / 16 }}
      className={className}
      shapeRendering="crispEdges"
    >
      {/* hair top */}
      <P x={4} y={1} w={8} h={1} c={HAIR_DARK} />
      <P x={3} y={2} w={10} h={1} c={HAIR_DARK} />
      <P x={3} y={3} w={10} h={1} c={HAIR_DARK} />
      <P x={3} y={4} w={2} h={1} c={HAIR_DARK} />
      <P x={11} y={4} w={2} h={1} c={HAIR_DARK} />
      {/* face */}
      <P x={5} y={4} w={6} h={1} c={SKIN} />
      <P x={4} y={5} w={8} h={1} c={SKIN} />
      <P x={4} y={6} w={8} h={1} c={SKIN} />
      <P x={4} y={7} w={8} h={1} c={SKIN} />
      <P x={5} y={8} w={6} h={1} c={SKIN} />
      {/* hair side overlay */}
      <P x={4} y={4} w={1} h={1} c={HAIR_DARK} />
      <P x={11} y={4} w={1} h={1} c={HAIR_DARK} />
      <P x={4} y={5} w={1} h={1} c={HAIR_DARK} />
      <P x={11} y={5} w={1} h={1} c={HAIR_DARK} />
      {/* eyes */}
      <P x={6} y={6} c={EYE} />
      <P x={9} y={6} c={EYE} />
      {/* blush */}
      <P x={5} y={7} c={BLUSH} />
      <P x={10} y={7} c={BLUSH} />
      {/* mouth */}
      <P x={7} y={8} w={2} h={1} c={MOUTH} />
      {/* neck */}
      <P x={7} y={9} w={2} h={1} c={SKIN_SHADE} />
      {/* sweater */}
      <P x={3} y={10} w={10} h={1} c={SWEATER_DARK} />
      <P x={3} y={11} w={10} h={1} c={SWEATER_DARK} />
      <P x={3} y={12} w={10} h={1} c={SWEATER_DARK} />
      <P x={3} y={13} w={10} h={1} c={SWEATER_DARK_HI} />
      <P x={3} y={14} w={10} h={1} c={SWEATER_DARK} />
      <P x={3} y={15} w={10} h={1} c={SWEATER_DARK} />
      {/* sweater inner V */}
      <P x={7} y={10} w={2} h={1} c={TOP_LIGHT} />
      {/* arms */}
      <P x={2} y={11} w={1} h={4} c={SWEATER_DARK} />
      <P x={13} y={11} w={1} h={4} c={SWEATER_DARK} />
      {/* pants */}
      <P x={4} y={16} w={3} h={1} c={PANTS} />
      <P x={9} y={16} w={3} h={1} c={PANTS} />
      <P x={4} y={17} w={3} h={1} c={PANTS} />
      <P x={9} y={17} w={3} h={1} c={PANTS} />
      <P x={4} y={18} w={3} h={1} c={PANTS} />
      <P x={9} y={18} w={3} h={1} c={PANTS} />
      <P x={4} y={19} w={3} h={1} c={PANTS} />
      <P x={9} y={19} w={3} h={1} c={PANTS} />
      {/* shoes */}
      <P x={3} y={20} w={4} h={1} c={SHOES} />
      <P x={9} y={20} w={4} h={1} c={SHOES} />
    </svg>
  );
}

/** Girlfriend chibi — 16w × 22h grid */
export function GirlSprite({ className = '', size = 160 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 16 22"
      style={{ width: size, height: (size * 22) / 16 }}
      className={className}
      shapeRendering="crispEdges"
    >
      {/* long hair back */}
      <P x={3} y={2} w={10} h={1} c={HAIR_BROWN} />
      <P x={2} y={3} w={12} h={1} c={HAIR_BROWN} />
      <P x={2} y={4} w={12} h={1} c={HAIR_BROWN} />
      <P x={2} y={5} w={2} h={6} c={HAIR_BROWN} />
      <P x={12} y={5} w={2} h={6} c={HAIR_BROWN} />
      {/* face */}
      <P x={5} y={4} w={6} h={1} c={SKIN} />
      <P x={4} y={5} w={8} h={1} c={SKIN} />
      <P x={4} y={6} w={8} h={1} c={SKIN} />
      <P x={4} y={7} w={8} h={1} c={SKIN} />
      <P x={5} y={8} w={6} h={1} c={SKIN} />
      {/* bangs */}
      <P x={4} y={4} w={1} h={1} c={HAIR_BROWN} />
      <P x={11} y={4} w={1} h={1} c={HAIR_BROWN} />
      <P x={5} y={4} w={2} h={1} c={HAIR_BROWN} />
      <P x={9} y={4} w={2} h={1} c={HAIR_BROWN} />
      {/* eyes (closed/happy curves) */}
      <P x={6} y={6} c={EYE} />
      <P x={9} y={6} c={EYE} />
      {/* blush */}
      <P x={5} y={7} c={BLUSH} />
      <P x={10} y={7} c={BLUSH} />
      {/* smile */}
      <P x={7} y={8} w={2} h={1} c={MOUTH} />
      {/* neck */}
      <P x={7} y={9} w={2} h={1} c={SKIN_SHADE} />
      {/* top */}
      <P x={3} y={10} w={10} h={1} c={TOP_LIGHT} />
      <P x={3} y={11} w={10} h={1} c={TOP_LIGHT} />
      <P x={3} y={12} w={10} h={1} c={TOP_LIGHT_HI} />
      <P x={3} y={13} w={10} h={1} c={TOP_LIGHT} />
      <P x={3} y={14} w={10} h={1} c={TOP_LIGHT} />
      <P x={3} y={15} w={10} h={1} c={TOP_LIGHT} />
      {/* arms */}
      <P x={2} y={11} w={1} h={4} c={TOP_LIGHT} />
      <P x={13} y={11} w={1} h={4} c={TOP_LIGHT} />
      {/* heart on top */}
      <P x={7} y={12} w={2} h={1} c={BLUSH} />
      <P x={6} y={13} w={4} h={1} c={BLUSH} />
      <P x={7} y={14} w={2} h={1} c={BLUSH} />
      {/* pants */}
      <P x={4} y={16} w={3} h={1} c={PANTS_LIGHT} />
      <P x={9} y={16} w={3} h={1} c={PANTS_LIGHT} />
      <P x={4} y={17} w={3} h={1} c={PANTS_LIGHT} />
      <P x={9} y={17} w={3} h={1} c={PANTS_LIGHT} />
      <P x={4} y={18} w={3} h={1} c={PANTS_LIGHT} />
      <P x={9} y={18} w={3} h={1} c={PANTS_LIGHT} />
      <P x={4} y={19} w={3} h={1} c={PANTS_LIGHT} />
      <P x={9} y={19} w={3} h={1} c={PANTS_LIGHT} />
      {/* shoes */}
      <P x={3} y={20} w={4} h={1} c={TOP_LIGHT} />
      <P x={9} y={20} w={4} h={1} c={TOP_LIGHT} />
    </svg>
  );
}

interface GiftProps extends SpriteProps {
  color?: 'pink' | 'lavender' | 'cream';
}

/** Gift box sprite — 16x16 grid */
export function GiftSprite({ className = '', size = 96, color = 'pink' }: GiftProps) {
  const palette = {
    pink: { box: '#ff95ba', boxHi: '#ffd1e0', ribbon: '#ff6fa3', shadow: '#a13564' },
    lavender: { box: '#bfa9e8', boxHi: '#e7dcf7', ribbon: '#8567c8', shadow: '#3d2b66' },
    cream: { box: '#ffe4c8', boxHi: '#fff5f5', ribbon: '#ff95ba', shadow: '#c98760' },
  }[color];

  return (
    <svg
      viewBox="0 0 16 16"
      style={{ width: size, height: size }}
      className={className}
      shapeRendering="crispEdges"
    >
      {/* bow loops */}
      <P x={5} y={1} w={2} h={1} c={palette.ribbon} />
      <P x={9} y={1} w={2} h={1} c={palette.ribbon} />
      <P x={4} y={2} w={3} h={1} c={palette.ribbon} />
      <P x={9} y={2} w={3} h={1} c={palette.ribbon} />
      <P x={5} y={3} w={2} h={1} c={palette.ribbon} />
      <P x={9} y={3} w={2} h={1} c={palette.ribbon} />
      {/* bow knot */}
      <P x={7} y={2} w={2} h={2} c={palette.shadow} />
      {/* lid */}
      <P x={1} y={4} w={14} h={1} c={palette.boxHi} />
      <P x={1} y={5} w={14} h={2} c={palette.box} />
      {/* lid stripe */}
      <P x={7} y={4} w={2} h={3} c={palette.ribbon} />
      {/* box body */}
      <P x={2} y={7} w={12} h={1} c={palette.boxHi} />
      <P x={2} y={8} w={12} h={6} c={palette.box} />
      {/* ribbon vertical */}
      <P x={7} y={7} w={2} h={7} c={palette.ribbon} />
      {/* outline */}
      <P x={1} y={4} w={14} h={1} c={palette.shadow} />
      <P x={1} y={4} w={1} h={3} c={palette.shadow} />
      <P x={14} y={4} w={1} h={3} c={palette.shadow} />
      <P x={2} y={13} w={12} h={1} c={palette.shadow} />
      <P x={2} y={7} w={1} h={7} c={palette.shadow} />
      <P x={13} y={7} w={1} h={7} c={palette.shadow} />
    </svg>
  );
}

/** Tiny pixel heart used as decoration */
export function HeartSprite({ className = '', size = 32 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 8 8"
      style={{ width: size, height: size }}
      className={className}
      shapeRendering="crispEdges"
    >
      <P x={1} y={1} w={2} h={1} c="#ff6fa3" />
      <P x={5} y={1} w={2} h={1} c="#ff6fa3" />
      <P x={0} y={2} w={8} h={2} c="#ff6fa3" />
      <P x={1} y={4} w={6} h={1} c="#ff6fa3" />
      <P x={2} y={5} w={4} h={1} c="#ff6fa3" />
      <P x={3} y={6} w={2} h={1} c="#ff6fa3" />
      <P x={1} y={2} c="#ffd1e0" />
    </svg>
  );
}

/** Tiny star sprite */
export function StarSprite({ className = '', size = 24, color = '#fff2a8' }: SpriteProps & { color?: string }) {
  return (
    <svg
      viewBox="0 0 8 8"
      style={{ width: size, height: size }}
      className={className}
      shapeRendering="crispEdges"
    >
      <P x={3} y={0} w={2} h={1} c={color} />
      <P x={3} y={1} w={2} h={1} c={color} />
      <P x={0} y={3} w={8} h={2} c={color} />
      <P x={3} y={5} w={2} h={1} c={color} />
      <P x={2} y={6} c={color} />
      <P x={5} y={6} c={color} />
    </svg>
  );
}

/**
 * Chunky pixel arrow — long horizontal shaft + a triangular head that tapers
 * to a point on the right. Direction: 'right' (default) or 'left'.
 *
 * Layout on a 26w x 16h grid (each cell = 1 logical pixel):
 *   row →                                                              tip
 *      0 ........................##....    head row 0  (col 14)
 *      1 .......................####...
 *      2 ......................######..
 *      3 .....................########.
 *      4 ....................##########
 *      5 ...................############
 *      6 ##################################   shaft + head body (rows 6-9)
 *      7 ##################################
 *      8 ##################################
 *      9 ##################################
 *     10 ...................############
 *     11 ....................##########
 *     12 .....................########.
 *     13 ......................######..
 *     14 .......................####...
 *     15 ........................##....
 */
export function PixelArrow({
  className = '',
  size = 64,
  direction = 'right',
  color = '#ff6fa3',
  outline = '#5e1f3b',
}: SpriteProps & { direction?: 'left' | 'right'; color?: string; outline?: string }) {
  const W = 24;
  const H = 16;
  const aspect = H / W;

  // Each entry is one column of the head: [x, y, height]. Widest at the base
  // (where the shaft meets the head) and tapering to a 2 px tip on the right.
  const headCols: [number, number, number][] = [
    [14, 0, 16],  // base — full canvas height
    [15, 0, 16],  // base, doubled for chunkiness
    [16, 1, 14],
    [17, 2, 12],
    [18, 3, 10],
    [19, 4, 8],
    [20, 5, 6],
    [21, 6, 4],
    [22, 7, 2],   // tip
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{
        width: size,
        height: size * aspect,
        transform: direction === 'left' ? 'scaleX(-1)' : undefined,
      }}
      className={className}
      shapeRendering="crispEdges"
    >
      {/* OUTLINE LAYER — drawn first so the fill paints over its inside */}
      {/* shaft outline (1 px above + below the shaft) */}
      <rect x="0" y="5" width="14" height="1" fill={outline} />
      <rect x="0" y="10" width="14" height="1" fill={outline} />
      {/* shaft left cap */}
      <rect x="0" y="5" width="1" height="6" fill={outline} />
      {/* head outline — one rect per column, 1 px taller on each side */}
      {headCols.map(([x, y, h]) => (
        <rect
          key={`o${x}`}
          x={x}
          y={Math.max(0, y - 1)}
          width="1"
          height={Math.min(H, h + 2)}
          fill={outline}
        />
      ))}

      {/* FILL LAYER */}
      {/* shaft */}
      <rect x="1" y="6" width="13" height="4" fill={color} />
      {/* head columns (the actual triangular head) */}
      {headCols.map(([x, y, h]) => (
        <rect key={`f${x}`} x={x} y={y} width="1" height={h} fill={color} />
      ))}

      {/* tiny top-edge highlight on the shaft */}
      <rect x="2" y="6" width="3" height="1" fill="#ffd1e0" />
    </svg>
  );
}

/** Pixel cat companion for music player */
export function PixelCat({ className = '', size = 96 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 16 14"
      style={{ width: size, height: (size * 14) / 16 }}
      className={className}
      shapeRendering="crispEdges"
    >
      {/* ears */}
      <P x={2} y={2} w={2} h={1} c="#ff95ba" />
      <P x={12} y={2} w={2} h={1} c="#ff95ba" />
      <P x={2} y={3} w={2} h={1} c="#ff95ba" />
      <P x={12} y={3} w={2} h={1} c="#ff95ba" />
      {/* head */}
      <P x={2} y={4} w={12} h={5} c="#ffd1e0" />
      {/* eyes */}
      <P x={5} y={5} w={1} h={2} c={EYE} />
      <P x={10} y={5} w={1} h={2} c={EYE} />
      {/* nose */}
      <P x={7} y={6} w={2} h={1} c="#ff6fa3" />
      {/* mouth */}
      <P x={6} y={7} w={1} h={1} c="#a13564" />
      <P x={9} y={7} w={1} h={1} c="#a13564" />
      {/* body */}
      <P x={3} y={9} w={10} h={3} c="#ffd1e0" />
      <P x={4} y={12} w={2} h={1} c="#ff95ba" />
      <P x={10} y={12} w={2} h={1} c="#ff95ba" />
      {/* tail */}
      <P x={13} y={10} w={2} h={1} c="#ff95ba" />
      <P x={14} y={9} w={1} h={1} c="#ff95ba" />
    </svg>
  );
}
