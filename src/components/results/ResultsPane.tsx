import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePricingStore } from '@/store/pricingStore';
import { SkuTable } from './SkuTable';
import { PortfolioImpact } from './PortfolioImpact';
import { ExplanationTab } from './ExplanationTab';
import { Table, BarChart3, FileText } from 'lucide-react';

export function ResultsPane() {
  const { activeTab, setActiveTab } = usePricingStore();

  return (
    <div className="flex-1 min-w-0">
      <Card className="h-full bg-gradient-card shadow-elevated">
        <CardContent className="p-0 h-full">
          <Tabs value={activeTab} onValueChange={(tab) => setActiveTab(tab as any)} className="h-full flex flex-col">
            <div className="px-6 pt-6 pb-2">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="table" className="gap-2">
                  <Table className="h-4 w-4" />
                  SKU Tabel
                </TabsTrigger>
                <TabsTrigger value="impact" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Portfolio Impact
                </TabsTrigger>
                <TabsTrigger value="explanation" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Uitleg
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1 min-h-0 px-6 pb-6">
              <TabsContent value="table" className="h-full mt-0">
                <SkuTable />
              </TabsContent>
              
              <TabsContent value="impact" className="h-full mt-0">
                <PortfolioImpact />
              </TabsContent>
              
              <TabsContent value="explanation" className="h-full mt-0">
                <ExplanationTab />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}