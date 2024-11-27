'use client'

import { useState } from 'react'
import { CarForm } from '@/components/CarForm'
import { CarComparison } from '@/components/CarComparison'
import { Car } from '@/utils/carCalculations'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export default function Home() {
  const [cars, setCars] = useState<Car[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleAddCar = (car: Car) => {
    setCars(prev => [...prev, car])
    setError(null)
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Used Car Comparison Tool</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add a Car</h2>
          <p className="mb-4">
            Enter an AutoTrader.ca URL to add a car to the comparison. Make sure to use the full URL of a specific car listing.
          </p>
          <p className="mb-4">
            Example: https://www.autotrader.ca/a/honda/odyssey/oakville/ontario/5_63911331_on20071119105019764
          </p>
          <CarForm onAddCar={handleAddCar} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Car Comparison</h2>
          {cars.length === 0 ? (
            <p>No cars added yet. Use the form on the left to add cars for comparison.</p>
          ) : (
            <CarComparison cars={cars} />
          )}
        </div>
      </div>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </main>
  )
}

