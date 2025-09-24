import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { usePricingStore } from '@/store/pricingStore';
import { ObjectiveSlider } from './ObjectiveSlider';
import { ScenarioSelections } from './ScenarioSelections';
import { ScenarioToggles } from './ScenarioToggles';
import { ScenarioActions } from './ScenarioActions';

export function ScenarioPane() {
  const { showHelpText, setShowHelpText } = usePricingStore();
  
  return (
    <div className="w-80 flex-shrink-0">
      <Card className="sticky top-6 bg-gradient-card shadow-elevated">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gradient-primary" />
              Scenario Configuratie
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHelpText(!showHelpText)}
              className="h-8 w-8 p-0"
              title={showHelpText ? "Verberg uitleg" : "Toon uitleg"}
            >
              <HelpCircle className={`h-4 w-4 transition-colors ${showHelpText ? 'text-primary' : 'text-muted-foreground'}`} />
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <ObjectiveSlider />
          <ScenarioSelections />
          <ScenarioToggles />
          <ScenarioActions />
        </CardContent>
      </Card>
    </div>
  );
}