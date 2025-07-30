function makeFormatLocale (locale: d3.TimeLocaleObject) {
  return (
    domainValue: Date | number | { valueOf(): number },
    _index: number
  ): string => {
    let date: Date
    if (domainValue instanceof Date) {
      date = domainValue
    } else if (typeof domainValue === "number") {
      date = new Date(domainValue)
    } else if (domainValue && typeof domainValue.valueOf === "function") {
      date = new Date(domainValue.valueOf())
    } else {
      date = new Date()
    }
    return locale.format("%b %Y")(date)
  }
}


/**
 * Локализация дат для осей графика D3
 * @returns {d3.TimeLocaleDefinition}
 */
function makeChartLocale() {
  const ruLocale = {
    dateTime: "%A, %e %B %Y г. %X",
    date: "%d.%m.%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: [
      "воскресенье",
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота",
    ],
    shortDays: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
    months: [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ],
    shortMonths: [
      "янв",
      "фев",
      "мар",
      "апр",
      "май",
      "июн",
      "июл",
      "авг",
      "сен",
      "окт",
      "ноя",
      "дек",
    ],
  }

  /**
   * Приводим к нужному типу TimeLocaleDefinition @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/d3-time-format/index.d.ts
   */
  return {
    ...ruLocale,
    periods: Array.from(ruLocale.periods),
    days: Array.from(ruLocale.days),
    shortDays: Array.from(ruLocale.shortDays),
    months: Array.from(ruLocale.months),
    shortMonths: Array.from(ruLocale.shortMonths),
  } as d3.TimeLocaleDefinition
}


export {makeFormatLocale, makeChartLocale}