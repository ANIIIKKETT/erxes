import React from 'react';
import TopicList from '../../components/topic/TopicList';

import * as compose from 'lodash.flowright';
import { Alert, confirm } from 'modules/common/utils';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import {
  TopicsQueryResponse,
  RemoveTopicsMutationResponse,
  IForum
} from '../../types';

type Props = {
  forumId: string;
  currentTopicId: string;
  forum: IForum;
};

type FinalProps = {
  forumTopicsQuery: TopicsQueryResponse;
} & Props &
  RemoveTopicsMutationResponse;

const TopicListContainer = (props: FinalProps) => {
  const { forumTopicsQuery, removeTopicsMutation } = props;

  if (forumTopicsQuery.loading) {
    return null;
  }

  const remove = topicId => {
    confirm().then(() => {
      removeTopicsMutation({
        variables: {
          _id: topicId
        }
      })
        .then(() => {
          forumTopicsQuery.refetch();

          Alert.success('You successfully deleted a topic');
        })
        .catch(error => {
          Alert.error(error.message);
        });
    });
  };

  const forumTopics = forumTopicsQuery.forumTopics || [];

  const updatedProps = {
    ...props,
    forumTopics,
    remove
  };

  return <TopicList {...updatedProps} />;
};

export default compose(
  graphql<Props, TopicsQueryResponse, { forumId: string }>(
    gql(queries.forumTopics),
    {
      name: 'forumTopicsQuery',
      options: ({ forumId }) => ({
        variables: { forumId }
      })
    }
  ),
  graphql<Props, RemoveTopicsMutationResponse, { _id: string }>(
    gql(mutations.forumTopicsRemove),
    {
      name: 'removeTopicsMutation',
      options: ({ currentTopicId, forumId }) => ({
        refetchQueries: [
          {
            query: gql(queries.forumDetail),
            variables: { _id: forumId }
          },
          {
            query: gql(queries.forumTopicDetail),
            variables: { _id: currentTopicId }
          },
          {
            query: gql(queries.forumDiscussionsTotalCount),
            variables: { topicId: currentTopicId }
          }
        ]
      })
    }
  )
)(TopicListContainer);
