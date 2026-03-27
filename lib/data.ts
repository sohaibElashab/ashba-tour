import toursData from "@/data/tours.json";
import fleetData from "@/data/fleet.json";

export type Tour = {
  id: string;
  title: string;
  description: string;
  vehicleType: string;
  capacity: string;
  image: string;
  features: string;
  category: string;
  featured: boolean;
  slug: string;
  // French translations (optional, fallback to default)
  titleFr?: string;
  descriptionFr?: string;
  featuresFr?: string;
};

export type Vehicle = {
  id: string;
  model: string;
  places: number;
  status: string;
  price: string;
  luggage: string;
  images: string[];
  slug: string;
};

export const TOURS: Tour[] = toursData as Tour[];
export const FLEET: Vehicle[] = fleetData as Vehicle[];

export function getFeaturedTours() {
  return TOURS.filter((t) => t.featured).slice(0, 4);
}

export function getAllTours() {
  return TOURS;
}

export function getVehicleBySlug(slug: string) {
  return FLEET.find((v) => v.slug === slug);
}

export function getTourBySlug(slug: string) {
  return TOURS.find((t) => t.slug === slug);
}

export function getFleet() {
  return FLEET;
}

export function getTourCategories() {
  const categories = new Set<string>();
  categories.add("All");

  TOURS.forEach((tour) => {
    if (tour.category) {
      // Visualize categories cleanly
      // The excel might have raw values like "transfert vice-versa", "circuit", etc.
      // We can map them to nicer names if needed, or just use them as is.
      // For now, let's just capitalize them for display if they aren't already formatted
      const cat =
        tour.category.charAt(0).toUpperCase() + tour.category.slice(1);
      categories.add(cat);
    }
  });
  return Array.from(categories);
}
