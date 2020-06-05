<template>
  <div class="date-picker">
    <div class="date-header flex-rsbc">
      <a href="#" @click.prevent="adjustMonth(-1)">
        <i class="fa fa-chevron-left"></i>
      </a>
      <h1>{{ calendar.year }} / {{ calendar.month + 1 }}月</h1>
      <a href="#" @click.prevent="adjustMonth(1)">
        <i class="fa fa-chevron-right"></i>
      </a>
    </div>
    <div class="date-body">
      <div class="weekday flex-rsbc txt-c">
        <div>日</div>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
      </div>
      <div class="week flex-rsbc" v-for="w in 5" :key="w">
        <div
          class="dates txt-c"
          v-for="d in 7"
          :key="d"
          :class="[disableOtherMth(getCalendarMth(w,d)),checkReserved(getCalendarMth(w,d))]"
        >{{ showCalendarDates[ (w - 1) * 7 + (d - 1) ].date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["reserved"],
  data() {
    return {
      today: {
        year: "",
        month: "",
        date: "",
        day: ""
      },
      calendar: {
        year: "",
        month: "",
        date: "",
        day: ""
      }
    };
  },
  methods: {
    getCurrentDate() {
      let date = new Date();

      this.today.year = date.getFullYear();
      this.today.month = date.getMonth();
      this.today.date = date.getDate();
      this.today.day = date.getDay();

      this.calendar.year = date.getFullYear();
      this.calendar.month = date.getMonth();
      this.calendar.date = date.getDate();
      this.calendar.day = date.getDay();
    },
    adjustMonth(n) {
      this.calendar.month += n;
      if (this.calendar.month < 0) {
        this.calendar.month = 11;
        this.calendar.year += n;
      } else if (this.calendar.month > 11) {
        this.calendar.month = 0;
        this.calendar.year += n;
      }
    },
    getCalendarMth(w, d) {
      return this.showCalendarDates[(w - 1) * 7 + (d - 1)];
    },
    disableOtherMth(time) {
      return {
        disOtherMth: time.month !== this.calendar.month
      };
    },
    checkReserved(time) {
      return {
        booked: this.reserved.some(val => {
          return val.date === this.formatDate(time);
        })
      };
    },
    formatDate(time) {
      let year = time.year;
      let month = time.month < 10 ? `0${time.month + 1}` : time.month + 1;
      let date = time.date < 10 ? `0${time.date}` : time.date;
      return `${year}-${month}-${date}`;
    }
  },
  computed: {
    firstDateOfPane() {
      const d = new Date(this.calendar.year, this.calendar.month, 1).getDay();
      //取得該月的一號為星期幾之後,並用該月一號再減掉自己的星期,來推算星期天的日期為幾號。
      const date = new Date(this.calendar.year, this.calendar.month, 1 - d);
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        day: date.getDay()
      };
    },
    showCalendarDates() {
      let Datearr = [];
      let date;
      for (let i = 0; i < 35; i++) {
        date = new Date(
          this.firstDateOfPane.year,
          this.firstDateOfPane.month,
          this.firstDateOfPane.date + i
        );
        let d = {
          year: date.getFullYear(),
          month: date.getMonth(),
          date: date.getDate(),
          day: date.getDay()
        };
        Datearr.push(d);
      }
      return Datearr;
    }
  },
  mounted() {
    this.getCurrentDate();
  }
};
</script>

<style lang="scss" scoped>
.date-picker {
  padding: 20px;
  background-color: #f7f7f7;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  margin-bottom: 30px;
  .date-header {
    text-align: center;
    margin-bottom: 20px;
    h1 {
      font-weight: 500;
      font-size: 18px;
      letter-spacing: 1.8px;
      flex: 1 1 auto;
    }
    a {
      color: #575757;
      padding: 5px 10px;
      display: block;
      flex: 1 1 0;
      transition: all 0.3s ease-in-out;
      &:hover {
        transform: scale(1.5);
      }
    }
  }
  .date-body {
    padding: 0 10px;
    .weekday {
      color: #6d7278;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 30px;
      & > div {
        flex: 1 1 0;
      }
    }
    .week {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      .dates {
        flex: 1 1 0;
        padding: 10px;
        font-weight: 600;
        margin-right: 1px;
      }
    }
  }
}
.disOtherMth {
  color: #c9ccd0;
}
.booked {
  border-radius: 50%;
  background-color: #575757;
  color: #ffffff;
}
</style>