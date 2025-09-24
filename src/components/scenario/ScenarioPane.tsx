import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ObjectiveSlider } from './ObjectiveSlider';
import { ScenarioSelections } from './ScenarioSelections';
import { ScenarioToggles } from './ScenarioToggles';
import { ScenarioActions } from './ScenarioActions';

export function ScenarioPane() {
  return (
    <div className="w-80 flex-shrink-0">
      <Card className="sticky top-6 bg-gradient-card shadow-elevated">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-gradient-primary" />
            Scenario Configuratie
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