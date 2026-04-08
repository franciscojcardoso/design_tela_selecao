const deviceButtons = [
  { id: 'current', label: 'Atual' },
  { id: 'device-1', label: 'Dispositivo 1' },
  { id: 'device-2', label: 'Dispositivo 2' },
  { id: 'device-3', label: 'Dispositivo 3' },
]

export function PreviewViewport({ previewDevice, onSelectDevice, compactMode, children }) {
  return (
    <div className={`preview-shell preview-shell--${previewDevice}${compactMode ? ' is-compact' : ''}`}>
      <div className="preview-shell__toolbar">
        <label className="preview-shell__field">
          <span>Visualização</span>
          <select value={previewDevice} onChange={(event) => onSelectDevice(event.target.value)} className="preview-shell__select">
            {deviceButtons.map((device) => (
              <option key={device.id} value={device.id}>{device.label}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="preview-shell__frame">{children}</div>
    </div>
  )
}
