import {InputNumber} from 'antd';
import classNames from 'classnames';
import './styles.scss';
import PropTypes from 'prop-types';

TotalQuotesInputNumber.propTypes = {
    className: PropTypes.string,
    totalQuotes: PropTypes.number.isRequired,
    setTotalQuotes: PropTypes.func.isRequired,
};

export default function TotalQuotesInputNumber({className, totalQuotes, setTotalQuotes}) {
    function handleTotalQuotesChange(totalQuotes) {
        setTotalQuotes(totalQuotes);
    }

    return (
        <div className={classNames('TotalQuotesInputNumber', className)}>
            <label
                className="TotalQuotesInputNumber__label"
                htmlFor="total-quotes-input-number"
            >
                Total Quotes
            </label>
            <InputNumber
                id="total-quotes-input-number"
                onChange={handleTotalQuotesChange}
                size={'small'}
                min={2}
                max={100}
                step={1}
                value={totalQuotes}
            />
        </div>
    );
}