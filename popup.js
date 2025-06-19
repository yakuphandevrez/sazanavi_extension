document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('urlInput');
    const checkBtn = document.getElementById('checkBtn');
    const result = document.getElementById('result');

    checkBtn.addEventListener('click', checkUrl);
    
    urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkUrl();
    });

    async function checkUrl() {
        const url = urlInput.value.trim();
        
        if (!url) {
            showResult('URL girin!', 'dangerous');
            return;
        }

        showResult('Kontrol ediliyor...', 'loading');
        checkBtn.disabled = true;

        try {
            const response = await chrome.runtime.sendMessage({
                action: 'checkUrl',
                url: url
            });

            checkBtn.disabled = false;

            if (response.error) {
                showResult('Hata: ' + response.error, 'dangerous');
                return;
            }

            let message = '';
            
            // Safe Browsing sonucu
            if (response.safeBrowsing.dangerous) {
                message += '⚠️ Zararlı URL tespit edildi!\n';
            } else {
                message += '✅ Safe Browsing: Güvenli\n';
            }

            // AI sonucu
            if (response.aiAnalysis) {
                message += '\n🤖 AI: ' + response.aiAnalysis;
            }

            const isOverallSafe = !response.safeBrowsing.dangerous;
            showResult(message, isOverallSafe ? 'safe' : 'dangerous');

        } catch (error) {
            checkBtn.disabled = false;
            showResult('Hata oluştu!', 'dangerous');
        }
    }

    function showResult(message, type) {
        result.innerHTML = message.replace(/\n/g, '<br>');
        result.className = type;
        result.style.display = 'block';
    }
});