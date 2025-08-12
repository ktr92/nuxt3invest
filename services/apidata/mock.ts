const appcontent = {
  portfolio: [
    {
      id: "finam",
      name: "Финам",
      depo: 500000,
      fee: 0.09,
      defaultCategory: "TQBR",
      positions: [
        {
          ticker: "ROSN",
          isin: "RU000A0J2Q06",
          name: "Роснефть",
          count: 180,
          price: 572,
          newprice: 380,
          pricechange: -40,
          total: 500,
          change: -6,
          yearchange: 11,
          openDate: "2024-01-18",
          share: 30,
        },
        {
          ticker: "ASTR",
          isin: "RU000A106T36",
          name: "Астра",
          count: 250,
          price: 460,
          newprice: 567,
          pricechange: 22,
          total: 500,
          change: 10,
          yearchange: -20,
          openDate: "2024-12-02",

          share: 25,
        },
        {
          ticker: "SBER",
          isin: "RU0009029540",
          name: "Сбербанк",
          count: 300,
          price: 240,
          newprice: 567,
          pricechange: 22,
          total: 500,
          yearchange: -20,
          change: 10,
          openDate: "2024-11-02",
          share: 25,
        },
        {
          ticker: "BANEP",
          isin: "RU0007976965",
          name: "Башнефть-п",
          count: 127,
          price: 1269,
          newprice: 567,
          pricechange: 22,
          total: 500,
          yearchange: -20,
          change: 10,
          openDate: "2025-02-28",
          share: 25,
        },
      ],
    },
    {
      id: "sber",
      name: "СберИнвестиции",
      depo: 450000,
      fee: 0.06,
      defaultCategory: "TQBR",
      positions: [
        {
          ticker: "BANEP",
          isin: "RU0007976965",
          name: "Башнефть-п",
          count: 100,
          price: 2040,
          newprice: 567,
          pricechange: 22,
          total: 500,
          yearchange: -20,
          change: 10,
          openDate: "2024-01-28",
          share: 25,
        },
      ],
    },
  ],
  logosource: "https://mybroker.storage.bcs.ru/FinInstrumentLogo/",
  dealTypes: [
    {
      id: "buy",
      title: "Покупка",
      info: "",
    },
    {
      id: "sell",
      title: "Продажа",
      info: "",
    },
  ],

  menupanel: [
    {
      title: "Новая сделка",
      icon: "newdeal",
      action: "toggleModal",
    },
    {
      title: "Аналитика",
      to: "/table/",
      icon: "table",
    },

    {
      title: "Статистика",
      to: "/stats/finam",
      icon: "stats",
    },
    {
      title: "Журнал действий",
      to: "/deals/",
      icon: "deals",
    },
  ],
  icons: new Map([
    [
      "table",
      `<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-dasharray="0,0" stroke-linecap="round" > <path d="M4,18.9999905 L7.75407946,11.491832 C7.8680565,11.2638231 8.06482016,11.0879651 8.30413884,11.0001847 C9.11356935,10.7032911 9.60000359,10.8000012 9.76344156,11.2903152 L11.1190224,15.3570574 C11.1996482,15.5988744 11.3695623,15.8007859 11.5940587,15.9215227 C12.3533352,16.3298705 12.8485386,16.3029137 13.079669,15.8406525 L18,5.99999082 M13,6.46409237 L17.2774408,5.31795559 C17.4347269,5.27579637 17.5999292,5.27269863 17.7586883,5.30891799 C18.3183612,5.43660193 18.6397719,5.65560146 18.7229204,5.96591657 L19.9282036,10.4640923" id="" stroke="#030819" stroke-width="2" ></path> </g>`,
    ],
    [
      "newdeal",
      `<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" data-v-a81738bd=""><g id="Add-Stroke" data-v-a81738bd=""><rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24" data-v-a81738bd=""></rect><circle id="Oval" stroke="#0C0310" stroke-width="2" stroke-linecap="round" cx="12" cy="12" r="9" data-v-a81738bd=""></circle><line x1="12" y1="9" x2="12" y2="15" id="Path" stroke="#0C0310" stroke-width="2" stroke-linecap="round" data-v-a81738bd=""></line><line x1="9" y1="12" x2="15" y2="12" id="Path" stroke="#0C0310" stroke-width="2" stroke-linecap="round" data-v-a81738bd=""></line></g></g>`,
    ],
    [
      "deals",
      `<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" ><g id="Browser"> <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24" ></rect> <rect id="Rectangle" stroke="#0C0310" stroke-width="2" stroke-linecap="round" x="3" y="4" width="18" height="16" rx="2" ></rect> <line x1="6" y1="7" x2="6.05" y2="7" id="Path" stroke="#0C0310" stroke-width="2" stroke-linecap="round" ></line> <line x1="9" y1="7" x2="9.05" y2="7" id="Path" stroke="#0C0310" stroke-width="2" stroke-linecap="round" ></line> <line x1="12" y1="7" x2="12.05" y2="7" id="Path" stroke="#0C0310" stroke-width="2" stroke-linecap="round" ></line> <line x1="3" y1="10" x2="21" y2="10" id="Path" stroke="#0C0310" stroke-width="2" stroke-linecap="round" ></line> </g> </g>`,
    ],
    [
      "stats",
      `<g id="Stats" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" > <rect id="Container" x="0" y="0" width="24" height="24" ></rect> <path d="M6,4 L18,4 C19.1045695,4 20,4.8954305 20,6 L20,18 C20,19.1045695 19.1045695,20 18,20 L6,20 C4.8954305,20 4,19.1045695 4,18 L4,6 C4,4.8954305 4.8954305,4 6,4 Z" id="shape-1" stroke="#030819" stroke-width="2" stroke-linecap="round" stroke-dasharray="0,0" ></path> <line x1="7.99991122" y1="17" x2="8" y2="11" id="shape-2" stroke="#030819" stroke-width="2" stroke-linecap="round" stroke-dasharray="0,0" ></line> <line x1="11.9999112" y1="17" x2="12" y2="8" id="shape-3" stroke="#030819" stroke-width="2" stroke-linecap="round" stroke-dasharray="0,0" ></line> <line x1="15.9999112" y1="17" x2="16" y2="14" id="shape-4" stroke="#030819" stroke-width="2" stroke-linecap="round" stroke-dasharray="0,0" ></line> </g>`,
    ],
  ]),

  table: {
    tableHeader: [
      "Актив",
      "Количество",
      "Средняя цена",
      "Вложено",
      "Стоимость",
      "Прибыль",
      "Доходность",
    ],
  },

  deals: {
    tableHeader: [
      "Дата",
      "Операция",
      "Актив",
      "Количество",
      "Цена покупки",
      "Цена продажи",
      "Прибыль",
      "Комментарий",
    ],

    tableData: [
      {
        portfolio: "finam",
        ticker: "HYDR",
        type: "buy",
        name: "Русгидро",
        count: 1000,
        buyprice: 0.5,
        saleprice: 0.6,
        dealdate: "02.04.2024",
        comment: "не знаю зачем я это купил",
      },
      {
        portfolio: "finam",
        ticker: "ROSN",
        type: "buy",
        name: "Роснефть",
        count: 12323,
        buyprice: 500,
        saleprice: 550,
        dealdate: "04.05.2024",
        comment: "жду дивиденды",
      },
      {
        portfolio: "finam",
        ticker: "LKOH",
        type: "sell",
        name: "Лукойл",
        count: 444,
        buyprice: 6000,
        saleprice: 6300,
        dealdate: "02.04.2024",
        comment: "не растет закрываю",
      },
      {
        portfolio: "finam",
        ticker: "ASTR",
        type: "buy",
        name: "Астра",
        count: 22,
        buyprice: 500,
        saleprice: 420,
        dealdate: "02.03.2024",
        comment: "вдруг вырастет",
      },
      {
        portfolio: "sber",
        ticker: "ASTR",
        type: "buy",
        name: "Астра",
        count: 22,
        buyprice: 500,
        saleprice: 420,
        dealdate: "02.03.2024",
        comment: "вдруг вырастет",
      },
    ],
  },

  getTotalPositions() {
    const total: IPositionView[] = []
    appcontent.portfolio.forEach((item) => {
      total.push(...item.positions)
    })
    return total
  },
  getPortfolio() {
    return appcontent.portfolio
  },
  getPositionsById(id: string) {
    return appcontent.portfolio.filter((item) => item.id === id)[0].positions
  },
  getIcon(key: string) {
    return appcontent.icons.get(key)
  },
  getDealTypes() {
    return appcontent.dealTypes
  },
  generateLogo(payload: string) {
    return `${appcontent.logosource}${payload}.png`
  },
  getBrokerslist() {
    return appcontent.portfolio.map((item) => {
      return {
        id: item.id,
        name: item.name,
        fee: item.fee,
      }
    })
  },


}

export default appcontent
