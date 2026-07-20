// Design Your System page
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { calculate, type Row } from "@/lib/designMath";

type ProjectType = "Residential" | "Commercial" | "Industrial";
type GridType = "On-grid" | "Off-grid" | "Water Pump";

type FormInputs = {
    projectName: string;
    region: string;
    projectType: ProjectType;
    gridType: GridType;
    Vgrid: string;
    Pgrid: string;
    Ppv: string;
    Ppanel: string;
    Vpanel: string;
    Iscpanel: string;
};

const initialForm: FormInputs = {
    projectName: "",
    region: "North America",
    projectType: "Residential",
    gridType: "On-grid",
    Vgrid: "",
    Pgrid: "",
    Ppv: "",
    Ppanel: "",
    Vpanel: "",
    Iscpanel: "",
};

export default function BoMCalc() {
    const [form, setForm] = useState<FormInputs>(initialForm);
    const [bom, setBom] = useState<Row[]>([]);
    const [showBom, setShowBom] = useState(false);

    // numbers
    const Pgrid = +form.Pgrid || 0;
    const Vgrid = +form.Vgrid || 0;
    const Ppv = +form.Ppv || 0;
    const Ppanel = +form.Ppanel || 0;
    const Vpanel = +form.Vpanel || 0;
    const Iscpanel = +form.Iscpanel || 0;

    const ratio = Pgrid > 0 ? Ppv / Pgrid : NaN;

    // compatibility
    const SystemOK =
        Vpanel <= 68 &&
        Ppanel >= 400 &&
        Ppanel <= 750 &&
        Iscpanel <= 20 &&
        ratio > 0.999 &&
        ratio < 1.4001;

    const panelFailReasons: string[] = [];
    if (Vpanel > 68) panelFailReasons.push("Panel Voc Too High! Voc must be within 20V-68V range");
    if (Ppanel > 750) panelFailReasons.push("Panel STC Power Too High! Must be less than 750W");
    if (Ppanel < 400) panelFailReasons.push("Undersized PV panel! Suggestion: Use higher power panel");
    if (Iscpanel > 20) panelFailReasons.push("Panel Isc Too High! Must be less than 20A");
    if (Ppv / Pgrid > 1.4001) panelFailReasons.push("Oversized DC Side! Suggestion: Increase AC side for better PV/microinverter utilization")
    if (Ppv / Pgrid < 0.999) panelFailReasons.push("Undersized DC Side! Suggestion: Increase DC side for better microinverter utilization ")

    // inverter choice
    const isThreePhase = form.projectType === "Industrial" || form.gridType === "Water Pump";
    const inverterSku = isThreePhase ? "Q3000-4301" : "Q2000-4102";
    const modelLabel = isThreePhase ? "Q3000 Three-Phase Inverter" : "Q2000 Single-Phase Inverter";

    // required fields
    const requiredKeys: (keyof FormInputs)[] = [
        "Pgrid",
        "Vgrid",
        "Ppv",
        "Ppanel",
        "Vpanel",
        "Iscpanel",
        "region",
        "projectType",
        "gridType",
    ];
    const allFilled = requiredKeys.every(k => (form[k] ?? "").toString().trim() !== "");
    const showStatus = allFilled;

    // Check if any input field has been filled to show System Summary
    const inputKeys: (keyof FormInputs)[] = ["Pgrid", "Vgrid", "Ppv", "Ppanel", "Vpanel", "Iscpanel"];
    const hasAnyInput = inputKeys.some(k => (form[k] ?? "").toString().trim() !== "");

    const handleGenerate = () => {
        if (!allFilled) return; // block if not all fields
        if (!(Pgrid > 0 && Vgrid > 0 && Ppv > 0 && Ppanel > 0)) {
            setBom([]);
            setShowBom(false);
            return;
        }
        const result = calculate({ Pgrid, Vgrid, Ppv, Ppanel, region: form.region });
        const mapped = result.map(r =>
            r.label === "Inverter" ? { ...r, sku: inverterSku, label: modelLabel } : r
        );
        setBom(mapped);
        setShowBom(true);
    };

    const handleClear = () => {
        setForm(initialForm);
        setBom([]);
        setShowBom(false);
    };

    const inverterCount = bom.find(r => r.sku === inverterSku)?.qty ?? 0;

    const nameMap: Record<string, string> = {
        "Q2000-4102": "Quad 2000 Single Phase Inverter",
        "Q3000-4301": "Quad 3000 Three-Phase Inverter",
        "65020-01": "Junction Box",
        "65020-05": "Junction Box",
        "65015-09": "T5 to T6 Cable 0.7m",
        "65015-17": "T5 to T6 Cable 0.7m",
        "65013-16/17": "T6 Female to Tee Male",
        "65013-08/09": "T6 Female to Tee Male",
        "65015-10": "T5 to T6 Cable 3m",
        "65015-18": "T5 to T6 Cable 3m",
        "65012-14/15": "T6 Tee Male to Open",
        "65012-02/03": "T6 Tee Male to Open",
    };

    const imageMap: Record<string, string> = {
        "Q2000-4102": "/quad4inverter.webp",
        "Q3000-4301": "/quad4inverter.webp",
        "SL200-2001": "/sparqlinq.webp",
        "65020-01": "/junctionbox.webp",
        "65020-05": "/junctionbox.webp",
        "65015-09": "/type2cable.webp",
        "65015-17": "/type2cable.webp",
        "65013-16/17": "/t6ftom.webp",
        "65013-08/09": "/t6ftom.webp",
        "65015-10": "/type1cable.webp",
        "65015-18": "/type1cable.webp",
        "65012-14/15": "/opencable.webp",
        "65012-02/03": "/opencable.webp",
        "SOLAR-PANEL": "/bompanel.webp",
    };

    async function handleDownload() {
        // Dynamically import ExcelJS to avoid SSR issues
        const ExcelJS = (await import('exceljs')).default;

        // Create workbook & worksheet
        const wb = new ExcelJS.Workbook();
        const ws = wb.addWorksheet("System Summary");

        // Add logo
        ws.views = [{ showGridLines: false }];
        const logoResp = await fetch("/logo.png");
        const logoBuf = await logoResp.arrayBuffer();
        const logoId = wb.addImage({ buffer: logoBuf, extension: "png" });
        ws.addImage(logoId, { tl: { col: 1, row: 1 }, ext: { width: 100, height: 60 } });

        // Styling
        const headerFont = { bold: true, size: 12 };
        const thinBorder = { style: 'thin' as const, color: { argb: "FF000000" } };

        // Company details
        ws.addRows([
            [], [], [],
            ["", "SPARQ Systems Inc."],
            ["", "945 Princess Street"],
            ["", "Kingston, ON, K7L 0E9"],
            ["", "Phone: (855) 947-7277"],
            ["", "Email: info@sparqsys.com"],
            [],
        ]);
        ws.getRow(6).getCell(2).font = { bold: true };

        // System summary header
        const sysHeader = ws.addRow(["", "System Summary", "", ""]);
        sysHeader.font = headerFont;
        sysHeader.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            if (colNumber >= 2 && colNumber <= 4) {
                cell.border = { bottom: thinBorder };
            }
        });

        // System specs
        const generationDate = new Date().toLocaleString();
        ws.addRows([
            ["", "Project Name", form.projectName || "Untitled Project"],
            ["", "Report Generated", generationDate],
            [""],
            ["", "Region", form.region],
            ["", "Project Type", form.projectType],
            ["", "Grid Type", form.gridType],
            ["", "Grid System Size (kW)", Pgrid],
            ["", "Grid Voltage (VAC)", Vgrid],
            ["", "PV System Size (kW)", Ppv],
            ["", "Panel STC Power (W)", Ppanel],
            ["", "Panel STC Voltage (V)", Vpanel],
            ["", "Panel Short Circuit Current (Isc)", Iscpanel],
            [""]
        ]);

        // BOM
        const sparq = bom.filter(r => !r.sku.startsWith("65020") && r.sku !== "SOLAR-PANEL");
        const third = bom.filter(r => r.sku.startsWith("65020") || r.sku === "SOLAR-PANEL");
        const bomHeader = ws.addRow(["", "Bill of Materials", "", ""]);
        bomHeader.font = headerFont;
        bomHeader.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            if (colNumber >= 2 && colNumber <= 4) {
                cell.border = { bottom: thinBorder };
            }
        });

        // sparq products
        const spHdr = ws.addRow(["", "SPARQ Products"]);
        spHdr.font = headerFont;
        ws.addRow(["", "Part ID", "Item", "Qty"]).font = headerFont;
        sparq.forEach(r => { ws.addRow(["", r.sku, nameMap[r.sku] ?? r.label, r.qty]) });

        // third party products
        ws.addRow([]);
        const thHdr = ws.addRow(["", "Third-Party Products"]);
        thHdr.font = headerFont;
        ws.addRow(["", "Part ID", "Item", "Qty"]).font = headerFont;
        third.forEach(r => { ws.addRow(["", r.sku, nameMap[r.sku] ?? r.label, r.qty]) });

        // Formatting
        ws.eachRow(row => {
            row.eachCell(cell => {
                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFFFF" } };
            });
        });
        ws.columns.forEach((col, idx) => {
            if (idx === 0) {
                col.width = 2;
            } else {
                let max = 10;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (col as any).eachCell({ includeEmpty: true }, (cell: any) => {
                    const txt = (cell.value ?? "").toString();
                    max = Math.max(max, txt.length);
                });
                col.width = max + 2;
            }
        });

        // Write & download
        const buf = await wb.xlsx.writeBuffer();
        const blob = new Blob([buf], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `sparq_system_summary_${Date.now()}.xlsx`;
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <main className="text-sm">
            {/* BODY */}
            <section className="mx-auto max-w-7xl space-y-10 px-4 pt-0 pb-6">

                {/* DESIGN DETAILS */}
                <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-200 dark:border-gray-600 space-y-6">
                    <h2 className="text-xl font-semibold text-brand-darkmaroon dark:text-brand-yellow">Design Details</h2>

                    {/* PROJECT NAME */}
                    <div className="grid grid-cols-1 gap-4">
                        <TextField
                            label="Project Name"
                            value={form.projectName}
                            onChange={v => setForm(f => ({ ...f, projectName: v }))}
                            placeholder="Enter project name (optional)"
                        />
                    </div>

                    {/* REGION/PROJECT TYPE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField
                            label="Region"
                            value={form.region}
                            options={["North America", "Europe", "India", "China", "Africa", "Middle-East"]}
                            onChange={r => setForm(f => ({ ...f, region: r }))}
                        />
                        <SelectField
                            label="Project Type"
                            value={form.projectType}
                            options={["Residential", "Commercial", "Industrial"]}
                            onChange={pt => setForm(f => ({ ...f, projectType: pt as ProjectType }))}
                        />
                    </div>

                    {/* GRID SPECS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SelectField
                            label="Grid Type"
                            value={form.gridType}
                            options={["On-grid", "Off-grid", "Water Pump"]}
                            onChange={g => setForm(f => ({ ...f, gridType: g as GridType }))}
                        />
                        <NumberField
                            label="AC System Size (kW)"
                            value={form.Pgrid}
                            onChange={v => setForm(f => ({ ...f, Pgrid: v }))}
                            min={0}
                            max={200}
                        />
                        <NumberField
                            label="AC Grid Voltage (VAC)"
                            value={form.Vgrid}
                            onChange={v => setForm(f => ({ ...f, Vgrid: v }))}
                            min={0}
                            max={500}
                        />
                    </div>

                    {/* PV SPECS */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <NumberField
                            label="PV System Size (kW)"
                            value={form.Ppv}
                            onChange={v => setForm(f => ({ ...f, Ppv: v }))}
                            min={0}
                            max={200}
                        />
                        <NumberField
                            label="Panel STC Power (W)"
                            value={form.Ppanel}
                            onChange={v => setForm(f => ({ ...f, Ppanel: v }))}
                            min={400}
                            max={750}
                        />
                        <NumberField
                            label="Panel STC Voltage (V)"
                            value={form.Vpanel}
                            onChange={v => setForm(f => ({ ...f, Vpanel: v }))}
                            min={20}
                            max={70}
                        />
                        <NumberField
                            label="Panel Short Circuit Current (Isc)"
                            value={form.Iscpanel}
                            onChange={v => setForm(f => ({ ...f, Iscpanel: v }))}
                            min={0}
                            max={20}
                        />
                    </div>

                    {/* BUTTONS + STATUS */}
                    <div className="flex flex-col gap-3 md:flex-row md:items-start">
                        {showStatus && (
                            <div
                                className={`max-w-xl rounded-md border px-4 py-2 text-sm leading-5 ${SystemOK
                                    ? "border-green-200 bg-green-50 text-green-700 dark:border-green-600/40 dark:bg-green-900/30 dark:text-green-300"
                                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-600/40 dark:bg-red-900/30 dark:text-red-300"
                                    }`}
                            >
                                {SystemOK ? (
                                    <span className="font-medium">
                                        Panel is compatible. System sizing acceptable.
                                    </span>
                                ) : (
                                    <ul className="ml-4 list-disc space-y-0.5">
                                        {panelFailReasons.map((reason, i) => (
                                            <li key={i}>{reason}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        <div className="ml-auto flex gap-3">
                            <button type="button"
                                onClick={handleClear}
                                className="rounded border border-gray-300 dark:border-gray-600 px-5 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Clear
                            </button>
                            <button type="button"
                                onClick={handleGenerate}
                                disabled={!allFilled}
                                className={`rounded px-6 py-3 text-sm font-medium transition ${allFilled
                                    ? "bg-[var(--color-brand-maroon)] text-white hover:bg-[var(--color-brand-darkmaroon)] dark:bg-brand-yellow dark:text-gray-900 dark:hover:bg-brand-yellow/80"
                                    : "cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-500"
                                    }`}
                            >
                                Generate Bill of Materials
                            </button>
                        </div>
                    </div>
                </div>

                {/* BILL OF MATERIALS */}
                {showBom && (
                    <div className="rounded-lg bg-white dark:bg-gray-800 px-6 pt-6 shadow-lg border border-gray-200 dark:border-gray-600 space-y-4">
                        <h2 className="text-xl font-semibold text-brand-darkmaroon dark:text-brand-yellow">Bill of Materials</h2>
                        {bom.length > 0 ? (
                            <div className="space-y-6 p-2 text-sm">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-brand-darkmaroon dark:text-brand-yellow">SPARQ Products</h3>
                                    <ul className="space-y-2">
                                        {bom.filter(r => !r.sku.startsWith("65020") && r.sku !== "SOLAR-PANEL")
                                            .map(row => <BOMItem key={row.sku} row={row} imageMap={imageMap} />)}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-brand-darkmaroon dark:text-brand-yellow">Third-Party Products</h3>
                                    <ul className="space-y-2">
                                        {bom.filter(r => r.sku.startsWith("65020") || r.sku === "SOLAR-PANEL")
                                            .map(row => row.sku === "SOLAR-PANEL" ?
                                                <BOMItem key={row.sku} row={{ ...row, sku: `${Ppanel}W, ${Vpanel}V, ${Iscpanel}A` }} imageMap={{ ...imageMap, [`${Ppanel}W, ${Vpanel}V, ${Iscpanel}A`]: "/bompanel.webp" }} /> :
                                                <BOMItem key={row.sku} row={row} imageMap={imageMap} />
                                            )}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <p className="text-brand-graytext dark:text-dark-text-secondary text-sm pb-2">
                                Please enter valid system parameters.
                            </p>
                        )}
                    </div>
                )}

                {/* SYSTEM SUMMARY */}
                {hasAnyInput && (
                    <aside className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-200 dark:border-gray-600 space-y-4 text-sm">
                        <h2 className="text-xl font-semibold text-brand-darkmaroon dark:text-brand-yellow">System Summary</h2>
                        {form.projectName && (
                            <SummarySection title="Project">
                                <SummaryRow label="Project Name" value={form.projectName} />
                            </SummarySection>
                        )}
                        <SummarySection title="Location & Grid">
                            <SummaryRow label="Region" value={form.region} />
                            <SummaryRow label="Project Type" value={form.projectType} />
                            <SummaryRow label="Grid Type" value={form.gridType} />
                            <SummaryRow label="Grid Voltage" value={`${Vgrid} V`} />
                        </SummarySection>
                        <SummarySection title="Panels & Inverter">
                            <SummaryRow label="PV System Size" value={`${Ppv} kW`} />
                            <SummaryRow label="AC System Size" value={`${Pgrid} kW`} />
                            <SummaryRow label="Panel STC Power" value={`${Ppanel} W`} />
                            <SummaryRow label="Panel STC Voltage" value={`${Vpanel} V`} />
                            <SummaryRow label="Panel Isc" value={`${Iscpanel} A`} />
                            <SummaryRow label="Inverter Model" value={modelLabel} />
                            <SummaryRow label="Inverter Quantity" value={inverterCount.toString()} />
                            <SummaryRow label={`Panel Quantity (${Ppanel}W)`} value={(4 * inverterCount).toString()} />
                        </SummarySection>
                    </aside>
                )}
            </section>

            {/* ACTIONS */}
            {hasAnyInput && (

                <div className="flex justify-center space-x-4 pt-6 pb-12">
                    <button type="button" onClick={handleDownload}
                        className="rounded-xl bg-gradient-to-r from-brand-maroon to-brand-darkmaroon px-8 py-4 text-sm text-white font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer">
                        Download Summary
                    </button>
                    <Link href="/contact"
                        className="rounded-xl border-2 border-brand-maroon dark:border-brand-yellow px-8 py-4 text-sm text-brand-maroon dark:text-brand-yellow font-semibold hover:bg-brand-maroon dark:hover:bg-brand-yellow hover:text-white dark:hover:text-gray-900 transition-all duration-300">
                        Contact Us
                    </Link>
                </div>
            )}
        </main>
    );
}

function BOMItem({ row, imageMap }: { row: { label: string; qty: number; sku: string }; imageMap: Record<string, string> }) {
    return (
        <li className="flex items-center gap-6 py-6 border-b border-gray-100 dark:border-gray-600 last:border-b-0">
            {imageMap[row.sku] ? (
                <Image
                    src={imageMap[row.sku]}
                    alt={row.label}
                    width={96}
                    height={96}
                    className="rounded bg-gray-50 dark:bg-gray-700"
                />
            ) : (
                <div className="h-24 w-24 rounded bg-brand-gray dark:bg-gray-700 flex items-center justify-center text-base text-brand-yellow">
                    img
                </div>
            )}
            <div className="flex-1 space-y-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary">{row.label}</h3>
                <p className="text-base text-brand-graytext dark:text-dark-text-secondary">{row.sku}</p>
            </div>
            <span className="text-2xl font-semibold text-brand-darkmaroon dark:text-brand-yellow">{row.qty}</span>
        </li>
    );
}

function NumberField({ label, value, onChange, min, max }: { label: string; value: string; onChange: (s: string) => void; min?: number; max?: number }) {
    const num = parseFloat(value);
    const invalid = value !== "" && (isNaN(num) || (min !== undefined && num < min) || (max !== undefined && num > max));
    const placeholder = min !== undefined && max !== undefined ? `Enter ${min}–${max}` : undefined;

    return (
        <label className="block text-base">
            <span className="mb-1	block font-medium text-brand-graytext dark:text-dark-text-secondary">{label}</span>
            <input
                type="number"
                value={value}
                placeholder={placeholder}
                min={min}
                max={max}
                onChange={e => onChange(e.target.value)}
                className={`
          w-full rounded-lg px-4 py-2 text-base placeholder:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-dark-text-primary
          border ${invalid
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:ring-brand-yellow focus:border-brand-yellow"
                    } focus:outline-none transition-colors
        `}
            />
        </label>
    );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (s: string) => void }) {
    return (
        <label className="block text-base">
            <span className="mb-1	block font-medium text-brand-graytext dark:text-dark-text-secondary">{label}</span>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-dark-text-primary focus:border-brand-yellow focus:ring-brand-yellow focus:outline-none transition-colors"
            >
                {options.map(o => (
                    <option key={o} value={o}>{o}</option>
                ))}
            </select>
        </label>
    );
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (s: string) => void; placeholder?: string }) {
    return (
        <label className="block text-base">
            <span className="mb-1	block font-medium text-brand-graytext dark:text-dark-text-secondary">{label}</span>
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-dark-text-primary focus:border-brand-yellow focus:ring-brand-yellow focus:outline-none transition-colors"
            />
        </label>
    );
}

function SummarySection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-4 last:mb-0">
            <p className="mb-2 text-base font-semibold text-brand-gray dark:text-brand-yellow">{title}</p>
            <div className="space-y-1">{children}</div>
        </div>
    );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between text-base text-gray-700 dark:text-dark-text-secondary">
            <span>{label}</span>
            <span className="font-medium text-gray-900 dark:text-dark-text-primary">{value}</span>
        </div>
    );
}
