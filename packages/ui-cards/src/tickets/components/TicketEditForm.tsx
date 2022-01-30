import EditForm from '@erxes/ui-cards/src/boards/components/editForm/EditForm';
import Left from '@erxes/ui-cards/src/boards/components/editForm/Left';
import Sidebar from '@erxes/ui-cards/src/boards/components/editForm/Sidebar';
import Top from '@erxes/ui-cards/src/boards/components/editForm/Top';
import { Flex } from '@erxes/ui/src/styles/main';
import { IEditFormContent, IOptions } from '@erxes/ui-cards/src/boards/types';
import FormGroup from '@erxes/ui/src/components/form/Group';
import ControlLabel from '@erxes/ui/src/components/form/Label';
import { ISelectedOption } from '@erxes/ui/src/types';
import { __ } from '@erxes/ui/src/utils';
import PortableDeals from '@erxes/ui-cards/src/deals/components/PortableDeals';
import { INTEGRATION_KINDS } from '@erxes/ui/src/constants/integrations';
import { Capitalize } from '@erxes/ui-settings/src/styles';
import PortableTasks from '@erxes/ui-cards/src/tasks/components/PortableTasks';
import React, { useEffect, useState } from 'react';
import Select from 'react-select-plus';
import { ITicket, ITicketParams } from '../types';

type Props = {
  options: IOptions;
  item: ITicket;
  addItem: (doc: ITicketParams, callback: () => void, msg?: string) => void;
  saveItem: (doc: ITicketParams, callback?: (item) => void) => void;
  copyItem: (itemId: string, callback: (item) => void) => void;
  onUpdate: (item, prevStageId?: string) => void;
  removeItem: (itemId: string, callback: () => void) => void;
  beforePopupClose: () => void;
  sendToBoard?: (item: any) => void;
  updateTimeTrack: (
    {
      _id,
      status,
      timeSpent
    }: { _id: string; status: string; timeSpent: number; startDate?: string },
    callback?: () => void
  ) => void;
};

export default function TicketEditForm(props: Props) {
  const item = props.item;

  const [source, setSource] = useState(item.source);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setSource(item.source);
  }, [item.source]);

  function renderSidebarFields(saveItem) {
    const sourceValues = INTEGRATION_KINDS.ALL.map(kind => ({
      label: __(kind.text),
      value: kind.value
    }));

    sourceValues.push({
      label: __('Other'),
      value: 'other'
    });

    const sourceValueRenderer = (option: ISelectedOption): React.ReactNode => (
      <Capitalize>{option.label}</Capitalize>
    );

    const onSourceChange = option => {
      const value = option ? option.value : '';

      setSource(value);

      if (saveItem) {
        saveItem({ source: value });
      }
    };

    return (
      <FormGroup>
        <ControlLabel>Source</ControlLabel>
        <Select
          placeholder={__('Select a source')}
          value={source}
          options={sourceValues}
          onChange={onSourceChange}
          optionRenderer={sourceValueRenderer}
          valueRenderer={sourceValueRenderer}
        />
      </FormGroup>
    );
  }

  function renderItems() {
    return (
      <>
        <PortableDeals mainType="ticket" mainTypeId={props.item._id} />
        <PortableTasks mainType="ticket" mainTypeId={props.item._id} />
      </>
    );
  }

  function renderFormContent({
    state,
    copy,
    remove,
    saveItem,
    onChangeStage
  }: IEditFormContent) {
    const { options, onUpdate, addItem, sendToBoard, updateTimeTrack } = props;

    const renderSidebar = () => renderSidebarFields(saveItem);

    return (
      <>
        <Top
          options={options}
          stageId={state.stageId}
          item={item}
          saveItem={saveItem}
          onChangeStage={onChangeStage}
        />

        <Flex>
          <Left
            options={options}
            saveItem={saveItem}
            copyItem={copy}
            removeItem={remove}
            onUpdate={onUpdate}
            item={item}
            addItem={addItem}
            sendToBoard={sendToBoard}
            onChangeStage={onChangeStage}
            onChangeRefresh={() => setRefresh(!refresh)}
          />

          <Sidebar
            options={options}
            item={item}
            sidebar={renderSidebar}
            saveItem={saveItem}
            renderItems={renderItems}
            updateTimeTrack={updateTimeTrack}
          />
        </Flex>
      </>
    );
  }

  const extendedProps = {
    ...props,
    formContent: renderFormContent,
    extraFields: { source },
    refresh
  };

  return <EditForm {...extendedProps} />;
}
