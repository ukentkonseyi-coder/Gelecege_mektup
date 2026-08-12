const SHEET_NAME = 'Mektuplar';

function doGet() {
  return json_({ok: true, service: "Uşak'ın Geleceğine Mektup"});
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    validate_(data);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getSheet_();
      const recordId = Utilities.getUuid().split('-')[0].toUpperCase();
      sheet.appendRow([
        recordId,
        new Date(),
        clean_(data.futureCity, 2000),
        clean_(data.futureMessage, 2000),
        clean_(data.fullName, 100),
        clean_(data.age, 3),
        clean_(data.neighborhood, 100),
        clean_(data.occupation, 100),
        data.consent === true ? 'Evet' : 'Hayır'
      ]);
      return json_({ok: true, recordId: recordId});
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    return json_({ok: false, message: error.message});
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Kayıt No', 'Gönderim Tarihi', '100 Yıl Sonra Uşak', 'Geleceğe Mesaj', 'Ad Soyad', 'Yaş', 'Mahalle', 'Meslek', 'Onay']);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#08243f').setFontColor('#ffffff');
  }
  return sheet;
}

function validate_(data) {
  if (data.website) throw new Error('Geçersiz istek.');
  if (!clean_(data.futureCity, 2000)) throw new Error('Birinci soru zorunludur.');
  if (!clean_(data.futureMessage, 2000)) throw new Error('İkinci soru zorunludur.');
  if (data.consent !== true) throw new Error('Onay kutusunu işaretlemelisiniz.');
}

function clean_(value, maxLength) {
  let text = String(value == null ? '' : value).trim().slice(0, maxLength);
  // Hücre formülü çalıştırılmasını engeller.
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
