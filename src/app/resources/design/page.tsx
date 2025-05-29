// src/app/resources/design/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react"; // Added useEffect
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { calculate, Inputs as CalcInputs } from "@/lib/designMath"; // Renamed Inputs to CalcInputs to avoid conflict

// Define more specific types for form inputs that are numbers
type FormInputs = Omit<CalcInputs, 'pvKw' | 'panelW' | 'voltage'> & {
  pvKw: number;
  panelW: number;
  voltage: number;
  projectType: ProjectType;
};

type ProjectType = "Residential" | "Commercial";

export default function DesignPage() {
  const [form, setForm] = useState<FormInputs>({
    pvKw: 12,
    panelW: 500,
    voltage: 400,
    region: "North America",
    projectType: "Residential",
  });

  // Calculations will now be based directly on the 'form' state.
  // The 'calculate' function is wrapped in useMemo and will re-run when 'form' changes.
  const bomRaw = useMemo(() => {
    // Ensure that numeric inputs are valid numbers before calculation
    // This is more of a safeguard; NumberField should prevent non-numeric states.
    const pvKw = Number(form.pvKw) || 0;
    const panelW = Number(form.panelW) || 0;
    const voltage = Number(form.voltage) || 0;

    // Prevent calculation if essential numbers are zero or invalid, to avoid skewed results.
    if (pvKw <= 0 || panelW <= 0 || voltage <= 0) {
        // Return an empty array or a default state for bomRaw if inputs are not ready
        return [];
    }

    return calculate({
      pvKw: pvKw,
      panelW: panelW,
      region: form.region,
      voltage: voltage,
    });
  }, [form]); // Recalculate whenever any part of 'form' changes.

  const nameMap: Record<string, string> = {
    "Q2000-INV": "Quad 2000 Inverter",
    "65020-01": "Junction Box (NA)",
    "65020-05": "Junction Box (EU/RoW)",
    "65015-09": "0.7m Type-2 T5-T6 Cable (NA)",
    "65015-17": "0.7m Type-2 T5-T6 Cable (EU/RoW)", // Assumed SKU from designMath logic
    "65013-16/17": "2m/4m T6 F-to-M Cable (NA)",
    "65013-08/09": "2m/4m T6 F-to-M Cable (EU/RoW)", // Assumed SKU
    "65015-10": "3m Type-1 T5-T6 Cable (NA)", // Corrected label based on designMath
    "65015-18": "3m Type-1 T5-T6 Cable (EU/RoW)", // Assumed SKU
    "65012-14/15": "T6-Tee to Open Cable (NA)", // Corrected label
    "65012-02/03": "T6-Tee to Open Cable (EU/RoW)", // Assumed SKU
  };

  const model =
    form.projectType === "Residential"
      ? "Q2000 (single-phase)"
      : "Q3000 (three-phase)"; // Note: designMath always uses Q2000-INV SKU. This only changes display label.

  const bom = bomRaw.map((r) => ({
    ...r,
    label: nameMap[r.sku] ?? (r.label === "Inverter" ? model : r.label),
  }));

  // Summary now directly uses the 'form' state.
  const summary = form;
  const inverterCount = bom.find((r) => r.sku === "Q2000-INV")?.qty ?? (bomRaw.length > 0 ? bomRaw[0].qty : 0);


  // Image mapping based on SKUs for clarity
  const imageMap: Record<string, string> = {
    "Q2000-INV": "/quad4inverter.png",
    "65020-01": "/junctionbox.png", // NA Junction Box
    "65020-05": "/junctionbox.png", // EU Junction Box (assuming same image)
    "65015-09": "/type2cable.png",  // NA Type-2
    "65015-17": "/type2cable.png",  // EU Type-2 (assuming same image)
    "65013-16/17": "/t6ftom.png",   // NA T6 F-to-M
    "65013-08/09": "/t6ftom.png",   // EU T6 F-to-M (assuming same image)
    "65015-10": "/type1cable.png",  // NA Type-1 (was 3m trunk cable)
    "65015-18": "/type1cable.png",  // EU Type-1 (assuming same image)
    "65012-14/15": "/opencable.png",// NA T6-Tee to Open
    "65012-02/03": "/opencable.png",// EU T6-Tee to Open (assuming same image)
  };

  return (
    <main className="text-lg">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[var(--color-brand-maroon)] to-[var(--color-brand-darkmaroon)] text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="text-5xl font-semibold text-[var(--color-brand-yellow)]">
            Design your system
          </h1>
          <p className="mt-4">
            Enter your specs to see your parts list automatically update.
          </p>
          <Link
            href="https://pvwatts.nrel.gov/"
            target="_blank"
            className="mt-8 inline-block rounded-lg bg-[var(--color-brand-maroon)] px-6 py-3 font-medium hover:bg-[var(--color-brand-darkmaroon)]"
          >
            Need solar output? → PVWatts
          </Link>
        </div>
      </section>

      {/* BODY */}
      <section className="mx-auto max-w-5xl space-y-12 px-6 py-16">
        <div className="rounded-2xl bg-[var(--color-brand-graytext)]/5 p-6 space-y-6 shadow">
          <h2 className="text-2xl font-semibold text-[var(--color-brand-yellow)]">
            Design Details
          </h2>
          <SelectField
            label="Project type"
            value={form.projectType}
            options={["Residential", "Commercial"]}
            onChange={(pt) => setForm({ ...form, projectType: pt as ProjectType })}
          />
          <NumberField
            label="PV System Size (kW)"
            value={form.pvKw}
            onChange={(v) => setForm({ ...form, pvKw: v })}
            min={1}
            max={10000}
            step={0.1}
          />
          <NumberField
            label="Panel power (W)"
            value={form.panelW}
            onChange={(v) => setForm({ ...form, panelW: v })}
            min={100}
            max={1000}
            step={5}
          />
          <NumberField
            label="System Voltage (V)"
            value={form.voltage}
            onChange={(v) => setForm({ ...form, voltage: v })}
            min={100}
            max={600}
          />
          <SelectField
            label="Region"
            value={form.region}
            options={["North America", "EU / RoW"]}
            onChange={(r) => setForm({ ...form, region: r })}
          />
        </div>

        {/* RESULTS */}
        <motion.div
          key={JSON.stringify(bom)} // Add key here if re-triggering animation on BOM change is desired
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-10"
        >
          {/* BILL OF MATERIALS */}
          <div className="rounded-2xl bg-[var(--color-brand-graytext)]/5 border border-[var(--color-brand-gray)] shadow overflow-hidden">
            <h2 className="px-6 py-4 text-2xl font-semibold text-[var(--color-brand-graytext)] border-b border-[var(--color-brand-gray)]">
              Bill of Materials
            </h2>
            {bom.length > 0 ? (
              <ul className="divide-y">
                {bom.map((row) => (
                  <li
                    key={row.sku}
                    className="flex items-center gap-6 p-6 text-[var(--color-brand-graytext)]"
                  >
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
                ))}
              </ul>
            ) : (
                <p className="p-6 text-[var(--color-brand-graytext)]">
                    Please enter valid system parameters to see the Bill of Materials.
                </p>
            )}
          </div>

          {/* SYSTEM SUMMARY */}
          <aside className="rounded-2xl bg-[var(--color-brand-graytext)]/5 p-6 space-y-4 shadow">
            <h2 className="text-2xl font-semibold text-[var(--color-brand-graytext)]">
              System Summary
            </h2>
            <Section title="System">
              <SummaryRow label="Project Type" value={summary.projectType} />
              <SummaryRow label="Region" value={summary.region} />
            </Section>
            <Section title="PV array">
              <SummaryRow label="PV System Size" value={`${summary.pvKw} kW`} />
              <SummaryRow label="Panel Power" value={`${summary.panelW} W`} />
            </Section>
            <Section title="Inverter">
              <SummaryRow label="Model" value={model} />
              <SummaryRow label="Number of Inverters" value={inverterCount.toString()} />
            </Section>
          </aside>
        </motion.div>

        {/* CONTACT CTA */}
        <p className="text-center text-xl text-[var(--color-brand-graytext)] mt-8">
          Ready for a firm quote?{" "}
          <Link href="/contact" className="font-semibold text-[var(--color-brand-maroon)] underline">
            Contact us
          </Link>
        </p>
      </section>
    </main>
  );
}

/* ───────── helper components ───────── */

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value;

    // If empty, decide on behavior. For now, if min is defined and positive, use min, else 0.
    // This prevents NaN from `parseFloat('')`
    if (valStr === "") {
      let resetVal = 0;
      if (min !== undefined && min > 0) {
        resetVal = min;
      }
      // Check if current value is already this resetVal to avoid unnecessary onChange
      if (value !== resetVal) {
        onChange(resetVal);
      }
      return;
    }

    let num = parseFloat(valStr); // Use parseFloat to allow decimals from step

    if (isNaN(num)) {
      // If not a number (e.g. user types "abc"), do not update state.
      // The input field itself might briefly show invalid input then revert.
      return;
    }
    
    // We don't clamp immediately here to allow user to type intermediate values
    // e.g. if max is 500, user types "60", then wants to type "0" to make "600" (which would then be clamped on blur)
    // However, if it's already out of bounds, we might want to prevent going further.
    // For simplicity, we pass the parsed number and rely on onBlur for definitive clamping.
    // Or, if step mismatch, `type="number"` will handle it.
    onChange(num);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let num = parseFloat(e.target.value);

    if (isNaN(num)) {
      // If invalid on blur, reset to a safe default (e.g., min or previous valid value)
      // Here, using min if defined and positive, else 0.
      num = (min !== undefined && min > 0) ? min : 0;
    }

    // Enforce bounds
    if (min !== undefined && num < min) {
      num = min;
    }
    if (max !== undefined && num > max) {
      num = max;
    }
    
    // Ensure the step is respected if provided (e.g., 0.1, 5)
    // This can be complex if min itself is not a multiple of step.
    // For now, we'll assume simple cases or rely on browser's step validation.
    // A more precise step alignment:
    if (step !== undefined && step > 0) {
        const minOffset = min !== undefined ? min : 0;
        num = Math.round((num - minOffset) / step) * step + minOffset;
        // Re-clamp after step adjustment
        if (min !== undefined && num < min) num = min;
        if (max !== undefined && num > max) num = max;
    }


    // Only call onChange if the final clamped/stepped number is different from current value
    if (value !== num) {
      onChange(num);
    }
  };

  return (
    <label className="block text-base">
      <span className="mb-1 block font-medium text-[var(--color-brand-graytext)]">{label}</span>
      <input
        type="number"
        value={value} // Value is a number, input displays it. Handles "0", "0.5", etc.
        onChange={handleChange}
        onBlur={handleBlur} // Clamp and validate on blur
        min={min} // HTML5 validation and stepper behavior
        max={max} // HTML5 validation and stepper behavior
        step={step} // HTML5 step attribute
        className="w-full rounded-lg border border-[var(--color-brand-gray)] px-4 py-2 text-base focus:border-[var(--color-brand-yellow)] focus:ring-[var(--color-brand-yellow)]"
      />
    </label>
  );
}

// SelectField, Section, SummaryRow remain the same as in your provided code.
// (Assuming they are correctly defined elsewhere or are as provided in the prompt)

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (s: string) => void }) {
  return (
    <label className="block text-base">
      <span className="mb-1 block font-medium text-[var(--color-brand-graytext)]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[var(--color-brand-gray)] px-4 py-2 text-base focus:border-[var(--color-brand-yellow)] focus:ring-[var(--color-brand-yellow)]"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option> // Added value={o} for correctness
        ))}
      </select>
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
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