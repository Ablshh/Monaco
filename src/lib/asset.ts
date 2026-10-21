// Файлы из public/ при публикации на GitHub Pages лежат в подпапке репозитория.
// next/link и next/image добавляют её сами, а для <video>, <img> и фона в style — эта функция.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return base + path;
}
