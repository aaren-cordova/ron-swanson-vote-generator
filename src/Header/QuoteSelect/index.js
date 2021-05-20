import {Select} from 'antd';
import './styles.scss';
import classNames from 'classnames';
import compareQuotes from './compareQuotes';

const {Option} = Select;

export default function QuoteSelect({className, quotes, setSearchTerm}) {
    function onSearch(searchTerm) {
        setSearchTerm(searchTerm);
    }

    function onChange(event) {
        console.log('change', event)
    }


    return (
        <Select
            className={classNames('QuoteSelect', className)}
            size='small'
            defalutValue
            labelInValue
            allowClear
            autoClearSearchValue={false}
            showSearch
            placeholder="Select a quote"
            optionFilterProp="label"
            onSearch={onSearch}
            onChange={onChange}
            options={quotes}
            disabled={!quotes.length}
            mode='tag'
            filterOption={compareQuotes}
        >
            {quotes.map(({value, label}) => <Option value={value} key={value}>{label}</Option>)}
        </Select>
    );
}
