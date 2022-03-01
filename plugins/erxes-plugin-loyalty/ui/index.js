import queryString from 'query-string';
import React from 'react';
import LoyaltySectionContainer from './loyalties/containers/LoyaltySection';
import Settings from './configs/general/containers/Settings';
import VoucherCompaigns from './configs/voucherCompaign/containers/List';
import Vouchers from './loyalties/vouchers/containers/List';
import Lotteries from './loyalties/lotteries/containers/List';
import Spins from './loyalties/spins/containers/List';
import Donates from './loyalties/donates/containers/List';
import DonateCompaigns from './configs/donateCompaign/containers/List';
import LotteryCompaigns from './configs/lotteryCompaign/containers/List';
import SpinCompaigns from './configs/spinCompaign/containers/List';
import { __ } from 'erxes-ui'
import SetVoucher from './automations/containers/SetVoucher';

const voucherCompaignList = ({ location, history }) => {
  return (
    <VoucherCompaigns
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};
const lotteryCompaignList = ({ location, history }) => {
  return (
    <LotteryCompaigns
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};

const spinCompaignList = ({ location, history }) => {
  return (
    <SpinCompaigns
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};

const donateCompaignList = ({ location, history }) => {
  return (
    <DonateCompaigns
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};

const vouchers = ({ location, history }) => {
  return (
    <Vouchers
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};

const lotteries = ({ location, history }) => {
  return (
    <Lotteries
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};

const spins = ({ location, history }) => {
  return (
    <Spins
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};

const donates = ({ location, history }) => {
  return (
    <Donates
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};

const customerSection = (param) => {
  return (
    <LoyaltySectionContainer ownerId={param.customerId} ownerType='customer'/>
  )
}
const companySection = (param) => {
  return (
    <LoyaltySectionContainer ownerId={param.companyId} ownerType='company'/>
  )
}
const userSection = (param) => {
  return (
    <LoyaltySectionContainer ownerId={param.userId} ownerType='user'/>
  )
}

export default () => ({
  routes: [
    {
      path: '/settings/general',
      component: Settings
    },
    {
      path: '/settings/voucher',
      component: voucherCompaignList
    },
    {
      path: '/settings/lottery',
      component: lotteryCompaignList
    },
    {
      path: '/settings/spin',
      component: spinCompaignList
    },
    {
      path: '/settings/donate',
      component: donateCompaignList
    },
    {
      path: '/vouchers',
      component: vouchers
    },
    {
      path: '/lotteries',
      component: lotteries
    },
    {
      path: '/spins',
      component: spins
    },
    {
      path: '/donates',
      component: donates
    },
  ],
  menu: {
    label: 'Loyalty',
    icon: 'icon-piggybank',
    link: '/vouchers',
    permission: 'showLoyalties'
  },
  customerRightSidebarSection: {
    section: customerSection,
  },
  companyRightSidebarSection: {
    section: companySection,
  },
  userRightSidebarSection: {
    section: userSection,
  },
  settings: [
    {
      name: 'Loyalty config',
      image: '/images/icons/erxes-16.svg',
      to: '/erxes-plugin-loyalty/settings/general',
      action: 'loyaltyConfig',
      permissions: ['loyaltyConfig'],
    }
  ],
  payments: [
    {
      name: 'loyalty',
      title: 'Used Loyalty'
    }
  ],
  automationActions: [
    {
      type: 'voucher',
      icon: 'fast-mail',
      label: __('add voucher'),
      description: __('assign voucher'),
      isAvailable: true,
      component: SetVoucher
    }
  ]
});
