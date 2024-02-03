import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";

import { db } from "@/lib/data";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headerPayload = headers();
    const authorization = headerPayload.get("Authorization");

    if (!authorization) {
      return new Response("No authorization header", { status: 400 });
    }



    const event = receiver.receive(body, authorization);

   // console.log('Received event:', event);

    if (event.event === "ingress_started" || event.event === "ingress_ended") {
      const isLive = event.event === "ingress_started";

      await db.stream.update({
        where: {
          ingressId: event.ingressInfo?.ingressId,
        },
        data: {
          isLive,
        },
      });
    }

    return new Response("Event processed successfully", { status: 200 });
  } catch (error) {
    console.error('Error processing event:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
