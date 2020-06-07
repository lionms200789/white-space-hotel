<template>
  <div class="date-picker">
    <div class="date-header flex-rsbc">
      <a href="#" @click.prevent="adjustMonth(-1)">
        <i class="fa fa-chevron-left"></i>
      </a>
      <div class="date-title">{{ calendar.year }} / {{ calendar.month + 1 }}月</div>
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