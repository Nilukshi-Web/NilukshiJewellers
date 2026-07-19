export const formatPrice = (price: number | null | undefined): string =>
  price == null ? 'Price on request' : `LKR ${Number(price).toLocaleString('en-LK')}`
