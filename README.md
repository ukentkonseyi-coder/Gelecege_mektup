# Uşak'ın Geleceğine Mektup

GitHub Pages üzerinde çalışan mobil form ve Google Sheets kayıt servisi.

## 1. Google Sheets ve Apps Script

1. Yeni bir Google Sheets dosyası oluşturun.
2. **Uzantılar > Apps Script** menüsünü açın.
3. Editördeki `Code.gs` içeriğini silip `google-apps-script/Code.gs` dosyasının içeriğini yapıştırın.
4. **Dağıt > Yeni dağıtım > Web uygulaması** seçin.
5. **Şu kullanıcı olarak çalıştır:** Ben.
6. **Erişimi olanlar:** Herkes. Kurumsal hesapta bu seçenek görünmüyorsa Google Workspace yöneticisinin dış erişime izin vermesi gerekir.
7. Dağıtın, izinleri onaylayın ve sonu `/exec` ile biten Web Uygulaması URL'sini kopyalayın.
8. `config.js` dosyasındaki `BURAYA_APPS_SCRIPT_WEB_APP_URL` yazısını bu URL ile değiştirin.

> Apps Script kodunda daha sonra değişiklik yaparsanız **Dağıt > Dağıtımları yönet > Düzenle > Yeni sürüm** ile yeniden yayınlayın.

## 2. GitHub Pages

1. GitHub'da yeni ve herkese açık bir depo oluşturun.
2. Bu klasörün içindeki tüm dosya ve klasörleri deponun ana dizinine yükleyin.
3. Depoda **Settings > Pages** bölümünü açın.
4. **Deploy from a branch**, `main` ve `/(root)` seçeneklerini seçip kaydedin.
5. Birkaç dakika sonra verilen `https://kullanici.github.io/depo-adi/` adresini açın.

## 3. Test

1. Formu telefondan açın ve deneme kaydı gönderin.
2. Google Sheets içinde `Mektuplar` sayfasının otomatik oluştuğunu ve kaydın yeni satıra eklendiğini doğrulayın.
3. GitHub Pages adresini bir QR kod üreticisinde QR koda dönüştürün.

## Gizlilik notu

Formda iki mektup alanı ve onay zorunlu, kişisel alanlar isteğe bağlıdır. Yayına almadan önce kurumunuzun KVKK aydınlatma metni varsa onay metnine veya ayrı bir bağlantıya ekleyin. Google Sheets dosyasını herkese açık paylaşmayın; yalnızca yetkili kurum hesabıyla erişilebilir tutun.
