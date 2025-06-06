declare interface IPortfolio {
  id: string,
  name: string,
  depo: number,
  comm: number,
  positions: IPosition[]
}

declare interface IPosition {
  [index: string]: string,
  ticker: string,
  type: string,
  market: string,
  buyPrice: number,
  count: number,
  positionId: string,
  portfolioId: string,
  comm?: number,
  nkd?: number,
  nominal?: number,
  currency?: string,
  buyCurrency?: number,
  myStop?: number,
  options?: IState,
  salePrice?: number,
  saleCount?: number,
  saleCurrency?: number,
  saleNkd?: number
  isSold?: boolean
}
declare interface HTMLElement {
  _unhandler?: (event: MouseEvent) => void
}