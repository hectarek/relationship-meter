import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Relationship } from "@/types";

interface AddRelationshipModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (name: string, type: Relationship["type"], maintenanceLevel: Relationship["maintenanceLevel"]) => void;
}

export default function AddRelationshipModal({ isOpen, onClose, onAdd }: AddRelationshipModalProps) {
	const [name, setName] = useState("");
	const [type, setType] = useState<Relationship["type"]>("friend");
	const [maintenanceLevel, setMaintenanceLevel] = useState<Relationship["maintenanceLevel"]>("medium");

	const handleSubmit = () => {
		if (name.trim()) {
			onAdd(name.trim(), type, maintenanceLevel);
			setName("");
			setType("friend");
			setMaintenanceLevel("medium");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold">Add New Relationship</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="type">Relationship Type</Label>
						<Select value={type} onValueChange={(value) => setType(value as Relationship["type"])}>
							<SelectTrigger id="type">
								<SelectValue placeholder="Select relationship type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="family">Family</SelectItem>
								<SelectItem value="significant_other">Significant Other</SelectItem>
								<SelectItem value="friend">Friend</SelectItem>
								<SelectItem value="acquaintance">Acquaintance</SelectItem>
								<SelectItem value="colleague">Colleague</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="maintenance">Maintenance Level</Label>
						<Select value={maintenanceLevel} onValueChange={(value) => setMaintenanceLevel(value as Relationship["maintenanceLevel"])}>
							<SelectTrigger id="maintenance">
								<SelectValue placeholder="Select maintenance level" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="low">Low</SelectItem>
								<SelectItem value="medium">Medium</SelectItem>
								<SelectItem value="high">High</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={!name.trim()}>
						Add
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
