// Меню ресторана. ПРИМЕР: блюда и цены условные, настоящего меню в открытом доступе нет.
// Чтобы временно убрать блюдо из продажи, поставьте available: false —
// оно останется в меню, но будет помечено «Временно нет».

export type DishTag = "Хит" | "Шеф" | "Остро" | "Новинка";

export type Dish = {
  name: string;
  description?: string;
  weight?: string;
  price: number;
  tag?: DishTag;
  available?: boolean; // по умолчанию true
};

export type Category = {
  id: string;
  title: string;
  dishes: Dish[];
};

export type BanquetSet = {
  name: string;
  price: number;
  per: string;
  tag?: string;
  items: string[];
};

export const currency = "₸";

export const categories: Category[] = [
  { id: "cold", title: "Холодные закуски", dishes: [
    { name: "Карпаччо из говядины", description: "Пармезан, руккола, каперсы", weight: "160 г", price: 5900 },
    { name: "Тартар из лосося", description: "Авокадо, лайм, тосты", weight: "180 г", price: 6400, tag: "Шеф" },
    { name: "Ассорти казы-карта-жая", description: "Конина домашнего приготовления, лук, лепёшка", weight: "350 г", price: 9800, tag: "Хит" },
    { name: "Сырная тарелка", description: "Пять сыров, мёд, орехи, виноград", weight: "300 г", price: 7200 },
  ]},
  { id: "salads", title: "Салаты", dishes: [
    { name: "Цезарь с курицей", description: "Романо, пармезан, соус по-нашему", weight: "260 г", price: 4200 },
    { name: "Цезарь с тигровыми креветками", weight: "260 г", price: 5600 },
    { name: "Буррата с томатами", description: "Черри, базилик, песто", weight: "240 г", price: 5900 },
    { name: "Тёплый салат с говядиной", description: "Вырезка, овощи гриль, кунжут", weight: "250 г", price: 5200 },
    { name: "Греческий", weight: "280 г", price: 3600 },
  ]},
  { id: "soups", title: "Супы", dishes: [
    { name: "Сорпа из баранины", description: "Наваристый бульон, зелень, лепёшка", weight: "400 г", price: 3400 },
    { name: "Крем-суп из белых грибов", description: "Сливки, трюфельное масло", weight: "300 г", price: 3600 },
    { name: "Том ям с морепродуктами", description: "Кокосовое молоко, рис", weight: "400 г", price: 5200, tag: "Остро" },
    { name: "Солянка мясная", weight: "350 г", price: 3300 },
  ]},
  { id: "pasta", title: "Паста и ризотто", dishes: [
    { name: "Феттучине Альфредо с курицей", weight: "320 г", price: 4600 },
    { name: "Карбонара", description: "Гуанчале из говядины, желток, пекорино", weight: "300 г", price: 4800 },
    { name: "Ризотто с белыми грибами", weight: "300 г", price: 5400 },
    { name: "Паста с морепродуктами", description: "Креветки, мидии, кальмар, томатный соус", weight: "340 г", price: 6900, available: false },
  ]},
  { id: "grill", title: "Стейки и гриль", dishes: [
    { name: "Рибай", description: "Мраморная говядина, зерновой откорм", weight: "300 г", price: 14900, tag: "Шеф" },
    { name: "Стриплойн", weight: "300 г", price: 12900 },
    { name: "Филе-миньон", description: "Соус демиглас", weight: "200 г", price: 13800 },
    { name: "Каре ягнёнка", description: "Розмарин, чеснок, овощи гриль", weight: "350 г", price: 11800 },
    { name: "Шашлык из баранины", weight: "250 г", price: 5600, tag: "Хит" },
    { name: "Сибас на гриле", description: "Лимон, каперсы, оливковое масло", weight: "1 шт.", price: 9400 },
  ]},
  { id: "national", title: "Национальная кухня", dishes: [
    { name: "Бешбармак", description: "Конина и баранина, тесто ручной раскатки, сорпа", weight: "450 г", price: 6900, tag: "Хит" },
    { name: "Бешбармак на компанию", description: "Подаётся на табаке, на 4–6 гостей", weight: "2 кг", price: 29000 },
    { name: "Казан-кебаб", description: "Баранина, картофель, лук", weight: "400 г", price: 7400 },
    { name: "Плов", weight: "350 г", price: 3900 },
    { name: "Манты с бараниной", weight: "5 шт.", price: 3400 },
  ]},
  { id: "desserts", title: "Десерты", dishes: [
    { name: "Чизкейк Сан-Себастьян", weight: "150 г", price: 3200 },
    { name: "Тирамису", weight: "160 г", price: 2900 },
    { name: "Медовик", weight: "150 г", price: 2600 },
    { name: "Шоколадный фондан", description: "Шарик ванильного мороженого", weight: "140 г", price: 3400 },
  ]},
  { id: "cocktails", title: "Коктейли", dishes: [
    { name: "Монако спритц", description: "Апероль, просекко, апельсин", weight: "300 мл", price: 4200, tag: "Новинка" },
    { name: "Негрони", weight: "120 мл", price: 4400 },
    { name: "Мохито", description: "Также безалкогольный", weight: "350 мл", price: 3800 },
    { name: "Пина колада", weight: "300 мл", price: 4200 },
  ]},
  { id: "drinks", title: "Напитки", dishes: [
    { name: "Авторский лимонад", description: "Маракуйя, клубника-базилик, цитрус", weight: "1 л", price: 3500 },
    { name: "Чай в чайнике", description: "Чёрный, зелёный, с чабрецом", weight: "800 мл", price: 1800 },
    { name: "Капучино", weight: "300 мл", price: 1400 },
    { name: "Свежевыжатый сок", weight: "250 мл", price: 2200 },
  ]},
];

export const banquet = {
  minGuests: 10,
  maxGuests: 50,
  sets: [
    { name: "Классика", price: 18000, per: "за гостя",
      items: ["Три холодные закуски", "Два салата на выбор", "Горячее: стейк из говядины или сибас", "Десерт, чай, лимонады"] },
    { name: "Monaco", price: 25000, per: "за гостя", tag: "Чаще берут",
      items: ["Ассорти казы-карта-жая и сыры", "Тартар из лосося, буррата", "Бешбармак на табаке", "Каре ягнёнка, овощи гриль", "Торт под ваше событие"] },
    { name: "Той", price: 32000, per: "за гостя",
      items: ["Полный дастархан закусок", "Бешбармак и казан-кебаб", "Горячее из гриля на выбор", "Ведущий и музыка — по договорённости"] },
  ] satisfies BanquetSet[],
};

export function formatPrice(n: number): string {
  return n.toLocaleString("ru-RU").replace(/\s/g, " ") + " " + currency;
}
