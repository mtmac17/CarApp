'use server'

import { load } from 'cheerio'
import { Car } from '@/utils/carCalculations'

export async function scrapeAutoTraderLink(url: string): Promise<Car | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const html = await response.text()
    const $ = load(html)

    const title = $('h1[data-testid="listing-title"]').text().trim()
    const price = $('span[data-testid="listing-price-value"]').text().trim()
    const mileage = $('div.kms-odometer-value').text().trim()

    if (!title || !price || !mileage) {
      throw new Error('Failed to extract all required information')
    }

    const [year, make, model] = title.split(' ', 3)
    const trim = title.split(' ').slice(3).join(' ')

    return {
      make,
      model,
      trim,
      year: parseInt(year),
      price: parseInt(price.replace(/\D/g, '')),
      mileage: parseInt(mileage.replace(/\D/g, ''))
    }
  } catch (error) {
    console.error('Error scraping AutoTrader link:', error)
    return null
  }
}

