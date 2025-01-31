import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SortFilterControlsProps {
  sortBy: string
  onSortChange: (value: string) => void
  filterText: string
  onFilterChange: (value: string) => void
}

export default function SortFilterControls({
  sortBy,
  onSortChange,
  filterText,
  onFilterChange,
}: SortFilterControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Label htmlFor="filter" className="mb-2 block">
          Filter Relationships
        </Label>
        <Input
          id="filter"
          placeholder="Search relationships..."
          value={filterText}
          onChange={(e) => onFilterChange(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <Label htmlFor="sort" className="mb-2 block">
          Sort By
        </Label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger id="sort">
            <SelectValue placeholder="Select sorting option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="strength">Strength</SelectItem>
            <SelectItem value="type">Type</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

