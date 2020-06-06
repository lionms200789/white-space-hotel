<template>
  <transition name="modal">
    <div class="cover" v-if="popup" @click.self="closePopUp">
      <div class="booking-dialog" v-if="popup">
        <span class="booking-title">預約時段</span>
        <div class="booking-form">
          <div class="booking-name">
            <label for="name">姓名</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="請輸入完整大名"
              required
              v-model="bookinfo.name"
            />
          </div>
          <div class="booking-tel">
            <label for="text">電話</label>
            <input
              type="text"
              name="phone"
              required
              id="tel"
              placeholder="0927001346"
              v-model.number="bookinfo.tel"
            />
          </div>
          <div class="booking-date">
            <label for="date">日期</label>
            <vc-date-picker
              mode="range"
              v-model="range"
              :min-date="calMinDate"
              style="flex:1 0 auto"
            >
              <input
                type="text"
                id="date"
                placeholder="選擇您的預約起訖"
                required
                slot-scope="{ inputProps, inputEvents }"
                v-bind="inputProps"
                v-on="inputEvents"
              />
            </vc-date-picker>
          </div>
        </div>
        <div class="count-day">
          <div class="normal-day flex-rsbc">
            <span>平日時段</span>
            <span>{{ countWeekdays.length }}夜</span>
          </div>
          <div class="holiday flex-rsbc">
            <span>假日時段</span>
            <span>{{ countHolidays.length }}夜</span>
          </div>
        </div>
        <p
          class="total"
        >NT. {{ (detail.normalDayPrice * countWeekdays.length) + (detail.holidayPrice * countHolidays.length) }}</p>
        <div class="booking-confirm flex-rsbc">
          <input type="button" class="cancel" value="取消" @click="closePopUp" />
          <input type="submit" class="confirm" value="確認預約" @click="booking" />
        </div>
      </div>
      <BookingResult :status="status" />
    </div>
  </transition>
</template>

<script>
import BookingResult from "./BookingResult";

export default {
  props: ["popup", "id", "detail"],
  components: {
    BookingResult
  },
  data() {
    return {
      bookinfo: {
        name: "",
        tel: "",
        date: []
      },
      range: {
        start: null,
        end: null
      },
      status: "預約中"
    };
  },
  computed: {
    countHolidays() {
      let holidays = this.bookinfo.date.filter(day => {
        const days = new Date(day).getDay();
        return days === 6 || days === 0 || days === 5;
      });
      return holidays;
    },
    countWeekdays() {
      let weekdays = this.bookinfo.date.filter(day => {
        const days = new Date(day).getDay();
        return days !== 6 && days !== 0 && days !== 5;
      });
      return weekdays;
    },
    calMinDate() {
      const date = new Date();
      date.setDate(date.getDay() + 1);
      return date;
    }
  },
  methods: {
    closePopUp() {
      this.$emit("popUpHandler");
    },
    booking() {
      if (this.bookinfo.name && this.bookinfo.tel && this.bookinfo.date) {
        this.$bus.$emit("popUpResultModal");
        this.$http
          .post(
            `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${this.id}`,
            this.bookinfo,
            {
              headers: {
                Authorization: process.env.VUE_APP_APITOKEN,
                accept: "application/json"
              }
            }
          )
          .then(response => {
            this.bookinfo = {
              date: [],
              name: "",
              tel: ""
            };
            this.status = "預約成功";
            this.range = {};
            this.$emit("updateRoom");
          })
          .catch(err => {
            this.status = "預約失敗";
          });
      } else {
        alert("請確認欄位皆填妥");
      }
    },
    convertMth(num) {
      return num < 10 ? `0${num}` : num;
    }
  },
  watch: {
    range: function() {
      this.bookinfo.date = [];
      if (this.range) {
        let start = this.range.start;
        let end = this.range.end;
        let current = new Date(start); //create new Date obj to avoid the call by ref and modify the user selected date.
        for (let i = current; i <= end; i.setDate(i.getDate() + 1)) {
          this.bookinfo.date.push(
            `${current.getFullYear()}-${this.convertMth(
              current.getMonth() + 1
            )}-${this.convertMth(current.getDate())}`
          );
        }
      }
    }
  }
};
</script>