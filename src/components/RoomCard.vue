<template>
  <div class="rooms">
    <ul class="card-container flex-rcc">
      <li class="card-item" v-for="room in rooms" :key="room.id">
        <a href="javascript:;" class="card-link" @click.prevent="checkRoomDetail(room.id)">
          <img :src="room.imageUrl" class="room-img" />
          <div class="room-description flex-ccl">
            <div class="room-name">
              <p>{{ room.name }}</p>
            </div>
            <div class="room-cost flex-rsbc">
              <p>
                NT.{{ room.normalDayPrice }}
                <span>平日</span>
              </p>
              <span>NT.{{ room.holidayPrice }} 假日</span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["rooms"],
  methods: {
    checkRoomDetail(id) {
      this.$router.push(`roominfo/${id}`);
    }
  }
};
</script>