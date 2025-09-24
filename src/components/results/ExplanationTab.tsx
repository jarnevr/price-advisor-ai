import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, CheckCircle, AlertCircle, Info } from 'lucide-react';

export function ExplanationTab() {
  const constraints = [
    { 
      text: 'Prijs eindigt op .99 conform psychologische eindes', 
      status: 'applied' as const,
      impact: 'Verhoogt conversie met ~8%'
    },
    { 
      text: 'MAP gerespecteerd voor alle geselecteerde SKUs', 
      status: 'applied' as const,
      impact: 'Voorkomt retailer conflicten'
    },
    { 
      text: 'Prijsverandering beperkt tot max 5% per dag', 
      status: 'applied' as const,
      impact: 'Behoudt klantvertrouwen'
    },
    { 
      text: 'Minimum marge van 15% gehandhaafd', 
      status: 'warning' as const,
      impact: '2 SKUs net onder target (14.2%, 14.8%)'
    },
    { 
      text: 'Competitieve regel ≤ 1.1 × min_comp actief', 
      status: 'applied' as const,
      impact: 'Behoudt concurrentiepositie'
    },
    { 
      text: 'Stockout vermijding voor high-velocity items', 
      status: 'applied' as const,
      impact: 'Beschermt beschikbaarheid top 20% SKUs'
    }
  ];

  const featureImportance = [
    { feature: 'Huidige concurrentprijs', importance: 0.34, description: 'Grootste driver voor prijsadvies' },
    { feature: 'Historische elasticiteit', importance: 0.28, description: 'Volume response op prijsveranderingen' },
    { feature: 'Voorraad niveau', importance: 0.18, description: 'Stockout risico assessment' },
    { feature: 'Seizoenspatronen', importance: 0.12, description: 'Demand variatie door seizoen' },
    { feature: 'Cross-selling impact', importance: 0.08, description: 'Portfolio effecten' }
  ];

  const getConstraintIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getConstraintBadge = (status: string) => {
    switch (status) {
      case 'applied':
        return <Badge className="bg-success text-success-foreground">Toegepast</Badge>;
      case 'warning':
        return <Badge className="bg-warning text-warning-foreground">Waarschuwing</Badge>;
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  return (
    <div className="h-full space-y-6 overflow-auto">
      {/* SHAP/Feature Importance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Model Uitleg
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Feature importance en model interpretatie
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {featureImportance.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.feature}</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(item.importance * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.importance * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Constraint Log */}
      <Card>
        <CardHeader>
          <CardTitle>Constraint Log</CardTitle>
          <p className="text-sm text-muted-foreground">
            Toegepaste regels en beperkingen in deze optimalisatie
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {constraints.map((constraint, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border bg-gradient-subtle">
                {getConstraintIcon(constraint.status)}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium">{constraint.text}</p>
                    {getConstraintBadge(constraint.status)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {constraint.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Model Performance</CardTitle>
          <p className="text-sm text-muted-foreground">
            Accuracy metrics voor deze optimalisatie run
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Forecast Accuracy</span>
                <span className="text-sm font-medium text-success">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Price Elasticity R²</span>
                <span className="text-sm font-medium text-success">0.87</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Constraint Violations</span>
                <span className="text-sm font-medium text-warning">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Optimization Score</span>
                <span className="text-sm font-medium text-success">8.7/10</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}