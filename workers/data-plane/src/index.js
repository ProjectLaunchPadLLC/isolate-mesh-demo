export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/hello") {
      const version = env.SERVICE_VERSION || "v1";
      return new Response(JSON.stringify({ message: "hello from data-plane", version }), {
        headers: { "content-type": "application/json" }
      });
    }
    return new Response("data-plane alive");
  }
}
