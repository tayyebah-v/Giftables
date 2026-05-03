export function stepFromPathname(pathname: string): number {
  if (pathname.startsWith("/build/event")) return 1;
  if (pathname.startsWith("/build/packaging/customize")) return 3;
  if (pathname.startsWith("/build/packaging")) return 2;
  if (pathname.startsWith("/build/gifts")) return 4;
  if (pathname.startsWith("/build/add-ons")) return 5;
  if (pathname.startsWith("/build/delivery")) return 6;
  return 1;
}
