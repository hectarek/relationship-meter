import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Relationship } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const INTERACTION_STRENGTH_INCREASE = {
  "Spent time together": 20,
  "Called them": 10,
  "Sent a message": 5,
}

// Base drain rate per second
const BASE_DRAIN_RATE = 0.001

// Multipliers for different relationship types
const TYPE_MULTIPLIERS: Record<Relationship["type"], number> = {
  family: 0.8,
  significant_other: 1.2,
  friend: 1.0,
  acquaintance: 0.6,
  colleague: 0.7,
}

// Multipliers for maintenance levels
const MAINTENANCE_MULTIPLIERS: Record<Relationship["maintenanceLevel"], number> = {
  low: 0.7,
  medium: 1.0,
  high: 1.3,
}

// Function to calculate time since last interaction (placeholder)
function getTimeSinceLastInteraction(relationship: Relationship): number {
  // This should be implemented based on your interaction tracking system
  // For now, we'll return a random number between 0 and 7 days in seconds
  return Math.random() * 7 * 24 * 60 * 60
}

// Function to calculate seasonal factor (placeholder)
function getSeasonalFactor(): number {
  // This could be based on the current month or special events
  // For now, we'll return a random number between 0.8 and 1.2
  return 0.8 + Math.random() * 0.4
}

export function calculateDrainRate(relationship: Relationship): number {
  const typeMultiplier = TYPE_MULTIPLIERS[relationship.type]
  const maintenanceMultiplier = MAINTENANCE_MULTIPLIERS[relationship.maintenanceLevel]
  const timeSinceLastInteraction = getTimeSinceLastInteraction(relationship)
  const seasonalFactor = getSeasonalFactor()

  // Calculate the drain rate
  let drainRate = BASE_DRAIN_RATE * typeMultiplier * maintenanceMultiplier

  // Adjust based on time since last interaction
  drainRate *= Math.log(timeSinceLastInteraction + 1) / Math.log(7 * 24 * 60 * 60 + 1)

  // Apply seasonal factor
  drainRate *= seasonalFactor

  // Adjust based on current strength (relationships with lower strength drain slower)
  drainRate *= (relationship.strength / 100) ** 0.5

  return drainRate
}

export function calculateNewStrength(currentStrength: number, interactionType: string): number {
  const increase = INTERACTION_STRENGTH_INCREASE[interactionType as keyof typeof INTERACTION_STRENGTH_INCREASE] || 0
  return Math.min(100, currentStrength + increase)
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
      return "Users"
    case "significant_other":
      return "Heart"
    case "friend":
      return "User"
    case "acquaintance":
      return "UserPlus"
    case "colleague":
      return "Briefcase"
  }
}

