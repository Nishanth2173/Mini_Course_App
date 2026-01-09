export function passwordOk(p) {
  if (!p) return ''
  if (p.length < 6) return 'weak'
  if (/[A-Z]/.test(p) && /\d/.test(p)) return 'strong'
  return 'medium'
}
