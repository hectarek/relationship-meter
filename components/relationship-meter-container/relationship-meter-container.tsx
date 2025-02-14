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
import { calculateNewStrength } from "@/lib/utils"
import { calculateDrainRate } from "@/lib/utils"
import { initialRelationships } from "@/lib/data"

export default function RelationshipMeterContainer() {
  const [relationships, setRelationships] = useState<Relationship[]>(initialRelationships)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [filterText, setFilterText] = useState("")
  const [isGrouped, setIsGrouped] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setRelationships((prevRelationships) =>
        prevRelationships.map((relationship) => ({
          ...relationship,
          strength: Math.max(0, relationship.strength - calculateDrainRate(relationship)),
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

  const handleAddRelationship = (
    name: string,
    type: Relationship["type"],
    maintenanceLevel: Relationship["maintenanceLevel"],
  ) => {
    const newId = Math.max(...relationships.map((r) => r.id), 0) + 1
    setRelationships([...relationships, { id: newId, name, strength: 50, type, maintenanceLevel }])
    setIsAddModalOpen(false)
  }

  const handleEditRelationship = (
    id: number,
    name: string,
    type: Relationship["type"],
    maintenanceLevel: Relationship["maintenanceLevel"],
    imageUrl?: string,
  ) => {
    setRelationships((prevRelationships) =>
      prevRelationships.map((relationship) =>
        relationship.id === id ? { ...relationship, name, type, maintenanceLevel, imageUrl } : relationship,
      ),
    )
  }

  const filteredAndSortedRelationships = useMemo(() => {
    return relationships
      .filter((relationship) => relationship.name.toLowerCase().includes(filterText.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "name") {
          return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        } else if (sortBy === "strength") {
          return sortOrder === "asc" ? a.strength - b.strength : b.strength - a.strength
        }
        return 0
      })
  }, [relationships, filterText, sortBy, sortOrder])

  const handleSortChange = (newSortBy: string) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(newSortBy)
      setSortOrder("asc")
    }
  }

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
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          filterText={filterText}
          onFilterChange={setFilterText}
          isGrouped={isGrouped}
          onGroupToggle={() => setIsGrouped(!isGrouped)}
          sortOptions={[
            { value: "name", label: "Name" },
            { value: "strength", label: "Strength" },
          ]}
        />
        <RelationshipList
          relationships={filteredAndSortedRelationships}
          onInteraction={handleInteraction}
          onEdit={handleEditRelationship}
          isGrouped={isGrouped}
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

