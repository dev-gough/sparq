// Design Your System page
"use client";

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { calculate } from "@/lib/designMath";

type ProjectType = "Residential" | "Commercial" | "Industrial";
type GridType    = "On-grid"    | "Off-grid"   | "Water Pump";

type FormInputs = {
  region:          string;
  projectType:     ProjectType;
  gridType:        GridType;
  gridVoltage:     string;
  pvKw:            string;
  panelW:          string;
  panelMppVoltage: string;
};

export default function DesignPage() {
  const [form, setForm] = useState<FormInputs>({
    region:          "North America",
    projectType:     "Residential",
    gridType:        "On-grid",
    gridVoltage:     "",
    pvKw:            "",
    panelW:          "",
    panelMppVoltage: "",
  });

  const gridV     = parseFloat(form.gridVoltage)     || 0;
  const pvKwNum   = parseFloat(form.pvKw)            || 0;
  const panelWNum = parseFloat(form.panelW)          || 0;
  const panelMPP  = parseFloat(form.panelMppVoltage) || 0;

  const bomRaw = useMemo(() => {
    if (gridV <= 0 || pvKwNum <= 0 || panelWNum <= 0 || panelMPP <= 0) return [];
    return calculate({
      pvKw:    pvKwNum,
      panelW:  panelWNum,
      region:  form.region,
      voltage: gridV,
    });
  }, [gridV, pvKwNum, panelWNum, panelMPP, form.region]);

  const nameMap: Record<string,string> = {
    "Q2000-4102":   "Quad 2000 Single Phase Inverter",
    "Q3000-4301":   "Quad 3000 Three-Phase Inverter",
    "65020-01":     "Junction Box",
    "65020-05":     "Junction Box",
    "65015-09":     "T5 to T6 Cable 0.7m",
    "65015-17":     "T5 to T6 Cable 0.7m",
    "65013-16/17":  "T6 Female to Tee Male",
    "65013-08/09":  "T6 Female to Tee Male",
    "65015-10":     "T5 to T6 Cable 3m",
    "65015-18":     "T5 to T6 Cable 3m",
    "65012-14/15":  "T6 Tee Male to Open",
    "65012-02/03":  "T6 Tee Male to Open",
  };

  const isThreePhase = form.projectType === "Industrial" || form.gridType === "Water Pump";
  const inverterSku   = isThreePhase  ? "Q3000-4301" : "Q2000-4102";
  const modelLabel    = isThreePhase  ? "Q3000 Three-Phase Inverter" : "Q2000 Single-Phase Inverter";

  const bom = bomRaw.map(r => {
    if (r.label === "Inverter") {
      return { ...r, sku: inverterSku, label: modelLabel };
    }
    return r;
  });

  const inverterCount = bom.find(r => r.sku === inverterSku)?.qty ?? 0;

  const imageMap: Record<string,string> = {
    "Q2000-4102":   "/quad4inverter.png",
    "Q3000-4301":   "/quad4inverter.png",
    "65020-01":     "/junctionbox.png",
    "65020-05":     "/junctionbox.png",
    "65015-09":     "/type2cable.png",
    "65015-17":     "/type2cable.png",
    "65013-16/17":  "/t6ftom.png",
    "65013-08/09":  "/t6ftom.png",
    "65015-10":     "/type1cable.png",
    "65015-18":     "/type1cable.png",
    "65012-14/15":  "/opencable.png",
    "65012-02/03":  "/opencable.png",
  };

  async function handleDownload() {
    // 1) Create workbook & worksheet
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("System Summary");
  
    // 2) Hide gridlines
    ws.views = [{ showGridLines: false }];
  
    // 3) Fetch & embed logo at A1
    const logoResp = await fetch("/logo.png");
    const logoBuf  = await logoResp.arrayBuffer();
    const logoId   = wb.addImage({ buffer: logoBuf, extension: "png" });
    ws.addImage(logoId, {
      tl:  { col: 1, row: 1 },
      ext: { width: 110, height: 60 },
    });
  
    // 4) Common styling
    const headerFont = { bold: true, size: 12 };
    const thinBorder = { style: "thin", color: { argb: "FF000000" } };
  
    // 5) Company details
    ws.addRows([
      [],
      [],
      [],
      ["", "SPARQ Systems Inc."],
      ["", "945 Princess Street"],
      ["", "Kingston, ON, K7L 0E9"],
      ["", "Phone: (855) 947-7277"],
      ["", "Email: info@sparqsys.com"],
      [], // blank row
    ]);
    ws.getRow(6).getCell(2).font = { bold: true };

    // 6) System Summary header
    const sysHeader = ws.addRow(["", "System Summary", " ", " "]);
    sysHeader.font = headerFont;
    sysHeader.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (colNumber >= 2 && colNumber <= 4) {
        cell.border = { bottom: thinBorder };
      }
    });
  
    // 7) System specs
    ws.addRows([
      ["", "Region",         form.region],
      ["", "Project Type",   form.projectType],
      ["", "Grid Type",      form.gridType],
      ["", "Grid Voltage (V)", gridV],
      ["", "PV System Size (kW)",     pvKwNum],
      ["", "Panel Power @ STC (W)",  panelWNum],
      ["", "Panel MPP Voltage (V)",  panelMPP],
      [], // blank row
    ]);
  
    // 8) Split BOM
    const sparq  = bom.filter(r => !r.sku.startsWith("65020"));
    const third  = bom.filter(r =>  r.sku.startsWith("65020"));
  
    // 9) Bill of Materials header
    const bomHeader = ws.addRow(["", "Bill of Materials", " ", " "]);
    bomHeader.font = headerFont;
    bomHeader.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (colNumber >= 2 && colNumber <= 4) {
        cell.border = { bottom: thinBorder };
      }
    });
  
    // 10) SPARQ Products section
    const spHdr = ws.addRow(["", "SPARQ Products"]);
    spHdr.font = headerFont;
    ws.addRow(["", "Part ID", "Item", "Qty"]).font = headerFont;
    sparq.forEach(r => {
      ws.addRow(["", r.sku, nameMap[r.sku] ?? r.label, r.qty]);
    });
  
    // 11) Third-Party Products section
    ws.addRow([]); // spacer
    const thHdr = ws.addRow(["", "Third-Party Products"]);
    thHdr.font = headerFont;
    ws.addRow(["", "Part ID", "Item", "Qty"]).font = headerFont;
    third.forEach(r => {
      ws.addRow(["", r.sku, nameMap[r.sku] ?? r.label, r.qty]);
    });
  
    // 12) White-fill all cells
    ws.eachRow(row => {
      row.eachCell(cell => {
        cell.fill = {
          type:    "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFFFFF" },
        };
      });
    });
  
    // 13) Auto-size columns (A stays narrow; B–D grow to fit)
    ws.columns.forEach((col, idx) => {
      if (idx === 0) {
        col.width = 2;
      } else {
        let max = 10;
        col.eachCell({ includeEmpty: true }, cell => {
          const txt = (cell.value ?? "").toString();
          max = Math.max(max, txt.length);
        });
        col.width = max + 2;
      }
    });
  
    // 14) Write & download
    const buf  = await wb.xlsx.writeBuffer();
    const blob = new Blob([buf], { type: "application/octet-stream" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `sparq_system_summary_${Date.now()}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  return (
    <main className="text-sm">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-brand-maroon)] to-[var(--color-brand-darkmaroon)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <h1 className="text-3xl font-semibold text-[var(--color-brand-yellow)]">
            Design your System
          </h1>
          <p className="mt-2 text-sm">
            Enter your system specs to see your system requirements.
          </p>
          <Link
            href="https://pvwatts.nrel.gov/"
            target="_blank"
            className="mt-6 inline-block rounded bg-[var(--color-brand-maroon)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-brand-darkmaroon)]"
          >
            Don't know you solar output? Use the PVWatts Calculator to find out.
          </Link>
        </div>
      </section>

      {/* BODY */}
      <section className="mx-auto max-w-6xl space-y-10 px-4 pt-10 pb-6">

        {/* DESIGN DETAILS */}
        <div className="rounded-lg bg-[var(--color-brand-graytext)]/5 p-6 shadow space-y-6">
        <h2 className="text-xl font-semibold text-black">Design Details</h2>

        {/* 1st row: Region & Project Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
            label="Region"
            value={form.region}
            options={["North America","Europe","India","China","Africa"]}
            onChange={r => setForm(f => ({ ...f, region: r }))}
            />
            <SelectField
            label="Project Type"
            value={form.projectType}
            options={["Residential","Commercial","Industrial"]}
            onChange={pt => setForm(f => ({ ...f, projectType: pt as ProjectType }))}
            />
        </div>

        {/* 2nd row: Grid Type & Grid Voltage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
            label="Grid Type"
            value={form.gridType}
            options={["On-grid","Off-grid","Water Pump"]}
            onChange={g => setForm(f => ({ ...f, gridType: g as GridType }))}
            />
            <NumberField
            label="Grid Voltage (V)"
            value={form.gridVoltage}
            onChange={v => setForm(f => ({ ...f, gridVoltage: v }))}
            min={50}
            max={1000}
            />
        </div>

        {/* 3rd row: PV Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NumberField
            label="PV System Size (kW)"
            value={form.pvKw}
            onChange={v => setForm(f => ({ ...f, pvKw: v }))}
            min={1}
            max={10000}
            />
            <NumberField
            label="Panel Power @ STC (W)"
            value={form.panelW}
            onChange={v => setForm(f => ({ ...f, panelW: v }))}
            min={100}
            max={1000}
            />
            <NumberField
            label="Panel MPP Voltage (V)"
            value={form.panelMppVoltage}
            onChange={v => setForm(f => ({ ...f, panelMppVoltage: v }))}
            min={10}
            max={1000}
            />
        </div>
        </div>

        {/* BILL OF MATERIALS */}
        <div className="rounded-lg bg-[var(--color-brand-graytext)]/5 p-6 shadow space-y-4">
        <h2 className="text-xl font-semibold">Bill of Materials</h2>
        {bom.length > 0 ? (
            <div className="space-y-6 text-sm">
            <div>
                <h3 className="text-lg font-semibold mb-2">SPARQ Products</h3>
                <ul className="space-y-2">
                {bom.filter(r => !r.sku.startsWith("65020"))
                    .map(row => <BOMItem key={row.sku} row={row} imageMap={imageMap} />)}
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold">Third-Party Products</h3>
                <ul className="space-y-2">
                {bom.filter(r => r.sku.startsWith("65020"))
                    .map(row => <BOMItem key={row.sku} row={row} imageMap={imageMap} />)}
                </ul>
            </div>
            </div>
        ) : (
            <p className="text-[var(--color-brand-graytext)] text-sm">
            Please enter valid system parameters.
            </p>
        )}
        </div>

        {/* SYSTEM SUMMARY */}
        <aside className="rounded-lg bg-[var(--color-brand-graytext)]/5 p-6 shadow space-y-4 text-sm">
          <h2 className="text-xl font-semibold text-[var(--color-brand-graytext)]">System Summary</h2>
          <SummarySection title="Location & Grid">
            <SummaryRow label="Region"       value={form.region} />
            <SummaryRow label="Project Type" value={form.projectType} />
            <SummaryRow label="Grid Type"    value={form.gridType} />
            <SummaryRow label="Grid Voltage" value={`${gridV} V`} />
          </SummarySection>
          <SummarySection title="Panels & Inverter">
            <SummaryRow label="PV Size"      value={`${pvKwNum} kW`} />
            <SummaryRow label="Panel Power"  value={`${panelWNum} W`} />
            <SummaryRow label="MPP Voltage"  value={`${panelMPP} V`} />
            <SummaryRow label="Inverter"     value={modelLabel} />
            <SummaryRow label="Number of Inverters" value={inverterCount.toString()} />
          </SummarySection>
        </aside>
      </section>

      {/* ACTIONS */}
      <div className="flex justify-center space-x-4 pt-6 pb-12">
        <button onClick={handleDownload}
          className="rounded bg-[var(--color-brand-maroon)] px-8 py-4 text-sm text-white font-medium hover:bg-[var(--color-brand-darkmaroon)]">
          Download Summary
        </button>
        <Link href="/contact"
          className="rounded border-2 border-[var(--color-brand-maroon)] px-8 py-4 text-sm text-[var(--color-brand-maroon)] font-medium hover:bg-[var(--color-brand-maroon)] hover:text-white">
          Contact Us
        </Link>
      </div>
    </main>
  );
}

function BOMItem({
  row,
  imageMap,
}: {
  row: { label: string; qty: number; sku: string };
  imageMap: Record<string,string>;
}) {
  return (
    <li className="flex items-center gap-6 py-6">
      {imageMap[row.sku] ? (
        <Image
          src={imageMap[row.sku]}
          alt={row.label}
          width={96}
          height={96}
          className="rounded"
        />
      ) : (
        <div className="h-24 w-24 rounded bg-[var(--color-brand-gray)] flex items-center justify-center text-base text-[var(--color-brand-yellow)]">
          img
        </div>
      )}
      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-medium">{row.label}</h3>
        <p className="text-base">{row.sku}</p>
      </div>
      <span className="text-2xl font-semibold">{row.qty}</span>
    </li>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
  min?: number;
  max?: number;
}) {
  const num = parseFloat(value);
  const invalid =
    value !== "" &&
    (isNaN(num) || (min !== undefined && num < min) || (max !== undefined && num > max));
  const placeholder = min !== undefined && max !== undefined
    ? `Enter ${min}–${max}` : undefined;

  return (
    <label className="block text-base">
      <span className="mb-1	block font-medium text-[var(--color-brand-graytext)]">{label}</span>
      <input
        type="number"
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={e => onChange(e.target.value)}
        className={`
          w-full rounded-lg px-4 py-2 text-base placeholder:text-gray-400
          border ${invalid
            ? "border-red-500 focus:ring-red-500"
            : "border-[var(--color-brand-gray)] focus:ring-[var(--color-brand-yellow)]"
          } focus:outline-none
        `}      
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (s: string) => void;
}) {
  return (
    <label className="block text-base">
      <span className="mb-1	block font-medium text-[var(--color-brand-graytext)]">{label}</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-[var(--color-brand-gray)] px-4 py-2 text-base focus:border-[var(--color-brand-yellow)] focus:ring-[var(--color-brand-yellow)]"
      >
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function SummarySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="mb-2 text-base font-semibold text-[var(--color-brand-gray)]">{title}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-base">
      <span>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
