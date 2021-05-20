import './App.scss';
import Header from './Header';
import {useState, useEffect} from 'react';
import Storages from 'js-storage';
import classNames from 'classnames';
import 'antd/dist/antd.css';
import QuoteList from './QuoteList';
import {ExclamationCircleOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import compareQuotes from './Header/QuoteSelect/compareQuotes';
import fetchQuotes from './apis/fetchQuotes';
import {ERROR, STARTED, SUCCESS, UNSENT} from './constatns';

const storageNameSpaces = {'default-name': Storages};

function getStorage(name) {
    name = name || 'default-name';

    if (!storageNameSpaces[name]) {
        storageNameSpaces[name] = Storages.initNamespaceStorage(name);
    }

    const {sessionStorage, localStorage, cookieStorage} = storageNameSpaces[name];

    return sessionStorage || localStorage || cookieStorage || null;
}


export default function App() {
    const storage = getStorage(`ron-swanson-quote-generator-v${process.env.REACT_APP_VERSION}-4`);
    const [hasLoadedFromCache, setLoadedFromCache] = useState(false);
    const [loadState, setLoadState] = useState(UNSENT);
    const [totalQuotes, setTotalQuotes] = useState(2);
    const [theme, setTheme] = useState('light');
    const [searchTerm, setSearchTerm] = useState('');
    const [quotes, setQuotes] = useState([]);
    const [error, setError] = useState(null);
    const [filteredQuotes, setFilteredQuotes] = useState([]);
    const [currentVote, setCurrentVote] = useState({id: '', value: ''});

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

        setLoadedFromCache(true);
    }, [storage]);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredQuotes(quotes);
            return;
        }

        let filteredQuotes = quotes.filter((optionB) => {
            return compareQuotes({label: searchTerm}, optionB);
        });

        if (filteredQuotes.length > totalQuotes) {
            filteredQuotes = filteredQuotes.slice(0, totalQuotes);
        }
        setFilteredQuotes(filteredQuotes);
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

        hasLoadedFromCache && storage.set('totalQuotes', totalQuotes);
        hasLoadedFromCache && storage.set('theme', theme);
        hasLoadedFromCache && storage.set('quotes', quotes);
        hasLoadedFromCache && storage.set('searchTerm', searchTerm);

    }, [hasLoadedFromCache, theme, totalQuotes, quotes, searchTerm]);


    const isLightTheme = theme === 'light';
    return (
        <div className={classNames('App', {'theme--light': isLightTheme, 'theme--dark': !isLightTheme})}>
            {
                hasLoadedFromCache &&
                <Header
                    setSearchTerm={setSearchTerm}
                    theme={theme}
                    setTheme={setTheme}
                    quotes={quotes}
                    totalQuotes={totalQuotes}
                    setTotalQuotes={setTotalQuotes}
                />
            }
            <main>
                {
                    !error &&
                    <QuoteList
                        quotes={filteredQuotes}
                        setCurrentVote={setCurrentVote}
                        currentVote={currentVote}
                    />
                }
                {
                    error &&
                    <article className="App__errorContainer">
                        <ExclamationCircleOutlined className={'App__errorIcon'}/>
                        <details>
                            <summary>An error has occurred</summary>
                            <p>{error.message || error}</p>
                        </details>
                    </article>
                }
            </main>
        </div>
    );
}
