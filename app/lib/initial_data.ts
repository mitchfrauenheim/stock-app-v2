import { HoldingData, StockData, UserData } from "./definitions";

export const users: UserData[] = [
  {
    id: "A74D0762-DEA7-43F8-A3E3-BFAADA4F401C",
    name: "Mitch Frauenheim",
    email: "mitch.frauenheim@wustl.edu",
    password: "pass1",
  },
  {
    id: "2456A14A-B40D-460B-AE2E-5206EB37828F",
    name: "Bill Frauenheim",
    email: "wfraue@me.com",
    password: "pass2",
  },
  {
    id: "116C8B2E-07CC-43DB-8B81-E596E0DB7996",
    name: "Bob Frauenheim",
    email: "bob.frauenheim@outlook.com",
    password: "pass3",
  },
  {
    id: "0657A59A-FC44-4C44-B4E2-0382AC471D67",
    name: "Greg Frauenheim",
    email: "gregoryf7896@gmail.com",
    password: "pass4",
  },
  {
    id: "8186DA4F-21D3-49D1-8295-B4C46F7DAFE6",
    name: "Havila Frauenheim",
    email: "havilasilva1@gmail.com",
    password: "pass5",
  },
  {
    id: "0B63EE39-7286-496A-BD3B-A074BFF64054",
    name: "Dan Frauenheim",
    email: "dan.frauenheim@outlook.com",
    password: "pass6",
  },
  {
    id: "0DDDD73D-6EF6-49FC-8787-0BE071A66AE1",
    name: "Sandy Frauenheim",
    email: "sandy3618@comcast.net",
    password: "pass7",
  },
  {
    id: "479CEB44-0E2B-40B3-B19E-5A4ECE99CBBB",
    name: "Monique Frauenheim",
    email: "moniquef2017@icloud.com",
    password: "pass8",
  },
  {
    id: "9CACF62F-C21E-4B3A-92D4-835A2E106B6D",
    name: "Alexa Frauenheim",
    email: "alexaf2020@icloud.com",
    password: "pass9",
  },
];

export const stocks: StockData[] = [
  {
    id: "E89A84D6-A4D3-4A8B-AB03-B80EEB390887",
    symbol: "C",
    name: "Citigroup",
  },
  {
    id: "F36F3779-8B2A-4C02-B21C-98C344928DA2",
    symbol: "SHOP",
    name: "Shopify",
  },
  {
    id: "31494FA9-A0A7-47E1-8E48-25E925AD2B98",
    symbol: "TMUS",
    name: "T-Mobile US",
  },
  {
    id: "ED500601-BB46-4B34-8D4B-15BDB11DCAA3",
    symbol: "TSLA",
    name: "Tesla",
  },
  {
    id: "92CD6A3A-492E-4727-BFAA-63EC35A5B955",
    symbol: "AMD",
    name: "Advanced Micro Devices",
  },
  {
    id: "04A9A852-D6D3-4EC9-9BC3-789F75C6FDD4",
    symbol: "NVDA",
    name: "NVIDIA",
  },
  {
    id: "9AC8967C-E60A-4629-A0D9-3D81B194586C",
    symbol: "TSM",
    name: "Taiwan Semiconductor",
  },
  {
    id: "6C23D97B-5C27-4358-A3EC-BFA2010FBB81",
    symbol: "JPM",
    name: "JPMorgan Chase",
  },
  {
    id: "8E787DD0-EBFF-4108-B619-33C3116F5886",
    symbol: "SNOW",
    name: "Snowflake",
  },
  {
    id: "AC77D8C6-52FD-47C3-AB7D-45FE471E1F9A",
    symbol: "BRK.B",
    name: "Berkshire Hathaway",
  },
  {
    id: "2A8A150F-AB16-4A18-8067-1513CF03499C",
    symbol: "ERJ",
    name: "Embraer S.A.",
  },
  {
    id: "C443A7E6-E47C-4F0B-913A-A5DAC7C41F6A",
    symbol: "V",
    name: "Visa",
  },
  {
    id: "9CB17B03-3B4A-4F2E-9A4E-E5D4161AE657",
    symbol: "AMZN",
    name: "Amazon",
  },
  {
    id: "E1507A2C-BF4B-4D11-BE5D-778D083D6ED4",
    symbol: "DIS",
    name: "Disney",
  },
  {
    id: "97C6B69C-F907-4419-A203-1FD48361415E",
    symbol: "HWM",
    name: "Howmet Aerospace",
  },
  {
    id: "C1BD7363-DAE6-4C93-987F-BF7DE3C211F1",
    symbol: "MSFT",
    name: "Microsoft",
  },
  {
    id: "808F0CA0-55A1-4D72-87F5-33948446AB4D",
    symbol: "GOOGL",
    name: "Alphabet",
  },
  {
    id: "FF2DCB5A-385A-4382-BD86-59AE6898423D",
    symbol: "INTC",
    name: "Intel",
  },
  {
    id: "DD333933-DFD3-4A42-94AC-7781BEA9C82E",
    symbol: "META",
    name: "Meta",
  },
  {
    id: "CE87263C-BAC8-4796-8F5B-74A7CF536584",
    symbol: "PYPL",
    name: "PayPal",
  },
  {
    id: "B838D9DB-2D98-46BC-9A62-FCEC39B49DA7",
    symbol: "CETXP",
    name: "Cemtrex",
  },
  {
    id: "1A5D7D9B-19C8-4DC0-B041-05BFFDCFBBA9",
    symbol: "LWLG",
    name: "Lightwave Logic",
  },
  {
    id: "272FDF8E-33C8-449E-84F6-613211D6CEE9",
    symbol: "NSA",
    name: "National Storage Affiliates",
  },
];

export const holdings: HoldingData[] = [
  {
    email: "mitch.frauenheim@wustl.edu",
    stocks: [
      {
        symbol: "C",
        shares: 42.6584762392,
        buy_cost: 117.21,
      },
      {
        symbol: "SHOP",
        shares: 30.8071472582,
        buy_cost: 162.3,
      },
      {
        symbol: "TMUS",
        shares: 24.6889196129,
        buy_cost: 202.52,
      },
      {
        symbol: "TSLA",
        shares: 10.9308731581,
        buy_cost: 457.42,
      },
    ],
  },
  {
    email: "wfraue@me.com",
    stocks: [
      {
        symbol: "KTB",
        shares: 81.8464560485,
        buy_cost: 61.09,
      },
      {
        symbol: "DLPTF",
        shares: 80256.8218298555,
        buy_cost: 0.0623,
      },
      {
        symbol: "SELX",
        shares: 6385.6960408685,
        buy_cost: 0.783,
      },
    ],
  },
  {
    email: "bob.frauenheim@outlook.com",
    stocks: [
      {
        symbol: "AMD",
        shares: 45.6287643731,
        buy_cost: 219.16,
      },
      {
        symbol: "NVDA",
        shares: 52.7064776261,
        buy_cost: 189.73,
      },
    ],
  },
  {
    email: "gregoryf7896@gmail.com",
    stocks: [
      {
        symbol: "TSM",
        shares: 16.02615468445,
        buy_cost: 311.99,
      },
      {
        symbol: "JPM",
        shares: 15.5009920635,
        buy_cost: 322.56,
      },
      {
        symbol: "SNOW",
        shares: 22.7272727273,
        buy_cost: 220,
      },
    ],
  },
  {
    email: "havilasilva1@gmail.com",
    stocks: [
      {
        symbol: "BRK.B",
        shares: 9.9800399202,
        buy_cost: 501,
      },
      {
        symbol: "EMBJ",
        shares: 77.07723138585,
        buy_cost: 64.87,
      },
      {
        symbol: "V",
        shares: 14.1779617762,
        buy_cost: 352.66,
      },
    ],
  },
  {
    email: "sandy3618@comcast.net",
    stocks: [
      {
        symbol: "AMZN",
        shares: 21.6104075723,
        buy_cost: 231.37,
      },
      {
        symbol: "HWM",
        shares: 24.3320842863,
        buy_cost: 205.49,
      },
      {
        symbol: "MU",
        shares: 16.9336539438,
        buy_cost: 295.27,
      },
      {
        symbol: "RKLB",
        shares: 70.791448393,
        buy_cost: 70.63,
      },
    ],
  },
  {
    email: "dan.frauenheim@outlook.com",
    stocks: [
      {
        symbol: "GOOGL",
        shares: 15.7505118916,
        buy_cost: 317.45,
      },
      {
        symbol: "INTC",
        shares: 131.6135825217,
        buy_cost: 37.99,
      },
      {
        symbol: "META",
        shares: 7.5401134033,
        buy_cost: 663.12,
      },
      {
        symbol: "PYPL",
        shares: 85.2660300136,
        buy_cost: 58.64,
      },
    ],
  },
  {
    email: "moniquef2017@icloud.com",
    stocks: [
      {
        symbol: "AVGO",
        shares: 14.173540834,
        buy_cost: 352.77,
      },
      {
        symbol: "GD",
        shares: 14.8570749391,
        buy_cost: 336.54,
      },
      {
        symbol: "LLY",
        shares: 4.6490004649,
        buy_cost: 1075.5,
      },
      {
        symbol: "SNEX",
        shares: 52.5265258956,
        buy_cost: 95.19,
      },
    ],
  },
  {
    email: "alexaf2020@icloud.com",
    stocks: [
      {
        symbol: "APPL",
        shares: 18.3695212903,
        buy_cost: 272.19,
      },
      {
        symbol: "CI",
        shares: 18.04077214505,
        buy_cost: 277.15,
      },
      {
        symbol: "PGR",
        shares: 23.3513917429,
        buy_cost: 214.12,
      },
      {
        symbol: "PRU",
        shares: 44.2987507752,
        buy_cost: 112.87,
      },
    ],
  },
];
