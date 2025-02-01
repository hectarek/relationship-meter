import type { Relationship } from "@/types"

export const initialRelationships: Relationship[] = [
    { id: 1, name: "Mom", strength: 100, type: "family", maintenanceLevel: "medium" },
    { id: 2, name: "John (Best Friend)", strength: 85, type: "friend", maintenanceLevel: "low" },
    { id: 3, name: "Sarah (Colleague)", strength: 70, type: "acquaintance", maintenanceLevel: "medium" },
    { id: 4, name: "Partner", strength: 95, type: "significant_other", maintenanceLevel: "medium" },
    { id: 5, name: "Dad", strength: 98, type: "family", maintenanceLevel: "medium" },
    { id: 6, name: "Emily (Sister)", strength: 90, type: "family", maintenanceLevel: "high" },
    { id: 7, name: "David (Old Friend)", strength: 60, type: "friend", maintenanceLevel: "medium" },
    { id: 8, name: "Michael (Gym Buddy)", strength: 50, type: "acquaintance", maintenanceLevel: "medium" },
    { id: 9, name: "Jessica (Work Friend)", strength: 75, type: "colleague", maintenanceLevel: "medium" },
    { id: 10, name: "Boss", strength: 65, type: "colleague", maintenanceLevel: "medium" },
    { id: 11, name: "Neighbor (Mrs. Johnson)", strength: 40, type: "acquaintance", maintenanceLevel: "low" },
    { id: 12, name: "Uncle Bob", strength: 80, type: "family", maintenanceLevel: "low" },
    { id: 13, name: "Aunt Lisa", strength: 78, type: "family", maintenanceLevel: "medium" },
    { id: 14, name: "Cousin Jake", strength: 55, type: "family", maintenanceLevel: "low" },
    { id: 15, name: "Tom (Gaming Buddy)", strength: 68, type: "friend", maintenanceLevel: "high" },
  ];