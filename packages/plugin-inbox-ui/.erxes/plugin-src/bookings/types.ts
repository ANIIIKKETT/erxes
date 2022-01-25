import { IUser } from '@erxes/ui/src/auth/types';
import { QueryResponse } from '@erxes/ui/src/types';
import { ILeadData } from '@erxes/ui-leads/src/types';
import { IBrand } from '@erxes/ui/src/brands/types';
import {
  IIntegration,
  IBookingData
} from '@erxes/ui-settings/src/integrations/types';
import { ITag } from '@erxes/ui/src/tags/types';

export interface IBookingIntegration extends IIntegration {
  brand: IBrand;
  tags: ITag[];
  createdUser: IUser;
}

export type IBooking = {
  name: string;
  description: string;
  userFilters: string[];
  image: any;
  productCategoryId: string;
  itemShape: string;
  widgetColor: string;
  productAvailable: string;
  line?: string;
  columns?: number;
  rows?: number;
  margin?: number;
  navigationText?: string;
  bookingFormText?: string;
  baseFont: string;
  productFieldIds?: string[];
};

// query types
export type BookingIntegrationsQueryResponse = {
  integrations: IBookingIntegration[];
} & QueryResponse;

export type BookingIntegrationDetailQueryResponse = {
  integrationDetail: IBookingIntegration;
} & QueryResponse;

// mutation types
export type RemoveMutationVariables = {
  _id: string;
};

export type RemoveMutationResponse = {
  removeMutation: (params: {
    variables: RemoveMutationVariables;
  }) => Promise<any>;
};

export type IntegrationMutationVariables = {
  brandId: string;
  name: string;
  channelIds?: string[];
  data?: any;
};

export type AddBookingIntegrationMutationVariables = {
  leadData: ILeadData;
  bookingData: IBookingData;
  languageCode: string;
  formId: string;
} & IntegrationMutationVariables;

export type AddBookingIntegrationMutationResponse = {
  addIntegrationMutation: (params: {
    variables: AddBookingIntegrationMutationVariables;
  }) => Promise<any>;
};

export type EditBookingIntegrationMutationVariables = {
  _id: string;
  leadData: ILeadData;
  bookingData: IBookingData;
  languageCode: string;
  formId: string;
} & IntegrationMutationVariables;

export type EditBookingIntegrationMutationResponse = {
  editIntegrationMutation: (params: {
    variables: EditBookingIntegrationMutationVariables;
  }) => Promise<void>;
};
