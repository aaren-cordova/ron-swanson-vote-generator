import md5 from 'md5';

export default async function fetchQuotes({quotes, totalQuotes}) {
    const currentQuoteIds = {};
    quotes.forEach(({value}) => {
        currentQuoteIds[value] = true;
    });

    const numQuotesToLoad = totalQuotes - quotes.length;
    const response = await fetch(`//ron-swanson-quotes.herokuapp.com/v2/quotes/${numQuotesToLoad}`);
    let newQuotes = await response.json();
    debugger;

    newQuotes = newQuotes
        .map((label) => {
            return { // Fake data, this should be stored in the API endpoint instead.  Here for testing purposes
                value: md5(label),
                label,
                yesVotes: Math.floor(Math.random() * 10),
                noVotes: Math.floor(Math.random() * 10),
            };
        })
        .filter(({value}) => {
            return !currentQuoteIds[value];
        });

    quotes = quotes.concat(newQuotes);
    if (totalQuotes !== quotes.length) {
        quotes = await fetchQuotes({quotes, totalQuotes});
    }

    return quotes;
}