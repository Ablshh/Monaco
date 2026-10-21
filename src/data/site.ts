// Контакты и настройки брони. Источник реальных данных: карточка 2ГИС.

export const site = {
  name: "Monaco",
  kindRu: "Ресторан в Кызылорде",
  city: "Кызылорда",
  address: "ул. Султана Бейбарса, 2",
  hours: "Ежедневно 10:00 — 24:00",
  // ТЕСТ: номер разработчика для проверки заявок. Номер ресторана из 2ГИС: +7 702 920 08 07
  phone: "+7 778 189 38 36",
  phoneHref: "tel:+77781893836",
  // Номер WhatsApp без «+» и пробелов: сюда приходят заявки на бронь и заказы
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

export const ORDER_TEXT = `Здравствуйте! Хочу сделать заказ в ${site.name}.`;
