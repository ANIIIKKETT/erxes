import { commonCompaignInputs, commonCompaignTypes, commonFilterTypes, paginateTypes } from './common';

export const types = `
  type LotteryCompaign {
    _id: String,
    ${commonCompaignTypes}
    numberFormat: String,
    buyScore: Float,
    awards: JSON,

    lotteriesCount: Int,
  }
`;

const LotteryCompaignDoc = `
  ${commonCompaignInputs}
  numberFormat: String,
  buyScore: Float,
  awards: JSON
`

export const queries = `
  lotteryCompaignDetail(_id: String!): LotteryCompaign
  lotteryCompaigns(${commonFilterTypes} ${paginateTypes}): [LotteryCompaign]
  cpLotteryCompaigns: [LotteryCompaign]
  lotteryCompaignsCount(${commonFilterTypes}): Int
`;

export const mutations = `
  lotteryCompaignsAdd(${LotteryCompaignDoc}): LotteryCompaign
  lotteryCompaignsEdit(_id: String!, ${LotteryCompaignDoc}): LotteryCompaign
  lotteryCompaignsRemove(_ids: [String]): JSON
`;
