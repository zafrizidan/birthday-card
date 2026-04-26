/**
 * Pastel sunset sky with chunky pixel-art clouds and a few twinkle stars.
 * Drop in as the first child of any screen that wants the cozy sky aesthetic.
 */

interface CloudProps {
  size?: number;
  shade?: 'light' | 'mid' | 'pink';
}

function CloudSprite({ size = 120, shade = 'light' }: CloudProps) {
  const palette = {
    light: { body: '#ffffff', highlight: '#ffffff', under: '#e9c8d8' },
    mid: { body: '#fff0f5', highlight: '#ffffff', under: '#dcb6cc' },
    pink: { body: '#ffe1ec', highlight: '#fff5f8', under: '#d49bbe' },
  }[shade];

  return (
    <svg
      viewBox="0 0 32 16"
      style={{ width: size, height: (size * 16) / 32 }}
      shapeRendering="crispEdges"
    >
      {/* shadow underside */}
      <rect x="3" y="12" width="26" height="1" fill={palette.under} />
      <rect x="5" y="13" width="22" height="1" fill={palette.under} opacity="0.6" />
      {/* main body */}
      <rect x="2" y="9" width="28" height="3" fill={palette.body} />
      <rect x="3" y="8" width="26" height="1" fill={palette.body} />
      {/* upper puffs */}
      <rect x="5" y="6" width="6" height="2" fill={palette.body} />
      <rect x="13" y="4" width="8" height="2" fill={palette.body} />
      <rect x="22" y="6" width="6" height="2" fill={palette.body} />
      <rect x="14" y="6" width="6" height="3" fill={palette.body} />
      <rect x="6" y="7" width="4" height="1" fill={palette.body} />
      <rect x="23" y="7" width="4" height="1" fill={palette.body} />
      {/* highlights */}
      <rect x="6" y="5" width="3" height="1" fill={palette.highlight} />
      <rect x="14" y="3" width="5" height="1" fill={palette.highlight} />
      <rect x="23" y="5" width="3" height="1" fill={palette.highlight} />
      <rect x="3" y="9" width="1" height="3" fill={palette.highlight} />
    </svg>
  );
}

function TinyStar({ size = 8, color = '#fff5f5' }: { size?: number; color?: string }) {
  return (
    <svg
      viewBox="0 0 6 6"
      style={{ width: size, height: size }}
      shapeRendering="crispEdges"
    >
      <rect x="2" y="0" width="2" height="6" fill={color} />
      <rect x="0" y="2" width="6" height="2" fill={color} />
    </svg>
  );
}

export default function SkyBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* sunset gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #f0a8c4 0%, #dca0c8 18%, #c4a4d8 38%, #b8acdb 55%, #d8b4c8 72%, #f0bca4 88%, #ffd2a8 100%)',
        }}
      />

      {/* faint horizon glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255, 220, 190, 0.45) 0%, rgba(255, 220, 190, 0) 70%)',
        }}
      />

      {/* twinkle stars */}
      <div className="absolute animate-twinkle" style={{ top: '8%', left: '22%' }}>
        <TinyStar size={10} />
      </div>
      <div
        className="absolute animate-twinkle"
        style={{ top: '14%', right: '28%', animationDelay: '0.7s' }}
      >
        <TinyStar size={6} color="#ffe6f2" />
      </div>
      <div
        className="absolute animate-twinkle"
        style={{ top: '26%', left: '60%', animationDelay: '1.3s' }}
      >
        <TinyStar size={8} />
      </div>
      <div
        className="absolute animate-twinkle"
        style={{ top: '6%', left: '70%', animationDelay: '0.4s' }}
      >
        <TinyStar size={6} color="#ffd1e0" />
      </div>

      {/* clouds — varied sizes and depths */}
      <div className="absolute" style={{ top: '6%', left: '4%' }}>
        <CloudSprite size={150} shade="light" />
      </div>
      <div className="absolute" style={{ top: '20%', right: '6%' }}>
        <CloudSprite size={170} shade="light" />
      </div>
      <div className="absolute" style={{ top: '46%', left: '14%' }}>
        <CloudSprite size={130} shade="mid" />
      </div>
      <div className="absolute" style={{ top: '58%', right: '20%' }}>
        <CloudSprite size={200} shade="light" />
      </div>
      <div className="absolute" style={{ bottom: '6%', left: '38%' }}>
        <CloudSprite size={240} shade="pink" />
      </div>
      <div className="absolute" style={{ bottom: '14%', left: '-3%' }}>
        <CloudSprite size={180} shade="pink" />
      </div>
      <div className="absolute" style={{ bottom: '2%', right: '-4%' }}>
        <CloudSprite size={210} shade="pink" />
      </div>
    </div>
  );
}
