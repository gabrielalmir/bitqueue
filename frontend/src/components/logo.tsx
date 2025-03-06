import { DatabaseIcon } from 'lucide-react'

export default function Logo() {
  return (
    <div className="flex items-center gap-2 font-bold text-xl">
        <DatabaseIcon className="h-5 w-5 text-primary" />
        <span>BitQueue</span>
    </div>
  )
}
