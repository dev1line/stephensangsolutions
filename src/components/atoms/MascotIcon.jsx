/**
 * Mascot: chọn theo variant từ 10 mascot. Dùng bản _anim.svg (có hoạt ảnh) khi có.
 */

const MASCOT_FILES = {
  runner: 'runner_v3.svg',
  leader: 'leader_v3.svg',
  coder: 'coder_v3.svg',
  analyst: 'analyst_v3.svg',
  defender: 'defender_v3.svg',
  guardian: 'guardian_v3.svg',
  reporter: 'reporter_v3.svg',
  responder: 'responder_v3.svg',
  monitor: 'monitor_v3.svg',
  carrier: 'carrier_v3.svg',
}

/** Các mascot có bản hoạt ảnh (_anim.svg) – dùng thay cho _v3.svg */
const MASCOT_ANIM_FILES = {
  runner: 'runner_anim.svg',
  coder: 'coder_anim.svg',
  defender: 'defender_anim.svg',
  guardian: 'guardian_anim.svg',
  monitor: 'monitor_anim.svg',
  responder: 'responder_anim.svg',
}

const VARIANT_TO_MASCOT = {
  hero: 'runner',
  about: 'leader',
  skills: 'coder',
  experience: 'analyst',
  projects: 'defender',
  contact: 'guardian',
  default: 'runner',
}

const MascotIcon = ({ size = 200, variant = 'default' }) => {
  const mascot = VARIANT_TO_MASCOT[variant] || VARIANT_TO_MASCOT.default
  const filename = MASCOT_ANIM_FILES[mascot] || MASCOT_FILES[mascot] || MASCOT_FILES.runner
  const src = `/${filename}`

  return (
    <img
      src={src}
      alt={`${mascot} mascot`}
      width={size}
      height={size}
      className="drop-shadow-lg object-contain"
      draggable={false}
    />
  )
}

export default MascotIcon
