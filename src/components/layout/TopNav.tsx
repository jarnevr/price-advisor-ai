import { Calculator, Code2, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePricingStore } from '@/store/pricingStore';

export function TopNav() {
  const { setShowDeveloperModal } = usePricingStore();

  return (
    <header className="h-16 border-b bg-gradient-card shadow-card">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <Calculator className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Pricing Calculator
            </h1>
            <p className="text-sm text-muted-foreground">
              Enterprise Price Optimization Platform
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeveloperModal(true)}
            className="gap-2"
          >
            <Code2 className="h-4 w-4" />
            API Debug
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <FileDown className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
    </header>
  );
}