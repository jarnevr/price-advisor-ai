import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { usePricingStore } from '@/store/pricingStore';
import { ChevronUp, ChevronDown, Search, Download } from 'lucide-react';
import type { SkuRow, WarningBadge } from '@/types/pricing';

type SortField = keyof SkuRow;
type SortDirection = 'asc' | 'desc';

export function SkuTable() {
  const { results, selectedSkus, toggleSkuSelection } = usePricingStore();
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('sku');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const getWarningBadgeColor = (warning: WarningBadge) => {
    const baseClasses = 'text-xs px-2 py-1';
    
    switch (warning.type) {
      case 'stockout':
        return warning.severity === 'high' 
          ? `${baseClasses} bg-destructive text-destructive-foreground`
          : `${baseClasses} bg-warning text-warning-foreground`;
      case 'map':
        return `${baseClasses} bg-warning text-warning-foreground`;
      case 'rank':
        return `${baseClasses} bg-muted text-muted-foreground`;
      case 'margin':
        return `${baseClasses} bg-success-muted text-success-foreground`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  const filteredAndSortedData = results.skus
    .filter(sku => 
      sku.sku.toLowerCase().includes(search.toLowerCase()) ||
      sku.productName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return sortDirection === 'asc' 
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value);

  const formatPercentage = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

  if (results.skus.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-center">
        <div className="space-y-3">
          <div className="h-12 w-12 rounded-full bg-muted mx-auto flex items-center justify-center">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Geen resultaten</h3>
            <p className="text-sm text-muted-foreground">
              Klik op "Simuleer" om de analyse te starten
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Search and actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Zoek SKU of product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        
        {selectedSkus.length > 0 && (
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export geselecteerde ({selectedSkus.length})
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden rounded-lg border bg-card">
        <div className="overflow-auto h-full">
          <table className="w-full">
            <thead className="sticky top-0 bg-muted/50 border-b backdrop-blur-sm">
              <tr>
                <th className="p-3 text-left">
                  <Checkbox />
                </th>
                {[
                  { key: 'sku', label: 'SKU' },
                  { key: 'productName', label: 'Product' },
                  { key: 'currentPrice', label: 'Huidige Prijs' },
                  { key: 'advisedPrice', label: 'Advies Prijs' },
                  { key: 'priceChange', label: 'Δ%' },
                  { key: 'expectedUnits', label: 'Verwachte Eenheden' },
                  { key: 'expectedRevenue', label: 'Verwachte Omzet' },
                  { key: 'expectedMargin', label: 'Verwachte Marge%' },
                  { key: 'competitivePosition', label: 'Comp Positie' },
                ].map((col) => (
                  <th key={col.key} className="p-3 text-left">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground"
                      onClick={() => handleSort(col.key as SortField)}
                    >
                      {col.label}
                      {sortField === col.key && (
                        sortDirection === 'asc' 
                          ? <ChevronUp className="ml-1 h-3 w-3" />
                          : <ChevronDown className="ml-1 h-3 w-3" />
                      )}
                    </Button>
                  </th>
                ))}
                <th className="p-3 text-left">Waarschuwingen</th>
              </tr>
            </thead>
            
            <tbody>
              {filteredAndSortedData.map((sku) => (
                <tr key={sku.sku} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <Checkbox
                      checked={selectedSkus.includes(sku.sku)}
                      onCheckedChange={() => toggleSkuSelection(sku.sku)}
                    />
                  </td>
                  <td className="p-3 font-mono text-sm">{sku.sku}</td>
                  <td className="p-3 max-w-40">
                    <div className="truncate" title={sku.productName}>
                      {sku.productName}
                    </div>
                  </td>
                  <td className="p-3 font-medium">{formatCurrency(sku.currentPrice)}</td>
                  <td className="p-3 font-medium text-primary">{formatCurrency(sku.advisedPrice)}</td>
                  <td className="p-3">
                    <span className={`font-medium ${
                      sku.priceChange > 0 ? 'text-success' : 
                      sku.priceChange < 0 ? 'text-destructive' : 
                      'text-muted-foreground'
                    }`}>
                      {formatPercentage(sku.priceChange)}
                    </span>
                  </td>
                  <td className="p-3">{sku.expectedUnits.toLocaleString('nl-NL')}</td>
                  <td className="p-3">{formatCurrency(sku.expectedRevenue)}</td>
                  <td className="p-3">{sku.expectedMargin.toFixed(1)}%</td>
                  <td className="p-3">#{sku.competitivePosition}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {sku.warnings.map((warning, index) => (
                        <Badge
                          key={index}
                          className={getWarningBadgeColor(warning)}
                          title={warning.message}
                        >
                          {warning.type}
                        </Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}