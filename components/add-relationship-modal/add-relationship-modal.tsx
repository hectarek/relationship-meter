import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { Relationship } from "@/types"

interface AddRelationshipModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (name: string, type: Relationship["type"]) => void
}

export default function AddRelationshipModal({ isOpen, onClose, onAdd }: AddRelationshipModalProps) {
  const [name, setName] = useState("")
  const [type, setType] = useState<Relationship["type"]>("friend")

  const handleSubmit = () => {
    if (name.trim()) {
      onAdd(name.trim(), type)
      setName("")
      setType("friend")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-black">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bebas-neue">ADD NEW RELATIONSHIP</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-black"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Relationship Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as Relationship["type"])}>
              <SelectTrigger id="type" className="border-2 border-black">
                <SelectValue placeholder="Select relationship type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="significant_other">Significant Other</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
                <SelectItem value="acquaintance">Acquaintance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="border-2 border-black">
            CANCEL
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="bg-yellow-400 text-black border-2 border-black font-bold hover:bg-yellow-500"
          >
            ADD
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

