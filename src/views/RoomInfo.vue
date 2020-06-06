<template>
  <div>
    <transition name="fade">
      <div
        id="lightbox"
        class="flex-rsac"
        v-if="lightBoxControl"
        @click.self="lightBoxControl = !lightBoxControl"
      >
        <i class="fa fa-3x fa-chevron-left arrow" @click="indexControl(-1)"></i>
        <div class="lightbox-view flex-rcc">
          <img
            v-for="(url , i) in roomDetail.imageUrl"
            :src="url"
            :key="i"
            class="lightbox-img"
            :class="{'active': lightBoxIndex === i}"
          />
        </div>
        <i class="fa fa-3x fa-chevron-right arrow" @click="indexControl(+1)"></i>
      </div>
    </transition>
    <div class="room-gallery">
      <router-link :to="'/'">
        <img src="../assets/images/logo_block.svg" class="logo-block" />
      </router-link>
      <div
        class="room-left"
        :style="{ 'background-image' : `url(${roomDetail.imageUrl[0]})`}"
        @click="showLightBox(0)"
      ></div>
      <div class="room-right">
        <div
          :style="{'background-image' : `url(${roomDetail.imageUrl[1]})` }"
          @click="showLightBox(1)"
        ></div>
        <div
          :style="{'background-image' : `url(${roomDetail.imageUrl[2]})` }"
          @click="showLightBox(2)"
        ></div>
      </div>
    </div>

    <div class="room-container flex-rsbs">
      <div class="room-info">
        <h5 class="room-type">{{ roomDetail.name }}</h5>
        <p>房客人數限制: {{ roomDetail.descriptionShort.GuestMin }} ~ {{ roomDetail.descriptionShort.GuestMax }}人</p>
        <p v-if="roomDetail.descriptionShort.Bed">床型: {{ roomDetail.descriptionShort.Bed[0] }}</p>
        <p>衛浴數量: {{ roomDetail.descriptionShort['Private-Bath'] }}間</p>
        <p>房間大小: {{ roomDetail.descriptionShort.Footage }}平方公尺</p>
        <p class="description">{{ roomDetail.description }}</p>
        <div class="check-date flex-rsbc" v-if="roomDetail.checkInAndOut">
          <div class="check-in flex-ccl">
            <span>Check In</span>
            <span
              class="check-in-time"
            >{{ roomDetail.checkInAndOut.checkInEarly }} ~ {{ roomDetail.checkInAndOut.checkInLate }}</span>
          </div>
          <div class="check-out flex-ccl">
            <span>Check Out</span>
            <span class="check-out-time">{{ roomDetail.checkInAndOut.checkOut }}</span>
          </div>
        </div>
        <div class="room-amenities" v-if="roomDetail.amenities">
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Wi-Fi'] }">
            <img src="../assets/images/info_icon/wifi.svg" class="info-icon" />
            <span>Wi-Fi</span>
          </div>
          <div class="amenity">
            <img src="../assets/images/info_icon/phone.svg" class="info-icon" />
            <span>電話</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Great-View'] }">
            <img src="../assets/images/info_icon/mountain-range.svg" class="info-icon" />
            <span>漂亮的視野</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Breakfast'] }">
            <img src="../assets/images/info_icon/breakfast.svg" class="info-icon" />
            <span>早餐</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Air-Conditioner'] }">
            <img src="../assets/images/info_icon/breeze.svg" class="info-icon" />
            <span>空調</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Smoke-Free'] }">
            <img src="../assets/images/info_icon/no-smoke-symbol.svg" class="info-icon" />
            <span>禁止吸菸</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Refrigerator'] }">
            <img src="../assets/images/info_icon/bar.svg" class="info-icon" />
            <span>冰箱</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Mini-Bar'] }">
            <img src="../assets/images/info_icon/refrige.svg" class="info-icon" />
            <span>Mini Bar</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Child-Friendly'] }">
            <img src="../assets/images/info_icon/crawling-baby-silhouette.svg" class="info-icon" />
            <span>適合兒童</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Room-Service'] }">
            <img src="../assets/images/info_icon/room_service.svg" class="info-icon" />
            <span>Room Service</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Sofa'] }">
            <img src="../assets/images/info_icon/sofa.svg" class="info-icon" />
            <span>沙發</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Pet-Friendly'] }">
            <img src="../assets/images/info_icon/dog.svg" class="info-icon" />
            <span>攜帶寵物</span>
          </div>
        </div>
      </div>
      <div class="room-booking flex-rrs">
        <div class="room-price flex-ccr">
          <span>NT.{{ roomDetail.normalDayPrice }}</span>
          <span>平日(一~四)</span>
          <span>NT.{{ roomDetail.holidayPrice }}</span>
          <span>假日(五~日)</span>
        </div>
        <div class="date-wrapper">
          <DatePicker :reserved="booking" />
          <div class="button-group flex-rsac">
            <button class="reserve txt-c" @click="popup = true">預約時段</button>
            <button class="del-reserve txt-c" @click="delReservation">清除所有預約</button>
          </div>
        </div>
      </div>
    </div>
    <BookingDialog
      :popup="popup"
      :id="roomId"
      :detail="roomDetail"
      :reserved="booking"
      @popUpHandler="popup = false"
      @updateRoom="getRoomInfo"
    />
  </div>
</template>

<script>
import BookingDialog from "../components/BookingDialog";
import DatePicker from "../components/DatePicker";

export default {
  components: {
    BookingDialog,
    DatePicker
  },
  data() {
    return {
      roomId: "",
      roomDetail: {
        descriptionShort: {},
        imageUrl: []
      },
      booking: [],
      popup: false,
      lightBoxIndex: 0,
      lightBoxControl: false
    };
  },
  methods: {
    delReservation() {
      this.$http
        .delete(`https://challenge.thef2e.com/api/thef2e2019/stage6/rooms`, {
          headers: {
            Authorization: process.env.VUE_APP_APITOKEN,
            accept: "application/json"
          }
        })
        .then(response => {
          this.getRoomInfo();
          alert("已清除預約紀錄");
        });
    },
    getRoomInfo() {
      this.roomId = this.$route.params.id;
      this.$http
        .get(
          `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${this.roomId}`,
          {
            headers: {
              Authorization: process.env.VUE_APP_APITOKEN,
              accept: "application/json"
            }
          }
        )
        .then(response => {
          this.roomDetail = response.data.room[0];
          this.booking = response.data.booking;
        });
    },
    showLightBox(num) {
      this.lightBoxControl = true;
      this.lightBoxIndex = num;
    },
    indexControl(num) {
      this.lightBoxIndex += num;
      let len = this.roomDetail.imageUrl.length;
      if (this.lightBoxIndex > len - 1) {
        this.lightBoxIndex = 0;
      } else if (this.lightBoxIndex < 0) {
        this.lightBoxIndex = len - 1;
      }
    }
  },
  mounted() {
    this.getRoomInfo();
  }
};
</script>