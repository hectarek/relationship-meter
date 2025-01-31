import { useState } from "react"
import type { Relationship } from "@/types"
import RelationshipBar from "@/components/relationship-bar/relationship-bar"
import InteractionModal from "@/components/interaction-modal/interaction-modal"
import EditRelationshipModal from "@/components/edit-relationship-modal/edit-relationship-modal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface RelationshipListProps {
  relationships: Relationship[]
  onInteraction: (id: number, amount: number) => void
  onEdit: (id: number, name: string, type: Relationship["type"], imageUrl?: string) => void
}

export default function RelationshipList({ relationships, onInteraction, onEdit }: RelationshipListProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(null)

  const handleOpenModal = (relationship: Relationship) => {
    setSelectedRelationship(relationship)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedRelationship(null)
  }

  const handleOpenEditModal = (relationship: Relationship) => {
    setSelectedRelationship(relationship)
    setEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setEditModalOpen(false)
    setSelectedRelationship(null)
  }

  const handleInteraction = (activityType: string) => {
    if (selectedRelationship) {
      const amount = activityType === "Spent time together" ? 20 : 10
      onInteraction(selectedRelationship.id, amount)
    }
    handleCloseModal()
  }

  const handleEdit = (id: number, name: string, type: Relationship["type"], imageUrl?: string) => {
    onEdit(id, name, type, imageUrl)
    handleCloseEditModal()
  }

  const groupedRelationships = relationships.reduce(
    (acc, relationship) => {
      if (!acc[relationship.type]) {
        acc[relationship.type] = []
      }
      acc[relationship.type].push(relationship)
      return acc
    },
    {} as Record<Relationship["type"], Relationship[]>,
  )

  return (
    <Accordion type="multiple" className="w-full">
      {Object.entries(groupedRelationships).map(([type, relations]) => (
        <AccordionItem value={type} key={type}>
          <AccordionTrigger className="text-lg font-semibold">
            {type.charAt(0).toUpperCase() + type.slice(1).replace("_", " ")}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {relations.map((relationship) => (
                <RelationshipBar
                  key={relationship.id}
                  relationship={relationship}
                  onInteraction={() => handleOpenModal(relationship)}
                  onEdit={() => handleOpenEditModal(relationship)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
      {selectedRelationship && (
        <>
          <InteractionModal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            onInteraction={handleInteraction}
            relationshipName={selectedRelationship.name}
          />
          <EditRelationshipModal
            isOpen={editModalOpen}
            onClose={handleCloseEditModal}
            onEdit={handleEdit}
            relationship={selectedRelationship}
          />
        </>
      )}
    </Accordion>
  )
}

