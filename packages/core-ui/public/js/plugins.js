window.plugins = [
  {
    name: "inbox",
    port: 3009,
    exposes: {
      "./routes": "./src/routes.tsx",
      "./settings": "./src/Settings.tsx",
    },
    routes: {
      url: "http://localhost:3009/remoteEntry.js",
      scope: "inbox",
      module: "./routes",
    },
    menus: [
      {
        text: "Team Inbox",
        url: "/inbox",
        icon: "icon-comment-1",
        permission: "showConversations",
        location: "mainNavigation",
      },
      {
        text: "Bookings",
        url: "/bookings",
        icon: "icon-paste",
        permission: "showIntegrations",
        location: "mainNavigation",
      },
      {
        text: "Forms",
        url: "/forms",
        icon: "icon-head-1",
        permission: "showForms",
        location: "mainNavigation",
      },
      {
        text: "Skills",
        icon: "icon-file-info-alt",
        location: "settings",
        scope: "inbox",
        permission: "getSkills",
        component: "./settings",
      },
      {
        text: "Channels",
        icon: "icon-layer-group",
        location: "settings",
        scope: "inbox",
        permission: "showChannels",
        component: "./settings",
      },
      {
        text: "Integrations",
        icon: "icon-puzzle-piece",
        location: "settings",
        scope: "inbox",
        permission: "showIntegrations",
        component: "./settings",
      },
      {
        text: "Responses",
        icon: "icon-files-landscapes",
        location: "settings",
        scope: "inbox",
        permission: "showResponseTemplates",
        component: "./settings",
      },
    ],
  },
  {
    name: "contacts",
    port: 3011,
    exposes: { "./routes": "./src/routes.tsx" },
    routes: {
      url: "http://localhost:3011/remoteEntry.js",
      scope: "contacts",
      module: "./routes",
    },
    menus: [
      {
        text: "Contacts",
        url: "/contacts/customer",
        icon: "icon-users",
        permission: "showCustomers",
        location: "mainNavigation",
      },
    ],
  },
  {
    name: "engages",
    port: 3001,
    exposes: {
      "./routes": "./src/routes.tsx",
      "./settings": "./src/Settings.tsx",
    },
    routes: {
      url: "http://localhost:3001/remoteEntry.js",
      scope: "engages",
      module: "./routes",
    },
    menus: [
      {
        text: "Campaigns",
        url: "/campaigns",
        icon: "icon-megaphone",
        permission: "showEngagesMessages",
        location: "mainNavigation",
      },
      {
        text: "Campaigns settings",
        icon: "icon-megaphone",
        location: "settings",
        scope: "engages",
        component: "./settings",
      },
    ],
  },
  {
    name: "automations",
    port: 3008,
    exposes: { "./routes": "./src/routes.tsx" },
    routes: {
      url: "http://localhost:3008/remoteEntry.js",
      scope: "automations",
      module: "./routes",
    },
    menus: [
      {
        text: "Automations",
        url: "/automations",
        icon: "icon-circular",
        location: "mainNavigation",
      },
    ],
  },
  {
    name: "calendar",
    port: 3006,
    exposes: {
      "./routes": "./src/routes.tsx",
      "./settings": "./src/Settings.tsx",
    },
    routes: {
      url: "http://localhost:3006/remoteEntry.js",
      scope: "calendar",
      module: "./routes",
    },
    menus: [
      {
        text: "Calendar",
        url: "/calendar",
        icon: "icon-calendar-alt",
        location: "mainNavigation",
      },
      {
        text: "Calendar settings",
        icon: "icon-calendar-alt",
        location: "settings",
        scope: "calendar",
        component: "./settings",
      },
    ],
  },
  {
    name: "deals",
    port: 3003,
    exposes: {
      "./routes": "./src/routes.tsx",
      "./settings": "./src/Settings.tsx",
    },
    routes: {
      url: "http://localhost:3003/remoteEntry.js",
      scope: "deals",
      module: "./routes",
    },
    menus: [
      {
        text: "Growth Hacking",
        url: "/growthHack",
        icon: "icon-idea",
        permission: "showGrowthHacks",
        location: "mainNavigation",
      },
    ],
  },
  {
    name: "knowledgeBase",
    port: 3004,
    exposes: { "./routes": "./src/routes.tsx" },
    routes: {
      url: "http://localhost:3004/remoteEntry.js",
      scope: "knowledgeBase",
      module: "./routes",
    },
    menus: [
      {
        text: "Knowledge Base",
        url: "/knowledgeBase",
        icon: "icon-book-open",
        location: "mainNavigation",
      },
    ],
  },
  {
    name: "dashboard",
    port: 3007,
    exposes: { "./routes": "./src/routes.tsx" },
    routes: {
      url: "http://localhost:3007/remoteEntry.js",
      scope: "dashboard",
      module: "./routes",
    },
    menus: [
      {
        text: "Dashboard",
        url: "/dashboard",
        icon: "icon-dashboard",
        location: "mainNavigation",
      },
    ],
  },
  {
    name: "team",
    port: 3010,
    exposes: { "./routes": "./src/routes.tsx" },
    routes: {
      url: "http://localhost:3010/remoteEntry.js",
      scope: "team",
      module: "./routes",
    },
    menus: [
      {
        text: "Team",
        url: "/settings/team",
        icon: "icon-puzzle-piece",
        location: "mainNavigation",
      },
    ],
  },
];
