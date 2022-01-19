import {
  Conversations,
  Forms,
  FormSubmissions,
  Integrations
} from '../../../db/models';
import { IFormSubmissionFilter } from '../../../db/models/definitions/forms';
import { checkPermission } from '../../permissions/wrappers';
import { IContext } from '../../types';

const formQueries = {
  /**
   * Forms list
   */
  forms(_root, _args, { commonQuerySelector }: IContext) {
    return Forms.find(commonQuerySelector).sort({ title: 1 });
  },

  /**
   * Get one form
   */
  formDetail(_root, { _id }: { _id: string }) {
    return Forms.findOne({ _id });
  },

  async formSubmissions(
    _root,
    {
      formId,
      tagId,
      contentTypeIds,
      filters
    }: {
      formId: string;
      tagId: string;
      contentTypeIds: string[];
      filters: IFormSubmissionFilter[];
    }
  ) {
    const integrationsSelector: any = { kind: 'lead', isActive: true };
    let conversationIds: string[] = [];

    if (formId) {
      integrationsSelector.formId = formId;
    }

    if (tagId) {
      integrationsSelector.tagIds = tagId;
    }

    if (contentTypeIds && contentTypeIds.length > 0) {
      conversationIds = contentTypeIds;
    }

    const submissionFilters: any[] = [];

    if (filters && filters.length > 0) {
      for (const filter of filters) {
        const { formFieldId, value } = filter;

        switch (filter.operator) {
          case 'eq':
            submissionFilters.push({ formFieldId, value: { $eq: value } });
            break;

          case 'c':
            submissionFilters.push({
              formFieldId,
              value: { $regex: new RegExp(value) }
            });
            break;

          case 'gte':
            submissionFilters.push({
              formFieldId,
              value: { $gte: value }
            });
            break;

          case 'lte':
            submissionFilters.push({
              formFieldId,
              value: { $lte: value }
            });
            break;

          default:
            break;
        }
      }

      const subs = await FormSubmissions.find({
        $and: submissionFilters
      }).lean();
      conversationIds = subs.map(e => e.contentTypeId);
    }

    const integration = await Integrations.findOne(integrationsSelector).lean();

    // const submissions: any[] = [];

    if (!integration) {
      return null;
    }

    let convsSelector: any = { integrationId: integration._id };

    if (conversationIds.length > 0) {
      convsSelector = { _id: { $in: conversationIds } };
    }

    // const convs = await Conversations.find(convsSelector).lean();

    const test = await Conversations.aggregate([
      { $match: convsSelector },
      {
        $lookup: {
          from: 'form_submissions',
          localField: '_id',
          foreignField: 'contentTypeId',
          as: 'submissions'
        }
      }
    ]);

    console.log(JSON.stringify(test));
    return test;
    // for (const conversation of convs) {
    // 	const submissionsGrouped = await FormSubmissions.find({
    // 		contentType: 'lead',
    // 		contentTypeId: conversation._id
    // 	});

    // 	if (submissionsGrouped) {
    // 		const submission = {
    // 			...conversation,
    // 			contentTypeId: conversation._id,
    // 			submissions: submissionsGrouped
    // 		};

    // 		submissions.push(submission);
    // 	}
    // }

    // return submissions;
  }

  // formSubmissionsTotalCount(
  // 	_root,
  // 	{ integrationId }: { integrationId: string }
  // ) {
  // 	return Conversations.countDocuments({ integrationId });
  // }
};

checkPermission(formQueries, 'forms', 'showForms', []);

export default formQueries;
