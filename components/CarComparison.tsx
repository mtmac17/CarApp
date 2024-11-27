'use client'

import { useEffect, useState } from 'react'
import { Car, calculateDepreciation, calculateDepreciationPerKm, determineBetterDeal } from '@/utils/carCalculations'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CarComparisonProps {
  cars: Car[]
}

export function CarComparison({ cars }: CarComparisonProps) {
  const [betterDeal, setBetterDeal] = useState<Car | null>(null)

  useEffect(() => {
    if (cars.length > 1) {
      setBetterDeal(determineBetterDeal(cars))
    } else {
      setBetterDeal(null)
    }
  }, [cars])

  return (
    <div className="space-y-4">
      {cars.map((car, index) => (
        <Card key={index} className={betterDeal === car ? 'border-green-500' : ''}>
          <CardHeader>
            <CardTitle>{car.year} {car.make} {car.model} {car.trim}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Original Price: ${car.price.toLocaleString()}</p>
            <p>Mileage: {car.mileage.toLocaleString()} km</p>
            <p>Estimated Current Value: ${calculateDepreciation(car).toLocaleString()}</p>
            <p>Total Depreciation: ${(car.price - calculateDepreciation(car)).toLocaleString()}</p>
            <p>Depreciation per km: ${calculateDepreciationPerKm(car).toFixed(4)}</p>
          </CardContent>
        </Card>
      ))}
      {betterDeal && (
        <Card className="bg-green-100">
          <CardHeader>
            <CardTitle>Better Deal</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{betterDeal.year} {betterDeal.make} {betterDeal.model} {betterDeal.trim}</p>
            <p>Estimated Current Value: ${calculateDepreciation(betterDeal).toLocaleString()}</p>
            <p>Depreciation per km: ${calculateDepreciationPerKm(betterDeal).toFixed(4)}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

