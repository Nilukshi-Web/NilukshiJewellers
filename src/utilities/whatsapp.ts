export const whatsappLink = (number: string | null | undefined, message?: string | null): string => {
  const digits = (number || '').replace(/\D/g, '')
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${digits}${text}`
}
