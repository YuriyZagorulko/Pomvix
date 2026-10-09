/** Verified Gadgeto data-flow overview for the Pomvix case study (not a literal network map). */
export function GadgetoArchitectureDiagram() {
  return (
    <figure className="card overflow-hidden p-6 md:p-10">
      <figcaption className="sr-only">
        Supplier feeds are imported and normalized into an internal PostgreSQL catalog, then pricing
        and inventory rules apply before exports to Rozetka, Prom.ua, and Google Merchant.
      </figcaption>
      <svg
        viewBox="0 0 960 320"
        role="img"
        aria-labelledby="gadgeto-arch-title gadgeto-arch-desc"
        className="mx-auto h-auto w-full max-w-4xl"
      >
        <title id="gadgeto-arch-title">Gadgeto catalog and channel data flow</title>
        <desc id="gadgeto-arch-desc">
          IT-Link and DC-Link supplier data flows through import and normalization into an internal
          catalog, then through pricing and inventory to marketplace and feed exports.
        </desc>
        <defs>
          <linearGradient id="g-box" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(169,183,255,0.18)" />
            <stop offset="100%" stopColor="rgba(149,228,206,0.08)" />
          </linearGradient>
          <marker id="g-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="rgba(169,183,255,0.85)" />
          </marker>
        </defs>
        {[
          { x: 16, label: 'Supplier feeds', sub: 'IT-Link · DC-Link' },
          { x: 196, label: 'Import & normalize', sub: 'Celery workers' },
          { x: 396, label: 'Internal catalog', sub: 'PostgreSQL' },
          { x: 596, label: 'Pricing & stock', sub: 'Rules & sync' },
          { x: 776, label: 'Channel exports', sub: 'Rozetka · Prom · Google' },
        ].map((box, i) => (
          <g key={box.label}>
            <rect
              x={box.x}
              y={100}
              width={168}
              height={88}
              rx={12}
              fill="url(#g-box)"
              stroke="rgba(159,177,227,0.35)"
            />
            <text
              x={box.x + 84}
              y={132}
              textAnchor="middle"
              fill="#f3f5ff"
              fontSize="13"
              fontWeight="600"
            >
              {box.label}
            </text>
            <text x={box.x + 84} y={156} textAnchor="middle" fill="#a6b0cb" fontSize="11">
              {box.sub}
            </text>
            {i < 4 && (
              <line
                x1={box.x + 168}
                y1={144}
                x2={box.x + 196}
                y2={144}
                stroke="rgba(169,183,255,0.65)"
                strokeWidth="2"
                markerEnd="url(#g-arrow)"
              />
            )}
          </g>
        ))}
        <text
          x={480}
          y={48}
          textAnchor="middle"
          fill="#95e4ce"
          fontSize="11"
          letterSpacing="0.12em"
        >
          ADMIN UI · API · SCHEDULED SYNC
        </text>
        <rect
          x={320}
          y={228}
          width={320}
          height={56}
          rx={10}
          fill="rgba(21,32,62,0.5)"
          stroke="rgba(159,177,227,0.2)"
        />
        <text x={480} y={252} textAnchor="middle" fill="#a6b0cb" fontSize="11">
          Next.js front-end (public)
        </text>
        <text x={480} y={270} textAnchor="middle" fill="#8294e8" fontSize="10">
          reads catalog via FastAPI
        </text>
        <path
          d="M 480 188 L 480 228"
          stroke="rgba(149,228,206,0.5)"
          strokeWidth="2"
          strokeDasharray="4 4"
          markerEnd="url(#g-arrow)"
        />
      </svg>
    </figure>
  );
}
