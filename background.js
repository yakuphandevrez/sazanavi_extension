const SAFE_BROWSING_API_KEY = "AIzaSyDw-P880_NTQdAyHRwOqW5214-lh_zFQQ0";
const GEMINI_API_KEY = "AIzaSyCHoQ5gt4YG27LuctW9OvIFBr72TJ57PHk";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkUrl') {
        checkUrl(request.url)
            .then(result => sendResponse(result))
            .catch(error => sendResponse({ error: error.message }));
        return true;
    }
});

async function checkUrl(url) {
    const [safeBrowsing, aiAnalysis] = await Promise.all([
        checkSafeBrowsing(url),
        checkWithAI(url)
    ]);

    return {
        safeBrowsing,
        aiAnalysis
    };
}

async function checkSafeBrowsing(url) {
    try {
        const response = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${SAFE_BROWSING_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client: {
                    clientId: "yakuphan-phishai",
                    clientVersion: "1.0"
                },
                threatInfo: {
                    threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
                    platformTypes: ["ANY_PLATFORM"],
                    threatEntryTypes: ["URL"],
                    threatEntries: [{ url }]
                }
            })
        });

        const result = await response.json();
        return {
            dangerous: result.matches && result.matches.length > 0
        };
    } catch (error) {
        return { dangerous: false, error: error.message };
    }
}

async function checkWithAI(url) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `URL’yi 1 (güvenli) ile 10 (çok tehlikeli) arasında değerlendir. Phishing, malware ya da sahte sayfa olasılıklarına göre puanla ve kısa bir açıklama ver:: ${url}`
                    }]
                }]
            })
        });

        const result = await response.json();
        return result.candidates?.[0]?.content?.parts?.[0]?.text || "AI cevap veremedi";
    } catch (error) {
        return "AI hatası";
    }
}