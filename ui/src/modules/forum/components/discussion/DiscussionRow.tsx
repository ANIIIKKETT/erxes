import React from 'react';
import dayjs from 'dayjs';
import ModalTrigger from 'modules/common/components/ModalTrigger';
import Button from 'modules/common/components/Button';
import Icon from 'modules/common/components/Icon';
import { getUserAvatar } from 'modules/common/utils';
import Tags from 'modules/common/components/Tags';
import NameCard from 'modules/common/components/nameCard/NameCard';
import { FlexItem } from 'modules/companies/styles';
import Tip from 'modules/common/components/Tip';
import Label from 'modules/common/components/Label';
import ProgressBar from 'modules/common/components/ProgressBar';
import { Progress } from './styles';

import {
  DiscussionColumn,
  RowDiscussion,
  ActionButtons,
  DiscussionTitle,
  AuthorName,
  DiscussionMeta
} from './styles';
import DiscussionForm from '../../containers/discussion/DiscussionForm';
import { IDiscussion } from '../../types';
import DiscussionDetail from './DiscussionDetail';
import { __ } from 'modules/common/utils';

type Props = {
  queryParams: any;
  currentTopicId: string;
  discussion: IDiscussion;
  remove: (discussionId) => void;
  forumId: string;
  history: any;
};

const DiscussionRow = (props: Props) => {
  const { discussion, currentTopicId, queryParams, forumId, history } = props;

  const tags = discussion.getTags || [];

  const user = discussion.createdUser;

  const customer = discussion.createdCustomer;

  const remove = () => {
    return props.remove(discussion._id);
  };

  const renderDetail = editTrigger => {
    const detailButton = (
      <Button btnStyle="link">
        <Tip text={'Edit'}>
          <Icon icon="edit" />
        </Tip>
      </Button>
    );

    const content = contentProps => (
      <DiscussionDetail {...contentProps} discussion={discussion} />
    );

    return (
      <ModalTrigger
        size="lg"
        title="Comments"
        trigger={editTrigger ? editTrigger : detailButton}
        content={content}
        enforceFocus={false}
      />
    );
  };

  const renderEditAction = editTrigger => {
    const editButton = (
      <Button btnStyle="link">
        <Tip text={'Edit'}>
          <Icon icon="edit" />
        </Tip>
      </Button>
    );

    const content = contentProps => (
      <DiscussionForm
        {...contentProps}
        discussion={discussion}
        currentTopicId={currentTopicId}
        queryParams={queryParams}
        forumId={forumId}
        history={history}
      />
    );

    return (
      <ModalTrigger
        size="lg"
        title="Edit"
        trigger={editTrigger ? editTrigger : editButton}
        content={content}
        enforceFocus={false}
      />
    );
  };

  const title = (
    <DiscussionTitle>
      {discussion.title}
      <Label>{discussion.status}</Label>
      <Tags tags={tags} limit={2} />
    </DiscussionTitle>
  );

  const renderProgressBar = () => {
    const { pollData } = discussion;

    if (!pollData) {
      return;
    }

    const { total } = pollData;

    return Object.keys(pollData).map(key => {
      if (key === 'total') {
        return null;
      }

      const count = pollData[key];
      const percent = (count / total) * 100;

      return (
        <Progress key={Math.random()}>
          <ProgressBar percentage={percent} height="10px" />
          <span>
            {key} ({percent.toFixed(2)}%)
          </span>
        </Progress>
      );
    });
  };
  return (
    <RowDiscussion>
      <DiscussionColumn>
        {renderDetail(title)}
        <p>{discussion.description}</p>
        {renderProgressBar()}
        <DiscussionMeta>
          {user ? (
            <img
              alt={(user.details && user.details.fullName) || 'author'}
              src={getUserAvatar(user)}
            />
          ) : (
            <FlexItem>
              <NameCard.Avatar customer={customer} size={20} /> &emsp;
            </FlexItem>
          )}
          {__('Written By')}
          <AuthorName>
            {user
              ? (user.details && user.details.fullName) ||
                user.username ||
                user.email
              : customer && `${customer.firstName} ${customer.lastName}`}
          </AuthorName>
          <Icon icon="clock-eight" /> {'Created'}{' '}
          {dayjs(discussion.createdDate).format('ll')}
        </DiscussionMeta>
      </DiscussionColumn>
      <ActionButtons>
        {renderEditAction('')}
        <Tip text={'Delete'}>
          <Button btnStyle="link" icon="cancel-1" onClick={remove} />
        </Tip>
      </ActionButtons>
    </RowDiscussion>
  );
};

export default DiscussionRow;
