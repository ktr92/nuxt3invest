declare interface IPortfolio {
  id: string
  name: string
  depo: number
  fee: number
  positions: IPosition[]
}

declare interface IPosition {
  [index: string]: string
  ticker: string
  type: string
  market: string
  buyPrice: number
  count: number
  positionId: string
  portfolioId: string
  comm?: number
  nkd?: number
  nominal?: number
  currency?: string
  buyCurrency?: number
  myStop?: number
  options?: IState
  salePrice?: number
  saleCount?: number
  saleCurrency?: number
  saleNkd?: number
  isSold?: boolean
}
declare interface IPositionView {
  ticker: string
  name: string
  count: number
  price: number
  newprice: number
  pricechange: number
  total: number
  change: number
  yearchange: number
  openDate: string
}
declare interface IDealView {
  ticker: string
  type: string
  name: string
  count: number
  buyprice: number
  saleprice: number
  dealdate: string
  comment: string
}
declare interface HTMLElement {
  _unhandler?: (event: MouseEvent) => void
}
declare interface ISwitcher {
  id: string
  title: string
  info: string
}
declare interface IPortfolioDeal {
  id: string
  name: string
  fee?: number
}


/** Интерфейс данных которые будут выводиться в диаграмме */
declare interface DataItem {
  category: string
  value: number
}
/** Интерфейс подсказкок диаграммы */

declare interface Tooltip {
  visible: boolean
  x: number
  y: number
  text: string
}
