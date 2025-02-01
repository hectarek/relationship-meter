import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDropzone } from "react-dropzone";
import type { Relationship } from "@/types";

interface EditRelationshipModalProps {
	isOpen: boolean;
	onClose: () => void;
	onEdit: (id: number, name: string, type: Relationship["type"], maintenanceLevel: Relationship["maintenanceLevel"], imageUrl?: string) => void;
	relationship: Relationship;
}

export default function EditRelationshipModal({ isOpen, onClose, onEdit, relationship }: EditRelationshipModalProps) {
	const [name, setName] = useState(relationship.name);
	const [type, setType] = useState<Relationship["type"]>(relationship.type);
	const [maintenanceLevel, setMaintenanceLevel] = useState<Relationship["maintenanceLevel"]>(relationship.maintenanceLevel);
	const [imageUrl, setImageUrl] = useState<string | undefined>(relationship.imageUrl);

	useEffect(() => {
		setName(relationship.name);
		setType(relationship.type);
		setMaintenanceLevel(relationship.maintenanceLevel);
		setImageUrl(relationship.imageUrl);
	}, [relationship]);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const file = acceptedFiles[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setImageUrl(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { "image/*": [] },
		maxFiles: 1,
	});

	const handleSubmit = () => {
		if (name.trim()) {
			onEdit(relationship.id, name.trim(), type, maintenanceLevel, imageUrl);
			onClose();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold">Edit Relationship</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div className="flex justify-center">
						<div {...getRootProps()} className={`cursor-pointer border-2 border-dashed rounded-lg p-4 transition-colors ${isDragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-900" : "border-gray-300 dark:border-gray-600"}`}>
							<input {...getInputProps()} />
							<div className="text-center">
								<Avatar className="w-24 h-24 mx-auto mb-4">
									<AvatarImage src={imageUrl} />
									<AvatarFallback>{name.charAt(0)}</AvatarFallback>
								</Avatar>
								{isDragActive ? <p className="text-sm">Drop the image here ...</p> : <p className="text-sm">Drag & drop an image here, or click to select one</p>}
							</div>
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="edit-name">Name</Label>
						<Input id="edit-name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="edit-type">Relationship Type</Label>
						<Select value={type} onValueChange={(value) => setType(value as Relationship["type"])}>
							<SelectTrigger id="edit-type">
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
						<Label htmlFor="edit-maintenance">Maintenance Level</Label>
						<Select value={maintenanceLevel} onValueChange={(value) => setMaintenanceLevel(value as Relationship["maintenanceLevel"])}>
							<SelectTrigger id="edit-maintenance">
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
						Save Changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
