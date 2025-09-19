"use client";

import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  officerName: string | null;
  login: (name: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  officerName: null,
  login: (name: string) => set({ isAuthenticated: true, officerName: name }),
  logout: () => set({ isAuthenticated: false, officerName: null }),
}));


