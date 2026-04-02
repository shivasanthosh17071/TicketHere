import React, { createContext, useContext, useState, ReactNode } from "react";
import { Movie } from "@/data/movies";
import { Theater } from "@/data/theaters";

export interface AddOn {
  id: string;
  name: string;
  emoji: string;
  price: number;
  added: boolean;
}

interface BookingState {
  selectedMovie: Movie | null;
  selectedTheater: Theater | null;
  selectedDate: string;
  selectedTime: string;
  selectedFormat: string;
  selectedSeats: string[];
  seatCategory: string;
  addOns: AddOn[];
  bookingFee: number;
  convenienceFee: number;
  city: string;
}

interface BookingContextType extends BookingState {
  setSelectedMovie: (movie: Movie | null) => void;
  setSelectedTheater: (theater: Theater | null) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  setSelectedFormat: (format: string) => void;
  setSelectedSeats: (seats: string[]) => void;
  setSeatCategory: (cat: string) => void;
  toggleAddOn: (id: string) => void;
  setCity: (city: string) => void;
  getSeatPrice: (seatId: string) => number;
  getSubtotal: () => number;
  getAddOnsTotal: () => number;
  getTotal: () => number;
  resetBooking: () => void;
}

const defaultAddOns: AddOn[] = [
  { id: "popcorn", name: "Popcorn Combo (Large)", emoji: "🍿", price: 180, added: false },
  { id: "drink", name: "Cold Drink Combo", emoji: "🥤", price: 120, added: false },
  { id: "nachos", name: "Nachos & Dip", emoji: "🍕", price: 150, added: false },
  { id: "brownie", name: "Choco Brownie", emoji: "🍫", price: 90, added: false },
];

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatCategory, setSeatCategory] = useState("");
  const [addOns, setAddOns] = useState<AddOn[]>(defaultAddOns);
  const [city, setCity] = useState("Hyderabad");

  const bookingFee = 30;
  const convenienceFee = 15;

  const getSeatPrice = (seatId: string) => {
    const row = seatId.charAt(0);
    if (row <= "C") return 250;
    if (row <= "G") return 200;
    return 150;
  };

  const getSubtotal = () => selectedSeats.reduce((sum, s) => sum + getSeatPrice(s), 0);
  const getAddOnsTotal = () => addOns.filter(a => a.added).reduce((sum, a) => sum + a.price, 0);
  const getTotal = () => getSubtotal() + bookingFee + convenienceFee + getAddOnsTotal();

  const toggleAddOn = (id: string) => {
    setAddOns(prev => prev.map(a => a.id === id ? { ...a, added: !a.added } : a));
  };

  const resetBooking = () => {
    setSelectedMovie(null);
    setSelectedTheater(null);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedFormat("");
    setSelectedSeats([]);
    setSeatCategory("");
    setAddOns(defaultAddOns);
  };

  return (
    <BookingContext.Provider value={{
      selectedMovie, selectedTheater, selectedDate, selectedTime, selectedFormat,
      selectedSeats, seatCategory, addOns, bookingFee, convenienceFee, city,
      setSelectedMovie, setSelectedTheater, setSelectedDate, setSelectedTime,
      setSelectedFormat, setSelectedSeats, setSeatCategory, toggleAddOn, setCity,
      getSeatPrice, getSubtotal, getAddOnsTotal, getTotal, resetBooking,
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
};
