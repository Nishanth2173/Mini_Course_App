export const emailOk = e => /\S+@\S+\.\S+/.test(e)
export const passwordOk = p => p.length >= 6