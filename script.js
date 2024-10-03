const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//Show Loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
    if (!loading.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true
    }
}


// Get Quote From API 
async function getQuote() {
        loading()
        const proxyUrl = "http://cors-anywhere.herokuapp.com/";
        const apiUrl =
            "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
        try {
            const response = await fetch(proxyUrl + apiUrl);
            const data = await response.json();
            // If Author is blank, add 'Unknown'
            if (data.quoteAuthor === '') {
                authorText.innerText = 'Unknown'
            } else {
                authorText.innerText = data.quoteAuthor;
            }
            // Reduce font size for long quotes
            if (data.quoteText.length > 120) {
                quoteText.classList.add('long-quote');
            } else {
                quoteText.classList.remove('long-quote');
                quoteText.innerText = data.quoteText;
            }
            //Stop Louder, show the quote
            complete();
        } catch (error) {
            getQuote()
        }
}


function tweetQuote() {
    // Função para redirecionar para Bluesky com texto pré-preenchido
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const url = `https://bsky.app/create?text=${quote} - ${author}`;
    // Redirecionar para o link do Bluesky
    window.open(url, '_blank');
}
  

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On load
getQuote();
