'use client'

import { SelectGroup } from '@radix-ui/react-select'
import { useTransition } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface AttributeSelectProps {
  label: string
  placeholder?: string
  options: { label: string; value: string }[]
  onValueChange?: (value: string) => void
}

const AttributeSelect = ({
  label,
  options,
  placeholder = 'Seleccionar',
  onValueChange = (value) => alert(value),
}: AttributeSelectProps) => {
  const [isPending, startTransition] = useTransition()
  //   const [value, setValue] = useState<string>()

  return (
    <SelectGroup>
      <div className="relative w-full">
        <SelectLabel className="p-1">{label}</SelectLabel>

        {/* {value !== undefined && (
          <span className="absolute bottom-1 right-0 flex items-center">
            <button
              className="smooth-500 rounded-md px-2 text-sm hover:bg-border"
              onClick={() =>
                startTransition(() => {
                  setValue(undefined)
                })
              }
            >
              Limpiar
            </button>
          </span>
        )} */}
      </div>

      <Select
        // value={value}
        onValueChange={(value) => {
          startTransition(() => {
            onValueChange(value)
            // setValue(value)
          })
        }}
        disabled={isPending}
      >
        <SelectTrigger className="relative h-8">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((opt, i) => (
            <SelectItem key={i} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SelectGroup>
  )
}

export default AttributeSelect
