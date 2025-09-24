import type { SkuRow, PortfolioImpact, PriceResponsePoint, WaterfallItem } from '@/types/pricing';

export const mockSkuData: SkuRow[] = [
  {
    sku: 'SKU001',
    productName: 'Premium Headphones Pro',
    currentPrice: 299.99,
    advisedPrice: 314.99,
    priceChange: 5.0,
    expectedUnits: 850,
    expectedRevenue: 267740,
    expectedMargin: 28.5,
    competitivePosition: 2,
    warnings: [
      { type: 'rank', severity: 'medium', message: 'Mogelijk verlies marktpositie' }
    ]
  },
  {
    sku: 'SKU002',
    productName: 'Wireless Speaker Deluxe',
    currentPrice: 149.99,
    advisedPrice: 139.99,
    priceChange: -6.7,
    expectedUnits: 1200,
    expectedRevenue: 167988,
    expectedMargin: 22.1,
    competitivePosition: 1,
    warnings: [
      { type: 'margin', severity: 'low', message: 'Marge onder doelstelling' }
    ]
  },
  {
    sku: 'SKU003',
    productName: 'Gaming Mouse Elite',
    currentPrice: 89.99,
    advisedPrice: 94.99,
    priceChange: 5.6,
    expectedUnits: 450,
    expectedRevenue: 42745,
    expectedMargin: 35.2,
    competitivePosition: 1,
    warnings: []
  },
  {
    sku: 'SKU004',
    productName: 'USB-C Hub Premium',
    currentPrice: 79.99,
    advisedPrice: 84.99,
    priceChange: 6.3,
    expectedUnits: 680,
    expectedRevenue: 57793,
    expectedMargin: 31.8,
    competitivePosition: 3,
    warnings: [
      { type: 'stockout', severity: 'high', message: 'Stockout risico bij hogere prijs' },
      { type: 'map', severity: 'medium', message: 'Dicht bij MAP limiet' }
    ]
  },
  {
    sku: 'SKU005',
    productName: 'Mechanical Keyboard Pro',
    currentPrice: 129.99,
    advisedPrice: 124.99,
    priceChange: -3.8,
    expectedUnits: 320,
    expectedRevenue: 39998,
    expectedMargin: 26.7,
    competitivePosition: 2,
    warnings: [
      { type: 'rank', severity: 'low', message: 'Competitieve druk' }
    ]
  },
  {
    sku: 'SKU006',
    productName: 'Webcam 4K Ultra',
    currentPrice: 199.99,
    advisedPrice: 209.99,
    priceChange: 5.0,
    expectedUnits: 180,
    expectedRevenue: 37798,
    expectedMargin: 42.1,
    competitivePosition: 1,
    warnings: []
  }
];

export const mockPortfolioImpact: PortfolioImpact = {
  deltaRevenue: 45250,
  deltaMargin: 8.7,
  skusIncreased: 4,
  skusDecreased: 2,
  totalSkus: 6
};

export const mockPriceResponse: PriceResponsePoint[] = [
  { price: 269.99, expectedUnits: 1200, revenue: 323988, margin: 31.2 },
  { price: 279.99, expectedUnits: 1100, revenue: 307989, margin: 33.1 },
  { price: 289.99, expectedUnits: 980, revenue: 284190, margin: 34.8 },
  { price: 299.99, expectedUnits: 850, revenue: 254992, margin: 36.2 },
  { price: 309.99, expectedUnits: 720, revenue: 223193, margin: 37.4 },
  { price: 319.99, expectedUnits: 580, revenue: 185594, margin: 38.1 },
  { price: 329.99, expectedUnits: 450, revenue: 148496, margin: 38.6 }
];

export const mockWaterfall: WaterfallItem[] = [
  { category: 'Audio', value: 28500, type: 'positive' },
  { category: 'Gaming', value: 12750, type: 'positive' },
  { category: 'Accessories', value: 8900, type: 'positive' },
  { category: 'Computing', value: -4200, type: 'negative' },
  { category: 'Video', value: -700, type: 'negative' }
];