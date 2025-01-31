export interface Relationship {
    id: number
    name: string
    strength: number
    type: "family" | "significant_other" | "friend" | "acquaintance" | "colleague"
    imageUrl?: string
}

