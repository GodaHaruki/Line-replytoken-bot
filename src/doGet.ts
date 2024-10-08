import { get_tokens } from "./sheet";

export function doGet(evt: GoogleAppsScript.Events.DoGet) {
  const { id } = evt.parameters;

  if (!id) { // if url parameter wasn't provided
    return;
  }

  const tokens = id.length > 0 ? get_tokens(id[0]) : [];

  const output = ContentService.createTextOutput();
  output.setContent(JSON.stringify(tokens));
  output.setMimeType(ContentService.MimeType.JSON);

  return output
}