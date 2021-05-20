import QuoteListItem from './QuoteListItem';
import './styles.scss';
import {List} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import classNames from 'classnames';

const LOCALE = {
    emptyText:
        <>
            <QuestionCircleOutlined/>
            <h3>No Items Found</h3>
        </>,
};
export default function QuoteList({className, quotes, currentVote, setCurrentVote}) {
    return (
        <List
            className={classNames('QuoteList', className)}
            bordered
            dataSource={quotes}
            locale={LOCALE}
            renderItem={({label, value, yesVotes, noVotes}) => (
                <QuoteListItem
                    value={value}
                    label={label}
                    currentVote={currentVote}
                    yesVotes={yesVotes}
                    noVotes={noVotes}
                    setCurrentVote={setCurrentVote}
                    key={value}
                />
            )}
        />
    );
}