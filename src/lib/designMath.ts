// lib/designMath.ts
export type Inputs = {
    pvKw: number;
    panelW: number;
    region: string;
    voltage: number;
  };

export interface Row {
  label: string;
  qty: number;
  sku: string;
}

export function calculate({ pvKw, panelW, region, voltage }: Inputs): Row[] {
    const na = /north|usa|canada|mexico/i.test(region);
    const totalInverters = Math.floor((pvKw * 1000) / (4 * panelW));
  
    const junctionBoxes = Math.ceil(totalInverters / Math.floor(30 / Math.ceil(2000 / voltage)));
  
    return [
      { label: "Inverter", qty: totalInverters, sku: "Q2000-INV" },
      { label: "Junction box", qty: junctionBoxes, sku: na ? "65020-01" : "65020-05" },
      { label: "0.7 m Type-2 cable", qty: Math.max(totalInverters - 1, 0), sku: na ? "65015-09" : "65015-17" },
      { label: "2 m / 4 m T6-female cable", qty: Math.max(totalInverters - 2, 0), sku: na ? "65013-16/17" : "65013-08/09" },
      { label: "3 m trunk cable", qty: 1, sku: na ? "65015-10" : "65015-18" },
      { label: "T6-Tee to open", qty: 1, sku: na ? "65012-14/15" : "65012-02/03" }
    ];
  }
  