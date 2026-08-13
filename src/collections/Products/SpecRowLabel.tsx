'use client'
import { Product } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const SpecRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<NonNullable<Product['specs']>[number]>()

  const label = data?.label
    ? `${data.label}${data.value ? `: ${data.value}` : ''}`
    : `Specification ${rowNumber !== undefined ? rowNumber + 1 : ''}`

  return <div>{label}</div>
}
