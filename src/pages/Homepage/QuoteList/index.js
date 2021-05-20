import QuoteListItem from './QuoteListItem';
import './styles.scss';
import {List} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const LOCALE = {
    emptyText:
        <>
            <QuestionCircleOutlined/>
            <h3>No Items Found</h3>
        </>,
};

QuoteList.propTypes = {
    className: PropTypes.string,
    quotes: PropTypes.array.isRequired,
    currentVote: PropTypes.object.isRequired,
    setCurrentVote: PropTypes.func.isRequired,
};
export default function QuoteList({className, quotes, currentVote, setCurrentVote}) {
    return (
        <List
            className={classNames('QuoteList', className)}
            bordered
            dataSource={quotes}
            locale={LOCALE}
            renderItem={({label, value, numYesVotes, numNoVotes}) => (
                <QuoteListItem
                    value={value}
                    label={label}
                    currentVote={currentVote}
                    numYesVotes={numYesVotes}
                    numNoVotes={numNoVotes}
                    setCurrentVote={setCurrentVote}
                    key={value}
                />
            )}
        />
    );
}