import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { usePricingStore } from '@/store/pricingStore';
import { Shield, Layers, AlertTriangle, Brain, Target } from 'lucide-react';

export function ScenarioToggles() {
  const { scenario, updateScenario } = usePricingStore();

  const toggles = [
    {
      key: 'respectMAP' as const,
      label: 'MAP respecteren',
      description: 'Respecteer Minimum Advertised Price',
      icon: Shield,
      value: scenario.respectMAP,
    },
    {
      key: 'priceLadder' as const,
      label: 'Prijs-ladder',
      description: 'Gebruik hiërarchische prijsstructuur',
      icon: Layers,
      value: scenario.priceLadder,
    },
    {
      key: 'avoidStockouts' as const,
      label: 'Stockouts vermijden',
      description: 'Voorkom voorraadtekorten',
      icon: AlertTriangle,
      value: scenario.avoidStockouts,
    },
    {
      key: 'psychologicalEndings' as const,
      label: 'Psychologische eindes',
      description: 'Gebruik psychologische prijspunten',
      icon: Brain,
      value: scenario.psychologicalEndings,
    },
    {
      key: 'portfolioTargets' as const,
      label: 'Portfolio-targets',
      description: 'Optimaliseer op portfolio niveau',
      icon: Target,
      value: scenario.portfolioTargets,
    },
  ];

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-foreground">
        Optimalisatie Opties
      </Label>
      
      <div className="space-y-3">
        {toggles.map((toggle) => {
          const Icon = toggle.icon;
          return (
            <div key={toggle.key} className="flex items-start justify-between space-x-3">
              <div className="flex items-start space-x-3 min-w-0 flex-1">
                <Icon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <Label 
                    htmlFor={toggle.key}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {toggle.label}
                  </Label>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {toggle.description}
                  </p>
                </div>
              </div>
              <Switch
                id={toggle.key}
                checked={toggle.value}
                onCheckedChange={(checked) => updateScenario({ [toggle.key]: checked })}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}