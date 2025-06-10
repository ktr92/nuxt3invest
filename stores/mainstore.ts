import { defineStore } from "pinia"

export const useMainstore = defineStore("mainstore", {
  state: () => ({
    ismenushown: false,
    ismodalshown: false,
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
    portfolio: [
      {
        id: "1",
        name: "Финам",
        depo: 500000,
        fee: 0.09,
        defaultCategory: "TQBR",
        positions: [
          {
            isin: "RU000A0JPKH7",
            positionId: "1",
            portfolioId: "1",
            ticker: "HYDR",
            type: "stock",
            market: "TQBR",
            buyPrice: 0.467,
            count: 416000,
            myStop: 0,
          },
        ],
      },
      {
        id: "2",
        name: "ВТБ",
        depo: 410000,
        fee: 0.05,
        defaultCategory: "TQBR",
        positions: [
          {
            isin: "RU000A0JPKH7",
            positionId: "1",
            portfolioId: "2",
            ticker: "HYDR",
            type: "stock",
            market: "TQBR",
            buyPrice: 0.467,
            count: 416000,
            myStop: 0,
          },
        ],
      },
      {
        id: "3",
        name: "БКС",
        depo: 410000,
        fee: 0.3,
        defaultCategory: "TQBR",
        positions: [
          {
            isin: "RU000A0JPKH7",
            positionId: "1",
            portfolioId: "3",
            ticker: "HYDR",
            type: "stock",
            market: "TQBR",
            buyPrice: 0.467,
            count: 416000,
            myStop: 0,
          },
        ],
      },
      {
        id: "4",
        name: "Сбер",
        depo: 450000,
        fee: 0.06,
        defaultCategory: "TQBR",
        positions: [
          {
            isin: "RU000A0JPKH7",
            positionId: "1",
            portfolioId: "4",
            ticker: "HYDR",
            type: "stock",
            market: "TQBR",
            buyPrice: 0.467,
            count: 416000,
            myStop: 0,
          },
        ],
      },
      {
        id: "5",
        name: "ИИС",
        depo: 200000,
        fee: 0.06,
        defaultCategory: "TQBR",
        positions: [
          {
            isin: "RU000A0JPKH7",
            positionId: "1",
            portfolioId: "5",
            ticker: "HYDR",
            type: "stock",
            market: "TQBR",
            buyPrice: 0.467,
            count: 416000,
            myStop: 0,
          },
        ],
      },
      {
        id: "6",
        name: "Альфа",
        depo: 27000,
        fee: 0.06,
        defaultCategory: "TQBR",
        positions: [
          {
            isin: "RU000A0JPKH7",
            positionId: "1",
            portfolioId: "6",
            ticker: "HYDR",
            type: "stock",
            market: "TQBR",
            buyPrice: 0.467,
            count: 416000,
            myStop: 0,
          },
        ],
      },
    ],
  }),
  getters: {
    getPorfolio: (state) => state.portfolio,
    getMenu: (state) => state.ismenushown,
    getModal: (state) => state.ismodalshown,
    getDealTypes: (state) => state.dealTypes,
    getBrokerslist: (state) =>
      state.portfolio.map((item) => {
        return {
          id: item.id,
          name: item.name,
          fee: item.fee,
        }
      }),
  },
  actions: {
    toggleMenu() {
      this.ismenushown = !this.ismenushown
    },
    toggleModal() {
      this.ismodalshown = !this.ismodalshown
    },
    closeMenu() {
      this.ismenushown = false
    },
    closeModal() {
      this.ismodalshown = false
    },
    generateLogo(payload:string) {
      return `${this.logosource}${payload}.png` 
    } 

  },
})
