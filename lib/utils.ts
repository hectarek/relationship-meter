import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Relationship } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const RELATIONSHIP_DRAIN_RATE = 0.1 // per second
export const INTERACTION_STRENGTH_INCREASE = {
  "Spent time together": 20,
  "Called them": 10,
  "Sent a message": 5
}

export function getStatusColor(strength: number): string {
  if (strength > 75) return "green"
  if (strength > 50) return "yellow"
  if (strength > 25) return "orange"
  return "red"
}

export function getStatusText(strength: number): string {
  if (strength > 66) return "Strong"
  if (strength > 33) return "Needs Attention"
  return "Fading"
}

export function getRelationshipIcon(type: Relationship["type"]): string {
  switch (type) {
    case "family":
      return "Users";
    case "significant_other":
      return "Heart";
    case "friend":
      return "User";
    case "acquaintance":
      return "UserPlus";
    default:
      return "User";
  }
}

export function calculateNewStrength(currentStrength: number, interactionType: string): number {
  const increase = INTERACTION_STRENGTH_INCREASE[interactionType as keyof typeof INTERACTION_STRENGTH_INCREASE] || 0
  return Math.min(100, currentStrength + increase)
}
