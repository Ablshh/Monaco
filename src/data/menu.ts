import type { Txt } from "@/i18n/lang";

export type DishTag = "Хит" | "Шеф" | "Остро" | "Новинка";

export type Dish = {
  id: string;
  name: Txt;
  description?: Txt;
  weight?: string;
  price: number;
  tag?: DishTag;
  available?: boolean;
  photo?: boolean;
};

export type Category = {
  id: string;
  title: Txt;
  dishes: Dish[];
};

export type BanquetSet = {
  name: Txt;
  price: number;
  tag?: Txt;
  items: Txt[];
};

const L = (ru: string, kk: string, en: string): Txt => ({ ru, kk, en });

export const currency = "₸";

export const categories: Category[] = [
  { id: "cold", title: L("Холодные закуски", "Суық тағамдар", "Cold starters"), dishes: [
    { id: "carpaccio", photo: true, name: L("Карпаччо из говядины", "Сиыр етінен карпаччо", "Beef carpaccio"),
      description: L("Пармезан, руккола, каперсы", "Пармезан, рукола, каперс", "Parmesan, rocket, capers"), weight: "160 г", price: 5900 },
    { id: "salmon-tartare", photo: true, name: L("Тартар из лосося", "Албырт тартары", "Salmon tartare"),
      description: L("Авокадо, лайм, тосты", "Авокадо, лайм, тосттар", "Avocado, lime, toast"), weight: "180 г", price: 6400, tag: "Шеф" },
    { id: "kazy", photo: true, name: L("Ассорти казы-карта-жая", "Қазы-қарта-жая ассортиі", "Kazy, karta & zhaya platter"),
      description: L("Конина домашнего приготовления, лук, лепёшка", "Үйде дайындалған жылқы еті, пияз, нан", "House-cured horse meat, onion, flatbread"), weight: "350 г", price: 9800, tag: "Хит" },
    { id: "cheese-plate", photo: true, name: L("Сырная тарелка", "Ірімшік табағы", "Cheese board"),
      description: L("Пять сыров, мёд, орехи, виноград", "Бес түрлі ірімшік, бал, жаңғақ, жүзім", "Five cheeses, honey, nuts, grapes"), weight: "300 г", price: 7200 },
  ]},
  { id: "salads", title: L("Салаты", "Салаттар", "Salads"), dishes: [
    { id: "caesar-chicken", photo: true, name: L("Цезарь с курицей", "Тауық етімен «Цезарь»", "Chicken Caesar"),
      description: L("Романо, пармезан, соус по-нашему", "Романо, пармезан, өзіміздің тұздық", "Romaine, parmesan, house dressing"), weight: "260 г", price: 4200 },
    { id: "caesar-shrimp", photo: true, name: L("Цезарь с тигровыми креветками", "Жолбарыс асшаянымен «Цезарь»", "Caesar with tiger prawns"), weight: "260 г", price: 5600 },
    { id: "burrata", photo: true, name: L("Буррата с томатами", "Қызанақпен буррата", "Burrata with tomatoes"),
      description: L("Черри, базилик, песто", "Черри, райхан, песто", "Cherry tomatoes, basil, pesto"), weight: "240 г", price: 5900 },
    { id: "beef-salad", photo: true, name: L("Тёплый салат с говядиной", "Сиыр етімен жылы салат", "Warm beef salad"),
      description: L("Вырезка, овощи гриль, кунжут", "Жон еті, гриль көкөністер, күнжіт", "Tenderloin, grilled vegetables, sesame"), weight: "250 г", price: 5200 },
    { id: "greek-salad", photo: true, name: L("Греческий", "Грек салаты", "Greek salad"), weight: "280 г", price: 3600 },
  ]},
  { id: "soups", title: L("Супы", "Сорпалар", "Soups"), dishes: [
    { id: "sorpa", photo: true, name: L("Сорпа из баранины", "Қой етінен сорпа", "Lamb sorpa"),
      description: L("Наваристый бульон, зелень, лепёшка", "Қою сорпа, көк шөп, нан", "Rich broth, herbs, flatbread"), weight: "400 г", price: 3400 },
    { id: "mushroom-soup", photo: true, name: L("Крем-суп из белых грибов", "Ақ саңырауқұлақ крем-сорпасы", "Porcini cream soup"),
      description: L("Сливки, трюфельное масло", "Кілегей, трюфель майы", "Cream, truffle oil"), weight: "300 г", price: 3600 },
    { id: "tom-yum", photo: true, name: L("Том ям с морепродуктами", "Теңіз өнімдерімен том ям", "Seafood tom yum"),
      description: L("Кокосовое молоко, рис", "Кокос сүті, күріш", "Coconut milk, rice"), weight: "400 г", price: 5200, tag: "Остро" },
    { id: "solyanka", photo: true, name: L("Солянка мясная", "Етті солянка", "Meat solyanka"), weight: "350 г", price: 3300 },
  ]},
  { id: "pasta", title: L("Паста и ризотто", "Паста және ризотто", "Pasta & risotto"), dishes: [
    { id: "alfredo", photo: true, name: L("Феттучине Альфредо с курицей", "Тауық етімен феттучине Альфредо", "Chicken fettuccine Alfredo"), weight: "320 г", price: 4600 },
    { id: "carbonara", photo: true, name: L("Карбонара", "Карбонара", "Carbonara"),
      description: L("Гуанчале из говядины, желток, пекорино", "Сиыр етінен гуанчале, сарыуыз, пекорино", "Beef guanciale, egg yolk, pecorino"), weight: "300 г", price: 4800 },
    { id: "risotto", photo: true, name: L("Ризотто с белыми грибами", "Ақ саңырауқұлақты ризотто", "Porcini risotto"), weight: "300 г", price: 5400 },
    { id: "seafood-pasta", photo: true, name: L("Паста с морепродуктами", "Теңіз өнімдерімен паста", "Seafood pasta"),
      description: L("Креветки, мидии, кальмар, томатный соус", "Асшаян, мидия, кальмар, қызанақ тұздығы", "Prawns, mussels, squid, tomato sauce"), weight: "340 г", price: 6900, available: false },
  ]},
  { id: "grill", title: L("Стейки и гриль", "Стейктер мен гриль", "Steaks & grill"), dishes: [
    { id: "ribeye", photo: true, name: L("Рибай", "Рибай", "Ribeye"),
      description: L("Мраморная говядина, зерновой откорм", "Мәрмәр сиыр еті, дәнмен бордақыланған", "Marbled grain-fed beef"), weight: "300 г", price: 14900, tag: "Шеф" },
    { id: "striploin", photo: true, name: L("Стриплойн", "Стриплойн", "Striploin"), weight: "300 г", price: 12900 },
    { id: "filet-mignon", photo: true, name: L("Филе-миньон", "Филе-миньон", "Filet mignon"),
      description: L("Соус демиглас", "Демиглас тұздығы", "Demi-glace sauce"), weight: "200 г", price: 13800 },
    { id: "lamb-rack", photo: true, name: L("Каре ягнёнка", "Қозы қабырғасы", "Rack of lamb"),
      description: L("Розмарин, чеснок, овощи гриль", "Розмарин, сарымсақ, гриль көкөністер", "Rosemary, garlic, grilled vegetables"), weight: "350 г", price: 11800 },
    { id: "shashlik", photo: true, name: L("Шашлык из баранины", "Қой етінен шашлык", "Lamb shashlik"), weight: "250 г", price: 5600, tag: "Хит" },
    { id: "sea-bass", photo: true, name: L("Сибас на гриле", "Гриль сибас", "Grilled sea bass"),
      description: L("Лимон, каперсы, оливковое масло", "Лимон, каперс, зәйтүн майы", "Lemon, capers, olive oil"), weight: "1 шт.", price: 9400 },
  ]},
  { id: "national", title: L("Национальная кухня", "Ұлттық тағамдар", "Kazakh cuisine"), dishes: [
    { id: "beshbarmak", photo: true, name: L("Бешбармак", "Бешбармақ", "Beshbarmak"),
      description: L("Конина и баранина, тесто ручной раскатки, сорпа", "Жылқы мен қой еті, қолмен жайылған қамыр, сорпа", "Horse meat and lamb, hand-rolled noodles, sorpa broth"), weight: "450 г", price: 6900, tag: "Хит" },
    { id: "beshbarmak-big", photo: true, name: L("Бешбармак на компанию", "Топқа арналған бешбармақ", "Beshbarmak to share"),
      description: L("Подаётся на табаке, на 4–6 гостей", "Табақпен беріледі, 4–6 қонаққа", "Served on a tabak platter, for 4–6 guests"), weight: "2 кг", price: 29000 },
    { id: "kazan-kebab", photo: true, name: L("Казан-кебаб", "Қазан-кебаб", "Kazan kebab"),
      description: L("Баранина, картофель, лук", "Қой еті, картоп, пияз", "Lamb, potatoes, onion"), weight: "400 г", price: 7400 },
    { id: "plov", photo: true, name: L("Плов", "Палау", "Plov"), weight: "350 г", price: 3900 },
    { id: "manti", photo: true, name: L("Манты с бараниной", "Қой етімен манты", "Lamb manti"), weight: "5 шт.", price: 3400 },
  ]},
  { id: "desserts", title: L("Десерты", "Десерттер", "Desserts"), dishes: [
    { id: "cheesecake", photo: true, name: L("Чизкейк Сан-Себастьян", "Сан-Себастьян чизкейкі", "San Sebastián cheesecake"), weight: "150 г", price: 3200 },
    { id: "tiramisu", photo: true, name: L("Тирамису", "Тирамису", "Tiramisu"), weight: "160 г", price: 2900 },
    { id: "medovik", photo: true, name: L("Медовик", "Бал торты", "Medovik honey cake"), weight: "150 г", price: 2600 },
    { id: "fondant", photo: true, name: L("Шоколадный фондан", "Шоколад фонданы", "Chocolate fondant"),
      description: L("Шарик ванильного мороженого", "Ванильді балмұздақ", "Scoop of vanilla ice cream"), weight: "140 г", price: 3400 },
  ]},
  { id: "wine", title: L("Вино", "Шарап", "Wine"), dishes: [
    { id: "chianti", photo: true, name: L("Chianti Classico", "Chianti Classico", "Chianti Classico"),
      description: L("Красное сухое, Тоскана, Италия", "Қызыл құрғақ, Тоскана, Италия", "Dry red, Tuscany, Italy"), weight: "150 мл", price: 4500 },
    { id: "malbec", photo: true, name: L("Malbec Reserva", "Malbec Reserva", "Malbec Reserva"),
      description: L("Красное сухое, Мендоса, Аргентина", "Қызыл құрғақ, Мендоса, Аргентина", "Dry red, Mendoza, Argentina"), weight: "150 мл", price: 4200 },
    { id: "sauvignon", photo: true, name: L("Sauvignon Blanc", "Sauvignon Blanc", "Sauvignon Blanc"),
      description: L("Белое сухое, Мальборо, Новая Зеландия", "Ақ құрғақ, Мальборо, Жаңа Зеландия", "Dry white, Marlborough, New Zealand"), weight: "150 мл", price: 4000 },
    { id: "prosecco", photo: true, name: L("Prosecco DOC", "Prosecco DOC", "Prosecco DOC"),
      description: L("Игристое брют, Венето, Италия", "Көпіршікті брют, Венето, Италия", "Sparkling brut, Veneto, Italy"), weight: "150 мл", price: 3800 },
    { id: "rose", photo: true, name: L("Côtes de Provence Rosé", "Côtes de Provence Rosé", "Côtes de Provence Rosé"),
      description: L("Розовое сухое, Прованс, Франция", "Қызғылт құрғақ, Прованс, Франция", "Dry rosé, Provence, France"), weight: "150 мл", price: 4300 },
  ]},
  { id: "cocktails", title: L("Коктейли", "Коктейльдер", "Cocktails"), dishes: [
    { id: "spritz", photo: true, name: L("Монако спритц", "Монако спритц", "Monaco Spritz"),
      description: L("Апероль, просекко, апельсин", "Апероль, просекко, апельсин", "Aperol, prosecco, orange"), weight: "300 мл", price: 4200, tag: "Новинка" },
    { id: "negroni", photo: true, name: L("Негрони", "Негрони", "Negroni"), weight: "120 мл", price: 4400 },
    { id: "mojito", photo: true, name: L("Мохито", "Мохито", "Mojito"),
      description: L("Также безалкогольный", "Алкогольсіз нұсқасы да бар", "Also available alcohol-free"), weight: "350 мл", price: 3800 },
    { id: "pina-colada", photo: true, name: L("Пина колада", "Пина колада", "Piña colada"), weight: "300 мл", price: 4200 },
  ]},
  { id: "drinks", title: L("Напитки", "Сусындар", "Drinks"), dishes: [
    { id: "lemonade", photo: true, name: L("Авторский лимонад", "Авторлық лимонад", "Signature lemonade"),
      description: L("Маракуйя, клубника-базилик, цитрус", "Маракуйя, құлпынай-райхан, цитрус", "Passion fruit, strawberry-basil, citrus"), weight: "1 л", price: 3500 },
    { id: "tea", photo: true, name: L("Чай в чайнике", "Шәйнектегі шай", "Pot of tea"),
      description: L("Чёрный, зелёный, с чабрецом", "Қара, жасыл, жебірмен", "Black, green, with thyme"), weight: "800 мл", price: 1800 },
    { id: "cappuccino", photo: true, name: L("Капучино", "Капучино", "Cappuccino"), weight: "300 мл", price: 1400 },
    { id: "juice", photo: true, name: L("Свежевыжатый сок", "Жаңа сығылған шырын", "Fresh juice"), weight: "250 мл", price: 2200 },
  ]},
];

export const banquet = {
  minGuests: 10,
  maxGuests: 50,
  sets: [
    { name: L("Классика", "Классика", "Classic"), price: 18000,
      items: [
        L("Три холодные закуски", "Үш суық тағам", "Three cold starters"),
        L("Два салата на выбор", "Таңдауға екі салат", "Two salads of your choice"),
        L("Горячее: стейк из говядины или сибас", "Ыстық тағам: сиыр стейкі немесе сибас", "Main: beef steak or sea bass"),
        L("Десерт, чай, лимонады", "Десерт, шай, лимонадтар", "Dessert, tea, lemonades"),
      ] },
    { name: L("Monaco", "Monaco", "Monaco"), price: 25000, tag: L("Чаще берут", "Жиі таңдайды", "Most popular"),
      items: [
        L("Ассорти казы-карта-жая и сыры", "Қазы-қарта-жая мен ірімшік ассортиі", "Kazy-karta-zhaya and cheese platter"),
        L("Тартар из лосося, буррата", "Албырт тартары, буррата", "Salmon tartare, burrata"),
        L("Бешбармак на табаке", "Табақтағы бешбармақ", "Beshbarmak on a tabak platter"),
        L("Каре ягнёнка, овощи гриль", "Қозы қабырғасы, гриль көкөністер", "Rack of lamb, grilled vegetables"),
        L("Торт под ваше событие", "Мерекеңізге арналған торт", "A cake for your occasion"),
      ] },
    { name: L("Той", "Той", "Toi feast"), price: 32000,
      items: [
        L("Полный дастархан закусок", "Толық дастархан тағамдары", "A full dastarkhan of starters"),
        L("Бешбармак и казан-кебаб", "Бешбармақ пен қазан-кебаб", "Beshbarmak and kazan kebab"),
        L("Горячее из гриля на выбор", "Таңдауға гриль тағамдары", "Grill mains of your choice"),
        L("Ведущий и музыка — по договорённости", "Асаба мен музыка — келісім бойынша", "Host and music on request"),
      ] },
  ] satisfies BanquetSet[],
};

export function formatPrice(n: number): string {
  return n.toLocaleString("ru-RU").replace(/\s/g, " ") + " " + currency;
}
