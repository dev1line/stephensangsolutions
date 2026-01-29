/**
 * DefenseMode: bật/tắt chế độ "Active Defense" – shield forcefield động quanh mascot.
 * Gọi DefenseMode.start() trong Console hoặc gắn vào nút bấm.
 */

function start() {
  const el = document.getElementById('forcefield')
  if (el) el.classList.add('active')
}

function stop() {
  const el = document.getElementById('forcefield')
  if (el) el.classList.remove('active')
}

const DefenseMode = { start, stop }

if (typeof window !== 'undefined') {
  window.DefenseMode = DefenseMode
}

export default DefenseMode
