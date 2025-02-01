export interface Relationship {
    id: number
    name: string
    strength: number
    type: "family" | "significant_other" | "friend" | "acquaintance" | "colleague"
    maintenanceLevel: "low" | "medium" | "high"
    imageUrl?: string
}

