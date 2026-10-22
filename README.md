# Monaco — сайт ресторана в Кызылорде

Next.js 16 + React 19 + TypeScript. Сайт собирается в статические файлы и публикуется на GitHub Pages.

## Запуск на компьютере

```bash
npm install
npm run dev      # http://localhost:3000, правки видны сразу
npm run build    # готовый сайт в папке out/
npm start        # показать собранный out/ на http://localhost:3000
```

## Где что менять

| Что | Файл |
|---|---|
| Телефон, WhatsApp, время работы и брони | `src/data/site.ts` |
| Тексты сайта на казахском, русском, английском (и адрес) | `src/i18n/dict.ts` |
| Блюда, цены, «временно нет», банкетные сеты | `src/data/menu.ts` |
| Тексты экранов главной | `src/components/*.tsx` |
| Стили | `src/styles/base.css`, `home.css`, `menu.css` |
| Видео, фото, логотип | `public/` |

Убрать блюдо из продажи на время: у блюда в `menu.ts` поставить `available: false`. Оно останется в меню с пометкой «Временно нет».

## Бронь

Форма собирает заявку (имя, телефон, дата, время, гости, пожелание) в одно сообщение и открывает WhatsApp ресторана — гостю остаётся нажать «Отправить». Номер — `whatsappNumber` в `src/data/site.ts`.

## Публикация

При каждом пуше в ветку `main` GitHub Actions собирает сайт и выкладывает его на GitHub Pages (`.github/workflows/deploy.yml`). В настройках репозитория: Settings → Pages → Source: **GitHub Actions**.

## Источники

Видео и фото — Mixkit, бесплатная лицензия. Фото блюд в меню — Wikimedia Commons (CC0 / CC BY / CC BY-SA), вырезаны из фона; авторы перечислены внизу страницы меню (`src/data/photoCredits.ts`). Фото блюда задаётся полем `photo` в `menu.ts`, файл — `public/menu/<photo>.webp`. Логотип — векторная перерисовка вывески ресторана. Меню и цены — пример для прототипа.
