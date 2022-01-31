import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from 'react-apollo';

import Spinner from '@erxes/ui/src/components/Spinner';
import List from '../../components/unit/List';
import { queries } from '@erxes/ui-team/src/graphql';
import { __ } from '@erxes/ui/src/utils';
import Box from '@erxes/ui/src/components/Box';
import ErrorMsg from '@erxes/ui/src/components/ErrorMsg';
import { ErrorContainer } from '../../styles';

export default function ListContainer() {
  const listQuery = useQuery(gql(queries.units));

  if (listQuery.loading) {
    return <Spinner />;
  }

  if (listQuery.error) {
    return (
      <Box isOpen={true} title={__('Unit')} name="showUnit">
        <ErrorContainer>
          <ErrorMsg>{listQuery.error.message}</ErrorMsg>
        </ErrorContainer>
      </Box>
    );
  }

  return <List listQuery={listQuery} />;
}
