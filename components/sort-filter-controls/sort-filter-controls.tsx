import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface SortFilterControlsProps {
	sortBy: string;
	sortOrder: "asc" | "desc";
	onSortChange: (value: string) => void;
	filterText: string;
	onFilterChange: (value: string) => void;
	sortOptions: { value: string; label: string }[];
	isGrouped: boolean;
	onGroupToggle: () => void;
}

export default function SortFilterControls({ sortBy, sortOrder, onSortChange, filterText, onFilterChange, sortOptions, isGrouped, onGroupToggle }: SortFilterControlsProps) {
	return (
		<div className="flex flex-col sm:flex-row gap-4 mb-6">
			<div className="flex-1">
				<Label htmlFor="filter" className="mb-2 block">
					Filter Relationships
				</Label>
				<Input id="filter" placeholder="Search relationships..." value={filterText} onChange={(e) => onFilterChange(e.target.value)} />
			</div>
			<div className="flex-1">
				<Label htmlFor="sort" className="mb-2 block">
					Sort By
				</Label>
				<div className="flex items-center">
					<Select value={sortBy} onValueChange={onSortChange}>
						<SelectTrigger id="sort">
							<SelectValue placeholder="Select sorting option" />
						</SelectTrigger>
						<SelectContent>
							{sortOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button size="icon" onClick={() => onSortChange(sortBy)} className="ml-2">
						<ArrowUpDown className={`h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
					</Button>
				</div>
			</div>
			<div className="flex-1 flex flex-col justify-center">
				<Label htmlFor="group-toggle" className="mb-2 block">
					Group by Type
				</Label>
				<div className="flex items-center h-10">
					<Switch id="group-toggle" checked={isGrouped} onCheckedChange={onGroupToggle} />
					<span className="ml-2 text-sm">{isGrouped ? "Grouped" : "Ungrouped"}</span>
				</div>
			</div>
		</div>
	);
}
