export interface Theater {
  id: number;
  name: string;
  area: string;
  distance: string;
  amenities: string[];
  screens: number;
  rating: number;
  coords: { lat: number; lng: number };
}

export const theaters: Theater[] = [
  { id: 1, name: "PVR Cinemas – Inorbit Mall", area: "Madhapur, Hyderabad", distance: "2.1 km", amenities: ["Dolby Atmos", "4K Laser", "Recliner Seats", "F&B"], screens: 8, rating: 4.5, coords: { lat: 17.4341, lng: 78.3837 } },
  { id: 2, name: "IMAX at AMB Cinemas", area: "Financial District, Nanakramguda", distance: "3.8 km", amenities: ["IMAX", "Dolby 7.1", "Premium Lounger", "Valet Parking"], screens: 5, rating: 4.8, coords: { lat: 17.4138, lng: 78.3526 } },
  { id: 3, name: "Prasads Multiplex", area: "NTR Marg, Tank Bund, Hyderabad", distance: "7.2 km", amenities: ["IMAX", "4DX", "3D", "Food Court", "Iconic Venue"], screens: 10, rating: 4.6, coords: { lat: 17.4062, lng: 78.4777 } },
  { id: 4, name: "Cinepolis – Nexus Hyderabad", area: "Kukatpally, Hyderabad", distance: "6.5 km", amenities: ["VIP Recliners", "Dolby Atmos", "Macro XE"], screens: 7, rating: 4.3, coords: { lat: 17.4948, lng: 78.3996 } },
  { id: 5, name: "Asian Sudarshan", area: "SP Road, Secunderabad", distance: "9.1 km", amenities: ["2D", "3D", "Affordable"], screens: 4, rating: 3.9, coords: { lat: 17.4399, lng: 78.4983 } },
  { id: 6, name: "Devi 70MM", area: "Ameerpet, Hyderabad", distance: "5.3 km", amenities: ["70MM Screen", "Surround Sound", "Classic Cinema"], screens: 3, rating: 4.1, coords: { lat: 17.4374, lng: 78.4487 } },
  { id: 7, name: "PVR – Irrum Manzil", area: "Punjagutta, Hyderabad", distance: "4.8 km", amenities: ["Dolby Atmos", "LUXE Recliners", "VVIP Lounge"], screens: 6, rating: 4.4, coords: { lat: 17.4218, lng: 78.4513 } },
  { id: 8, name: "Bhramaramba Cineplex", area: "LB Nagar, Hyderabad", distance: "12.4 km", amenities: ["2D", "3D", "Budget Friendly"], screens: 3, rating: 3.7, coords: { lat: 17.3484, lng: 78.5541 } },
];

export const showtimes = {
  regular2D: ["09:30", "12:00", "15:00", "18:30", "21:00", "23:30"],
  premium3D: ["10:30", "13:30", "16:30", "20:00", "22:30"],
  imax: ["11:00", "14:30", "18:00", "21:30"],
  "4dx": ["12:30", "16:00", "19:30"],
};
