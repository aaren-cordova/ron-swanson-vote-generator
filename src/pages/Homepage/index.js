import classNames from 'classnames';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import Header from './Header';
import './styles.scss';
import QuoteList from './QuoteList';


export default function HomePage(
    {
        className,
        error,
        setSearchTerm,
        theme,
        hasLoadedFromCache,
        setTheme,
        quotes,
        totalQuotes,
        setTotalQuotes,
        filteredQuotes,
        setCurrentVote,
        currentVote,
    }) {
    return (
        <article className={classNames('Homepage', className)}>
            {
                hasLoadedFromCache &&
                <Header
                    setSearchTerm={setSearchTerm}
                    theme={theme}
                    setTheme={setTheme}
                    quotes={quotes}
                    filteredQuotes={filteredQuotes}
                    totalQuotes={totalQuotes}
                    setTotalQuotes={setTotalQuotes}
                    setCurrentVote={setCurrentVote}
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
                    <article className="Homepage__errorContainer">
                        <ExclamationCircleOutlined className={'Homepage__errorIcon'}/>
                        <details>
                            <summary>An error has occurred</summary>
                            <p>{error.message || error}</p>
                        </details>
                    </article>
                }
            </main>
        </article>
    );
}