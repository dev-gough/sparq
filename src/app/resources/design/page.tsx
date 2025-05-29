// import Link from "next/link"
// import Image from "next/image"
// import { IoIosInformationCircle } from "react-icons/io"

// export default function DesignPage() {
//     return (
//         <div className="bg-white container mx-auto py-8 px-4 sm:px-10">
//             <h1 className="text-5xl font-bold text-brand-maroon text-center sm:mb-16 mb-8 ">Design My System</h1>
//             <p className="sm:text-2xl text-lg">We are working on a custom calculator.  For now, please use NREL&apos;s PVWatts calculator to estimate your energy production by entering your address at this link:<Link href="https://pvwatts.nrel.gov/" target="_blank"className="text-blue-400 hover:underline cursor-pointer ml-2">pvwatts.nrel.gov</Link> </p>
//             <p className="flex flex-col 2xl:flex-row sm:text-2xl text-lg mt-4">Use the <IoIosInformationCircle className="hidden 2xl:flex mx-2 mt-1 text-blue-500" /> information bubbles to help modify the inputs to your needs.<strong className="ml-1"> Set the &quot;DC System Size (kW)&quot; field to 2.</strong></p>

//             <p className="sm:text-2xl text-lg mt-4">Follow these 3 easy steps to calculate how many Q2000 units you&apos;ll need:</p>
//             <ol className="list-inside list-decimal sm:text-2xl text-lg">
//                 <li>Follow the instructions above to recieve your estimated energy generation.</li>
//                 <li>Sum the last 12 months of kWh energy usage from your utility provider.</li>
//                 <li>Divide the estimated generation by your yearly usage.</li>
//             </ol>
//             <p className="sm:text-2xl text-lg mt-4">Once you have a rough idea of your system, <Link href="/contact" className="text-blue-400 hover:underline">contact us</Link> at our head office to facilitate further refinement and other requirements.</p>
//             <div className="flex justify-center mt-4 sm:mt-16">
//                 <Image src="/formula.png" alt="Q2000 calculation" width={832} height={832}/>
//             </div>
//         </div>
//     )
// }

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosInformationCircle } from "react-icons/io";
import { calculate, Inputs } from "@/lib/designMath";

export default function DesignPage() {
  const [form, setForm] = useState<Inputs>({
    pvKw: 12,
    panelW: 500,
    region: "North America",
  });

  const result = useMemo(() => calculate(form), [form]);

  return (
    <div className="container mx-auto p-6 sm:p-10 space-y-10 max-w-5xl">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-brand-maroon">Design My System</h1>
        <p className="text-lg sm:text-2xl">
          Need a quick estimate? Use NREL&rsquo;s&nbsp;
          <Link href="https://pvwatts.nrel.gov/" target="_blank" className="text-blue-500 underline">
            PVWatts&nbsp;calculator
          </Link>{" "}
          to grab your annual solar generation, then come back here.
        </p>
      </header>

      {/* INPUTS */}
      <section className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
        <Field
          label="PV System Size (kW)"
          value={form.pvKw}
          onChange={(v) => setForm({ ...form, pvKw: v })}
          info="Total DC array size that will feed the inverters."
        />
        <Field
          label="Panel Capacity (W)"
          value={form.panelW}
          onChange={(v) => setForm({ ...form, panelW: v })}
          info="Peak power of **one** panel (Excel cell I4)."
        />
        <Field
          label="Region"
          value={form.region}
          onChangeStr={(region) => setForm({ ...form, region })}
          as="select"
          options={["North America", "EU / RoW"]}
          info="Controls the part-numbers (NA vs. International SKUs)."
        />
      </section>

      {/* RESULTS */}
      <section className="bg-gray-50 rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Bill of Materials</h2>
        <ul className="space-y-2 text-lg">
          <Item label="Inverters">{result.totalInverters}</Item>
          <Item label="Junction boxes">{result.junctionBoxes}</Item>
          <Item label="0.7 m Type-2 cables">{result.cable0_7m} &nbsp;<span className="text-sm text-gray-500">({result.pn0_7m})</span></Item>
          <Item label="2 m / 4 m T6-female cables">{result.cable2_4m} &nbsp;<span className="text-sm text-gray-500">({result.pn2_4m})</span></Item>
          <Item label="3 m trunk cable">{result.cable3m} &nbsp;<span className="text-sm text-gray-500">({result.pn3m})</span></Item>
          <Item label="T6-Tee to open">{1} &nbsp;<span className="text-sm text-gray-500">({result.pnT6Tee})</span></Item>
        </ul>
      </section>

      <footer className="text-lg sm:text-2xl">
        Ready for a firm quote?{" "}
        <Link href="/contact" className="text-blue-500 underline">
          Contact our head office
        </Link>{" "}
        and we&rsquo;ll refine the design to your exact site + code requirements.
      </footer>

      <div className="flex justify-center">
        <Image src="/formula.png" alt="Q2000 calculation" width={832} height={832} />
      </div>
    </div>
  );
}

type FieldProps =
  | {
      label: string;
      value: number;
      onChange: (n: number) => void;
      info: string;
      as?: "input";
    }
  | {
      label: string;
      value: string;
      onChangeStr: (s: string) => void;
      info: string;
      as: "select";
      options: string[];
    };

function Field(props: FieldProps) {
  const common =
    "w-full border rounded-lg px-3 py-2 focus:ring focus:border-brand-maroon transition";
  return (
    <label className="flex flex-col gap-1 text-sm sm:text-base">
      {props.label}
      <div className="flex items-center gap-2">
        {props.as === "select" ? (
          <select
            className={common}
            value={props.value}
            onChange={(e) => props.onChangeStr(e.target.value)}
          >
            {props.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ) : (
          <input
            type="number"
            className={common}
            value={props.value}
            onChange={(e) => props.onChange(Number(e.target.value))}
            min={0}
          />
        )}
        <Tooltip text={props.info} />
      </div>
    </label>
  );
}

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="flex justify-between border-b pb-1">
      <span>{label}</span>
      <span className="font-medium">{children}</span>
    </li>
  );
}

// ultra-light tooltip – no external dependencies
function Tooltip({ text }: { text: string }) {
  return (
    <div className="group relative">
      <IoIosInformationCircle className="text-blue-600 text-xl cursor-help" />
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
        {text}
      </span>
    </div>
  );
}
