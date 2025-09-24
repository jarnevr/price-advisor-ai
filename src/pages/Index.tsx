import { TopNav } from '@/components/layout/TopNav';
import { ScenarioPane } from '@/components/scenario/ScenarioPane';
import { ResultsPane } from '@/components/results/ResultsPane';
import { DeveloperModal } from '@/components/developer/DeveloperModal';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <TopNav />
      
      <main className="flex gap-6 p-6 min-h-[calc(100vh-4rem)]">
        <ScenarioPane />
        <ResultsPane />
      </main>
      
      <DeveloperModal />
    </div>
  );
};

export default Index;
