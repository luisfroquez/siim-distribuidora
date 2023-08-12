import { OrderEnum, ProductsOrderByEnum } from '@/types/enums'

export const wpSortOptions = [
  {
    label: 'Fecha: Más recientes',
    value: { order: OrderEnum.ASC, field: ProductsOrderByEnum.Date },
  },
  {
    label: 'Fecha: Menos recientes',
    value: { order: OrderEnum.DESC, field: ProductsOrderByEnum.Date },
  },
  {
    label: 'Nombre: A - Z',
    value: { order: OrderEnum.ASC, field: ProductsOrderByEnum.Name },
  },
  {
    label: 'Nombre: Z - A',
    value: { order: OrderEnum.DESC, field: ProductsOrderByEnum.Name },
  },
]
