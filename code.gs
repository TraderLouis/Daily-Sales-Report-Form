// ⚠️ Sensitive data: DO NOT hardcode these values if the project is public.
// Instead, store them in Google Apps Script Script Properties:
//   const props = PropertiesService.getScriptProperties();
//   const SHEET_ID = props.getProperty("SHEET_ID");
//   const lineToken = props.getProperty("LINE_TOKEN");
//   const groupId = props.getProperty("GROUP_ID");

// Google Sheet ID
const SHEET_ID = "";

// LINE Bot token
const lineToken = "";  

// LINE group ID
const groupId = "";               

/**
 * Entry point for GET requests
 */
function doGet(e) {
  const func = e.parameter.func;

  // Return data from Google Sheets as JSON
  if (func === "getData") {
    return ContentService
      .createTextOutput(JSON.stringify(getData()))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Return the web form (index.html)
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle("Sales Form")
    .addMetaTag('viewport','width=device-width, initial-scale=1');
}

/**
 * Include external HTML (e.g. CSS or JS files)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Get sellers and products from Google Sheets
 */
function getData() {
  const ss = SpreadsheetApp.openById(SHEET_ID);

  // Read sellers list
  const sellersSheet = ss.getSheetByName("Sellers");
  const sellers = sellersSheet.getRange(2, 1, sellersSheet.getLastRow() - 1, 1)
                    .getValues()
                    .map(r => r[0]);

  // Read products list (name + CSM value)
  const productsSheet = ss.getSheetByName("Products");
  const products = productsSheet.getRange(2, 1, productsSheet.getLastRow() - 1, 2)
                      .getValues()
                      .map(r => ({ name: r[0], CSM: r[1] }));

  return { sellers, products };
}

/**
 * Send message to LINE group
 */
function sendLineMessage(messageText) {
  try {
    const payload = {
      to: groupId,
      messages: [{ type: "text", text: messageText }]
    };

    const options = {
      method: "post",
      contentType: "application/json",
      headers: { "Authorization": "Bearer " + lineToken },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch("https://api.line.me/v2/bot/message/push", options);
    const code = response.getResponseCode();
    const body = response.getContentText();

    if (code === 200) {
      return { status: "ok", result: body };
    } else {
      return { status: "error", message: `HTTP ${code}: ${body}` };
    }

  } catch (err) {
    return { status: "error", message: err.message };
  }
}
