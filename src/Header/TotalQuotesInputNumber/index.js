import {InputNumber} from 'antd';
import classNames from 'classnames';
import './styles.scss';

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