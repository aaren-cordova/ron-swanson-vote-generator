import './App.scss';
import Header from './Header';
import {useState, useEffect} from 'react';
import Storages from 'js-storage';
import classNames from 'classnames';
import 'antd/dist/antd.css';
import md5 from 'md5';
import QuoteList from './QuoteList';

const storageNameSpaces = {'default-name': Storages};

function getStorage(name) {
    name = name || 'default-name';

    if (!storageNameSpaces[name]) {
        storageNameSpaces[name] = Storages.initNamespaceStorage(name);
    }

    const {sessionStorage, localStorage, cookieStorage} = storageNameSpaces[name];

    return sessionStorage || localStorage || cookieStorage || null;
}

async function fetchQuotes({quotes, totalQuotes}) {
    const currentQuoteIds = {};
    quotes.forEach(({id}) => {
        currentQuoteIds[id] = true;
    });

    const numQuotesToLoad = totalQuotes - quotes.length;
    const response = await fetch(`//ron-swanson-quotes.herokuapp.com/v2/quotes/${numQuotesToLoad}`);
    let newQuotes = await response.json();

    newQuotes = newQuotes
        .map((label) => {
            return { // Fake data, this should be stored in the API endpoint instead.  Here for testing purposes
                value: md5(label),
                label,
                yesVotes: Math.floor(Math.random() * 10),
                noVotes: Math.floor(Math.random() * 10),
            };
        })
        .filter(({id}) => {
            return !currentQuoteIds[id];
        });

    quotes = quotes.concat(newQuotes);
    if (totalQuotes !== quotes.length) {
        quotes = await fetchQuotes({quotes, totalQuotes});
    }

    return quotes;
}

export default function App() {
    const storage = getStorage(`ron-swanson-quote-generator-v${process.env.REACT_APP_VERSION}-4`);
    const [totalQuotes, setTotalQuotes] = useState(storage && !storage.isEmpty('totalQuotes') ? storage.get('totalQuotes') : 2);
    const [theme, setTheme] = useState('light');
    const [searchTerm, setSearchTerm] = useState('');
    const [quotes, setQuotes] = useState([]);
    const [error, setError] = useState(null);
    const [filteredQuotes, setFilteredQuotes] = useState([]);
    const [currentVote, setCurrentVote] = useState({id: '', value: ''});

    useEffect(() => {
        if (error) {
            return;
        }

        if (!quotes.length && storage && !storage.isEmpty('quotes')) {
            const quotes = storage.get('quotes');
            setQuotes(quotes);
            setFilteredQuotes(quotes);
            setTotalQuotes(quotes.length);
            return;
        }

        if (quotes.length < totalQuotes) {
            setSearchTerm('');

            fetchQuotes({quotes, totalQuotes})
                .then((response) => {
                    setQuotes(response);
                    setFilteredQuotes(response);

                    if (storage) {
                        storage.set('quotes', response);
                    }
                })
                .catch(setError);
            return;
        }

        if (filteredQuotes.length > totalQuotes) {
            setFilteredQuotes(filteredQuotes.slice(0, totalQuotes));
            return;
        }

        if (storage) {
            storage.set('totalQuotes', totalQuotes);
            return;
        }

    }, [totalQuotes, quotes]);


    const isLightTheme = theme === 'light';
    return (
        <div className={classNames('App', {'theme--light': isLightTheme, 'theme--dark': !isLightTheme})}>
            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                theme={theme}
                setTheme={setTheme}
                quotes={quotes}
                setFilteredQuotes={setFilteredQuotes}
                totalQuotes={totalQuotes}
                setTotalQuotes={setTotalQuotes}
            />
            <main>
                <QuoteList
                    quotes={filteredQuotes}
                    setCurrentVote={setCurrentVote}
                    currentVote={currentVote}
                />
            </main>
        </div>
    );
}
