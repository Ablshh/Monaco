// Контакты и настройки брони. Источник реальных данных: карточка 2ГИС.

export const site = {
  name: "Monaco",
  // Город, адрес и часы на трёх языках — в i18n/dict.ts (place)
  // Для статуса «Сейчас открыто» на первом экране; время считается по Кызылорде
  openTime: "10:00",
  closeTime: "24:00",
  timeZone: "Asia/Qyzylorda",
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
