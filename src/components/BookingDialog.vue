<template>
  <transition name="modal">
    <div class="cover" v-if="popup" @click.self="closePopUp">
      <div class="booking-dialog" v-if="popup">
        <span class="booking-title">預約時段</span>
        <div class="booking-form">
          <div class="booking-name">
            <label for="name">姓名</label>
            <input type="text" id="name" v-model="bookinfo.name" />
          </div>
          <div class="booking-tel">
            <label for="text">電話</label>
            <input type="number" id="tel" v-model="bookinfo.tel" />
          </div>
          <div class="booking-date">
            <label for="date" style="width:30px">預約起迄</label>
            <vc-date-picker
              mode="range"
              v-model="range"
              :min-date="new Date()"
              style="flex:1 1 auto;"
            >
              <input
                type="text"
                id="date"
                class="input-picker"
                style="width:100%"
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
          <button class="cancel" @click="closePopUp()">取消</button>
          <button class="confirm" @click="booking">確認預約</button>
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
    }
  },
  methods: {
    closePopUp() {
      this.$emit("popUpHandler");
    },
    booking() {
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

<style lang="scss" scoped>
.cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(30, 30, 30, 0.35);
  opacity: 1;
  z-index: 15;
}
.booking-dialog {
  width: 100%;
  max-width: 370px;
  height: 470px;
  background: #fff;
  opacity: 1;
  position: absolute;
  z-index: 20;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .booking-title {
    font-size: 24px;
    display: block;
    padding: 2.5rem 2.5rem 0;
  }
  .booking-form {
    padding: 2.5rem 2.5rem 0;
    .booking-name,
    .booking-tel,
    .booking-date {
      padding-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > input,
      .input-picker {
        padding: 7px;
        flex: 1 1 auto;
        border: 1px solid #cbd5e0;
        border-radius: 4px;
        outline: 0;
      }
      & > label {
        flex: 1 1 auto;
      }
    }
  }
  .count-day {
    padding: 1rem 2.5rem;
    background-color: #ededed;
    .normal-day {
      padding-bottom: 10px;
    }
    .normal-day,
    .holiday {
      color: #6d7278;
      font-size: 13px;
    }
  }
  .total {
    text-align: right;
    padding: 1.5rem 2.5rem 0;
    font-size: 24px;
    color: #ff5c5c;
  }
  .booking-confirm {
    padding: 1.5rem 2.5rem 0;
    .cancel,
    .confirm {
      padding: 10px 15px;
      border: none;
      outline: 0;
      cursor: pointer;
    }
    .cancel {
      background-color: #d8d8d8;
      color: #484848;
    }
    .confirm {
      background-color: #484848;
      color: #d8d8d8;
    }
  }
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>