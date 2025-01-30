import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Users, Heart, User, UserPlus } from "lucide-react"
import type { Relationship } from "@/types"

interface RelationshipBarProps {
  relationship: Relationship
  onInteraction: () => void
}

export default function RelationshipBar({ relationship, onInteraction }: RelationshipBarProps) {
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

  const getRelationshipLabel = (type: Relationship["type"]) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace("_", " ")
  }

  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 relative">
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${relationship.name}`} />
              <AvatarFallback>{relationship.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Badge className="absolute -top-2 -right-2 px-2 py-1">
              {getRelationshipIcon(relationship.type)}
              <span className="sr-only">{getRelationshipLabel(relationship.type)}</span>
            </Badge>
          </div>
          <div className="flex-grow w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-2">
              <span className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1 sm:mb-0">
                {relationship.name}
              </span>
              <span className="text-sm">{getStatusText(relationship.strength)}</span>
            </div>
            <Progress value={relationship.strength} className="w-full h-4" variant={`${getStatusColor(relationship.strength)}`} />
            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {Math.round(relationship.strength)}%
              </span>
              <Button size="sm" onClick={onInteraction} variant="default">
                <Plus className="mr-1 h-4 w-4" /> Add Interaction
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

