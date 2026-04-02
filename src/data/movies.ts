import baahubali1Poster from "@/assets/posters/baahubali1.png";
import baahubali2Poster from "@/assets/posters/baahubali2.png";
import dhruva1Poster from "@/assets/posters/dhruva1.png";
import kalkiPoster from "@/assets/posters/kalki.png";
import pushpa2Poster from "@/assets/posters/pushpa2.png";
import devaraPoster from "@/assets/posters/devara.png";
import gunturPoster from "@/assets/posters/guntur.png";
import jawanPoster from "@/assets/posters/jawan.png";
import animalPoster from "@/assets/posters/animal.png";
import dune2Poster from "@/assets/posters/dune2.png";

export interface CastMember {
  name: string;
  role: string;
  avatar: string;
}

export interface Movie {
  id: number;
  title: string;
  language: string;
  genre: string[];
  rating: number | null;
  votes: string;
  duration: string;
  formats: string[];
  price: number;
  currency: string;
  poster: string;
  hero: string;
  certificate: string;
  releaseYear: number;
  description: string;
  director: string;
  cast: CastMember[];
  nowShowing: boolean;
  trending: boolean;
  comingSoon: boolean;
}

export const movies: Movie[] = [
  {
    id: 1, title: "Baahubali: The Beginning", language: "Telugu",
    genre: ["Action", "Epic", "Drama"], rating: 8.0, votes: "312K",
    duration: "159 min", formats: ["2D", "3D", "IMAX"], price: 180, currency: "₹",
    poster: baahubali1Poster,
    hero: baahubali1Poster,
    certificate: "U/A", releaseYear: 2015,
    description: "A young man is raised by a tribe and sets out to discover his true origins, fighting against a tyrannical king in the magnificent Mahishmati Kingdom.",
    director: "S.S. Rajamouli",
    cast: [
      { name: "Prabhas", role: "Baahubali / Shivudu", avatar: "https://picsum.photos/seed/prabhas/80/80" },
      { name: "Rana Daggubati", role: "Bhallaladeva", avatar: "https://picsum.photos/seed/rana/80/80" },
      { name: "Anushka Shetty", role: "Devasena", avatar: "https://picsum.photos/seed/anushka/80/80" },
      { name: "Tamannaah", role: "Avanthika", avatar: "https://picsum.photos/seed/taman/80/80" },
    ],
    nowShowing: true, trending: true, comingSoon: false,
  },
  {
    id: 2, title: "Baahubali 2: The Conclusion", language: "Telugu",
    genre: ["Action", "Epic", "Drama"], rating: 8.7, votes: "489K",
    duration: "167 min", formats: ["2D", "3D", "IMAX"], price: 200, currency: "₹",
    poster: baahubali2Poster,
    hero: baahubali2Poster,
    certificate: "U/A", releaseYear: 2017,
    description: "When Mahendra, son of Baahubali, learns about his heritage, a story of love, valour and betrayal is revealed.",
    director: "S.S. Rajamouli",
    cast: [
      { name: "Prabhas", role: "Baahubali / Mahendra", avatar: "https://picsum.photos/seed/prabhas/80/80" },
      { name: "Rana Daggubati", role: "Bhallaladeva", avatar: "https://picsum.photos/seed/rana/80/80" },
      { name: "Anushka Shetty", role: "Devasena", avatar: "https://picsum.photos/seed/anushka/80/80" },
      { name: "Sathyaraj", role: "Kattappa", avatar: "https://picsum.photos/seed/sathy/80/80" },
    ],
    nowShowing: true, trending: true, comingSoon: false,
  },
  {
    id: 3, title: "Dhruva Natchathiram", language: "Telugu",
    genre: ["Action", "Thriller", "Spy"], rating: 8.2, votes: "198K",
    duration: "158 min", formats: ["2D", "IMAX"], price: 160, currency: "₹",
    poster: dhruva1Poster,
    hero: dhruva1Poster,
    certificate: "A", releaseYear: 2023,
    description: "An elite RAW agent goes deep undercover into a deadly international crime syndicate.",
    director: "Gautham Vasudev Menon",
    cast: [
      { name: "Chiyaan Vikram", role: "Dhruva", avatar: "https://picsum.photos/seed/vikram/80/80" },
      { name: "Ritu Varma", role: "Aishwarya", avatar: "https://picsum.photos/seed/ritu/80/80" },
      { name: "Aishwarya Rajesh", role: "Meera", avatar: "https://picsum.photos/seed/aish/80/80" },
    ],
    nowShowing: true, trending: false, comingSoon: false,
  },
  {
    id: 4, title: "Dhruva 2: Nemesis", language: "Telugu",
    genre: ["Action", "Spy", "Thriller"], rating: 8.5, votes: "87K",
    duration: "162 min", formats: ["2D", "3D", "IMAX"], price: 220, currency: "₹",
    poster: dhruva1Poster,
    hero: dhruva1Poster,
    certificate: "A", releaseYear: 2024,
    description: "Dhruva returns for one final mission — a globe-trotting pursuit of a shadowy arms dealer.",
    director: "Gautham Vasudev Menon",
    cast: [
      { name: "Chiyaan Vikram", role: "Dhruva", avatar: "https://picsum.photos/seed/vikram/80/80" },
      { name: "Samantha Ruth Prabhu", role: "Zara", avatar: "https://picsum.photos/seed/samantha/80/80" },
      { name: "Fahadh Faasil", role: "Viktor", avatar: "https://picsum.photos/seed/fahad/80/80" },
    ],
    nowShowing: true, trending: true, comingSoon: false,
  },
  {
    id: 5, title: "Kalki 2898 AD", language: "Telugu",
    genre: ["Sci-Fi", "Action", "Mythology"], rating: 8.3, votes: "342K",
    duration: "181 min", formats: ["2D", "3D", "IMAX"], price: 250, currency: "₹",
    poster: kalkiPoster,
    hero: kalkiPoster,
    certificate: "U/A", releaseYear: 2024,
    description: "Set in a dystopian future, a warrior emerges as the prophesied Kalki avatar to battle evil.",
    director: "Nag Ashwin",
    cast: [
      { name: "Prabhas", role: "Bhairava / Kalki", avatar: "https://picsum.photos/seed/prabhas/80/80" },
      { name: "Deepika Padukone", role: "Sumathi", avatar: "https://picsum.photos/seed/deepika/80/80" },
      { name: "Amitabh Bachchan", role: "Ashwatthama", avatar: "https://picsum.photos/seed/amitabh/80/80" },
      { name: "Kamal Haasan", role: "Supreme Yaskin", avatar: "https://picsum.photos/seed/kamal/80/80" },
    ],
    nowShowing: true, trending: true, comingSoon: false,
  },
  {
    id: 6, title: "Pushpa 2: The Rule", language: "Telugu",
    genre: ["Action", "Drama", "Crime"], rating: 8.0, votes: "276K",
    duration: "190 min", formats: ["2D", "3D"], price: 200, currency: "₹",
    poster: pushpa2Poster,
    hero: pushpa2Poster,
    certificate: "A", releaseYear: 2024,
    description: "Pushpa Raj expands his red sandalwood smuggling empire while facing a nemesis cop.",
    director: "Sukumar",
    cast: [
      { name: "Allu Arjun", role: "Pushpa Raj", avatar: "https://picsum.photos/seed/allu/80/80" },
      { name: "Rashmika Mandanna", role: "Srivalli", avatar: "https://picsum.photos/seed/rashmika/80/80" },
      { name: "Fahadh Faasil", role: "Bhanwar Singh Shekawat", avatar: "https://picsum.photos/seed/fahad/80/80" },
    ],
    nowShowing: true, trending: true, comingSoon: false,
  },
  {
    id: 7, title: "Devara: Part 1", language: "Telugu",
    genre: ["Action", "Drama", "Thriller"], rating: 7.6, votes: "154K",
    duration: "166 min", formats: ["2D", "3D"], price: 180, currency: "₹",
    poster: devaraPoster,
    hero: devaraPoster,
    certificate: "U/A", releaseYear: 2024,
    description: "A feared ruler of the seas and his timid son face enemies across two timelines.",
    director: "Koratala Siva",
    cast: [
      { name: "Jr. NTR", role: "Devara / Vara", avatar: "https://picsum.photos/seed/ntr/80/80" },
      { name: "Janhvi Kapoor", role: "Thangam", avatar: "https://picsum.photos/seed/janhvi/80/80" },
      { name: "Saif Ali Khan", role: "Bhaira", avatar: "https://picsum.photos/seed/saif/80/80" },
    ],
    nowShowing: true, trending: false, comingSoon: false,
  },
  {
    id: 8, title: "Guntur Kaaram", language: "Telugu",
    genre: ["Drama", "Family", "Emotional"], rating: 7.1, votes: "89K",
    duration: "153 min", formats: ["2D"], price: 150, currency: "₹",
    poster: gunturPoster,
    hero: gunturPoster,
    certificate: "U/A", releaseYear: 2024,
    description: "A mother-son story of ego, separation and reconciliation set against Guntur's vibrant culture.",
    director: "Trivikram Srinivas",
    cast: [
      { name: "Mahesh Babu", role: "Ramana", avatar: "https://picsum.photos/seed/mahesh/80/80" },
      { name: "Sreeleela", role: "Haarika", avatar: "https://picsum.photos/seed/sreeleela/80/80" },
      { name: "Ramya Krishnan", role: "Rajeswari", avatar: "https://picsum.photos/seed/ramya/80/80" },
    ],
    nowShowing: false, trending: false, comingSoon: false,
  },
  {
    id: 9, title: "Jawan", language: "Hindi",
    genre: ["Action", "Thriller"], rating: 7.9, votes: "203K",
    duration: "169 min", formats: ["2D", "3D"], price: 200, currency: "₹",
    poster: jawanPoster,
    hero: jawanPoster,
    certificate: "UA", releaseYear: 2023,
    description: "A prison warden recruits inmates to pull off heists while seeking justice.",
    director: "Atlee",
    cast: [
      { name: "Shah Rukh Khan", role: "Vikram Rathore / Azad", avatar: "https://picsum.photos/seed/srk/80/80" },
      { name: "Nayanthara", role: "Narmada", avatar: "https://picsum.photos/seed/nayanth/80/80" },
      { name: "Vijay Sethupathi", role: "Kalee", avatar: "https://picsum.photos/seed/vijays/80/80" },
    ],
    nowShowing: true, trending: true, comingSoon: false,
  },
  {
    id: 10, title: "Animal", language: "Hindi",
    genre: ["Action", "Drama", "Crime"], rating: 7.2, votes: "178K",
    duration: "201 min", formats: ["2D"], price: 180, currency: "₹",
    poster: animalPoster,
    hero: animalPoster,
    certificate: "A", releaseYear: 2023,
    description: "A man's obsessive love for his father drives him to become ruthless.",
    director: "Sandeep Reddy Vanga",
    cast: [
      { name: "Ranbir Kapoor", role: "Ranvijay", avatar: "https://picsum.photos/seed/ranbir/80/80" },
      { name: "Rashmika Mandanna", role: "Geetanjali", avatar: "https://picsum.photos/seed/rashmika/80/80" },
      { name: "Anil Kapoor", role: "Balbir Singh", avatar: "https://picsum.photos/seed/anil/80/80" },
    ],
    nowShowing: true, trending: false, comingSoon: false,
  },
  {
    id: 11, title: "Dune: Part Two", language: "English",
    genre: ["Sci-Fi", "Adventure"], rating: 8.8, votes: "312K",
    duration: "166 min", formats: ["2D", "IMAX", "3D"], price: 350, currency: "₹",
    poster: dune2Poster,
    hero: dune2Poster,
    certificate: "UA", releaseYear: 2024,
    description: "Paul Atreides unites with the Fremen while seeking revenge against conspirators.",
    director: "Denis Villeneuve",
    cast: [
      { name: "Timothée Chalamet", role: "Paul Atreides", avatar: "https://picsum.photos/seed/timothe/80/80" },
      { name: "Zendaya", role: "Chani", avatar: "https://picsum.photos/seed/zendaya/80/80" },
    ],
    nowShowing: true, trending: true, comingSoon: false,
  },
  {
    id: 12, title: "Deadpool & Wolverine", language: "English",
    genre: ["Action", "Comedy", "Superhero"], rating: 8.1, votes: "256K",
    duration: "128 min", formats: ["2D", "3D", "IMAX"], price: 400, currency: "₹",
    poster: "https://m.media-amazon.com/images/M/MV5BYTUyN2I4YWQtZjVkNi00MTY1LThjNjAtYjhkZTI2MWU1YzUxXkEyXkFqcGc@._V1_.jpg",
    hero: "https://m.media-amazon.com/images/M/MV5BYTUyN2I4YWQtZjVkNi00MTY1LThjNjAtYjhkZTI2MWU1YzUxXkEyXkFqcGc@._V1_.jpg",
    certificate: "A", releaseYear: 2024,
    description: "Deadpool forms an unlikely alliance with a variant of Wolverine.",
    director: "Shawn Levy",
    cast: [
      { name: "Ryan Reynolds", role: "Deadpool / Wade Wilson", avatar: "https://picsum.photos/seed/ryan/80/80" },
      { name: "Hugh Jackman", role: "Wolverine / Logan", avatar: "https://picsum.photos/seed/hugh/80/80" },
    ],
    nowShowing: true, trending: true, comingSoon: false,
  },
  {
    id: 13, title: "Leo", language: "Tamil",
    genre: ["Action", "Thriller"], rating: 7.5, votes: "134K",
    duration: "164 min", formats: ["2D", "3D"], price: 160, currency: "₹",
    poster: "https://m.media-amazon.com/images/M/MV5BMDk5ODNjNzMtYzI5Yy00NmI3LWIwYzctMTFjZjcwN2I2Yzk2XkEyXkFqcGc@._V1_.jpg",
    hero: "https://m.media-amazon.com/images/M/MV5BMDk5ODNjNzMtYzI5Yy00NmI3LWIwYzctMTFjZjcwN2I2Yzk2XkEyXkFqcGc@._V1_.jpg",
    certificate: "A", releaseYear: 2023,
    description: "A mild-mannered cafe owner's violent past catches up with him.",
    director: "Lokesh Kanagaraj",
    cast: [
      { name: "Thalapathy Vijay", role: "Parthiban / Leo Das", avatar: "https://picsum.photos/seed/vijay/80/80" },
      { name: "Trisha Krishnan", role: "Sathya", avatar: "https://picsum.photos/seed/trisha/80/80" },
    ],
    nowShowing: true, trending: false, comingSoon: false,
  },
  {
    id: 14, title: "Singham Again", language: "Hindi",
    genre: ["Action", "Drama"], rating: null, votes: "0",
    duration: "TBA", formats: ["2D", "3D"], price: 200, currency: "₹",
    poster: "https://upload.wikimedia.org/wikipedia/en/c/ce/Dhurandhar_poster.jpg",
    hero: "https://upload.wikimedia.org/wikipedia/en/c/ce/Dhurandhar_poster.jpg",
    certificate: "TBA", releaseYear: 2025,
    description: "Singham returns in an epic saga featuring India's most celebrated cop universe.",
    director: "Rohit Shetty",
    cast: [
      { name: "Ajay Devgn", role: "Singham", avatar: "https://picsum.photos/seed/ajay/80/80" },
      { name: "Ranveer Singh", role: "Simmba", avatar: "https://picsum.photos/seed/ranveer/80/80" },
      { name: "Deepika Padukone", role: "Shakti Shetty", avatar: "https://picsum.photos/seed/deepika/80/80" },
    ],
    nowShowing: false, trending: false, comingSoon: true,
  },
  {
    id: 15, title: "Ramayana (2025)", language: "Telugu",
    genre: ["Mythology", "Epic", "Action"], rating: null, votes: "0",
    duration: "TBA", formats: ["2D", "3D", "IMAX"], price: 300, currency: "₹",
    poster: "https://media.cinemaexpress.com/cinemaexpress%2F2025-07-03%2Fw7ew5dir%2FRamayana-3.jpg",
    hero: "https://media.cinemaexpress.com/cinemaexpress%2F2025-07-03%2Fw7ew5dir%2FRamayana-3.jpg",
    certificate: "U", releaseYear: 2025,
    description: "The greatest Indian epic reimagined — the story of Rama, Sita, and Ravana.",
    director: "Nitesh Tiwari",
    cast: [
      { name: "Ranbir Kapoor", role: "Rama", avatar: "https://picsum.photos/seed/ranbir/80/80" },
      { name: "Sai Pallavi", role: "Sita", avatar: "https://picsum.photos/seed/saip/80/80" },
    ],
    nowShowing: false, trending: false, comingSoon: true,
  },
];
