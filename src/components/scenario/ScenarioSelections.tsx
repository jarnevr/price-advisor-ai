import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { usePricingStore } from '@/store/pricingStore';

export function ScenarioSelections() {
  const { scenario, updateScenario } = usePricingStore();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="timeWindow" className="text-sm font-medium">
          Tijdsvenster
        </Label>
        <Select
          value={scenario.timeWindow.toString()}
          onValueChange={(value) => updateScenario({ timeWindow: parseInt(value) as 7 | 14 | 28 })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 dagen</SelectItem>
            <SelectItem value="14">14 dagen</SelectItem>
            <SelectItem value="28">28 dagen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="priceStep" className="text-sm font-medium">
          Prijsstap
        </Label>
        <Select
          value={scenario.priceStep.toString()}
          onValueChange={(value) => updateScenario({ priceStep: parseFloat(value) as 0.10 | 0.50 | 1.00 | 0.99 })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0.10">€0.10</SelectItem>
            <SelectItem value="0.50">€0.50</SelectItem>
            <SelectItem value="1.00">€1.00</SelectItem>
            <SelectItem value="0.99">€0.99</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="priceEnding" className="text-sm font-medium">
          Prijseindes
        </Label>
        <Select
          value={scenario.priceEnding}
          onValueChange={(value) => updateScenario({ priceEnding: value as '.99' | '.95' | 'hele euro' })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=".99">.99</SelectItem>
            <SelectItem value=".95">.95</SelectItem>
            <SelectItem value="hele euro">Hele euro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="maxPriceChange" className="text-sm font-medium">
            Max Δ/dag (%)
          </Label>
          <Input
            id="maxPriceChange"
            type="number"
            value={scenario.maxPriceChangePerDay}
            onChange={(e) => updateScenario({ maxPriceChangePerDay: parseFloat(e.target.value) || 0 })}
            className="h-9"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="minimumMargin" className="text-sm font-medium">
            Min marge (%)
          </Label>
          <Input
            id="minimumMargin"
            type="number"
            value={scenario.minimumMargin}
            onChange={(e) => updateScenario({ minimumMargin: parseFloat(e.target.value) || 0 })}
            className="h-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="competitiveRule" className="text-sm font-medium">
          Competitieve regel (α)
        </Label>
        <Input
          id="competitiveRule"
          type="number"
          step="0.1"
          value={scenario.competitiveRule}
          onChange={(e) => updateScenario({ competitiveRule: parseFloat(e.target.value) || 0 })}
          placeholder="≤ α × min_comp"
          className="h-9"
        />
      </div>
    </div>
  );
}