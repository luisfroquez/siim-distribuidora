import Link from 'next/link'

interface ComboboxSearchResultProps {
  title: string
  path: string
  nodes: { name: string; slug: string }[]
  action: () => void
}

const ComboboxSearchResult = ({
  title,
  nodes,
  path,
  action = () => null,
}: ComboboxSearchResultProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 p-2">
        <p className="text-xs font-bold leading-none">{title}</p>
        <span className="h-[1px] w-full bg-border" />
      </div>
      <div className="flex flex-col gap-1 p-1 px-2">
        {nodes.map((node, i) => (
          <Link
            key={i}
            href={`${path}${node.slug}`}
            className="smooth-500 flex h-8 items-center rounded-sm p-2 px-3 hover:bg-border"
            onClick={action}
          >
            <p className="line-clamp-1">{node.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ComboboxSearchResult
