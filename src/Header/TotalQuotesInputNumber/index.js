import {InputNumber} from 'antd';
import classNames from 'classnames';

export default function TotalQuotesInputNumber({className, totalQuotes, setTotalQuotes}) {
    function handleTotalQuotesChange(totalQuotes) {
        setTotalQuotes(totalQuotes);
    }

    return (
        <>
            <label htmlFor="total-quotes-input-number"/>
            <InputNumber
                id="total-quotes-input-number"
                className={classNames('TotalQuotesInputNumber', className)}
                onChange={handleTotalQuotesChange}
                min={totalQuotes}
                max={100}
                step={1}
                value={totalQuotes}
            />
        </>
    );
}