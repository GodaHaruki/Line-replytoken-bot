import { get_token } from "./sheet";

export function doGet(evt: GoogleAppsScript.Events.DoGet) {
  const { id } = evt.parameters;

  if (!id) { // if url parameter wasn't provided
    return;
  }

  const token = id.length > 0 ? get_token(id[0]) : undefined;

  const output = ContentService.createTextOutput();
  output.setContent(JSON.stringify(token ? token : null));
  output.setMimeType(ContentService.MimeType.JSON);

  return output
}