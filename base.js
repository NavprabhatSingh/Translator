document.getElementById('translate-btn').addEventListener('click', function() {
    const sourceText = document.getElementById('source-text').value;
    const sourceLang = document.getElementById('source-lang').value;
    const targetLang = document.getElementById('target-lang').value;

    if (!sourceText.trim()) {
        alert("Please enter text to translate!");
        return;
    }

    const apiUrl = `https://translate.googleapis.com/v3beta1/projects/YOUR_PROJECT_ID/locations/global:translateText`;

    const data = {
        "contents": [sourceText],
        "targetLanguageCode": targetLang,
        "sourceLanguageCode": sourceLang,
        "mimeType": "text/plain",
        "model": "base"
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_KEY`  // Replace with your API key
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('API request failed with status: ' + response.status);
        }
        return response.json();
    })
    .then(result => {
        // Display translated text
        document.getElementById('translated-text').value = result.translations[0].translatedText;
    })
    .catch(error => {
        console.error('Error during translation:', error);
        alert('Error during translation: ' + error.message);
    });
});
