const appcontent = {
  portfolio: [
    {
      id: "1",
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
  getPortfolio() {
    return appcontent.portfolio
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
