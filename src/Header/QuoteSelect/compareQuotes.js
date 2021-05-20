export default function compareQuotes(quoteA, quoteB) {
    const labelA = normalizeOption(typeof quoteA === 'string'? quoteA: quoteA.label);
    const labelB = normalizeOption(typeof quoteB === 'string'? quoteB: quoteB.label);

    return labelA.includes(labelB) || labelB.includes(labelA);
}

function normalizeOption(value) {
    return (
        value
            .trim()
            .toLocaleLowerCase()
            .replace(/\s+/g, ' ')
    );

}