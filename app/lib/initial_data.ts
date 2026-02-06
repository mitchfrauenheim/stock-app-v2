import { HoldingData } from "./definitions";

export const users = [
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
];

export const stocks = [
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
  // {
  //   email: "wfraue@me.com",
  //   stocks: [{}],
  // },
];
