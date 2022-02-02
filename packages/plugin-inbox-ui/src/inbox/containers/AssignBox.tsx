import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import Alert from '@erxes/ui/src/utils/Alert';
import React from 'react';
import { graphql } from 'react-apollo';
import { withProps } from '@erxes/ui/src/utils';
import AssignBox from '../components/assignBox/AssignBox';
import { mutations } from '@erxes/ui-inbox/src/graphql';
import {
  AssignMutationResponse,
  AssignMutationVariables,
  IConversation,
  UnAssignMutationResponse,
  UnAssignMutationVariables
} from '@erxes/ui-inbox/src/types';
import { refetchSidebarConversationsOptions } from '../utils';

type Props = {
  targets: IConversation[];
  event: string;
  afterSave: () => void;
};

type FinalProps = Props & AssignMutationResponse & UnAssignMutationResponse;

const AssignBoxContainer = (props: FinalProps) => {
  const { assignMutation, conversationsUnassign } = props;

  const assign = (
    {
      conversationIds,
      assignedUserId
    }: { conversationIds?: string[]; assignedUserId: string },
    callback: (e) => void
  ) => {
    assignMutation({
      variables: {
        conversationIds,
        assignedUserId
      }
    })
      .then(() => {
        Alert.success('The conversation Assignee has been renewed.');
      })
      .catch(e => {
        callback(e);
        Alert.error(e.message);
      });
  };

  const clear = (conversationIds: string[]) => {
    conversationsUnassign({
      variables: {
        _ids: conversationIds
      }
    })
      .then(() => {
        Alert.success('The conversation Assignee removed');
      })
      .catch(e => {
        Alert.error(e.message);
      });
  };

  const updatedProps = {
    ...props,
    assign,
    clear
  };

  return <AssignBox {...updatedProps} />;
};

export default withProps<Props>(
  compose(
    graphql<Props, AssignMutationResponse, AssignMutationVariables>(
      gql(mutations.conversationsAssign),
      {
        name: 'assignMutation',
        options: () => refetchSidebarConversationsOptions()
      }
    ),
    graphql<Props, UnAssignMutationResponse, UnAssignMutationVariables>(
      gql(mutations.conversationsUnassign),
      {
        name: 'conversationsUnassign',
        options: () => refetchSidebarConversationsOptions()
      }
    )
  )(AssignBoxContainer)
);
