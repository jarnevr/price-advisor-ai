import { create } from 'zustand';
import type { Scenario, SkuRow, PortfolioImpact, PriceResponsePoint, WaterfallItem } from '@/types/pricing';

interface PricingState {
  // Scenario state
  scenario: Scenario;
  updateScenario: (updates: Partial<Scenario>) => void;
  
  // Results state
  results: {
    skus: SkuRow[];
    portfolio: PortfolioImpact | null;
    priceResponse: PriceResponsePoint[];
    waterfall: WaterfallItem[];
  };
  
  // UI state
  selectedSku: string | null;
  selectedSkus: string[];
  isLoading: boolean;
  activeTab: 'table' | 'impact' | 'explanation';
  showDeveloperModal: boolean;
  showHelpText: boolean;
  
  // Actions
  setResults: (skus: SkuRow[], portfolio: PortfolioImpact) => void;
  setSelectedSku: (sku: string | null) => void;
  toggleSkuSelection: (sku: string) => void;
  setIsLoading: (loading: boolean) => void;
  setActiveTab: (tab: 'table' | 'impact' | 'explanation') => void;
  setShowDeveloperModal: (show: boolean) => void;
  setShowHelpText: (show: boolean) => void;
  setPriceResponse: (data: PriceResponsePoint[]) => void;
  setWaterfall: (data: WaterfallItem[]) => void;
}

const defaultScenario: Scenario = {
  objective: 0.5,
  timeWindow: 14,
  priceStep: 0.99,
  priceEnding: '.99',
  maxPriceChangePerDay: 5,
  minimumMargin: 15,
  competitiveRule: 1.1,
  respectMAP: true,
  priceLadder: false,
  avoidStockouts: true,
  psychologicalEndings: true,
  portfolioTargets: false,
};

export const usePricingStore = create<PricingState>((set, get) => ({
  scenario: defaultScenario,
  
  results: {
    skus: [],
    portfolio: null,
    priceResponse: [],
    waterfall: [],
  },
  
  selectedSku: null,
  selectedSkus: [],
  isLoading: false,
  activeTab: 'table',
  showDeveloperModal: false,
  showHelpText: true,
  
  updateScenario: (updates) =>
    set((state) => ({
      scenario: { ...state.scenario, ...updates },
    })),
    
  setResults: (skus, portfolio) =>
    set((state) => ({
      results: { ...state.results, skus, portfolio },
    })),
    
  setSelectedSku: (sku) => set({ selectedSku: sku }),
  
  toggleSkuSelection: (sku) =>
    set((state) => ({
      selectedSkus: state.selectedSkus.includes(sku)
        ? state.selectedSkus.filter((s) => s !== sku)
        : [...state.selectedSkus, sku],
    })),
    
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  setShowDeveloperModal: (show) => set({ showDeveloperModal: show }),
  
  setShowHelpText: (show) => set({ showHelpText: show }),
  
  setPriceResponse: (data) =>
    set((state) => ({
      results: { ...state.results, priceResponse: data },
    })),
    
  setWaterfall: (data) =>
    set((state) => ({
      results: { ...state.results, waterfall: data },
    })),
}));