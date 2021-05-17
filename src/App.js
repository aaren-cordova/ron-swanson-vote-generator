import './App.scss';
import Header from './Header';
import {useState, useEffect} from 'react';
import Storages from 'js-storage';
import classNames from 'classnames';
import 'antd/dist/antd.css';
const storageNamespace = Storages.initNamespaceStorage('ron-swanson-quote-generator');

function App() {
    const [totalQuotes, setTotalQuotes] = useState(10);
    const [theme, setTheme] = useState('light');
    const [quotes, setQuotes] = useState([]);
    const [filteredQuotes, setFilteredQuotes] = useState([]);

    useEffect(() => {
        (async () => {
            // https://ron-swanson-quotes.herokuapp.com/v2/quotes/10
        })();
    });

    const isLightTheme = theme === 'light';
    return (
        <div className={classNames('App', {'theme--light': isLightTheme, 'theme--dark': !isLightTheme})}>
            <Header
                theme={theme}
                setTheme={setTheme}
                quotes={quotes}
                setFilteredQuotes={setFilteredQuotes}
                totalQuotes={totalQuotes}
                setTotalQuotes={setTotalQuotes}
            />
        </div>
    );
}

export default App;
