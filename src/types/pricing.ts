export interface Scenario {
  // Doelstelling slider
  objective: number; // 0 (Volume) to 1 (Marge) in steps of 0.1
  
  // Selecties
  timeWindow: 7 | 14 | 28; // dagen
  priceStep: 0.10 | 0.50 | 1.00 | 0.99;
  priceEnding: '.99' | '.95' | 'hele euro';
  maxPriceChangePerDay: number; // percentage
  minimumMargin: number; // percentage
  competitiveRule: number; // α factor voor ≤ α × min_comp
  
  // Toggles
  respectMAP: boolean;
  priceLadder: boolean;
  avoidStockouts: boolean;
  psychologicalEndings: boolean;
  portfolioTargets: boolean;
  
  // Feature toggles
  usePriceStep: boolean;
  usePriceEndings: boolean;
}

export interface SkuRow {
  sku: string;
  productName: string;
  currentPrice: number;
  advisedPrice: number;
  priceChange: number;
  expectedUnits: number;
  expectedRevenue: number;
  expectedMargin: number;
  competitivePosition: number;
  warnings: WarningBadge[];
}

export interface WarningBadge {
  type: 'stockout' | 'map' | 'rank' | 'margin';
  severity: 'low' | 'medium' | 'high';
  message: string;
}

export interface AdviceRow extends SkuRow {
  reasoning: string;
  constraints: string[];
}

export interface PortfolioImpact {
  deltaRevenue: number;
  deltaMargin: number;
  skusIncreased: number;
  skusDecreased: number;
  totalSkus: number;
}

export interface PriceResponsePoint {
  price: number;
  expectedUnits: number;
  revenue: number;
  margin: number;
}

export interface WaterfallItem {
  category: string;
  value: number;
  type: 'positive' | 'negative' | 'neutral';
}

export interface SimulationResponse {
  perSKU: SkuRow[];
  portfolio: PortfolioImpact;
}

export interface AdviceResponse {
  adviceCSVUrl: string;
  perSKU: AdviceRow[];
  portfolio: PortfolioImpact;
}

export interface ApiPayload {
  scenario: Scenario;
  skus?: string[];
}