export enum VehicleStatus {
  AVAILABLE = "AVAILABLE",
  IN_USE = "IN_USE",
  MANTAINANCE = "MANTAINANCE",
  OUT_OF_SERVICE = "OUT_OF_SERVICE",
}

export enum RideStatus {
  REQUESTED,
  IN_PROGRESS,
  COMPLETED,
  CANCELLED,
}

export interface Vehicle {
  vehicleId: string;
  manufacturer: string;
  model: string;
  licensePlate: string;
  year: number;
  batteryLevel: number;
  vehicleImage: string;
  vehicleStatus: VehicleStatus;
}

export interface Ride {
  rideId: string;
  rideName: string;
  rideDescription: string;
  ridePrice: number;
  rideStatus: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export interface ActiveRide {
  rideId: string;

  rideName: string;

  rideDescription: string;

  ridePrice: number;

  rideStatus: string;

  location: {
    address: string;

    latitude: number;

    longitude: number;
  };

  vehicle: {
    manufacturer: string;

    model: string;

    licensePlate: string;

    batteryLevel: number;

    vehicleStatus: string;
  };

  user: {
    username: string;

    email: string;
  };
}

//example api for testing purposes
export interface Recipe {
  id: number;
  title: string;
  course: string;
  cuisine: string;
  mainIngredient: string;
  description: string;
  source: string;
  url: string;
  urlHost: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  yield: number;
  ingredients: string;
  directions: string;
  tags: string;
  rating: string;
  publicUrl: string;
  photoUrl: string;
  private: string;
  nutritionalScoreGeneric: string;
  calories: number;
  fat: string;
  cholesterol: string;
  sodium: string;
  sugar: string;
  carbohydrate: string;
  fiber: string;
  protein: string;
  cost: string;
}
