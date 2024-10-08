import { MessageEvent } from "@line/bot-sdk";
import { push, update_tokens } from "./sheet";
import { TARGET_GROUP_IDS, TARGET_USER_IDS } from "./env";

export function onMessageEvent(evt: MessageEvent) {
  switch (evt.source.type) {
    case "group":
      if (TARGET_GROUP_IDS.includes(evt.source.groupId)) push(evt.timestamp, evt.source.groupId, evt.replyToken);
      break;
    case "user":
      if (TARGET_USER_IDS.includes(evt.source.userId)) push(evt.timestamp, evt.source.userId, evt.replyToken);
      break;
    // case "room": deprecated
  }
}