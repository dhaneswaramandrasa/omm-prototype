import { create } from 'zustand';

interface SimulationState {
  amount: number | null;
  tenor: number | null;
  selectedPartnerId: string | null;

  setAmount: (amount: number) => void;
  setTenor: (tenor: number) => void;
  setSelectedPartner: (partnerId: string) => void;
  resetSimulation: () => void;
}

export const useSimulationStore = create<SimulationState>()((set) => ({
  amount: null,
  tenor: null,
  selectedPartnerId: null,

  setAmount: (amount) => set({ amount }),
  setTenor: (tenor) => set({ tenor }),
  setSelectedPartner: (selectedPartnerId) => set({ selectedPartnerId }),
  resetSimulation: () => set({ amount: null, tenor: null, selectedPartnerId: null }),
}));
