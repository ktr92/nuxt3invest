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
  fee: number
}
