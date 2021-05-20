import classNames from 'classnames';
import {NO_VOTE, YES_VOTE, UNSUBMITTED_VOTE} from '../../constatns';
import {DislikeOutlined, LikeOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {List} from 'antd';
import './styles.scss';

export default function QuoteListItem(
    {
        className,
        label,
        currentVote,
        yesVotes,
        noVotes,
        value,
        setCurrentVote,
        ...restProps
    },
) {
    function onUpVoteButtonClick(event) {
        if (currentVote.value === value && currentVote.value === YES_VOTE) {
            setCurrentVote({id: value, value: UNSUBMITTED_VOTE});
        }
        else {
            setCurrentVote({id: value, value: YES_VOTE});
        }
    }

    function onDownVoteButtonClick(event) {
        if (currentVote.value === value && currentVote.value === NO_VOTE) {
            setCurrentVote({id: value, value: UNSUBMITTED_VOTE});
        }
        else {
            setCurrentVote({id: value, value: NO_VOTE});
        }
    }

    return (
        <List.Item
            {...restProps}
            className={classNames('QuoteListItem', className)}
        >
            <div className="QuoteListItem__votesContainer">
                <Button
                    className="QuoteListItem__upVoteButton"
                    type="primary"
                    icon={<LikeOutlined/>}
                    onClick={onUpVoteButtonClick}
                    title={`Like (${yesVotes} votes)`}
                />
                <span className="QuoteListItem__voteScore">{yesVotes - noVotes}</span>
                <Button
                    className="QuoteListItem__downVoteButton"
                    type="primary"
                    icon={<DislikeOutlined/>}
                    title={`Dislike (${noVotes} votes)`}
                    onClick={onDownVoteButtonClick}
                />
            </div>

            <span className="QuoteListItem__label">&quot;{label}&quot;</span>
        </List.Item>
    );
}

