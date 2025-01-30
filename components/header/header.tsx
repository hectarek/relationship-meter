import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function Header() {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Relationship Health Tracker
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

