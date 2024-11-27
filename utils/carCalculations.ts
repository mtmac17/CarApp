export interface Car {
  make: string;
  model: string;
  trim: string;
  year: number;
  price: number;
  mileage: number;
}

export function calculateDepreciation(car: Car): number {
  // Assuming an average car loses 15-20% of its value each year
  const yearsOld = new Date().getFullYear() - car.year;
  const depreciation = car.price * Math.pow(0.82, yearsOld);
  return Number(depreciation.toFixed(2));
}

export function calculateDepreciationPerKm(car: Car): number {
  const depreciation = car.price - calculateDepreciation(car);
  return Number((depreciation / car.mileage).toFixed(4));
}

export function determineBetterDeal(cars: Car[]): Car {
  return cars.reduce((best, current) => {
    const bestDepPerKm = calculateDepreciationPerKm(best);
    const currentDepPerKm = calculateDepreciationPerKm(current);
    return currentDepPerKm < bestDepPerKm ? current : best;
  });
}

