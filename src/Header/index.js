import './styles.scss';
import classNames from 'classnames';
import ThemeFieldset from './ThemeFieldset';
import QuoteSelect from './QuoteSelect';
import TotalQuotesInputNumber from './TotalQuotesInputNumber';
import {useMemo} from 'react';

export default function Header(
    {
        className,
        quotes,
        theme,
        setTheme,
        totalQuotes,
        setTotalQuotes,
        setSearchTerm,
    },
) {
    const totalVotes = useMemo(() => quotes.reduce((accumulator, {yesVotes, noVotes}) => {
        return accumulator + yesVotes + noVotes;
    }, 0), [quotes]);

    return (
        <header className={classNames('Header', className)}>
            <section className="Header__section">
                <h3 className="Header__title">
                    Ron Swanson Voter
                </h3>
                <h4 className="Header__subtitle">&quot;Vote for your favorite quote!&quot;</h4>
            </section>
            <section className="Header__section">
                <TotalQuotesInputNumber
                    totalQuotes={totalQuotes}
                    setTotalQuotes={setTotalQuotes}
                />
                <ThemeFieldset
                    theme={theme}
                    setTheme={setTheme}
                />
                <QuoteSelect
                    quotes={quotes}
                    setSearchTerm={setSearchTerm}
                />

                <span className="Header__votes">Total Votes: {totalVotes}</span>
            </section>

        </header>
    );
}
