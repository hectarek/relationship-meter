import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Users, Heart, User, UserPlus, Edit } from "lucide-react"
import type { Relationship } from "@/types"

interface RelationshipBarProps {
  relationship: Relationship
  onInteraction: () => void
  onEdit: () => void
}

export default function RelationshipBar({ relationship, onInteraction, onEdit }: RelationshipBarProps) {
  const getStatusColor = (strength: number) => {
    if (strength > 75) return "green"
    if (strength > 50) return "yellow"
    if (strength > 25) return "orange"
    return "red"
  }

  const getStatusText = (strength: number) => {
    if (strength > 66) return "Strong"
    if (strength > 33) return "Needs Attention"
    return "Fading"
  }

  const getRelationshipIcon = (type: Relationship["type"]) => {
    switch (type) {
      case "family":
        return <Users className="h-4 w-4" />
      case "significant_other":
        return <Heart className="h-4 w-4" />
      case "friend":
        return <User className="h-4 w-4" />
      case "acquaintance":
        return <UserPlus className="h-4 w-4" />
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-center">
          <Avatar className="w-12 h-12 mr-4">
            <AvatarImage src={relationship.imageUrl} />
            <AvatarFallback>{relationship.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-lg">{relationship.name}</span>
              <div className="flex items-center space-x-2">
                <Badge className="text-xs">
                  {getRelationshipIcon(relationship.type)}
                  <span className="ml-1">{getStatusText(relationship.strength)}</span>
                </Badge>
                <Button size="icon" onClick={onEdit} className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit relationship</span>
                </Button>
              </div>
            </div>
            <Progress
              value={relationship.strength}
              className="h-2 mb-2"
              variant={getStatusColor(relationship.strength)}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{Math.round(relationship.strength)}%</span>
              <Button size="sm" onClick={onInteraction}>
                <Plus className="mr-1 h-4 w-4" /> Interact
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

