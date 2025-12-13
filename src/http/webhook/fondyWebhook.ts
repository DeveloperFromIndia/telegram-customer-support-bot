import { serve } from "bun";

serve({
    port: 3000,
    fetch: async (req) => {
        // if (req.method === "POST" && req.url.endsWith("/fondy/webhook")) {
        try {
            const data = await req.json();
            console.log(data);

            return new Response("OK");
        } catch (err) {
            console.error("Webhook error:", err);
            return new Response("Bad Request", { status: 400 });
        }
        // }

        return new Response("Not Found", { status: 404 });
    },
});

console.log("Webhook server running at http://localhost:3000/fondy/webhook");
