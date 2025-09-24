import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePricingStore } from '@/store/pricingStore';
import { Code2, Copy, Check } from 'lucide-react';

export function DeveloperModal() {
  const { showDeveloperModal, setShowDeveloperModal, scenario, selectedSkus } = usePricingStore();
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const simulatePayload = {
    scenario,
    skus: selectedSkus.length > 0 ? selectedSkus : undefined
  };

  const advisePayload = {
    scenario
  };

  const mockResponse = {
    perSKU: [
      {
        sku: "SKU001",
        currentPrice: 299.99,
        advisedPrice: 314.99,
        priceChange: 5.0,
        expectedUnits: 850,
        expectedRevenue: 267740,
        expectedMargin: 28.5,
        competitivePosition: 2,
        warnings: ["rank"]
      }
    ],
    portfolio: {
      deltaRevenue: 45250,
      deltaMargin: 8.7,
      skusIncreased: 4,
      skusDecreased: 2,
      totalSkus: 6
    }
  };

  const copyToClipboard = async (text: string, tab: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const CodeBlock = ({ code, tab }: { code: string, tab: string }) => (
    <div className="relative">
      <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-96 border">
        <code>{code}</code>
      </pre>
      <Button
        size="sm"
        variant="outline"
        className="absolute top-2 right-2 gap-2"
        onClick={() => copyToClipboard(code, tab)}
      >
        {copiedTab === tab ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        {copiedTab === tab ? 'Gekopieerd' : 'Kopieer'}
      </Button>
    </div>
  );

  return (
    <Dialog open={showDeveloperModal} onOpenChange={setShowDeveloperModal}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            API Contract Debug
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="simulate" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="simulate" className="gap-2">
              POST /simulate
              <Badge variant="secondary" className="text-xs">Live</Badge>
            </TabsTrigger>
            <TabsTrigger value="advise" className="gap-2">
              POST /advise
            </TabsTrigger>
            <TabsTrigger value="response" className="gap-2">
              Response Format
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-auto mt-4 space-y-4">
            <TabsContent value="simulate" className="space-y-4 mt-0">
              <div>
                <h3 className="font-medium mb-2">Request Payload</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Wordt live gegenereerd op basis van je huidige scenario configuratie.
                </p>
                <CodeBlock 
                  code={JSON.stringify(simulatePayload, null, 2)}
                  tab="simulate-request"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Endpoint Details</h3>
                <div className="bg-muted p-3 rounded-lg text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div><strong>Method:</strong> POST</div>
                    <div><strong>Endpoint:</strong> /api/simulate</div>
                    <div><strong>Content-Type:</strong> application/json</div>
                    <div><strong>Timeout:</strong> 30s</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advise" className="space-y-4 mt-0">
              <div>
                <h3 className="font-medium mb-2">Request Payload</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Genereert CSV export URL + pricing advice.
                </p>
                <CodeBlock 
                  code={JSON.stringify(advisePayload, null, 2)}
                  tab="advise-request"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Endpoint Details</h3>
                <div className="bg-muted p-3 rounded-lg text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div><strong>Method:</strong> POST</div>
                    <div><strong>Endpoint:</strong> /api/advise</div>
                    <div><strong>Content-Type:</strong> application/json</div>
                    <div><strong>Response:</strong> Includes adviceCSVUrl</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="response" className="space-y-4 mt-0">
              <div>
                <h3 className="font-medium mb-2">Expected Response Format</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Standaard response structuur voor beide endpoints.
                </p>
                <CodeBlock 
                  code={JSON.stringify(mockResponse, null, 2)}
                  tab="response-format"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Error Handling</h3>
                <div className="bg-muted p-3 rounded-lg text-sm space-y-2">
                  <div><strong>400:</strong> Invalid scenario parameters</div>
                  <div><strong>422:</strong> Business rule violations</div>
                  <div><strong>429:</strong> Rate limit exceeded</div>
                  <div><strong>500:</strong> Internal processing error</div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}