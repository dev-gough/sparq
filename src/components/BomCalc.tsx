// Design Your System page
"use client";

import ExcelJS from 'exceljs';
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { calculate } from "@/lib/designMath";

type ProjectType = "Residential" | "Commercial" | "Industrial";
type GridType = "On-grid" | "Off-grid" | "Water Pump";

type FormInputs = {
	region: string;
	projectType: ProjectType;
	projectName: string;
	gridType: GridType;
	gridVoltage: string;
	pvKw: string;
	panelW: string;
	panelMppVoltage: string;
};

export default function BoMCalc() {
	const [form, setForm] = useState<FormInputs>({
		region: "North America",
		projectType: "Residential",
		projectName: "",
		gridType: "On-grid",
		gridVoltage: "",
		pvKw: "",
		panelW: "",
		panelMppVoltage: "",
	});

	const gridV = parseFloat(form.gridVoltage) || 0;
	const pvKwNum = parseFloat(form.pvKw) || 0;
	const panelWNum = parseFloat(form.panelW) || 0;
	const panelMPP = parseFloat(form.panelMppVoltage) || 0;

	const bomRaw = useMemo(() => {
		if (gridV <= 0 || pvKwNum <= 0 || panelWNum <= 0 || panelMPP <= 0) return [];
		return calculate({
			pvKw: pvKwNum,
			panelW: panelWNum,
			region: form.region,
			voltage: gridV,
		});
	}, [gridV, pvKwNum, panelWNum, panelMPP, form.region]);

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

	const isThreePhase = form.projectType === "Industrial" || form.gridType === "Water Pump";
	const inverterSku = isThreePhase ? "Q3000-4301" : "Q2000-4102";
	const modelLabel = isThreePhase ? "Q3000 Three-Phase Inverter" : "Q2000 Single-Phase Inverter";

	const bom = bomRaw.map(r => {
		if (r.label === "Inverter") {
			return { ...r, sku: inverterSku, label: modelLabel };
		}
		return r;
	});

	const inverterCount = bom.find(r => r.sku === inverterSku)?.qty ?? 0;

	const imageMap: Record<string, string> = {
		"Q2000-4102": "/quad4inverter.png",
		"Q3000-4301": "/quad4inverter.png",
		"SL200-2001": "/sparqlinq.png",
		"65020-01": "/junctionbox.png",
		"65020-05": "/junctionbox.png",
		"65015-09": "/type2cable.png",
		"65015-17": "/type2cable.png",
		"65013-16/17": "/t6ftom.png",
		"65013-08/09": "/t6ftom.png",
		"65015-10": "/type1cable.png",
		"65015-18": "/type1cable.png",
		"65012-14/15": "/opencable.png",
		"65012-02/03": "/opencable.png",
	};

	async function handleDownload() {
		// 1) Create workbook & worksheet
		const wb = new ExcelJS.Workbook();
		const ws = wb.addWorksheet("System Summary");

		// 2) Hide gridlines
		ws.views = [{ showGridLines: false }];

		// 3) Fetch & embed logo at B2
		const logoResp = await fetch("/logo.png");
		const logoBuf = await logoResp.arrayBuffer();
		const logoId = wb.addImage({ buffer: logoBuf, extension: "png" });
		ws.addImage(logoId, {
			tl: { col: 1, row: 1 },
			ext: { width: 100, height: 60 },
		});

		// 4) Common styling
		const headerFont = { bold: true, size: 12 };
		// cast style to ExcelJS.BorderStyle
		const thinBorder: ExcelJS.Border = {
			style: 'thin' as ExcelJS.BorderStyle,
			color: { argb: "FF000000" }
		};

		// 5) Company details
		ws.addRows([
			[], [], [],
			["", "SPARQ Systems Inc."],
			["", "945 Princess Street"],
			["", "Kingston, ON, K7L 0E9"],
			["", "Phone: (855) 947-7277"],
			["", "Email: info@sparqsys.com"],
			[],
		]);
		// make SPARQ Systems Inc. bold
		ws.getRow(6).getCell(2).font = { bold: true };

		// 6) System Summary header
		const sysHeader = ws.addRow(["", "System Summary", "", ""]);
		sysHeader.font = headerFont;
		sysHeader.eachCell({ includeEmpty: true }, (cell, colNumber) => {
			if (colNumber >= 2 && colNumber <= 4) {
				cell.border = { bottom: thinBorder };
			}
		});

		// 7) System specs
		ws.addRows([
			["", "Region", form.region],
			["", "Project Type", form.projectType],
			["", "Project Name", form.projectName],
			["", "Project Date", new Date().toDateString()],
			["", "Grid Type", form.gridType],
			["", "Grid Voltage (V)", gridV],
			["", "PV System Size (kW)", pvKwNum],
			["", "Panel Power @ STC (W)", panelWNum],
			["", "Panel MPP Voltage (V)", panelMPP],
			[],
		]);

		// 8) Split BOM
		const sparq = bom.filter(r => !r.sku.startsWith("65020"));
		const third = bom.filter(r => r.sku.startsWith("65020"));

		// 9) Bill of Materials header
		const bomHeader = ws.addRow(["", "Bill of Materials", "", ""]);
		bomHeader.font = headerFont;
		bomHeader.eachCell({ includeEmpty: true }, (cell, colNumber) => {
			if (colNumber >= 2 && colNumber <= 4) {
				cell.border = { bottom: thinBorder };
			}
		});

		// 10) SPARQ Products section (with SparqLinq added)
		const spHdr = ws.addRow(["", "SPARQ Products"]);
		spHdr.font = headerFont;
		ws.addRow(["", "Part ID", "Item", "Qty"]).font = headerFont;

		sparq.forEach(r => {
			ws.addRow(["", r.sku, nameMap[r.sku] ?? r.label, r.qty]);
		});

		// 11) Third-Party Products section
		ws.addRow([]);
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
					type: "pattern",
					pattern: "solid",
					fgColor: { argb: "FFFFFFFF" },
				};
			});
		});

		// 13) Auto-size columns (A narrow; B–D grow)
		ws.columns.forEach((col, idx) => {
			if (idx === 0) {
				col.width = 2;
			} else {
				let max = 10;
				// cast to any to satisfy TS for eachCell
        		// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(col as any).eachCell({ includeEmpty: true }, (cell: any) => {
					const txt = (cell.value ?? "").toString();
					max = Math.max(max, txt.length);
				});
				col.width = max + 2;
			}
		});

		// 14) Write & download
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
		<div className="text-sm">


			{/* BODY */}
			<section className="mx-auto max-w-7xl space-y-10 px-4 pt-10 pb-6">

				{/* DESIGN DETAILS */}
				<div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-200 dark:border-gray-600 space-y-6">
					<h2 className="text-xl font-semibold text-brand-darkmaroon dark:text-brand-yellow">Design Details</h2>

					{/* 1st row: Region & Project Type & Project Name */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<SelectField
							label="Region"
							value={form.region}
							options={["North America", "Europe", "India", "China", "Africa"]}
							onChange={r => setForm(f => ({ ...f, region: r }))}
						/>
						<SelectField
							label="Project Type"
							value={form.projectType}
							options={["Residential", "Commercial", "Industrial"]}
							onChange={pt => setForm(f => ({ ...f, projectType: pt as ProjectType }))}
						/>
						<TextField
							label="Project Name"
							value={form.projectName}
							onChange={pn => setForm(f => ({ ...f, projectName: pn }))}
							placeholder="Enter project name"
						/>
					</div>

					{/* 2nd row: Grid Type & Grid Voltage */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<SelectField
							label="Grid Type"
							value={form.gridType}
							options={["On-grid", "Off-grid", "Water Pump"]}
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
				<div className="rounded-lg bg-white dark:bg-gray-800 px-6 pt-6 shadow-lg border border-gray-200 dark:border-gray-600 space-y-4">
					<h2 className="text-xl font-semibold text-brand-darkmaroon dark:text-brand-yellow">Bill of Materials</h2>
					{bom.length > 0 ? (
						<div className="space-y-6 p-2 text-sm">
							<div>
								<h3 className="text-lg font-semibold mb-2 text-brand-darkmaroon dark:text-brand-yellow">SPARQ Products</h3>
								<ul className="space-y-2">
									{bom.filter(r => !r.sku.startsWith("65020"))
										.map(row => <BOMItem key={row.sku} row={row} imageMap={imageMap} />)}
								</ul>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-brand-darkmaroon dark:text-brand-yellow">Third-Party Products</h3>
								<ul className="space-y-2">
									{bom.filter(r => r.sku.startsWith("65020"))
										.map(row => <BOMItem key={row.sku} row={row} imageMap={imageMap} />)}
								</ul>
							</div>
						</div>
					) : (
						<p className="text-brand-graytext dark:text-dark-text-secondary text-sm">
							Please enter valid system parameters.
						</p>
					)}
				</div>

				{/* SYSTEM SUMMARY */}
				<aside className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-200 dark:border-gray-600 space-y-4 text-sm">
					<h2 className="text-xl font-semibold text-brand-darkmaroon dark:text-brand-yellow">System Summary</h2>
					<SummarySection title="Location & Grid">
						<SummaryRow label="Region" value={form.region} />
						<SummaryRow label="Project Type" value={form.projectType} />
						<SummaryRow label="Grid Type" value={form.gridType} />
						<SummaryRow label="Grid Voltage" value={`${gridV} V`} />
					</SummarySection>
					<SummarySection title="Panels & Inverter">
						<SummaryRow label="PV Size" value={`${pvKwNum} kW`} />
						<SummaryRow label="Panel Power" value={`${panelWNum} W`} />
						<SummaryRow label="MPP Voltage" value={`${panelMPP} V`} />
						<SummaryRow label="Inverter" value={modelLabel} />
						<SummaryRow label="Number of Inverters" value={inverterCount.toString()} />
					</SummarySection>
				</aside>
			</section>

			{/* ACTIONS */}
			<div className="flex justify-center space-x-4 pt-6 pb-12">
				<button onClick={handleDownload}
					className="rounded-xl bg-gradient-to-r from-brand-maroon to-brand-darkmaroon px-8 py-4 text-sm text-white font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer">
					Download Summary
				</button>
				<Link href="/contact"
					className="rounded-xl border-2 border-brand-maroon dark:border-brand-yellow px-8 py-4 text-sm text-brand-maroon dark:text-brand-yellow font-semibold hover:bg-brand-maroon dark:hover:bg-brand-yellow hover:text-white dark:hover:text-gray-900 transition-all duration-300">
					Contact Us
				</Link>
			</div>
		</div>
	);
}

function BOMItem({
	row,
	imageMap,
}: {
	row: { label: string; qty: number; sku: string };
	imageMap: Record<string, string>;
}) {
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

function TextField({
	label,
	value,
	onChange,
	placeholder,
}: {
	label: string;
	value: string;
	onChange: (s: string) => void;
	placeholder?: string;
}) {
	return (
		<label className="block text-base">
			<span className="mb-1	block font-medium text-brand-graytext dark:text-dark-text-secondary">{label}</span>
			<input
				type="text"
				value={value}
				placeholder={placeholder}
				onChange={e => onChange(e.target.value)}
				className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-base placeholder:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-dark-text-primary focus:border-brand-yellow focus:ring-brand-yellow focus:outline-none transition-colors"
			/>
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
