import DarkVeil from './DarkVeil';

export default function Hero_bg() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
      }}
    >
      <DarkVeil
        color="#6b12ff"
        speed={0.5}
        scale={1}
        rotation={0}
        flow={1}
        warp={0}
        variation={0}
        sheen={0}
        glow={0.4}
        brightness={1}
        grain={0.03}
        quality={0.5}
        fade={0}
        opacity={1}
        mouseInteraction
        mouseStrength={1}
        intro
        lightMode={false}
      />
    </div>
  );
}