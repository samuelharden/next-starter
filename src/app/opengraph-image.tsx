import { ImageResponse } from 'next/og';

export const alt = 'Starter. Marketing site boilerplate';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#F8FAFC',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          <div
            style={{
              width: 96,
              height: 4,
              backgroundColor: '#0F766E',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              color: '#0F172A',
              fontSize: 64,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              textTransform: 'uppercase',
            }}
          >
            <span>Starter</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 820,
          }}
        >
          <div
            style={{
              color: 'rgba(15,23,42,0.65)',
              fontSize: 28,
              lineHeight: 1.35,
              fontWeight: 500,
            }}
          >
            Marketing site boilerplate. Ready to rebrand.
          </div>
          <div
            style={{
              color: 'rgba(15,23,42,0.4)',
              fontSize: 22,
              letterSpacing: '0.02em',
            }}
          >
            example.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
