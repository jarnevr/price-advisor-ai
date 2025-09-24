import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { usePricingStore } from '@/store/pricingStore';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function ObjectiveSlider() {
  const { scenario, updateScenario } = usePricingStore();

  const getObjectiveLabel = (value: number) => {
    if (value <= 0.2) return 'Focus op Volume';
    if (value <= 0.4) return 'Volume Prioriteit';
    if (value <= 0.6) return 'Gebalanceerd';
    if (value <= 0.8) return 'Marge Prioriteit';
    return 'Focus op Marge';
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-foreground">
        Doelstelling
      </Label>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <TrendingDown className="h-3 w-3" />
            Volume
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Marge
          </div>
        </div>
        
        <Slider
          value={[scenario.objective]}
          onValueChange={([value]) => updateScenario({ objective: value })}
          min={0}
          max={1}
          step={0.1}
          className="w-full"
        />
        
        <div className="text-center">
          <div className="text-sm font-medium text-primary">
            {getObjectiveLabel(scenario.objective)}
          </div>
          <div className="text-xs text-muted-foreground">
            {Math.round(scenario.objective * 10) / 10}
          </div>
        </div>
      </div>
    </div>
  );
}