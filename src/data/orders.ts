import type { MockOrder } from "@/types";

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "CMP-10482",
    date: "2026-03-22",
    status: "Delivered",
    items: 6,
    supplierMix: "DigiKey + Zephyr",
    total: 1842.5,
  },
  {
    id: "CMP-10471",
    date: "2026-03-18",
    status: "Shipped",
    items: 3,
    supplierMix: "LCSC + DigiKey",
    total: 426.1,
  },
  {
    id: "CMP-10455",
    date: "2026-03-10",
    status: "Processing",
    items: 12,
    supplierMix: "Zephyr + DigiKey + LCSC",
    total: 5120.0,
  },
  {
    id: "CMP-10440",
    date: "2026-03-02",
    status: "Placed",
    items: 2,
    supplierMix: "Zephyr",
    total: 198.75,
  },
];

export const ORDER_TIMELINE = [
  { id: "placed", label: "Order placed", date: "2026-03-22 09:14 UTC", done: true },
  { id: "po", label: "PO created", date: "2026-03-22 09:18 UTC", done: true },
  { id: "proc", label: "Processing", date: "2026-03-23 14:02 UTC", done: true },
  { id: "ship", label: "Shipped", date: "2026-03-24 11:45 UTC", done: true },
  { id: "del", label: "Delivered", date: "2026-03-26 08:30 UTC", done: true },
];
