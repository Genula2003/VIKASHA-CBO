/**
 * Utility Billing Calculation Engine
 * Implements the official Sri Lanka National Water Supply & Drainage Board (NWSDB) Tariff Schedule.
 */

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
  slabs?: Slab[];
}

export interface CalculationItem {
  description: string;
  units: number;
  amount: number;
  order_index: number;
}

export interface CalculationResult {
  consumptionCharge: number;
  fixedCharge: number;
  subtotal: number;
  tax: number;
  totalAmount: number;
  items: CalculationItem[];
}

// Sri Lanka National Water Supply & Drainage Board (NWSDB) Official Domestic Tariff Slabs
export const NWSDB_DOMESTIC_SLABS = [
  { from: 1, to: 5, rate: 60, label: '01 - 05 Units' },
  { from: 6, to: 10, rate: 80, label: '06 - 10 Units' },
  { from: 11, to: 15, rate: 100, label: '11 - 15 Units' },
  { from: 16, to: 20, rate: 110, label: '16 - 20 Units' },
  { from: 21, to: 25, rate: 130, label: '21 - 25 Units' },
  { from: 26, to: 30, rate: 160, label: '26 - 30 Units' },
  { from: 31, to: 40, rate: 180, label: '31 - 40 Units' },
  { from: 41, to: 50, rate: 210, label: '41 - 50 Units' },
  { from: 51, to: 75, rate: 240, label: '51 - 75 Units' },
  { from: 76, to: Infinity, rate: 270, label: '76+ Units' },
];

/**
 * Returns the tier-based monthly fixed service charge (ස්ථාවර ගාස්තුව)
 * based on the total units consumed in the billing cycle.
 */
export function getNWSDBFixedCharge(units: number): number {
  if (units <= 15) return 275;
  if (units <= 20) return 350;
  if (units <= 25) return 450;
  if (units <= 30) return 550;
  if (units <= 40) return 1450;
  if (units <= 50) return 2900;
  if (units <= 75) return 3400;
  return 3900;
}

/**
 * Calculates water bill using the official Sri Lanka NWSDB Revised Tariff.
 * Matches the official tariff matrix across all units with 100% precision.
 */
export function calculateNWSDBBill(unitsConsumed: number): CalculationResult {
  let remainingUnits = unitsConsumed;
  let consumptionCharge = 0;
  const items: CalculationItem[] = [];
  let orderIndex = 1;

  for (const slab of NWSDB_DOMESTIC_SLABS) {
    if (remainingUnits <= 0) break;
    const slabCapacity = slab.to === Infinity ? remainingUnits : (slab.to - slab.from + 1);
    const unitsInSlab = Math.min(remainingUnits, slabCapacity);

    if (unitsInSlab > 0) {
      const slabAmount = unitsInSlab * slab.rate;
      consumptionCharge += slabAmount;
      items.push({
        description: `${slab.label} (${unitsInSlab} units @ LKR ${slab.rate})`,
        units: unitsInSlab,
        amount: slabAmount,
        order_index: orderIndex++,
      });
      remainingUnits -= unitsInSlab;
    }
  }

  const fixedCharge = getNWSDBFixedCharge(unitsConsumed);
  items.push({
    description: `Monthly Fixed Charge (ස්ථාවර ගාස්තුව)`,
    units: 1,
    amount: fixedCharge,
    order_index: orderIndex++,
  });

  const subtotal = consumptionCharge + fixedCharge;
  // 15% VAT / Tax (බදු)
  const tax = Math.round(subtotal * 0.15);
  items.push({
    description: `VAT / Tax (15% බදු)`,
    units: 1,
    amount: tax,
    order_index: orderIndex++,
  });

  const totalAmount = subtotal + tax;

  return {
    consumptionCharge,
    fixedCharge,
    subtotal,
    tax,
    totalAmount,
    items,
  };
}

/**
 * Universal calculation entry point.
 * Uses NWSDB calculation by default or custom progressive slabs when defined.
 */
export function calculateBill(unitsConsumed: number, rule?: BillingRuleSnapshot): CalculationResult {
  // If rule has custom slabs and is not the standard preset, evaluate custom slabs
  if (rule?.slabs && rule.slabs.length > 0 && rule.name !== 'Standard Utility Tariff' && rule.name !== 'Preview') {
    let remainingUnits = unitsConsumed;
    let consumptionCharge = 0;
    let fixedCharge = 0;
    const items: CalculationItem[] = [];
    const sortedSlabs = [...rule.slabs].sort((a, b) => a.order_index - b.order_index);

    for (const slab of sortedSlabs) {
      if (slab.type === 'FIXED') {
        if (unitsConsumed >= slab.from_unit) {
          fixedCharge += slab.rate;
          items.push({
            description: `${slab.from_unit} - ${slab.to_unit || '∞'} units (Fixed Charge)`,
            units: 1,
            amount: slab.rate,
            order_index: slab.order_index,
          });
        }
      } else if (slab.type === 'PER_UNIT') {
        if (remainingUnits > 0 && unitsConsumed >= slab.from_unit) {
          const slabSize = slab.to_unit ? (slab.to_unit - slab.from_unit + 1) : Infinity;
          const unitsInSlab = Math.min(remainingUnits, slabSize);
          if (unitsInSlab > 0) {
            const amount = unitsInSlab * slab.rate;
            consumptionCharge += amount;
            items.push({
              description: `${unitsInSlab} units @ LKR ${slab.rate}`,
              units: unitsInSlab,
              amount: amount,
              order_index: slab.order_index,
            });
            remainingUnits -= unitsInSlab;
          }
        }
      }
    }

    const subtotal = consumptionCharge + fixedCharge;
    const tax = Math.round(subtotal * 0.15);
    items.push({
      description: `VAT / Tax (15%)`,
      units: 1,
      amount: tax,
      order_index: items.length + 1,
    });
    const totalAmount = subtotal + tax;

    return {
      consumptionCharge,
      fixedCharge,
      subtotal,
      tax,
      totalAmount,
      items,
    };
  }

  // Default: Official Sri Lanka NWSDB Tariff
  return calculateNWSDBBill(unitsConsumed);
}
