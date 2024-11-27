'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Car } from '@/utils/carCalculations'
import { scrapeAutoTraderLink } from '@/app/actions'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

interface CarFormProps {
  onAddCar: (car: Car) => void
}

export function CarForm({ onAddCar }: CarFormProps) {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const car = await scrapeAutoTraderLink(url)
      if (car) {
        onAddCar(car)
        setUrl('')
      } else {
        setError('Failed to extract car information. Please check the URL and try again.')
      }
    } catch (error) {
      console.error('Error adding car:', error)
      setError('An error occurred while adding the car. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="url">AutoTrader URL</Label>
        <Input 
          id="url" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="https://www.autotrader.ca/a/..."
          required 
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Add Car'}
      </Button>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </form>
  )
}

