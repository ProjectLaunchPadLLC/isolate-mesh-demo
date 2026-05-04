// Minimal control-plane: returns desired vs actual state and reconciles version
export default {
  async fetch(request, env) {
    if (request.method === "GET" && new URL(request.url).pathname === "/status") {
      // In a real build, read cluster-config from Gist or KV; here we return static config
      const desired = { service: "hello-service", version: "v1" };
      // Simulated actual state (would be read from KV/Durable Object)
      const actual = { service: "hello-service", version: await env.CLUSTER_KV.get("hello-service-version") || "unknown" };
      return new Response(JSON.stringify({ desired, actual }), {
        headers: { "content-type": "application/json" }
      });
    }

    if (request.method === "POST" && new URL(request.url).pathname === "/reconcile") {
      // Simple reconcile: set KV to desired version from body
      try {
        const body = await request.json();
        if (body.service && body.version) {
          await env.CLUSTER_KV.put(`${body.service}-version`, body.version);
          return new Response("reconciled", { status: 200 });
        }
        return new Response("bad request", { status: 400 });
      } catch (e) {
        return new Response("invalid json", { status: 400 });
      }
    }

    return new Response("ok", { status: 200 });
  }
}
