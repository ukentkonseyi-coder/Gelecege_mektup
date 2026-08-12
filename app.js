const form = document.querySelector('#letterForm');
const button = document.querySelector('#submitButton');
const message = document.querySelector('#formMessage');

for (const id of ['futureCity', 'futureMessage']) {
  const input = document.getElementById(id);
  const count = document.getElementById(`${id}Count`);
  input.addEventListener('input', () => { count.textContent = input.value.length; });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.className = 'message';
  if (!form.reportValidity()) return;

  const url = window.APP_CONFIG?.SCRIPT_URL;
  if (!url || url.includes('BURAYA_')) {
    show('Google Apps Script bağlantısı henüz config.js dosyasına eklenmemiş.', 'error');
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  data.consent = document.querySelector('#consent').checked;
  data.website = ''; // Spam tuzağı; kullanıcıya gösterilmez.

  button.disabled = true;
  button.firstChild.textContent = 'Gönderiliyor... ';
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type': 'text/plain;charset=utf-8'},
      body: JSON.stringify(data)
    });
    form.reset();
    document.querySelector('#futureCityCount').textContent = '0';
    document.querySelector('#futureMessageCount').textContent = '0';
    show('Mektubunuz geleceğe gönderildi. Teşekkür ederiz.', 'success');
  } catch (error) {
    show(`Gönderim sırasında hata oluştu: ${error.message}`, 'error');
  } finally {
    button.disabled = false;
    button.firstChild.textContent = 'Mektubumu Geleceğe Gönder ';
  }
});

function show(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
  message.scrollIntoView({behavior: 'smooth', block: 'center'});
}
