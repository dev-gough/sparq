// lib/designMath.ts
export type Inputs = {
    pvKw: number;          // H4
    panelW: number;        // I4
    region: string;        // K4
  };
  
  export type Outputs = {
    totalInverters: number;
    junctionBoxes: number;
    cable0_7m: number;
    cable2_4m: number;
    cable3m: 1;
    pn0_7m: string;
    pn2_4m: string;
    pn3m:   string;
    pnT6Tee: string;
  };
  
  export function calculate({ pvKw, panelW, region }: Inputs): Outputs {
    const totalInverters = Math.floor((pvKw * 1000) / (4 * panelW));
    const junctionBoxes  = Math.ceil(totalInverters / 3);
    const cable0_7m      = Math.max(totalInverters - 1, 0);
    const cable2_4m      = Math.max(totalInverters - 2, 0);
    const cable3m        = 1 as const;
  
    const na = /north|usa|canada|mexico/i.test(region);
    return {
      totalInverters,
      junctionBoxes,
      cable0_7m,
      cable2_4m,
      cable3m,
      pn0_7m : na ? "65015-09"              : "65015-17",
      pn2_4m: na ? "65013-16 / 65013-17"   : "65013-08 / 65013-09",
      pn3m  : na ? "65015-10"              : "65015-18",
      pnT6Tee: na ? "65012-14 / 65012-15"  : "65012-02 / 65012-03",
    };
  }
  