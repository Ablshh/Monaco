export const site = {
  name: "Monaco",
  openTime: "10:00",
  closeTime: "24:00",
  timeZone: "Asia/Qyzylorda",
  phone: "+7 778 189 38 36",
  phoneHref: "tel:+77781893836",
  whatsappNumber: "77781893836",
  instagram: "https://www.instagram.com/monaco.mk/",
  booking: {
    firstSlot: "11:00",
    lastSlot: "22:30",
    stepMin: 30,
    maxGuests: 50,
  },
} as const;

export function whatsappLink(text: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
