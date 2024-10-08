import { REPLYTOKEN_SHEET_ID, REPLYTOKEN_SHEET_NAME } from "./env";

export function push(timestamp: number, id: string, replyToken: string) {
  const sheet = SpreadsheetApp.openById(REPLYTOKEN_SHEET_ID).getSheetByName(REPLYTOKEN_SHEET_NAME)!;
  const lastRow = sheet.getLastRow() > 0 ? sheet.getLastRow() : 1;

  sheet.getRange(lastRow + 1, 1, 1, 3).setValues([[timestamp, id, replyToken]])
}

export interface ReplyToken {
  timestamp: number,
  id: string,
  replyToken: string
}

export function get_tokens(id: string): ReplyToken[] {
  update_tokens()

  const sheet = SpreadsheetApp.openById(REPLYTOKEN_SHEET_ID).getSheetByName(REPLYTOKEN_SHEET_NAME)!;
  const lastRow = sheet.getLastRow() > 0 ? sheet.getLastRow() : 1;

  const range = sheet.getRange(1, 1, lastRow, 3);

  return range.getValues().filter(v => {
    const [timestamp, vid, replyToken] = v;

    return id == vid
  }).map(v => {
    const [timestamp, id, replyToken] = v;
    return {
      timestamp,
      id,
      replyToken
    }
  })
}

export function update_tokens() {
  const sheet = SpreadsheetApp.openById(REPLYTOKEN_SHEET_ID).getSheetByName(REPLYTOKEN_SHEET_NAME)!;
  const lastRow = sheet.getLastRow() > 0 ? sheet.getLastRow() : 1;

  const range = sheet.getRange(1, 1, lastRow, 3);

  range.setValues(
    range
      .getValues()
      .map(v => {
        if ((new Date).getTime() - v[0] < 50000) {
          return v;
        } else {
          return [null, null, null];
        }
      })
  );
}