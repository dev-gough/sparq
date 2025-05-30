export type Inputs = {
    pvKw:     number;
    panelW:   number;
    region:   string;
    voltage:  number;
  };
  
  export interface Row {
    label: string;
    qty:   number;
    sku:   string;
  }
  
  export function calculate({ pvKw, panelW, region, voltage }: Inputs): Row[] {
    const na = /north|usa|canada|mexico/i.test(region);
  
    const totalInverters = Math.floor((pvKw * 1000) / (4 * panelW));
  
    // avoid division by zero
    let trunkLimit = Math.floor(30 / Math.ceil(2000 / voltage));
    if (trunkLimit < 1) trunkLimit = 1;
  
    const junctionBoxes = Math.ceil(totalInverters / trunkLimit);
  
    return [
      { label: "Inverter",             qty: totalInverters,        sku: "Q2000-4102" },
      { label: "SparqLinq Controller", qty: 1, sku: "SL200-2001"},
      { label: "Junction box",         qty: junctionBoxes,         sku: na ? "65020-01" : "65020-05" },
      { label: "T5 to T6 Cable 0.7m",   qty: Math.max(totalInverters - 1, 0), sku: na ? "65015-09" : "65015-17" },
      { label: "T6 Female to Tee Male", qty: Math.max(totalInverters - 2, 0), sku: na ? "65013-16/17" : "65013-08/09" },
      { label: "T5 to T6 Cable 3m",      qty: 1,                      sku: na ? "65015-10" : "65015-18" },
      { label: "T6 Tee Male to Open",       qty: 1,                      sku: na ? "65012-14/15" : "65012-02/03" },
    ];
  }
  