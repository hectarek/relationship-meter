"use client"

import { useState, useEffect, useMemo } from "react"
import type { Relationship } from "@/types"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle/theme-toggle"
import Header from "@/components/header/header"
import RelationshipList from "@/components/relationship-list/relationship-list"
import AddRelationshipModal from "@/components/add-relationship-modal/add-relationship-modal"
import SortFilterControls from "@/components/sort-filter-controls/sort-filter-controls"
import { RELATIONSHIP_DRAIN_RATE, calculateNewStrength } from "@/lib/utils"
import { initialRelationships } from "@/lib/data"

export default function RelationshipMeterContainer() {
  const [relationships, setRelationships] = useState<Relationship[]>(initialRelationships)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState("name")
  const [filterText, setFilterText] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setRelationships((prevRelationships) =>
        prevRelationships.map((relationship) => ({
          ...relationship,
          strength: Math.max(0, relationship.strength - RELATIONSHIP_DRAIN_RATE),
        })),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleInteraction = (id: number, interactionType: string) => {
    setRelationships((prevRelationships) =>
      prevRelationships.map((relationship) =>
        relationship.id === id
          ? { ...relationship, strength: calculateNewStrength(relationship.strength, interactionType) }
          : relationship,
      ),
    )
  }

  const handleAddRelationship = (name: string, type: Relationship["type"]) => {
    const newId = Math.max(...relationships.map((r) => r.id), 0) + 1
    setRelationships([...relationships, { id: newId, name, strength: 50, type }])
    setIsAddModalOpen(false)
  }

  const handleEditRelationship = (id: number, name: string, type: Relationship["type"], imageUrl?: string) => {
    setRelationships((prevRelationships) =>
      prevRelationships.map((relationship) =>
        relationship.id === id ? { ...relationship, name, type, imageUrl } : relationship,
      ),
    )
  }

  const filteredAndSortedRelationships = useMemo(() => {
    return relationships
      .filter((relationship) => relationship.name.toLowerCase().includes(filterText.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name)
        } else if (sortBy === "strength") {
          return b.strength - a.strength
        } else if (sortBy === "type") {
          return a.type.localeCompare(b.type)
        }
        return 0
      })
  }, [relationships, filterText, sortBy])

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="max-w-3xl mx-auto">
        <Header />
        <div className="mb-4 flex justify-end">
          <Button onClick={() => setIsAddModalOpen(true)} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Relationship
          </Button>
        </div>
        <SortFilterControls
          sortBy={sortBy}
          onSortChange={setSortBy}
          filterText={filterText}
          onFilterChange={setFilterText}
        />
        <RelationshipList
          relationships={filteredAndSortedRelationships}
          onInteraction={handleInteraction}
          onEdit={handleEditRelationship}
        />
      </div>
      <AddRelationshipModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddRelationship}
      />
    </div>
  )
}

