import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Users, Heart, User, UserPlus, Briefcase, Edit, Wrench } from "lucide-react"
import type { Relationship } from "@/types"
import { getStatusColor, getStatusText, getRelationshipIcon } from "@/lib/utils"

interface RelationshipBarProps {
  relationship: Relationship
  onInteraction: () => void
  onEdit: () => void
}

export default function RelationshipBar({ relationship, onInteraction, onEdit }: RelationshipBarProps) {
  const IconComponent =
    {
      Users,
      Heart,
      User,
      UserPlus,
      Briefcase,
    }[getRelationshipIcon(relationship.type)] || Users

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
                  <IconComponent className="h-4 w-4 mr-1" />
                  <span>{relationship.type.replace("_", " ")}</span>
                </Badge>
                <Badge className="text-xs">
                  <Wrench className="h-4 w-4 mr-1" />
                  <span>{relationship.maintenanceLevel}</span>
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
              variant={getStatusColor(relationship.strength) as "default" | "green" | "yellow" | "orange" | "red"}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{Math.round(relationship.strength)}%</span>
                <span className="text-sm text-muted-foreground">({getStatusText(relationship.strength)})</span>
              </div>
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

