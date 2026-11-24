export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/metar") {
      const ids = url.searchParams.get("ids") || "";
      if (!/^[A-Z,]{4,200}$/.test(ids)) return new Response("bad request", { status: 400 });
      const r = await fetch(
        `https://aviationweather.gov/api/data/metar?ids=${ids}&format=json`,
        { headers: { "User-Agent": "fs-wind-board" }, cf: { cacheTtl: 60, cacheEverything: true } }
      );
      return new Response(r.body, {
        headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60" },
      });
    }
    return new Response("Not found", { status: 404 });
  },
};
