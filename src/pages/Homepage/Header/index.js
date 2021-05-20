import './styles.scss';
import classNames from 'classnames';
import ThemeFieldset from './ThemeFieldset';
import QuoteSelect from './QuoteSelect';
import TotalQuotesInputNumber from './TotalQuotesInputNumber';
import {useMemo} from 'react';
import PropTypes from 'prop-types';

Header.propTypes = {
    className: PropTypes.string,
    quotes: PropTypes.array.isRequired,
    filteredQuotes: PropTypes.array.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    setTheme: PropTypes.func.isRequired,
    setTotalQuotes: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
    totalQuotes: PropTypes.number.isRequired,
    setCurrentVote: PropTypes.func.isRequired,
};

export default function Header(
    {
        className,
        quotes,
        filteredQuotes,
        theme,
        setTheme,
        totalQuotes,
        setCurrentVote,
        setTotalQuotes,
        setSearchTerm,
    },
) {
    const totalVotes = useMemo(() => filteredQuotes.reduce((accumulator, {numYesVotes, numNoVotes}) => {
        return accumulator + numYesVotes + numNoVotes;
    }, 0), [filteredQuotes]);

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
                    setCurrentVote={setCurrentVote}
                />

                <span className="Header__votes">Total Votes: {totalVotes}</span>
            </section>

        </header>
    );
}
