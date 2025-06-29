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
  isin?: string
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

declare interface LineData {
  dates: DatePrice[]
  id: string
  startprice?: number
  count?: number
  value?: number
  opendate: string
}

declare interface DatePrice {
  date: string
  value: number
  change?: string
}
/** Интерфейс подсказкок диаграммы */

declare interface Tooltip {
  visible: boolean
  x: number
  y: number
  text: string
}

declare interface LineChartData {
  svg: d3.Selection<SVGGElement, unknown, null, undefined>
  dataitems: DataItem[]
  x: (value: d3.NumberValue) => number
  y: (value: d3.NumberValue) => number
  width: number
  height: number
  margin: number
  tooltip: Tooltip
  xAxis: d3.Axis<d3.NumberValue | Date>
  yAxis: d3.Axis<d3.NumberValue | Date>
}

interface APIMoneyAmount {
  nano: number;
  units: string;
}

interface APIBrand {
  logoName: string;
  logoBaseColor: string;
  textColor: string;
}

interface APIInstrument {
  assetUid: string;
  figi: string;
  dshortMin: APIMoneyAmount;
  countryOfRisk: string;
  lot: number;
  uid: string;
  requiredTests: string[];
  blockedTcaFlag: boolean;
  dlong: APIMoneyAmount;
  dlongClient: APIMoneyAmount;
  nominal: APIMoneyAmount;
  sellAvailableFlag: boolean;
  currency: string;
  first1dayCandleDate: string; // ISO 8601 date string
  sector: string;
  brand: Brand;
  buyAvailableFlag: boolean;
  weekendFlag: boolean;
  classCode: string;
  ticker: string;
  forQualInvestorFlag: boolean;
  liquidityFlag: boolean;
  forIisFlag: boolean;
  positionUid: string;
  apiTradeAvailableFlag: boolean;
  dlongMin: APIMoneyAmount;
  shortEnabledFlag: boolean;
  kshort: APIMoneyAmount;
  first1minCandleDate: string; // ISO 8601 date string
  issueSizePlan: string;
  minPriceIncrement: APIMoneyAmount;
  otcFlag: boolean;
  dshortClient: APIMoneyAmount;
  klong: APIMoneyAmount;
  dshort: APIMoneyAmount;
  name: string;
  issueSize: string;
  exchange: string;
  countryOfRiskName: string;
  divYieldFlag: boolean;
  isin: string;
  ipoDate: string; // ISO 8601 date string
}

interface APIInstrumentsResponse {
  instruments: APIInstrument[];
}

interface APIShare {
  isin: string;
  figi: string;
  ticker: string;
  classCode: string;
  instrumentType: string;
  name: string;
  uid: string;
  positionUid: string;
  instrumentKind: string;
  apiTradeAvailableFlag: boolean;
  forIisFlag: boolean;
  first1minCandleDate: string; // ISO 8601 date string
  first1dayCandleDate: string; // ISO 8601 date string
  forQualInvestorFlag: boolean;
  weekendFlag: boolean;
  blockedTcaFlag: boolean;
  lot: number;
}

type APISharesResponse = APIShare[][];