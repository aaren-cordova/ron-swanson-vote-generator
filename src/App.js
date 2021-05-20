import {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import compareQuotes from './pages/Homepage/Header/QuoteSelect/compareQuotes';
import {ERROR, NO_VOTE, STARTED, SUCCESS, UNSENT, YES_VOTE} from './constants';
import getStorage from './utils/getStorage';
import HomePage from './pages/Homepage';
import classNames from 'classnames';
import fetchQuotes from './apis/fetchQuotes';
import './App.styles.scss'

export default function App() {
    const storage = getStorage(`ron-swanson-quote-generator-v7-${process.env.REACT_APP_VERSION}`);
    const [hasLoadedFromCache, setLoadedFromCache] = useState(false);
    const [loadState, setLoadState] = useState(UNSENT);
    const [totalQuotes, setTotalQuotes] = useState(2);
    const [theme, setTheme] = useState('light');
    const [searchTerm, setSearchTerm] = useState('');
    const [quotes, setQuotes] = useState([]);
    const [error, setError] = useState(null);
    const [filteredQuotes, setFilteredQuotes] = useState([]);
    const [previousVote, setPreviousVote] = useState({id: '', value: ''});
    const [currentVote, setCurrentVote] = useState({id: '', value: ''});

    useEffect(() => {
        if (!currentVote.id) {
            return;
        }

        let newQuotes = null;

        for (let i = 0; i < quotes.length; ++i) {
            const {value: id} = quotes[i];
            if (previousVote.id === id) {
                newQuotes = newQuotes || quotes.concat();
                newQuotes[i] = createUpdatedQuote({quote: newQuotes[i], vote: previousVote, direction: 'from'});
            }

            if (currentVote.id === id) {
                newQuotes = newQuotes || quotes.concat();
                newQuotes[i] = createUpdatedQuote({quote: newQuotes[i], vote: currentVote, direction: 'to'});
                setPreviousVote(currentVote);
            }
        }

        if (newQuotes) {
            setQuotes(newQuotes);
        }


    }, [currentVote]);

    useEffect(() => {
        if (!storage || hasLoadedFromCache) {
            return;
        }

        if (!quotes.length && !storage.isEmpty('quotes')) {
            const quotes = storage.get('quotes');
            setQuotes(quotes);
            setTotalQuotes(quotes.length);
        }

        if (!storage.isEmpty('totalQuotes')) {
            setTotalQuotes(storage.get('totalQuotes'));
        }

        if (!storage.isEmpty('theme')) {
            setTheme(storage.get('theme'));
        }

        if (!storage.isEmpty('previousVote')) {
            setPreviousVote(storage.get('previousVote'));
        }

        if (!storage.isEmpty('currentVote')) {
            setCurrentVote(storage.get('currentVote'));
        }

        setLoadedFromCache(true);
    }, [storage]);

    useEffect(() => {
        if (!searchTerm && filteredQuotes.length !== quotes.length) {
            setFilteredQuotes(quotes.slice(0, totalQuotes));
            return;
        }

        let newFilteredQuotes = quotes.filter((optionB) => {
            return compareQuotes({label: searchTerm}, optionB);
        });

        if (newFilteredQuotes.length > totalQuotes) {
            newFilteredQuotes = newFilteredQuotes.slice(0, totalQuotes);
        }

        setFilteredQuotes(newFilteredQuotes);
    }, [searchTerm, quotes, totalQuotes]);

    useEffect(() => {
        if (error) {
            if (storage) {
                storage.set('quotes', []);
            }
            return;
        }

        if (!hasLoadedFromCache) {
            return;
        }

        if (quotes.length < totalQuotes && loadState !== STARTED) {
            setLoadState(STARTED);

            fetchQuotes({quotes, totalQuotes})
                .then((response) => {
                    setQuotes(response);
                    setLoadState(SUCCESS);
                })
                .catch((error) => {
                    setError(error);
                    setLoadState(ERROR);
                });
            return;
        }

        if (hasLoadedFromCache) {
            storage.set('totalQuotes', totalQuotes);
            storage.set('theme', theme);
            storage.set('quotes', quotes);
            storage.set('searchTerm', searchTerm);
            storage.set('previousVote', previousVote);
            storage.set('currentVote', currentVote);
        }

    }, [hasLoadedFromCache, theme, totalQuotes, quotes, searchTerm, currentVote, previousVote, error, storage, loadState]);
    const isLightTheme = theme === 'light';

    return (
        <section className={classNames('App', {'theme--light': isLightTheme, 'theme--dark': !isLightTheme})}>
            <HomePage
                error={error}
                setSearchTerm={setSearchTerm}
                theme={theme}
                hasLoadedFromCache={hasLoadedFromCache}
                setTheme={setTheme}
                quotes={quotes}
                totalQuotes={totalQuotes}
                setTotalQuotes={setTotalQuotes}
                filteredQuotes={filteredQuotes}
                setCurrentVote={setCurrentVote}
                currentVote={currentVote}
            />
        </section>

    );
}

function createUpdatedQuote({quote, vote, direction}) {
    const newQuote = JSON.parse(JSON.stringify(quote));
    let difference = direction === 'to' ? 1 : -1;

    if (vote.value === YES_VOTE) {
        newQuote.numYesVotes += difference;
    }
    else if (vote.value === NO_VOTE) {
        newQuote.numNoVotes += difference;
    }

    return newQuote;
}
