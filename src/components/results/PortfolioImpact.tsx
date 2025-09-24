import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePricingStore } from '@/store/pricingStore';
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { mockPriceResponse, mockWaterfall } from '@/data/mockData';

export function PortfolioImpact() {
  const { results } = usePricingStore();
  
  if (!results.portfolio) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-muted mx-auto flex items-center justify-center">
            <BarChart className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-medium">Geen portfolio data</h3>
            <p className="text-sm text-muted-foreground">
              Run een simulatie om portfolio impact te zien
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { portfolio } = results;
  
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

  const impactCards = [
    {
      title: 'Δ Omzet',
      value: formatCurrency(portfolio.deltaRevenue),
      change: portfolio.deltaRevenue > 0 ? 'positive' : 'negative',
      icon: DollarSign,
    },
    {
      title: 'Δ Marge',
      value: `${portfolio.deltaMargin > 0 ? '+' : ''}${portfolio.deltaMargin.toFixed(1)}%`,
      change: portfolio.deltaMargin > 0 ? 'positive' : 'negative',
      icon: Percent,
    },
    {
      title: 'SKUs Omhoog',
      value: `${portfolio.skusIncreased}/${portfolio.totalSkus}`,
      change: 'positive',
      icon: TrendingUp,
    },
    {
      title: 'SKUs Omlaag',
      value: `${portfolio.skusDecreased}/${portfolio.totalSkus}`,
      change: 'negative', 
      icon: TrendingDown,
    },
  ];

  return (
    <div className="h-full space-y-6 overflow-auto">
      {/* Impact Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {impactCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="bg-gradient-subtle">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                    <p className={`text-lg font-semibold ${
                      card.change === 'positive' ? 'text-success' : 
                      card.change === 'negative' ? 'text-destructive' : 
                      'text-foreground'
                    }`}>
                      {card.value}
                    </p>
                  </div>
                  <Icon className={`h-5 w-5 ${
                    card.change === 'positive' ? 'text-success' : 
                    card.change === 'negative' ? 'text-destructive' : 
                    'text-muted-foreground'
                  }`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Price Response Curve */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Price-Response Curve</CardTitle>
            <p className="text-sm text-muted-foreground">
              Premium Headphones Pro (selecteer SKU in tabel)
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockPriceResponse}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="price" 
                    tickFormatter={(value) => `€${value}`}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    yAxisId="units"
                    orientation="left"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    yAxisId="margin"
                    orientation="right"
                    tickFormatter={(value) => `${value}%`}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'expectedUnits') return [value, 'Verwachte Eenheden'];
                      if (name === 'margin') return [`${value}%`, 'Marge'];
                      return [value, name];
                    }}
                    labelFormatter={(value) => `Prijs: €${value}`}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line 
                    yAxisId="units"
                    type="monotone" 
                    dataKey="expectedUnits" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    yAxisId="margin"
                    type="monotone" 
                    dataKey="margin" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Waterfall Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Marge Impact per Categorie</CardTitle>
            <p className="text-sm text-muted-foreground">
              Waterfall analyse van marge veranderingen
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockWaterfall}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="category"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value as number), 'Impact']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar 
                    dataKey="value"
                    fill="hsl(142 76% 36%)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}