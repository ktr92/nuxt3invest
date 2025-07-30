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
  opendate?: string
  openprice?: number
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

declare interface ILoadData {
   ticker: string;
    isin: string;
    name: string;
    count: number;
    price: number;
    newprice: number;
    pricechange: number;
    total: number;
    change: number;
    yearchange: number;
    openDate: string;
    share: number;
}

declare interface IPrice {
  units: string;
  nano: number;
}

declare interface ICandleData {
  open: IPrice;
  high: {
    units: string;
    nano: number;
  };
  low: {
    units: string;
    nano: number;
  };
  close: {
    units: string;
    nano: number;
  };
  volume: string;
  time: string;
  isComplete: boolean;
  candleSource: string;
}

type APISharesResponse = APIShare[][];

declare interface ICandlesToLine {
  loadData: ILoadData[],
  candles: ICandleData[][],
  from: Date,
  shares: APISharesResponse,
  instrumentId: Array<{ id: string }>,
  alltime: boolean
}

declare type FTDataToChart = (api: ICandlesToLine) => LineData[]