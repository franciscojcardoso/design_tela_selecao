// Lightweight SVG sparkline — no external chart library needed
const weeks = 12
const occupancy = [72, 74, 73, 76, 78, 80, 81, 80, 79, 80, 79, 78]
const wait      = [60, 62, 61, 65, 67, 70, 72, 71, 70, 71, 70, 69]

function normalize(data, minV = 50, maxV = 100) {
  return data.map(v => 1 - (v - minV) / (maxV - minV))
}

function toPath(data, w, h) {
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${v * h}`)
  return 'M' + pts.join(' L')
}

function toArea(data, w, h) {
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${v * h}`)
  return `M0,${h} L` + pts.join(' L') + ` L${w},${h} Z`
}

export default function SimpleChart() {
  const W = 560
  const H = 160
  const occ = normalize(occupancy)
  const wt  = normalize(wait)

  return (
    <svg viewBox={`0 0 ${W} ${H + 30}`} width="100%" style={{ display: 'block' }}>
      {/* Y gridlines */}
      {[0, 25, 50, 75, 100].map(pct => {
        const y = H * (1 - pct / 50)
        if (y < 0 || y > H) return null
        return (
          <g key={pct}>
            <line x1={0} y1={y} x2={W} y2={y} stroke="#F0F2F5" strokeWidth={1} />
            <text x={-4} y={y + 4} fontSize={10} fill="#ADB5BD" textAnchor="end">{pct}</text>
          </g>
        )
      })}

      {/* Occupancy area */}
      <path d={toArea(occ, W, H)} fill="rgba(13,202,240,0.12)" />
      <path d={toPath(occ, W, H)} fill="none" stroke="#0DCAF0" strokeWidth={2} strokeLinejoin="round" />

      {/* Wait time line */}
      <path d={toPath(wt, W, H)} fill="none" stroke="#ADB5BD" strokeWidth={1.5}
        strokeDasharray="4 3" strokeLinejoin="round" />

      {/* X labels */}
      {Array.from({ length: weeks }, (_, i) => (
        <text key={i} x={(i / (weeks - 1)) * W} y={H + 18} fontSize={10} fill="#ADB5BD" textAnchor="middle">
          Sem {i + 1}
        </text>
      ))}
    </svg>
  )
}
