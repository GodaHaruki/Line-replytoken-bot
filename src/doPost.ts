import { WebhookEvent, WebhookRequestBody } from "@line/bot-sdk";
import { onMessageEvent } from "./webhookEventHandler";
import { push, update_tokens } from "./sheet";

export function doPost(evt: GoogleAppsScript.Events.DoPost) {
  const webhookReq: WebhookRequestBody = JSON.parse(evt.postData.contents);

  // update_tokens();

  webhookReq.events.forEach(webhookEvt => {
    switch (webhookEvt.type) {
      case "message":
        onMessageEvent(webhookEvt);
        break;
      // case "join":
      //   break;
      // case "memberJoined":
      //   break;
    }
  })
}