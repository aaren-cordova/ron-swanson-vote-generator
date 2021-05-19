import {Select} from 'antd';
import './styles.scss';
import classNames from 'classnames';

const {Option} = Select;

export default function QuoteSelect({className, quotes, setFilteredQuotes, searchTerm, setSearchTerm}) {

    function onSearch(searchTerm) {
        setSearchTerm(searchTerm)
    }


    return (
        <Select
            allowClear
            autoClearSearchValue={false}
            className={classNames('QuoteSelect', className)}
            showSearch
            placeholder="Select a quote"
            optionFilterProp="label"
            onSearch={onSearch}
            options={quotes}
            disabled={!quotes.length}
            mode='tag'
            filterOption={QuoteSelect.filterOption}
        >
            {quotes.map(({id, label}) => <Option value={id} key={id}>{label}</Option>)}
        </Select>
    );
}

QuoteSelect.filterOption = function (input, option) {
    normalizeOption(option.label).includes(normalizeOption(input))
}

function normalizeOption(value){
    return (
        value
            .trim()
            .toLocaleLowerCase()
            .replace(/\s+/g, ' ')
    );

}