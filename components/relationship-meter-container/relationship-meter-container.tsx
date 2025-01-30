"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import type { Relationship } from "@/types"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import ThemeToggle from "../theme-toggle/theme-toggle"
import Header from "../header/header"
import RelationshipList from "../relationship-list/relationship-list"
import AddRelationshipModal from "../add-relationship-modal/add-relationship-modal"

export default function RelationshipMeterContainer() {
  const [relationships, setRelationships] = useState<Relationship[]>([
    { id: 1, name: "Mom", strength: 100, type: "family" },
    { id: 2, name: "John (Best Friend)", strength: 85, type: "friend" },
    { id: 3, name: "Sarah (Colleague)", strength: 70, type: "acquaintance" },
    { id: 4, name: "Partner", strength: 95, type: "significant_other" },
  ])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setRelationships((prevRelationships) =>
        prevRelationships.map((relationship) => ({
          ...relationship,
          strength: Math.max(0, relationship.strength - 0.1),
        })),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleInteraction = (id: number, amount: number) => {
    setRelationships((prevRelationships) =>
      prevRelationships.map((relationship) =>
        relationship.id === id
          ? { ...relationship, strength: Math.min(100, relationship.strength + amount) }
          : relationship,
      ),
    )
  }

  const handleAddRelationship = (name: string, type: Relationship["type"]) => {
    const newId = Math.max(...relationships.map((r) => r.id), 0) + 1
    setRelationships([...relationships, { id: newId, name, strength: 50, type }])
    setIsAddModalOpen(false)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
          <RelationshipList relationships={relationships} onInteraction={handleInteraction} />
        </div>
        <AddRelationshipModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddRelationship}
        />
      </div>
    </ThemeProvider>
  )
}

