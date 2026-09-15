export interface Slab {
  from_unit: number;
  to_unit: number | null;
  type: 'FIXED' | 'PER_UNIT';
  rate: number;
  order_index: number;
}

export interface BillingRuleSnapshot {
  id: string;
  name: string;
  slabs: Slab[];
}

export interface CalculationResult {
  totalAmount: number;
  items: {
    description: string;
    units: number;
    amount: number;
    order_index: number;
  }[];
}

export function calculateBill(unitsConsumed: number, rule: BillingRuleSnapshot): CalculationResult {
  let remainingUnits = unitsConsumed;
  let totalAmount = 0;
  const items: CalculationResult['items'] = [];

  // Sort slabs by order_index just to be safe
  const sortedSlabs = [...rule.slabs].sort((a, b) => a.order_index - b.order_index);

  for (const slab of sortedSlabs) {
    if (remainingUnits <= 0 && slab.type === 'PER_UNIT') {
      // If no units left, we might still evaluate FIXED slabs if they apply at 0 units, 
      // but usually fixed slabs are for the first block or base charges.
      // Assuming a progressive consumption model where you fall into the slab if you reach its starting point.
      continue;
    }

    const slabSize = slab.to_unit ? (slab.to_unit - slab.from_unit + 1) : Infinity;
    
    // Check if we reached this slab
    if (unitsConsumed >= slab.from_unit) {
      if (slab.type === 'FIXED') {
        // A fixed charge applies regardless of exact units inside this block, 
        // as long as we reached this block. Some systems charge fixed base, others charge fixed up to N units.
        // E.g., 0-100 units = FIXED 1000 means if you consume 50, it's 1000. 
        // If you consume 150, the first 100 is 1000.
        // We deduct the slab size from remaining units.
        const unitsToDeduct = Math.min(remainingUnits, slabSize);
        totalAmount += slab.rate;
        items.push({
          description: `${slab.from_unit} - ${slab.to_unit || '∞'} units (Fixed)`,
          units: unitsToDeduct,
          amount: slab.rate,
          order_index: slab.order_index
        });
        remainingUnits -= unitsToDeduct;
      } else if (slab.type === 'PER_UNIT') {
        const unitsInSlab = Math.min(remainingUnits, slabSize);
        if (unitsInSlab > 0) {
          const amount = unitsInSlab * slab.rate;
          totalAmount += amount;
          items.push({
            description: `${unitsInSlab} units @ ${slab.rate}`,
            units: unitsInSlab,
            amount: amount,
            order_index: slab.order_index
          });
          remainingUnits -= unitsInSlab;
        }
      }
    }
  }

  return { totalAmount, items };
}
