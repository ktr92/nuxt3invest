<template>
  <div class="w-full">
    <div v-if="status === 'pending'"></div>
    <div v-else>
      <div v-if="candles && candles.length">
        <ChartLine
          :data="[ { category: 'ROSN', dates: candles[0] as DatePrice[] },
          { category: 'ASTR', dates: candles[1] as DatePrice[] }
         ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loadData = [
  {
    ticker: "ROSN",
    isin: "RU000A0J2Q06",
    name: "Роснефть",
    count: 12323,
    price: 420,
    newprice: 380,
    pricechange: -40,
    total: 500,
    change: -6,
    yearchange: 11,
    openDate: "02.03.2024",
    share: 30,
  },
  {
    ticker: "ASTR",
    isin: "RU000A106T36",
    name: "Астра",
    count: 33213,
    price: 545,
    newprice: 567,
    pricechange: 22,
    total: 500,
    change: 10,
    yearchange: -20,
    openDate: "23.01.2025",
    share: 25,
  },
]

const from = new Date()
from.setFullYear(from.getFullYear() - 1)
const to = new Date()
const idList = loadData.map((item) => item.isin)

const { data: shares } = await useAsyncData(() => {
  return Promise.all([
    ...idList.map((item) => {
      return $fetch("/api/tinsrumentid", {
        body: {
          isin: item,
        },
        method: "POST",
      })
    }),
  ])
})

const { data: candles, status } = await useAsyncData(() => {
  console.log("shares: ", shares.value)
  return Promise.all([
    ...shares.value.map((item: any) => {
      return $fetch("/api/tinvest", {
        body: {
          instrumentId: item,
          from: from.toISOString(),
          to: to.toISOString(),
          interval: "CANDLE_INTERVAL_DAY",
        },
        method: "POST"
      })
    }),
  ])
})


/* const tickersList = loadData.filter((item) => tickers.includes(item.ticker))
 */

/* const chartData = computed(() => {
  return candles.value.map((item: DatePrice) => {
    return {
      price: item.price,
      date: item.date,
      change: item.change
    }
  })
}) */

/*
const { data: candles, pending, error } = await useAsyncData('/api/tinvest', () => fetchCandles());

async function fetchCandles(): Promise<{ candles: any[] }> {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await $fetch('/api/tinvest', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        instrumentId,
        from: from.toISOString(),
        to: to.toISOString(),
        interval: 'CANDLE_INTERVAL_DAY',
      }),
    });

    console.log('response: ', response)


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Ошибка от API: ${response.status} ${errorData?.message || ''}`);
    }

    const data = await response.json();
    if (data.status !== 'ok') {
      throw new Error(`Ошибка от API: ${data.message}`);
    }
    return data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
}
 */

/* const monthData = [
  {
    ticker: "ROSN",
    value: [
      {
        price: 448.75,
        date: "2025-06-19",
      },
      {
        price: 455.6,
        date: "2025-06-18",
      },
      {
        price: 454.85,
        date: "2025-06-17",
      },
      {
        price: 456.95,
        date: "2025-06-16",
      },
      {
        price: 436.15,
        date: "2025-06-15",
      },
      {
        price: 450.3,
        date: "2025-06-14",
      },
      {
        price: 457.6,
        date: "2025-06-13",
      },
      {
        price: 444.4,
        date: "2025-06-12",
      },
      {
        price: 415.4,
        date: "2025-06-10",
      },
      {
        price: 411.15,
        date: "2025-06-09",
      },
      {
        price: 425.75,
        date: "2025-06-08",
      },
      {
        price: 429.85,
        date: "2025-06-07",
      },
      {
        price: 430.15,
        date: "2025-06-06",
      },
      {
        price: 429.2,
        date: "2025-06-05",
      },
      {
        price: 437.9,
        date: "2025-06-04",
      },
      {
        price: 435.45,
        date: "2025-06-03",
      },
      {
        price: 444.15,
        date: "2025-06-02",
      },
      {
        price: 438.7,
        date: "2025-06-01",
      },
      {
        price: 418.65,
        date: "2025-05-31",
      },
      {
        price: 428.35,
        date: "2025-05-30",
      },
      {
        price: 427.15,
        date: "2025-05-29",
      },
      {
        price: 424.95,
        date: "2025-05-28",
      },
      {
        price: 428.15,
        date: "2025-05-27",
      },
      {
        price: 413.65,
        date: "2025-05-26",
      },
      {
        price: 413.9,
        date: "2025-05-25",
      },
      {
        price: 420.7,
        date: "2025-05-22",
      },
      {
        price: 423.85,
        date: "2025-05-21",
      },
      {
        price: 429.35,
        date: "2025-05-20",
      },
      {
        price: 432.3,
        date: "2025-05-19",
      },
      {
        price: 439,
        date: "2025-05-18",
      },
      {
        price: 447.45,
        date: "2025-05-17",
      },
      {
        price: 445.5,
        date: "2025-05-16",
      },
      {
        price: 439.85,
        date: "2025-05-15",
      },
      {
        price: 442.15,
        date: "2025-05-14",
      },
      {
        price: 438.8,
        date: "2025-05-13",
      },
      {
        price: 455.85,
        date: "2025-05-12",
      },
      {
        price: 456.4,
        date: "2025-05-11",
      },
      {
        price: 443.9,
        date: "2025-05-07",
      },
      {
        price: 438,
        date: "2025-05-06",
      },
      {
        price: 430.25,
        date: "2025-05-05",
      },
      {
        price: 426.7,
        date: "2025-05-04",
      },
      {
        price: 435.7,
        date: "2025-05-01",
      },
      {
        price: 454.5,
        date: "2025-04-29",
      },
      {
        price: 457.95,
        date: "2025-04-28",
      },
      {
        price: 473.95,
        date: "2025-04-27",
      },
      {
        price: 480,
        date: "2025-04-24",
      },
      {
        price: 469.9,
        date: "2025-04-23",
      },
      {
        price: 471.4,
        date: "2025-04-22",
      },
      {
        price: 482.65,
        date: "2025-04-21",
      },
      {
        price: 482,
        date: "2025-04-20",
      },
      {
        price: 476.85,
        date: "2025-04-17",
      },
      {
        price: 478.7,
        date: "2025-04-16",
      },
      {
        price: 452.25,
        date: "2025-04-15",
      },
      {
        price: 452.05,
        date: "2025-04-14",
      },
      {
        price: 449.3,
        date: "2025-04-13",
      },
      {
        price: 450.9,
        date: "2025-04-10",
      },
      {
        price: 438,
        date: "2025-04-09",
      },
      {
        price: 446,
        date: "2025-04-08",
      },
      {
        price: 429,
        date: "2025-04-07",
      },
      {
        price: 450.7,
        date: "2025-04-06",
      },
      {
        price: 441.3,
        date: "2025-04-03",
      },
      {
        price: 462.8,
        date: "2025-04-02",
      },
      {
        price: 477.9,
        date: "2025-04-01",
      },
      {
        price: 474.6,
        date: "2025-03-31",
      },
      {
        price: 490.5,
        date: "2025-03-30",
      },
      {
        price: 496.75,
        date: "2025-03-27",
      },
      {
        price: 502.4,
        date: "2025-03-26",
      },
      {
        price: 513.75,
        date: "2025-03-25",
      },
      {
        price: 521.7,
        date: "2025-03-24",
      },
      {
        price: 521.4,
        date: "2025-03-23",
      },
      {
        price: 534.6,
        date: "2025-03-20",
      },
      {
        price: 536.85,
        date: "2025-03-19",
      },
      {
        price: 535.9,
        date: "2025-03-18",
      },
      {
        price: 535.45,
        date: "2025-03-17",
      },
      {
        price: 539.55,
        date: "2025-03-16",
      },
      {
        price: 530.6,
        date: "2025-03-13",
      },
      {
        price: 528.15,
        date: "2025-03-12",
      },
      {
        price: 533.7,
        date: "2025-03-11",
      },
      {
        price: 527.35,
        date: "2025-03-10",
      },
      {
        price: 527.3,
        date: "2025-03-09",
      },
      {
        price: 528.8,
        date: "2025-03-06",
      },
      {
        price: 529.55,
        date: "2025-03-05",
      },
      {
        price: 530.5,
        date: "2025-03-04",
      },
      {
        price: 540.1,
        date: "2025-03-03",
      },
      {
        price: 539,
        date: "2025-03-02",
      },
      {
        price: 556.05,
        date: "2025-02-27",
      },
      {
        price: 552.85,
        date: "2025-02-26",
      },
      {
        price: 569.25,
        date: "2025-02-25",
      },
      {
        price: 582.8,
        date: "2025-02-24",
      },
      {
        price: 569.45,
        date: "2025-02-23",
      },
      {
        price: 572.55,
        date: "2025-02-20",
      },
      {
        price: 577.95,
        date: "2025-02-19",
      },
      {
        price: 575.95,
        date: "2025-02-18",
      },
      {
        price: 574.2,
        date: "2025-02-17",
      },
      {
        price: 585.2,
        date: "2025-02-16",
      },
      {
        price: 561.95,
        date: "2025-02-13",
      },
      {
        price: 573.3,
        date: "2025-02-12",
      },
      {
        price: 577.85,
        date: "2025-02-11",
      },
      {
        price: 538.9,
        date: "2025-02-10",
      },
      {
        price: 533.15,
        date: "2025-02-09",
      },
      {
        price: 530.25,
        date: "2025-02-06",
      },
      {
        price: 528.2,
        date: "2025-02-05",
      },
      {
        price: 522.05,
        date: "2025-02-04",
      },
      {
        price: 518.95,
        date: "2025-02-03",
      },
      {
        price: 519.2,
        date: "2025-02-02",
      },
      {
        price: 526.8,
        date: "2025-01-30",
      },
      {
        price: 534.85,
        date: "2025-01-29",
      },
      {
        price: 535.6,
        date: "2025-01-28",
      },
      {
        price: 534.85,
        date: "2025-01-27",
      },
      {
        price: 516.35,
        date: "2025-01-26",
      },
      {
        price: 535.85,
        date: "2025-01-23",
      },
      {
        price: 539.1,
        date: "2025-01-22",
      },
      {
        price: 540,
        date: "2025-01-21",
      },
      {
        price: 542.1,
        date: "2025-01-20",
      },
      {
        price: 537.7,
        date: "2025-01-19",
      },
      {
        price: 554.9,
        date: "2025-01-16",
      },
      {
        price: 546.4,
        date: "2025-01-15",
      },
      {
        price: 547.6,
        date: "2025-01-14",
      },
      {
        price: 540.35,
        date: "2025-01-13",
      },
      {
        price: 545.5,
        date: "2025-01-12",
      },
      {
        price: 562.95,
        date: "2025-01-09",
      },
      {
        price: 574.8,
        date: "2025-01-08",
      },
      {
        price: 593.45,
        date: "2025-01-07",
      },
      {
        price: 588.45,
        date: "2025-01-05",
      },
      {
        price: 596.1,
        date: "2025-01-02",
      },
      {
        price: 606.05,
        date: "2024-12-29",
      },
      {
        price: 596,
        date: "2024-12-27",
      },
      {
        price: 591,
        date: "2024-12-26",
      },
      {
        price: 579.1,
        date: "2024-12-25",
      },
      {
        price: 581.95,
        date: "2024-12-24",
      },
      {
        price: 572.7,
        date: "2024-12-23",
      },
      {
        price: 569.9,
        date: "2024-12-22",
      },
      {
        price: 559.6,
        date: "2024-12-19",
      },
      {
        price: 506.15,
        date: "2024-12-18",
      },
      {
        price: 487.7,
        date: "2024-12-17",
      },
      {
        price: 480.65,
        date: "2024-12-16",
      },
      {
        price: 477.4,
        date: "2024-12-15",
      },
      {
        price: 483.65,
        date: "2024-12-12",
      },
      {
        price: 485.45,
        date: "2024-12-11",
      },
      {
        price: 488.75,
        date: "2024-12-10",
      },
      {
        price: 484.6,
        date: "2024-12-09",
      },
      {
        price: 491.05,
        date: "2024-12-08",
      },
      {
        price: 485.3,
        date: "2024-12-05",
      },
      {
        price: 488.2,
        date: "2024-12-04",
      },
      {
        price: 473.1,
        date: "2024-12-03",
      },
      {
        price: 490.5,
        date: "2024-12-02",
      },
      {
        price: 489.3,
        date: "2024-12-01",
      },
      {
        price: 478,
        date: "2024-11-28",
      },
      {
        price: 474.85,
        date: "2024-11-27",
      },
      {
        price: 474.15,
        date: "2024-11-26",
      },
      {
        price: 450.8,
        date: "2024-11-25",
      },
      {
        price: 453.65,
        date: "2024-11-24",
      },
      {
        price: 459.9,
        date: "2024-11-21",
      },
      {
        price: 458.95,
        date: "2024-11-20",
      },
      {
        price: 449.25,
        date: "2024-11-19",
      },
      {
        price: 459.7,
        date: "2024-11-18",
      },
      {
        price: 471.95,
        date: "2024-11-17",
      },
      {
        price: 480.1,
        date: "2024-11-14",
      },
      {
        price: 473.3,
        date: "2024-11-13",
      },
      {
        price: 480.35,
        date: "2024-11-12",
      },
      {
        price: 482.05,
        date: "2024-11-11",
      },
      {
        price: 490.6,
        date: "2024-11-10",
      },
      {
        price: 481.5,
        date: "2024-11-07",
      },
      {
        price: 475.5,
        date: "2024-11-06",
      },
      {
        price: 466.85,
        date: "2024-11-05",
      },
      {
        price: 460.5,
        date: "2024-11-04",
      },
      {
        price: 457,
        date: "2024-11-01",
      },
      {
        price: 444.35,
        date: "2024-10-31",
      },
      {
        price: 434.1,
        date: "2024-10-30",
      },
      {
        price: 439.05,
        date: "2024-10-29",
      },
      {
        price: 442.35,
        date: "2024-10-28",
      },
      {
        price: 434.75,
        date: "2024-10-27",
      },
      {
        price: 456.1,
        date: "2024-10-24",
      },
      {
        price: 469.75,
        date: "2024-10-23",
      },
      {
        price: 469,
        date: "2024-10-22",
      },
      {
        price: 479,
        date: "2024-10-21",
      },
      {
        price: 484.7,
        date: "2024-10-20",
      },
      {
        price: 487.8,
        date: "2024-10-17",
      },
      {
        price: 486.95,
        date: "2024-10-16",
      },
      {
        price: 496.45,
        date: "2024-10-15",
      },
      {
        price: 498.4,
        date: "2024-10-14",
      },
      {
        price: 496,
        date: "2024-10-13",
      },
      {
        price: 492.15,
        date: "2024-10-10",
      },
      {
        price: 497.75,
        date: "2024-10-09",
      },
      {
        price: 495.85,
        date: "2024-10-08",
      },
      {
        price: 501.8,
        date: "2024-10-07",
      },
      {
        price: 503.5,
        date: "2024-10-06",
      },
      {
        price: 501.9,
        date: "2024-10-03",
      },
      {
        price: 500,
        date: "2024-10-02",
      },
      {
        price: 499.95,
        date: "2024-10-01",
      },
      {
        price: 509.75,
        date: "2024-09-30",
      },
      {
        price: 507.4,
        date: "2024-09-29",
      },
      {
        price: 511,
        date: "2024-09-26",
      },
      {
        price: 512.7,
        date: "2024-09-25",
      },
      {
        price: 512.4,
        date: "2024-09-24",
      },
      {
        price: 522.1,
        date: "2024-09-23",
      },
      {
        price: 526.1,
        date: "2024-09-22",
      },
      {
        price: 528.15,
        date: "2024-09-19",
      },
      {
        price: 512.55,
        date: "2024-09-18",
      },
      {
        price: 510.25,
        date: "2024-09-17",
      },
      {
        price: 517.95,
        date: "2024-09-16",
      },
      {
        price: 516.3,
        date: "2024-09-15",
      },
      {
        price: 498,
        date: "2024-09-12",
      },
      {
        price: 488.45,
        date: "2024-09-11",
      },
      {
        price: 477.75,
        date: "2024-09-10",
      },
      {
        price: 482.35,
        date: "2024-09-09",
      },
      {
        price: 493.8,
        date: "2024-09-08",
      },
      {
        price: 479.1,
        date: "2024-09-05",
      },
      {
        price: 477.9,
        date: "2024-09-04",
      },
      {
        price: 477.5,
        date: "2024-09-03",
      },
      {
        price: 468.85,
        date: "2024-09-02",
      },
      {
        price: 455.4,
        date: "2024-09-01",
      },
      {
        price: 475.9,
        date: "2024-08-29",
      },
      {
        price: 482.95,
        date: "2024-08-28",
      },
      {
        price: 479,
        date: "2024-08-27",
      },
      {
        price: 477.45,
        date: "2024-08-26",
      },
      {
        price: 489.5,
        date: "2024-08-25",
      },
      {
        price: 477.85,
        date: "2024-08-22",
      },
      {
        price: 475.8,
        date: "2024-08-21",
      },
      {
        price: 481,
        date: "2024-08-20",
      },
      {
        price: 481.5,
        date: "2024-08-19",
      },
      {
        price: 483.7,
        date: "2024-08-18",
      },
      {
        price: 489.75,
        date: "2024-08-15",
      },
      {
        price: 493.6,
        date: "2024-08-14",
      },
      {
        price: 495.8,
        date: "2024-08-13",
      },
      {
        price: 502.45,
        date: "2024-08-12",
      },
      {
        price: 500.9,
        date: "2024-08-11",
      },
      {
        price: 505.45,
        date: "2024-08-08",
      },
      {
        price: 503.2,
        date: "2024-08-07",
      },
      {
        price: 508.45,
        date: "2024-08-06",
      },
      {
        price: 495,
        date: "2024-08-05",
      },
      {
        price: 493.9,
        date: "2024-08-04",
      },
      {
        price: 504.85,
        date: "2024-08-01",
      },
      {
        price: 506.45,
        date: "2024-07-31",
      },
      {
        price: 515.95,
        date: "2024-07-30",
      },
      {
        price: 514,
        date: "2024-07-29",
      },
      {
        price: 503.1,
        date: "2024-07-28",
      },
      {
        price: 521.4,
        date: "2024-07-25",
      },
      {
        price: 533.3,
        date: "2024-07-24",
      },
      {
        price: 532,
        date: "2024-07-23",
      },
      {
        price: 530.55,
        date: "2024-07-22",
      },
      {
        price: 531.85,
        date: "2024-07-21",
      },
      {
        price: 524.15,
        date: "2024-07-18",
      },
      {
        price: 517.2,
        date: "2024-07-17",
      },
      {
        price: 510.45,
        date: "2024-07-16",
      },
      {
        price: 516.9,
        date: "2024-07-15",
      },
      {
        price: 508.15,
        date: "2024-07-14",
      },
      {
        price: 527.4,
        date: "2024-07-11",
      },
      {
        price: 526.7,
        date: "2024-07-10",
      },
      {
        price: 502,
        date: "2024-07-09",
      },
      {
        price: 525,
        date: "2024-07-08",
      },
      {
        price: 560.2,
        date: "2024-07-07",
      },
      {
        price: 555.15,
        date: "2024-07-04",
      },
      {
        price: 561.35,
        date: "2024-07-03",
      },
      {
        price: 574.1,
        date: "2024-07-02",
      },
      {
        price: 573.15,
        date: "2024-07-01",
      },
      {
        price: 576.85,
        date: "2024-06-30",
      },
      {
        price: 565.35,
        date: "2024-06-27",
      },
      {
        price: 559.8,
        date: "2024-06-26",
      },
      {
        price: 561.25,
        date: "2024-06-25",
      },
      {
        price: 547.5,
        date: "2024-06-23",
      },
      {
        price: 565.1,
        date: "2024-06-13",
      },
      {
        price: 555.5,
        date: "2024-06-12",
      },
      {
        price: 562.85,
        date: "2024-06-10",
      },
      {
        price: 563.25,
        date: "2024-06-09",
      },
      {
        price: 571.65,
        date: "2024-06-06",
      },
      {
        price: 566.3,
        date: "2024-06-05",
      },
      {
        price: 562.2,
        date: "2024-06-04",
      },
      {
        price: 568.95,
        date: "2024-06-03",
      },
      {
        price: 562.95,
        date: "2024-06-02",
      },
    ],
  },
  {
    ticker: "ASTR",
    value: [
      {
        date: "2025-06-20",
        price: "388.40",
      },
      {
        date: "2025-06-19",
        price: "391.90",
      },
      {
        date: "2025-06-18",
        price: "399.30",
      },
      {
        date: "2025-06-17",
        price: "394.05",
      },
      {
        date: "2025-06-16",
        price: "386.00",
      },
      {
        date: "2025-06-15",
        price: "391.00",
      },
      {
        date: "2025-06-14",
        price: "389.70",
      },
      {
        date: "2025-06-13",
        price: "390.10",
      },
      {
        date: "2025-06-11",
        price: "391.25",
      },
      {
        date: "2025-06-10",
        price: "391.50",
      },
      {
        date: "2025-06-09",
        price: "397.95",
      },
      {
        date: "2025-06-08",
        price: "395.65",
      },
      {
        date: "2025-06-07",
        price: "395.70",
      },
      {
        date: "2025-06-06",
        price: "393.45",
      },
      {
        date: "2025-06-05",
        price: "407.70",
      },
      {
        date: "2025-06-04",
        price: "398.15",
      },
      {
        date: "2025-06-03",
        price: "390.40",
      },
      {
        date: "2025-06-02",
        price: "390.80",
      },
      {
        date: "2025-06-01",
        price: "386.05",
      },
      {
        date: "2025-05-31",
        price: "393.40",
      },
      {
        date: "2025-05-30",
        price: "395.00",
      },
      {
        date: "2025-05-29",
        price: "391.55",
      },
      {
        date: "2025-05-28",
        price: "383.75",
      },
      {
        date: "2025-05-27",
        price: "370.80",
      },
      {
        date: "2025-05-26",
        price: "374.50",
      },
      {
        date: "2025-05-23",
        price: "383.75",
      },
      {
        date: "2025-05-22",
        price: "383.75",
      },
      {
        date: "2025-05-21",
        price: "386.15",
      },
      {
        date: "2025-05-20",
        price: "389.40",
      },
      {
        date: "2025-05-19",
        price: "394.00",
      },
      {
        date: "2025-05-18",
        price: "399.40",
      },
      {
        date: "2025-05-17",
        price: "395.05",
      },
      {
        date: "2025-05-16",
        price: "393.65",
      },
      {
        date: "2025-05-15",
        price: "394.00",
      },
      {
        date: "2025-05-14",
        price: "393.30",
      },
      {
        date: "2025-05-13",
        price: "398.70",
      },
      {
        date: "2025-05-12",
        price: "401.35",
      },
      {
        date: "2025-05-08",
        price: "392.15",
      },
      {
        date: "2025-05-07",
        price: "395.15",
      },
      {
        date: "2025-05-06",
        price: "390.30",
      },
      {
        date: "2025-05-05",
        price: "386.80",
      },
      {
        date: "2025-05-02",
        price: "393.45",
      },
      {
        date: "2025-04-30",
        price: "397.90",
      },
      {
        date: "2025-04-29",
        price: "401.90",
      },
      {
        date: "2025-04-28",
        price: "410.45",
      },
      {
        date: "2025-04-25",
        price: "413.15",
      },
      {
        date: "2025-04-24",
        price: "413.15",
      },
      {
        date: "2025-04-23",
        price: "414.40",
      },
      {
        date: "2025-04-22",
        price: "418.95",
      },
      {
        date: "2025-04-21",
        price: "401.05",
      },
      {
        date: "2025-04-18",
        price: "400.00",
      },
      {
        date: "2025-04-17",
        price: "404.20",
      },
      {
        date: "2025-04-16",
        price: "405.25",
      },
      {
        date: "2025-04-15",
        price: "405.00",
      },
      {
        date: "2025-04-14",
        price: "408.90",
      },
      {
        date: "2025-04-11",
        price: "417.60",
      },
      {
        date: "2025-04-10",
        price: "414.95",
      },
      {
        date: "2025-04-09",
        price: "419.65",
      },
      {
        date: "2025-04-08",
        price: "411.60",
      },
      {
        date: "2025-04-07",
        price: "404.45",
      },
      {
        date: "2025-04-04",
        price: "406.85",
      },
      {
        date: "2025-04-03",
        price: "430.90",
      },
      {
        date: "2025-04-02",
        price: "429.65",
      },
      {
        date: "2025-04-01",
        price: "417.25",
      },
      {
        date: "2025-03-31",
        price: "424.05",
      },
      {
        date: "2025-03-28",
        price: "412.55",
      },
      {
        date: "2025-03-27",
        price: "411.60",
      },
      {
        date: "2025-03-26",
        price: "420.85",
      },
      {
        date: "2025-03-25",
        price: "424.30",
      },
      {
        date: "2025-03-24",
        price: "426.70",
      },
      {
        date: "2025-03-21",
        price: "432.70",
      },
      {
        date: "2025-03-20",
        price: "436.25",
      },
      {
        date: "2025-03-19",
        price: "440.70",
      },
      {
        date: "2025-03-18",
        price: "437.85",
      },
      {
        date: "2025-03-17",
        price: "442.50",
      },
      {
        date: "2025-03-14",
        price: "439.85",
      },
      {
        date: "2025-03-13",
        price: "440.00",
      },
      {
        date: "2025-03-12",
        price: "446.00",
      },
      {
        date: "2025-03-11",
        price: "446.70",
      },
      {
        date: "2025-03-10",
        price: "446.75",
      },
      {
        date: "2025-03-07",
        price: "442.80",
      },
      {
        date: "2025-03-06",
        price: "448.70",
      },
      {
        date: "2025-03-05",
        price: "445.55",
      },
      {
        date: "2025-03-04",
        price: "437.40",
      },
      {
        date: "2025-03-03",
        price: "432.50",
      },
      {
        date: "2025-02-28",
        price: "442.50",
      },
      {
        date: "2025-02-27",
        price: "440.10",
      },
      {
        date: "2025-02-26",
        price: "444.80",
      },
      {
        date: "2025-02-25",
        price: "449.00",
      },
      {
        date: "2025-02-24",
        price: "453.00",
      },
      {
        date: "2025-02-21",
        price: "450.00",
      },
      {
        date: "2025-02-20",
        price: "463.10",
      },
      {
        date: "2025-02-19",
        price: "466.55",
      },
      {
        date: "2025-02-18",
        price: "464.30",
      },
      {
        date: "2025-02-17",
        price: "476.00",
      },
      {
        date: "2025-02-14",
        price: "472.00",
      },
      {
        date: "2025-02-13",
        price: "484.10",
      },
      {
        date: "2025-02-12",
        price: "497.00",
      },
      {
        date: "2025-02-11",
        price: "490.90",
      },
      {
        date: "2025-02-10",
        price: "489.50",
      },
      {
        date: "2025-02-07",
        price: "514.35",
      },
      {
        date: "2025-02-06",
        price: "516.95",
      },
      {
        date: "2025-02-05",
        price: "516.00",
      },
      {
        date: "2025-02-04",
        price: "514.30",
      },
      {
        date: "2025-02-03",
        price: "520.80",
      },
      {
        date: "2025-01-31",
        price: "525.30",
      },
      {
        date: "2025-01-30",
        price: "527.40",
      },
      {
        date: "2025-01-29",
        price: "526.40",
      },
      {
        date: "2025-01-28",
        price: "529.70",
      },
      {
        date: "2025-01-27",
        price: "502.60",
      },
      {
        date: "2025-01-24",
        price: "514.30",
      },
      {
        date: "2025-01-23",
        price: "518.05",
      },
      {
        date: "2025-01-22",
        price: "500.70",
      },
      {
        date: "2025-01-21",
        price: "499.90",
      },
      {
        date: "2025-01-20",
        price: "497.65",
      },
      {
        date: "2025-01-17",
        price: "507.85",
      },
      {
        date: "2025-01-16",
        price: "495.60",
      },
      {
        date: "2025-01-15",
        price: "491.00",
      },
      {
        date: "2025-01-14",
        price: "482.80",
      },
      {
        date: "2025-01-13",
        price: "485.35",
      },
      {
        date: "2025-01-10",
        price: "481.00",
      },
      {
        date: "2025-01-09",
        price: "472.85",
      },
      {
        date: "2025-01-08",
        price: "490.45",
      },
      {
        date: "2025-01-06",
        price: "472.80",
      },
      {
        date: "2025-01-03",
        price: "468.60",
      },
      {
        date: "2024-12-30",
        price: "469.50",
      },
      {
        date: "2024-12-28",
        price: "460.85",
      },
      {
        date: "2024-12-27",
        price: "456.10",
      },
      {
        date: "2024-12-26",
        price: "456.50",
      },
      {
        date: "2024-12-25",
        price: "466.85",
      },
      {
        date: "2024-12-24",
        price: "461.00",
      },
      {
        date: "2024-12-23",
        price: "473.60",
      },
      {
        date: "2024-12-20",
        price: "472.00",
      },
      {
        date: "2024-12-19",
        price: "436.95",
      },
      {
        date: "2024-12-18",
        price: "427.55",
      },
      {
        date: "2024-12-17",
        price: "417.65",
      },
      {
        date: "2024-12-16",
        price: "410.35",
      },
      {
        date: "2024-12-13",
        price: "411.25",
      },
      {
        date: "2024-12-12",
        price: "418.75",
      },
      {
        date: "2024-12-11",
        price: "430.00",
      },
      {
        date: "2024-12-10",
        price: "430.10",
      },
      {
        date: "2024-12-09",
        price: "442.65",
      },
      {
        date: "2024-12-06",
        price: "439.70",
      },
      {
        date: "2024-12-05",
        price: "430.85",
      },
      {
        date: "2024-12-04",
        price: "426.55",
      },
      {
        date: "2024-12-03",
        price: "445.10",
      },
      {
        date: "2024-12-02",
        price: "460.35",
      },
      {
        date: "2024-11-29",
        price: "448.40",
      },
      {
        date: "2024-11-28",
        price: "445.75",
      },
      {
        date: "2024-11-27",
        price: "454.05",
      },
      {
        date: "2024-11-26",
        price: "447.00",
      },
      {
        date: "2024-11-25",
        price: "474.10",
      },
      {
        date: "2024-11-22",
        price: "494.00",
      },
      {
        date: "2024-11-21",
        price: "499.80",
      },
      {
        date: "2024-11-20",
        price: "502.95",
      },
      {
        date: "2024-11-19",
        price: "501.85",
      },
      {
        date: "2024-11-18",
        price: "511.70",
      },
      {
        date: "2024-11-15",
        price: "508.00",
      },
      {
        date: "2024-11-14",
        price: "496.65",
      },
      {
        date: "2024-11-13",
        price: "501.45",
      },
      {
        date: "2024-11-12",
        price: "504.30",
      },
      {
        date: "2024-11-11",
        price: "513.50",
      },
      {
        date: "2024-11-08",
        price: "499.20",
      },
      {
        date: "2024-11-07",
        price: "499.10",
      },
      {
        date: "2024-11-06",
        price: "497.55",
      },
      {
        date: "2024-11-05",
        price: "494.45",
      },
      {
        date: "2024-11-02",
        price: "498.05",
      },
      {
        date: "2024-11-01",
        price: "499.55",
      },
      {
        date: "2024-10-31",
        price: "499.10",
      },
      {
        date: "2024-10-30",
        price: "504.00",
      },
      {
        date: "2024-10-29",
        price: "510.20",
      },
      {
        date: "2024-10-28",
        price: "507.65",
      },
      {
        date: "2024-10-25",
        price: "519.85",
      },
      {
        date: "2024-10-24",
        price: "530.95",
      },
      {
        date: "2024-10-23",
        price: "530.15",
      },
      {
        date: "2024-10-22",
        price: "538.70",
      },
      {
        date: "2024-10-21",
        price: "544.80",
      },
      {
        date: "2024-10-18",
        price: "537.50",
      },
      {
        date: "2024-10-17",
        price: "537.15",
      },
      {
        date: "2024-10-16",
        price: "548.45",
      },
      {
        date: "2024-10-15",
        price: "544.20",
      },
      {
        date: "2024-10-14",
        price: "540.90",
      },
      {
        date: "2024-10-11",
        price: "532.65",
      },
      {
        date: "2024-10-10",
        price: "527.30",
      },
      {
        date: "2024-10-09",
        price: "528.60",
      },
      {
        date: "2024-10-08",
        price: "533.00",
      },
      {
        date: "2024-10-07",
        price: "540.35",
      },
      {
        date: "2024-10-04",
        price: "542.00",
      },
      {
        date: "2024-10-03",
        price: "544.90",
      },
      {
        date: "2024-10-02",
        price: "539.30",
      },
      {
        date: "2024-10-01",
        price: "550.40",
      },
      {
        date: "2024-09-30",
        price: "561.35",
      },
      {
        date: "2024-09-27",
        price: "567.05",
      },
      {
        date: "2024-09-26",
        price: "552.05",
      },
      {
        date: "2024-09-25",
        price: "560.00",
      },
      {
        date: "2024-09-24",
        price: "574.40",
      },
      {
        date: "2024-09-23",
        price: "578.45",
      },
      {
        date: "2024-09-20",
        price: "576.45",
      },
      {
        date: "2024-09-19",
        price: "566.95",
      },
      {
        date: "2024-09-18",
        price: "556.50",
      },
      {
        date: "2024-09-17",
        price: "568.60",
      },
      {
        date: "2024-09-16",
        price: "554.50",
      },
      {
        date: "2024-09-13",
        price: "538.10",
      },
      {
        date: "2024-09-12",
        price: "533.25",
      },
      {
        date: "2024-09-11",
        price: "534.25",
      },
      {
        date: "2024-09-10",
        price: "540.80",
      },
      {
        date: "2024-09-09",
        price: "553.00",
      },
      {
        date: "2024-09-06",
        price: "538.05",
      },
      {
        date: "2024-09-05",
        price: "530.00",
      },
      {
        date: "2024-09-04",
        price: "542.55",
      },
      {
        date: "2024-09-03",
        price: "531.50",
      },
      {
        date: "2024-09-02",
        price: "511.95",
      },
      {
        date: "2024-08-30",
        price: "532.20",
      },
      {
        date: "2024-08-29",
        price: "547.80",
      },
      {
        date: "2024-08-28",
        price: "544.25",
      },
      {
        date: "2024-08-27",
        price: "540.95",
      },
      {
        date: "2024-08-26",
        price: "533.00",
      },
      {
        date: "2024-08-23",
        price: "525.50",
      },
      {
        date: "2024-08-22",
        price: "528.05",
      },
      {
        date: "2024-08-21",
        price: "529.00",
      },
      {
        date: "2024-08-20",
        price: "527.65",
      },
      {
        date: "2024-08-19",
        price: "531.70",
      },
      {
        date: "2024-08-16",
        price: "547.10",
      },
      {
        date: "2024-08-15",
        price: "548.40",
      },
      {
        date: "2024-08-14",
        price: "554.10",
      },
      {
        date: "2024-08-13",
        price: "560.20",
      },
      {
        date: "2024-08-12",
        price: "555.15",
      },
      {
        date: "2024-08-09",
        price: "555.75",
      },
      {
        date: "2024-08-08",
        price: "559.80",
      },
      {
        date: "2024-08-07",
        price: "564.80",
      },
      {
        date: "2024-08-06",
        price: "555.65",
      },
      {
        date: "2024-08-05",
        price: "549.80",
      },
      {
        date: "2024-08-02",
        price: "549.65",
      },
      {
        date: "2024-08-01",
        price: "559.50",
      },
      {
        date: "2024-07-31",
        price: "564.90",
      },
      {
        date: "2024-07-30",
        price: "545.00",
      },
      {
        date: "2024-07-29",
        price: "529.60",
      },
      {
        date: "2024-07-26",
        price: "535.40",
      },
      {
        date: "2024-07-25",
        price: "562.45",
      },
      {
        date: "2024-07-24",
        price: "559.70",
      },
      {
        date: "2024-07-23",
        price: "553.05",
      },
      {
        date: "2024-07-22",
        price: "558.05",
      },
      {
        date: "2024-07-19",
        price: "565.95",
      },
      {
        date: "2024-07-18",
        price: "558.30",
      },
      {
        date: "2024-07-17",
        price: "545.50",
      },
      {
        date: "2024-07-16",
        price: "542.60",
      },
      {
        date: "2024-07-15",
        price: "533.20",
      },
      {
        date: "2024-07-12",
        price: "540.55",
      },
      {
        date: "2024-07-11",
        price: "542.60",
      },
      {
        date: "2024-07-10",
        price: "514.90",
      },
      {
        date: "2024-07-09",
        price: "519.45",
      },
      {
        date: "2024-07-08",
        price: "542.85",
      },
      {
        date: "2024-07-05",
        price: "554.80",
      },
      {
        date: "2024-07-04",
        price: "561.80",
      },
      {
        date: "2024-07-03",
        price: "576.70",
      },
      {
        date: "2024-07-02",
        price: "584.85",
      },
      {
        date: "2024-07-01",
        price: "579.75",
      },
      {
        date: "2024-06-28",
        price: "582.20",
      },
      {
        date: "2024-06-27",
        price: "589.20",
      },
      {
        date: "2024-06-26",
        price: "594.65",
      },
      {
        date: "2024-06-24",
        price: "593.30",
      },
      {
        date: "2024-06-14",
        price: "627.75",
      },
      {
        date: "2024-06-13",
        price: "609.05",
      },
      {
        date: "2024-06-11",
        price: "596.45",
      },
      {
        date: "2024-06-10",
        price: "593.05",
      },
      {
        date: "2024-06-07",
        price: "605.70",
      },
      {
        date: "2024-06-06",
        price: "595.00",
      },
      {
        date: "2024-06-05",
        price: "592.10",
      },
      {
        date: "2024-06-04",
        price: "604.80",
      },
      {
        date: "2024-06-03",
        price: "577.95",
      },
      {
        date: "2024-05-31",
        price: "573.15",
      },
      {
        date: "2024-05-30",
        price: "588.90",
      },
      {
        date: "2024-05-29",
        price: "597.70",
      },
      {
        date: "2024-05-28",
        price: "598.95",
      },
      {
        date: "2024-05-27",
        price: "601.50",
      },
      {
        date: "2024-05-24",
        price: "612.00",
      },
      {
        date: "2024-05-23",
        price: "620.35",
      },
      {
        date: "2024-05-22",
        price: "625.00",
      },
    ],
  },
] */

/* console.log(monthData.map(item => {
  return {
    date: item.date,
    price: item.price
  }
})) */

/* const tickers = monthData.map((item) => item.ticker)
const pricetoNumber = monthData.map((item) => {
  return {
    ...item,
    value: item.value.map((val) => { */
/* const dateParts = val.date.split(".");
      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) - 1;
      const year = parseInt(dateParts[2]); */

/*       return {
        price: Number(val.price),
        date: val.date,
      }
    }),
  }
}) */

/* const mergeData = filteredData.map((item) => {
  const matchingMonthData = pricetoNumber.find(
    (monthItem) => monthItem.ticker === item.ticker
  )
  return {
    ...item,
    dates: matchingMonthData?.value || [],
  }
}) */
</script>
