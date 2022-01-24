import { paginate } from 'erxes-api-utils'

const generateFilter = async (models, params) => {
  const filter: any = {};

  if (params.searchValue) {
    filter.title = new RegExp(params.searchValue);
  }

  if (params.filterStatus) {
    filter.status = params.filterStatus;
  }

  return filter;
}

export default [
  {
    name: 'spinCompaigns',
    handler: async (_root, params, { models }) => {
      const filter = await generateFilter(models, params)

      return paginate(
        models.SpinCompaigns.find(
          filter
        ).sort({ modifiedAt: -1 }),
        {
          page: params.page,
          perPage: params.perPage
        }
      )
    }
  },
  {
    name: 'spinCompaignDetail',
    handler: async (_root, { _id }, { models }) => {
      return models.SpinCompaigns.getSpinCompaign(models, _id)
    }
  },
  {
    name: 'spinCompaignsCount',
    handler: async (_root, params, { models }) => {
      const filter = await generateFilter(models, params);

      return models.SpinCompaigns.find(
        filter
      ).countDocuments();
    }
  }
]