import { useState } from "react"
import type { Relationship } from "@/types"
import RelationshipBar from "../relationship-bar/relationship-bar"
import InteractionModal from "../interaction-modal/interaction-modal"

interface RelationshipListProps {
  relationships: Relationship[]
  onInteraction: (id: number, amount: number) => void
}

export default function RelationshipList({ relationships, onInteraction }: RelationshipListProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(null)

  const handleOpenModal = (relationship: Relationship) => {
    setSelectedRelationship(relationship)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedRelationship(null)
  }

  const handleInteraction = (activityType: string) => {
    if (selectedRelationship) {
      const amount = activityType === "Spent time together" ? 20 : 10
      onInteraction(selectedRelationship.id, amount)
    }
    handleCloseModal()
  }

  return (
    <div className="space-y-4">
      {relationships.map((relationship) => (
        <RelationshipBar
          key={relationship.id}
          relationship={relationship}
          onInteraction={() => handleOpenModal(relationship)}
        />
      ))}
      {selectedRelationship && (
        <InteractionModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onInteraction={handleInteraction}
          relationshipName={selectedRelationship.name}
        />
      )}
    </div>
  )
}

