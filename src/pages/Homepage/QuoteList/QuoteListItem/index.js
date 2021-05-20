import classNames from 'classnames';
import {NO_VOTE, YES_VOTE, UNDEFINED_VOTE} from '../../../../constants';
import {DislikeOutlined, LikeOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {List} from 'antd';
import './styles.scss';
import PropTypes from 'prop-types';

QuoteListItem.propTypes = {
    className: PropTypes.string,
    currentVote: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    numNoVotes: PropTypes.number.isRequired,
    numYesVotes: PropTypes.number.isRequired,
    setCurrentVote: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default function QuoteListItem(
    {
        className,
        currentVote,
        label,
        numNoVotes,
        numYesVotes,
        setCurrentVote,
        value,
        ...restProps
    },
) {
    function onUpVoteButtonClick(event) {
        if (currentVote.id === value && currentVote.value === YES_VOTE) {
            setCurrentVote({id: value, value: UNDEFINED_VOTE});
        }
        else {
            setCurrentVote({id: value, value: YES_VOTE});
        }
    }

    function onDownVoteButtonClick(event) {
        if (currentVote.id === value && currentVote.value === NO_VOTE) {
            setCurrentVote({id: value, value: UNDEFINED_VOTE});
        }
        else {
            setCurrentVote({id: value, value: NO_VOTE});
        }
    }

    const isLiked = currentVote.id === value && currentVote.value === YES_VOTE;
    const isDisliked = currentVote.id === value && currentVote.value === NO_VOTE;
    return (
        <List.Item
            {...restProps}
            className={classNames('QuoteListItem', className)}
        >
            <div className="QuoteListItem__votesContainer">
                <Button
                    className={classNames('Button', 'QuoteListItem__upVoteButton', {'Button--active': isLiked})}
                    type="primary"
                    icon={<LikeOutlined/>}
                    onClick={onUpVoteButtonClick}
                    title={`Like (${numYesVotes} votes)`}
                />
                <span className="QuoteListItem__voteScore">{numYesVotes - numNoVotes}</span>
                <Button
                    className={classNames('Button', 'QuoteListItem__downVoteButton', {'Button--active': isDisliked})}
                    type="primary"
                    icon={<DislikeOutlined/>}
                    title={`Dislike (${numNoVotes} votes)`}
                    onClick={onDownVoteButtonClick}
                />
            </div>

            <span className="QuoteListItem__label">&quot;{label}&quot;</span>
        </List.Item>
    );
}

