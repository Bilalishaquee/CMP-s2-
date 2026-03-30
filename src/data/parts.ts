import type { PartOffer, SearchResultBundle } from "@/types";

export const SAMPLE_PART_CHIPS = [
  "MT25QU512ABB",
  "STM32F407VGT6",
  "TPS5430DDAR",
  "LM358DR",
  "ATMEGA328P-AU",
  "SN74LVC245APWR",
];

export const PREFIX_SUGGESTIONS: { prefix: string; part: string; mfr: string }[] = [
  { prefix: "MT25", part: "MT25QU512ABB", mfr: "Micron" },
  { prefix: "MT25Q", part: "MT25QU512ABB", mfr: "Micron" },
  { prefix: "STM32", part: "STM32F407VGT6", mfr: "STMicroelectronics" },
  { prefix: "STM32F", part: "STM32F407VGT6", mfr: "STMicroelectronics" },
  { prefix: "TPS543", part: "TPS5430DDAR", mfr: "Texas Instruments" },
  { prefix: "LM358", part: "LM358DR", mfr: "Texas Instruments" },
  { prefix: "ATMEGA", part: "ATMEGA328P-AU", mfr: "Microchip" },
  { prefix: "SN74L", part: "SN74LVC245APWR", mfr: "Texas Instruments" },
];

function attrs(
  rows: { name: string; searched: string; candidate: string; status: "match" | "compatible" | "different" }[],
) {
  return rows.map((r) => ({
    name: r.name,
    searchedValue: r.searched,
    candidateValue: r.candidate,
    status: r.status,
  }));
}

const baseA = (overrides: Partial<PartOffer> & Pick<PartOffer, "partNumber" | "manufacturer">): PartOffer => ({
  option: "A",
  label: "Option A",
  supplierName: "DigiKey",
  supplierBadge: "DigiKey",
  tag: "Exact Match",
  specs: [],
  price: 0,
  currency: "USD",
  stock: 0,
  datasheetUrl: "https://example.com/datasheet",
  isIndicativePricing: true,
  ...overrides,
});

const baseB = (overrides: Partial<PartOffer> & Pick<PartOffer, "partNumber" | "manufacturer" | "matchScore">): PartOffer => ({
  option: "B",
  label: "Option B",
  supplierName: "LCSC",
  supplierBadge: "LCSC",
  tag: "Best Asian Alternative",
  specs: [],
  price: 0,
  currency: "USD",
  stock: 0,
  datasheetUrl: "https://example.com/datasheet",
  isIndicativePricing: true,
  ...overrides,
});

const baseC = (overrides: Partial<PartOffer> & Pick<PartOffer, "partNumber" | "manufacturer" | "matchScore">): PartOffer => ({
  option: "C",
  label: "Option C",
  supplierName: "Zephyr Technologies",
  supplierBadge: "Zephyr Technologies",
  tag: "Preferred / Lowest Price",
  specs: [],
  price: 0,
  currency: "USD",
  stock: 0,
  datasheetUrl: "https://example.com/datasheet",
  disclosure:
    "Fulfilled by Zephyr Technologies — CrossMyPart's preferred distributor, selected for competitive pricing.",
  isIndicativePricing: true,
  ...overrides,
});

const CATALOG: Record<string, SearchResultBundle> = {
  MT25QU512ABB: {
    query: "MT25QU512ABB",
    optionA: baseA({
      partNumber: "MT25QU512ABB",
      manufacturer: "Micron Technology",
      specs: ["512Mb NOR Flash", "1.8V", "USON-8"],
      price: 4.87,
      stock: 12400,
      datasheetUrl: "https://www.micron.com/products/nor-flash/serial-nor-flash",
    }),
    optionB: baseB({
      partNumber: "W25Q512JVFIQ",
      manufacturer: "Winbond",
      matchScore: 94,
      specs: ["512Mb NOR Flash", "1.8V / 3V I/O", "USON-8"],
      price: 3.12,
      stock: 8900,
      datasheetUrl: "https://www.winbond.com/",
      attributes: attrs([
        { name: "Voltage", searched: "1.8V", candidate: "1.8V / 3V I/O", status: "compatible" },
        { name: "Package", searched: "USON-8", candidate: "USON-8", status: "match" },
        { name: "Temperature Range", searched: "-40°C to +85°C", candidate: "-40°C to +85°C", status: "match" },
        { name: "Density", searched: "512Mb", candidate: "512Mb", status: "match" },
        { name: "Interface", searched: "SPI", candidate: "SPI", status: "match" },
      ]),
    }),
    optionC: baseC({
      partNumber: "MT25QU512ABB8ESF-0SIT",
      manufacturer: "Micron Technology",
      matchScore: 100,
      specs: ["512Mb NOR Flash", "1.8V", "USON-8 (tape)"],
      price: 2.95,
      stock: 15200,
      datasheetUrl: "https://www.micron.com/",
      attributes: attrs([
        { name: "Voltage", searched: "1.8V", candidate: "1.8V", status: "match" },
        { name: "Package", searched: "USON-8", candidate: "USON-8", status: "match" },
        { name: "Temperature Range", searched: "-40°C to +85°C", candidate: "-40°C to +85°C", status: "match" },
        { name: "Density", searched: "512Mb", candidate: "512Mb", status: "match" },
        { name: "Interface", searched: "SPI", candidate: "SPI", status: "match" },
      ]),
    }),
  },
  STM32F407VGT6: {
    query: "STM32F407VGT6",
    optionA: baseA({
      partNumber: "STM32F407VGT6",
      manufacturer: "STMicroelectronics",
      specs: ["ARM Cortex-M4", "168 MHz", "LQFP-100"],
      price: 12.45,
      stock: 5600,
      datasheetUrl: "https://www.st.com/en/microcontrollers-microprocessors/stm32f407vg.html",
    }),
    optionB: baseB({
      partNumber: "GD32F407VGT6",
      manufacturer: "GigaDevice",
      matchScore: 88,
      specs: ["ARM Cortex-M4", "168 MHz", "LQFP-100"],
      price: 8.9,
      stock: 12000,
      attributes: attrs([
        { name: "Core", searched: "Cortex-M4", candidate: "Cortex-M4", status: "match" },
        { name: "Package", searched: "LQFP-100", candidate: "LQFP-100", status: "match" },
        { name: "Flash", searched: "1 MB", candidate: "1 MB", status: "match" },
        { name: "RAM", searched: "192 KB", candidate: "192 KB", status: "match" },
        { name: "Temperature Range", searched: "-40°C to +85°C", candidate: "-40°C to +105°C", status: "compatible" },
      ]),
    }),
    optionC: baseC({
      partNumber: "STM32F407VGT6TR",
      manufacturer: "STMicroelectronics",
      matchScore: 99,
      specs: ["ARM Cortex-M4", "168 MHz", "LQFP-100 (reel)"],
      price: 11.2,
      stock: 7800,
      attributes: attrs([
        { name: "Core", searched: "Cortex-M4", candidate: "Cortex-M4", status: "match" },
        { name: "Package", searched: "LQFP-100", candidate: "LQFP-100", status: "match" },
        { name: "Flash", searched: "1 MB", candidate: "1 MB", status: "match" },
        { name: "RAM", searched: "192 KB", candidate: "192 KB", status: "match" },
        { name: "MPN variant", searched: "Tray", candidate: "Tape & reel", status: "compatible" },
      ]),
    }),
  },
  TPS5430DDAR: {
    query: "TPS5430DDAR",
    optionA: baseA({
      partNumber: "TPS5430DDAR",
      manufacturer: "Texas Instruments",
      specs: ["3A Step-Down", "5.5–36V in", "SO PowerPAD-8"],
      price: 3.65,
      stock: 9200,
      datasheetUrl: "https://www.ti.com/product/TPS5430",
    }),
    optionB: baseB({
      partNumber: "XL1509-5.0E1",
      manufacturer: "XLSEMI",
      matchScore: 82,
      specs: ["3A Step-Down", "4.5–40V", "SOIC-8"],
      price: 1.45,
      stock: 45000,
      attributes: attrs([
        { name: "Voltage", searched: "5.5–36V in", candidate: "4.5–40V", status: "compatible" },
        { name: "Package", searched: "SO PowerPAD-8", candidate: "SOIC-8", status: "different" },
        { name: "Current Rating", searched: "3A", candidate: "3A", status: "match" },
        { name: "Topology", searched: "Buck", candidate: "Buck", status: "match" },
        { name: "Temperature Range", searched: "-40°C to +125°C", candidate: "-40°C to +85°C", status: "compatible" },
      ]),
    }),
    optionC: baseC({
      partNumber: "TPS5430DDAR",
      manufacturer: "Texas Instruments",
      matchScore: 100,
      specs: ["3A Step-Down", "5.5–36V in", "SO PowerPAD-8"],
      price: 3.1,
      stock: 11000,
      attributes: attrs([
        { name: "Voltage", searched: "5.5–36V in", candidate: "5.5–36V in", status: "match" },
        { name: "Package", searched: "SO PowerPAD-8", candidate: "SO PowerPAD-8", status: "match" },
        { name: "Current Rating", searched: "3A", candidate: "3A", status: "match" },
        { name: "Topology", searched: "Buck", candidate: "Buck", status: "match" },
        { name: "Temperature Range", searched: "-40°C to +125°C", candidate: "-40°C to +125°C", status: "match" },
      ]),
    }),
  },
  LM358DR: {
    query: "LM358DR",
    optionA: baseA({
      partNumber: "LM358DR",
      manufacturer: "Texas Instruments",
      specs: ["Dual Op-Amp", "2–36V", "SOIC-8"],
      price: 0.42,
      stock: 210000,
      datasheetUrl: "https://www.ti.com/product/LM358",
    }),
    optionB: baseB({
      partNumber: "LM358DR",
      manufacturer: "UTC",
      matchScore: 96,
      specs: ["Dual Op-Amp", "3–32V", "SOIC-8"],
      price: 0.18,
      stock: 300000,
      attributes: attrs([
        { name: "Voltage", searched: "2–36V", candidate: "3–32V", status: "compatible" },
        { name: "Package", searched: "SOIC-8", candidate: "SOIC-8", status: "match" },
        { name: "Channels", searched: "2", candidate: "2", status: "match" },
        { name: "GBW", searched: "1 MHz", candidate: "1 MHz", status: "match" },
        { name: "Temperature Range", searched: "0°C to +70°C", candidate: "0°C to +70°C", status: "match" },
      ]),
    }),
    optionC: baseC({
      partNumber: "LM358DR2G",
      manufacturer: "onsemi",
      matchScore: 97,
      specs: ["Dual Op-Amp", "3–32V", "SOIC-8"],
      price: 0.29,
      stock: 175000,
      attributes: attrs([
        { name: "Voltage", searched: "2–36V", candidate: "3–32V", status: "compatible" },
        { name: "Package", searched: "SOIC-8", candidate: "SOIC-8", status: "match" },
        { name: "Channels", searched: "2", candidate: "2", status: "match" },
        { name: "GBW", searched: "1 MHz", candidate: "1 MHz", status: "match" },
        { name: "Temperature Range", searched: "0°C to +70°C", candidate: "0°C to +70°C", status: "match" },
      ]),
    }),
  },
  "ATMEGA328P-AU": {
    query: "ATMEGA328P-AU",
    optionA: baseA({
      partNumber: "ATMEGA328P-AU",
      manufacturer: "Microchip",
      specs: ["8-bit AVR", "20 MHz", "TQFP-32"],
      price: 2.85,
      stock: 34000,
      datasheetUrl: "https://www.microchip.com/en-us/product/ATMEGA328P",
    }),
    optionB: baseB({
      partNumber: "ATMEGA328P-AU",
      manufacturer: "Microchip (LCSC)",
      matchScore: 100,
      specs: ["8-bit AVR", "20 MHz", "TQFP-32"],
      price: 2.1,
      stock: 28000,
      attributes: attrs([
        { name: "Voltage", searched: "1.8–5.5V", candidate: "1.8–5.5V", status: "match" },
        { name: "Package", searched: "TQFP-32", candidate: "TQFP-32", status: "match" },
        { name: "Flash", searched: "32 KB", candidate: "32 KB", status: "match" },
        { name: "SRAM", searched: "2 KB", candidate: "2 KB", status: "match" },
        { name: "Temperature Range", searched: "-40°C to +85°C", candidate: "-40°C to +85°C", status: "match" },
      ]),
    }),
    optionC: baseC({
      partNumber: "ATMEGA328P-AUR",
      manufacturer: "Microchip",
      matchScore: 99,
      specs: ["8-bit AVR", "20 MHz", "TQFP-32 (reel)"],
      price: 1.95,
      stock: 41000,
      attributes: attrs([
        { name: "Voltage", searched: "1.8–5.5V", candidate: "1.8–5.5V", status: "match" },
        { name: "Package", searched: "TQFP-32", candidate: "TQFP-32", status: "match" },
        { name: "Flash", searched: "32 KB", candidate: "32 KB", status: "match" },
        { name: "SRAM", searched: "2 KB", candidate: "2 KB", status: "match" },
        { name: "Packaging", searched: "Tray", candidate: "13\" reel", status: "compatible" },
      ]),
    }),
  },
  SN74LVC245APWR: {
    query: "SN74LVC245APWR",
    optionA: baseA({
      partNumber: "SN74LVC245APWR",
      manufacturer: "Texas Instruments",
      specs: ["Octal Bus Transceiver", "1.65–3.6V", "TSSOP-20"],
      price: 0.55,
      stock: 88000,
      datasheetUrl: "https://www.ti.com/product/SN74LVC245A",
    }),
    optionB: baseB({
      partNumber: "74LVC245APW,118",
      manufacturer: "Nexperia",
      matchScore: 91,
      specs: ["Octal Bus Transceiver", "1.2–3.6V", "TSSOP-20"],
      price: 0.32,
      stock: 95000,
      attributes: attrs([
        { name: "Voltage", searched: "1.65–3.6V", candidate: "1.2–3.6V", status: "compatible" },
        { name: "Package", searched: "TSSOP-20", candidate: "TSSOP-20", status: "match" },
        { name: "I/O Direction", searched: "Bidirectional", candidate: "Bidirectional", status: "match" },
        { name: "Output Current", searched: "±24 mA", candidate: "±24 mA", status: "match" },
        { name: "Temperature Range", searched: "-40°C to +125°C", candidate: "-40°C to +125°C", status: "match" },
      ]),
    }),
    optionC: baseC({
      partNumber: "SN74LVC245APWR",
      manufacturer: "Texas Instruments (Zephyr)",
      matchScore: 100,
      specs: ["Octal Bus Transceiver", "1.65–3.6V", "TSSOP-20"],
      price: 0.48,
      stock: 102000,
      attributes: attrs([
        { name: "Voltage", searched: "1.65–3.6V", candidate: "1.65–3.6V", status: "match" },
        { name: "Package", searched: "TSSOP-20", candidate: "TSSOP-20", status: "match" },
        { name: "I/O Direction", searched: "Bidirectional", candidate: "Bidirectional", status: "match" },
        { name: "Output Current", searched: "±24 mA", candidate: "±24 mA", status: "match" },
        { name: "Temperature Range", searched: "-40°C to +125°C", candidate: "-40°C to +125°C", status: "match" },
      ]),
    }),
  },
};

function syntheticBundle(q: string): SearchResultBundle {
  const clean = q.toUpperCase().replace(/[^A-Z0-9\-]/g, "").slice(0, 32) || "PART";
  return {
    query: clean,
    banner: "no_exact",
    optionA: baseA({
      partNumber: `${clean}-DK`,
      manufacturer: "Generic Silicon Corp.",
      specs: ["Candidate match — verify datasheet", "See technical attributes", "Industry standard package"],
      price: 9.99,
      stock: 500,
      datasheetUrl: "https://example.com/datasheet",
    }),
    optionB: baseB({
      partNumber: `${clean}-ALT1`,
      manufacturer: "Pacific Components Ltd.",
      matchScore: 86,
      specs: ["Alternative candidate", "Verify pinout", "LCSC availability"],
      price: 6.5,
      stock: 3200,
      attributes: attrs([
        { name: "Voltage", searched: "Per datasheet", candidate: "Per datasheet", status: "compatible" },
        { name: "Package", searched: "User verify", candidate: "Likely compatible", status: "compatible" },
        { name: "Tolerance", searched: "—", candidate: "±5%", status: "compatible" },
        { name: "Temperature Range", searched: "Industrial", candidate: "-40°C to +85°C", status: "compatible" },
        { name: "Rating", searched: "—", candidate: "See datasheet", status: "different" },
      ]),
    }),
    optionC: baseC({
      partNumber: `${clean}-ZP`,
      manufacturer: "Zephyr Technologies",
      matchScore: 92,
      specs: ["Zephyr-stocked alternative", "Competitive pricing", "US fulfillment option"],
      price: 5.25,
      stock: 8800,
      attributes: attrs([
        { name: "Voltage", searched: "Per datasheet", candidate: "Aligned", status: "match" },
        { name: "Package", searched: "User verify", candidate: "Standard footprint", status: "compatible" },
        { name: "Tolerance", searched: "—", candidate: "±5%", status: "compatible" },
        { name: "Temperature Range", searched: "Industrial", candidate: "-40°C to +85°C", status: "match" },
        { name: "Rating", searched: "—", candidate: "See datasheet", status: "compatible" },
      ]),
    }),
  };
}

export type ResultScenario = "full" | "bc" | "c_only" | "a_only" | "none";

export function getSearchResults(query: string, scenario: ResultScenario = "full"): SearchResultBundle {
  const key = query.trim().toUpperCase();
  const base = CATALOG[key] ?? syntheticBundle(key);

  if (scenario === "full") {
    return { ...base, banner: base.banner ?? null };
  }
  if (scenario === "none") {
    return {
      query: key,
      banner: "no_exact",
      partialMessage: "No distributor matches returned for this query in the demo dataset.",
    };
  }
  if (scenario === "bc") {
    return {
      ...base,
      banner: "partial",
      partialMessage: "American exact match unavailable — showing Asian alternative and Zephyr recommendation.",
      optionA: undefined,
      optionB: base.optionB,
      optionC: base.optionC,
    };
  }
  if (scenario === "c_only") {
    return {
      ...base,
      banner: "partial",
      partialMessage: "Only CrossMyPart preferred sourcing available for this line.",
      optionA: undefined,
      optionB: undefined,
      optionC: base.optionC,
    };
  }
  if (scenario === "a_only") {
    return {
      ...base,
      banner: "partial",
      partialMessage: "Only DigiKey exact match available — alternatives pending validation.",
      optionA: base.optionA,
      optionB: undefined,
      optionC: undefined,
    };
  }
  return base;
}

export function suggestPrefixes(input: string) {
  if (input.length < 4) return [];
  const q = input.toUpperCase();
  return PREFIX_SUGGESTIONS.filter((s) => s.part.startsWith(q) || s.prefix.startsWith(q)).slice(0, 8);
}
