import { useState, useMemo } from "react";
import type { Relationship } from "@/types";
import RelationshipBar from "@/components/relationship-bar/relationship-bar";
import InteractionModal from "@/components/interaction-modal/interaction-modal";
import EditRelationshipModal from "@/components/edit-relationship-modal/edit-relationship-modal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface RelationshipListProps {
	relationships: Relationship[];
	onInteraction: (id: number, interactionType: string) => void;
	onEdit: (id: number, name: string, type: Relationship["type"], maintenanceLevel: Relationship["maintenanceLevel"], imageUrl?: string) => void;
	isGrouped: boolean;
}

export default function RelationshipList({ relationships, onInteraction, onEdit, isGrouped }: RelationshipListProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(null);

	const handleOpenModal = (relationship: Relationship) => {
		setSelectedRelationship(relationship);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setSelectedRelationship(null);
	};

	const handleOpenEditModal = (relationship: Relationship) => {
		setSelectedRelationship(relationship);
		setEditModalOpen(true);
	};

	const handleCloseEditModal = () => {
		setEditModalOpen(false);
		setSelectedRelationship(null);
	};

	const handleInteraction = (interactionType: string) => {
		if (selectedRelationship) {
			onInteraction(selectedRelationship.id, interactionType);
		}
		handleCloseModal();
	};

	const handleEdit = (id: number, name: string, type: Relationship["type"], maintenanceLevel: Relationship["maintenanceLevel"], imageUrl?: string) => {
		onEdit(id, name, type, maintenanceLevel, imageUrl);
		handleCloseEditModal();
	};

	const groupedRelationships = useMemo(() => {
		const groups: Record<Relationship["type"], Relationship[]> = {
			family: [],
			significant_other: [],
			friend: [],
			acquaintance: [],
			colleague: [],
		};

		relationships.forEach((relationship) => {
			if (groups[relationship.type]) {
				groups[relationship.type].push(relationship);
			}
		});

		return groups;
	}, [relationships]);

	const categoryOrder: Relationship["type"][] = ["family", "significant_other", "friend", "acquaintance", "colleague"];

	if (!isGrouped) {
		return (
			<div className="space-y-4">
				{relationships.map((relationship) => (
					<RelationshipBar key={relationship.id} relationship={relationship} onInteraction={() => handleOpenModal(relationship)} onEdit={() => handleOpenEditModal(relationship)} />
				))}
				{selectedRelationship && (
					<>
						<InteractionModal isOpen={modalOpen} onClose={handleCloseModal} onInteraction={handleInteraction} relationshipName={selectedRelationship.name} />
						<EditRelationshipModal isOpen={editModalOpen} onClose={handleCloseEditModal} onEdit={handleEdit} relationship={selectedRelationship} />
					</>
				)}
			</div>
		);
	}

	return (
		<Accordion type="multiple" className="w-full">
			{categoryOrder.map((type) => (
				<AccordionItem value={type} key={type}>
					<AccordionTrigger className="text-lg font-semibold">{type.charAt(0).toUpperCase() + type.slice(1).replace("_", " ")}</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-4">
							{groupedRelationships[type].map((relationship) => (
								<RelationshipBar key={relationship.id} relationship={relationship} onInteraction={() => handleOpenModal(relationship)} onEdit={() => handleOpenEditModal(relationship)} />
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
			{selectedRelationship && (
				<>
					<InteractionModal isOpen={modalOpen} onClose={handleCloseModal} onInteraction={handleInteraction} relationshipName={selectedRelationship.name} />
					<EditRelationshipModal isOpen={editModalOpen} onClose={handleCloseEditModal} onEdit={handleEdit} relationship={selectedRelationship} />
				</>
			)}
		</Accordion>
	);
}
