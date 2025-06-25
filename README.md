🛡️ AI Phishing Detector
Bu Chrome uzantısı, kullanıcıların girdiği URL'lerin güvenliğini Google Safe Browsing API ve Gemini AI kullanarak kontrol eder. Amaç, kullanıcıyı zararlı, phishing veya sahte sayfalar konusunda uyarmaktır.

🔍 Özellikler
Safe Browsing API ile zararlı URL’lerin tespiti

Gemini AI ile URL’ye dair açıklamalı bir güvenlik skoru

Kullanıcı dostu bir arayüzle tek tıklamayla analiz

Gerçek zamanlı analiz ve anlık uyarı sistemi

🧩 Kurulum
Bu repoyu indir veya klonla:

bash
Kopyala
Düzenle
git clone https://github.com/yakuphandevrez/sazanavi_extension/tree/main
Chrome tarayıcısını aç ve chrome://extensions/ sayfasına git.

Sağ üstteki Geliştirici modunu aktif et.

Paketlenmemiş uzantı yükle butonuna tıkla ve proje klasörünü seç.

Uzantı tarayıcınıza eklenecek ve çalışmaya hazır olacaktır.

🧠 Kullanım
Tarayıcının sağ üst köşesindeki uzantı simgesine tıkla.

Açılan penceredeki alana bir URL yapıştır.

Kontrol Et butonuna bas.

Sistem, URL’yi analiz eder ve:

Safe Browsing ile güvenliğini doğrular.

Gemini AI üzerinden analiz eder ve yorum sunar.

📂 Proje Yapısı
bash
Kopyala
Düzenle
├── background.js     # API isteklerini yöneten servis
├── manifest.json     # Uzantı tanım dosyası
├── popup.html        # Kullanıcı arayüzü (dahil değil)
├── popup.js          # UI davranışları ve sonuçların gösterimi
🔐 API Anahtarları
background.js dosyasındaki API anahtarlarınızı açık bırakmayın. Bunları .env gibi gizli bir dosyada saklamanız önerilir.

SAFE_BROWSING_API_KEY: Google Safe Browsing API

GEMINI_API_KEY: Google Gemini (Generative Language API)

![image](https://github.com/user-attachments/assets/64570cc9-4480-4eca-9ca3-d0152fbf241a)


⚠️ Uyarı
Bu proje eğitim ve prototipleme amaçlıdır. Gerçek dünyada kullanıma sunulmadan önce:

Anahtar güvenliği sağlanmalı

Performans ve hata senaryoları test edilmelidir

Gelişmiş UI/UX iyileştirmeleri yapılmalıdır

