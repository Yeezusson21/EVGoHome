// Mock cars data
export const mockCars = [
  {
    id: '1',
    year: '2023',
    make: 'Tesla',
    model: 'Model Y',
    imageUrl: 'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    year: '2023',
    make: 'Ford',
    model: 'Mustang Mach-E',
    imageUrl: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    year: '2022',
    make: 'Rivian',
    model: 'R1T',
    imageUrl: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// Mock chargers data
export const mockChargers = [
  {
    id: '1',
    name: 'Tesla Supercharger',
    address: '123 Main St, San Francisco, CA',
    description: 'High-speed Tesla Supercharger station with 8 charging stalls available. Open 24/7 with nearby amenities including restaurants and shopping.',
    speed: 'FAST' as const,
    kw: 250,
    isOnline: true,
    isAvailable: true,
    isUserOwned: false,
    price: {
      type: 'hourly' as const,
      amount: 0.39
    },
    compatibleWith: ['Tesla'],
    coordinates: {
      latitude: 37.786694,
      longitude: -122.440138
    },
    imageUrl: 'https://images.pexels.com/photos/3552085/pexels-photo-3552085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Community Charging Station',
    address: '456 Oak St, San Francisco, CA',
    description: 'Community charging station available to all EV types. Located in a safe, well-lit area with 24/7 access. Perfect for overnight charging.',
    speed: 'SLOW' as const,
    kw: 7.2,
    isOnline: true,
    isAvailable: false,
    isUserOwned: false,
    price: {
      type: 'hourly' as const,
      amount: 0.15
    },
    compatibleWith: ['All'],
    coordinates: {
      latitude: 37.785857,
      longitude: -122.436057
    },
    imageUrl: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: 'ElectrifyAmerica Station',
    address: '789 Pine St, San Francisco, CA',
    description: 'High-power DC fast charging station with multiple connectors including CCS and CHAdeMO. Suitable for most EV types.',
    speed: 'FAST' as const,
    kw: 150,
    isOnline: false,
    isAvailable: true,
    isUserOwned: false,
    price: {
      type: 'flat' as const,
      amount: 12.99
    },
    compatibleWith: ['Ford', 'Rivian', 'Volkswagen'],
    coordinates: {
      latitude: 37.790197,
      longitude: -122.425668
    },
    imageUrl: 'https://images.pexels.com/photos/10553533/pexels-photo-10553533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    name: 'Home EV Charger',
    address: '321 Maple Ave, San Francisco, CA',
    description: 'Private home charger available to the public during daytime hours. Level 2 charging for all EV types. Safe residential neighborhood.',
    speed: 'SLOW' as const,
    kw: 11,
    isOnline: true,
    isAvailable: true,
    isUserOwned: true,
    price: {
      type: 'hourly' as const,
      amount: 0.25
    },
    compatibleWith: ['All'],
    coordinates: {
      latitude: 37.779777,
      longitude: -122.419101
    },
    imageUrl: 'https://images.pexels.com/photos/16167815/pexels-photo-16167815/free-photo-of-charging-point-for-electric-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    name: 'City Center Fast Charger',
    address: '555 Market St, San Francisco, CA',
    description: 'Centrally located fast charger in downtown area. Ideal for quick top-ups during shopping or dining downtown.',
    speed: 'FAST' as const,
    kw: 100,
    isOnline: true,
    isAvailable: true,
    isUserOwned: false,
    price: {
      type: 'flat' as const,
      amount: 8.50
    },
    compatibleWith: ['All'],
    coordinates: {
      latitude: 37.794857,
      longitude: -122.431616
    },
    imageUrl: 'https://images.pexels.com/photos/6816814/pexels-photo-6816814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];