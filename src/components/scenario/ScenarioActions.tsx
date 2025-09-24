import { Button } from '@/components/ui/button';
import { Play, Zap, FileDown } from 'lucide-react';
import { usePricingStore } from '@/store/pricingStore';
import { mockSkuData, mockPortfolioImpact } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

export function ScenarioActions() {
  const { setIsLoading, setResults, setShowDeveloperModal } = usePricingStore();

  const handleSimulate = async () => {
    setIsLoading(true);
    setShowDeveloperModal(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setResults(mockSkuData, mockPortfolioImpact);
    setIsLoading(false);
    
    toast({
      title: "Simulatie voltooid",
      description: `${mockSkuData.length} SKUs geanalyseerd`,
    });
  };

  const handleGenerateAdvice = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    
    toast({
      title: "Advies gegenereerd",
      description: "Prijsaanbevelingen zijn klaar",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export gestart",
      description: "CSV wordt gegenereerd...",
    });
  };

  return (
    <div className="space-y-3">
      <Button 
        onClick={handleSimulate}
        className="w-full bg-gradient-primary hover:bg-primary-hover shadow-glow transition-all duration-200"
        size="lg"
      >
        <Play className="mr-2 h-4 w-4" />
        Simuleer
      </Button>
      
      <Button 
        onClick={handleGenerateAdvice}
        variant="outline"
        className="w-full"
        size="lg"
      >
        <Zap className="mr-2 h-4 w-4" />
        Genereer Advies
      </Button>
      
      <Button 
        onClick={handleExport}
        variant="outline"
        className="w-full"
        size="lg"
      >
        <FileDown className="mr-2 h-4 w-4" />
        Export CSV
      </Button>
    </div>
  );
}