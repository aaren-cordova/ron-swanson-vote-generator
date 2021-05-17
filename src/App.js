import './App.scss';
import Header from './Header';
import {useState, useEffect} from 'react';
import Storages from 'js-storage';

const storageNamespace = Storages.initNamespaceStorage('ron-swanson-quote-generator');


function App() {
    const [quoteCollection, setQuoteCollection] = useState([]);
    console.log(storageNamespace)
    useEffect(() => {
        (async () => {

        })();
    });

    return (
        <div className="App">
            <Header numVotes={3}/>
        </div>
    );
}

export default App;
