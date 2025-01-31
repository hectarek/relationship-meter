import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Phone, MessageCircle } from "lucide-react"

interface InteractionModalProps {
  isOpen: boolean
  onClose: () => void
  onInteraction: (activityType: string) => void
  relationshipName: string
}

export default function InteractionModal({ isOpen, onClose, onInteraction, relationshipName }: InteractionModalProps) {
  const [activityType, setActivityType] = useState("")
  const [note, setNote] = useState("")

  const handleSubmit = () => {
    if (activityType) {
      onInteraction(activityType)
      setActivityType("")
      setNote("")
    }
  }

  const activityIcons = {
    "Spent time together": Heart,
    "Called them": Phone,
    "Sent a message": MessageCircle,
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add Interaction with {relationshipName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select value={activityType} onValueChange={setActivityType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select activity type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(activityIcons).map(([activity, Icon]) => (
                <SelectItem key={activity} value={activity} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{activity}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Add an optional note about the interaction"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="neutral">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!activityType}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

