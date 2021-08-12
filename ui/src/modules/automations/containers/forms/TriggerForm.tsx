import React from 'react';
import Form from '../../components/forms/TriggerForm';
import { ITrigger } from 'modules/automations/types';

type Props = {
  onClickTrigger: (trigger: ITrigger) => void;
};

const TriggerFormContainer = (props: Props) => {
  const extendedProps = {
    ...props
  };

  return <Form {...extendedProps} />;
};

export default TriggerFormContainer;
