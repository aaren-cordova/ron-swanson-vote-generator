import {Select} from 'antd';
import './styles.scss';
import classNames from 'classnames';
import compareQuotes from './compareQuotes';
import PropTypes from 'prop-types';
import {UNDEFINED_VOTE, YES_VOTE} from '../../../../constants';
const {Option} = Select;

QuoteSelect.propTypes = {
    className: PropTypes.string,
    quotes: PropTypes.array.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    setCurrentVote: PropTypes.func.isRequired,

};

export default function QuoteSelect({className, quotes, setSearchTerm, setCurrentVote}) {
    function handleSearch(searchTerm) {
        setSearchTerm(searchTerm);
    }

    function handleChange({value: id}) {
        setCurrentVote({id, value: YES_VOTE});
    }

    return (
        <Select
            className={classNames('QuoteSelect', className)}
            allowClear
            autoClearSearchValue={false}
            disabled={!quotes.length}
            filterOption={compareQuotes}
            labelInValue
            mode='tag'
            onSearch={handleSearch}
            onChange={handleChange}
            optionFilterProp="label"
            options={quotes.map(({value, label}) => ({value, label} ))}
            placeholder="Select a quote"
            showSearch
            size='small'
        >
            {quotes.map(({value, label}) => <Option value={value} key={value}>{label}</Option>)}
        </Select>
    );
}
