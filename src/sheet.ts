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

export function get_token(id: string): ReplyToken | undefined {
  update_tokens()

  const sheet = SpreadsheetApp.openById(REPLYTOKEN_SHEET_ID).getSheetByName(REPLYTOKEN_SHEET_NAME)!;
  const lastRow = sheet.getLastRow() > 0 ? sheet.getLastRow() : 1;

  const range = sheet.getRange(1, 1, lastRow, 3);

  const matchedValues = range.getValues().find(v => {
    const [timestamp, vid, replyToken] = v;

    if (id == vid) { // delete returning replyToken
      range.setValues(range.getValues().map(v1 => {
        const [v1timestamp, v1id, v1replyToken] = v1;

        if (timestamp == v1timestamp && vid == v1id && replyToken == v1replyToken) {
          return [null, null, null]
        }

        return v1
      }))
    }

    return id == vid
  });

  return matchedValues ? {
    timestamp: matchedValues[0],
    id: matchedValues[1],
    replyToken: matchedValues[2]
  } : undefined
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