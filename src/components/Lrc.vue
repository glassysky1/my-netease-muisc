<template lang="html">
  <div class="lrcContainer">
    <div class="lrc" ref="lrc">
      {{ getAllKey }}
      <p class="lrc-p"
        :class="{active:parseInt(currentTime) >= keyArr[index] && parseInt(currentTime) < keyArr[index+1]}"
        v-for="(item,key,index) in lrcData" :key="index">
        {{ item }}{{ srcollLrc(key,index) }}
      </p>
    </div>
  </div>
</template>

<script>
import { getMusicLrc } from "../api/index";
import { mapGetters, mapState } from "vuex";
export default {
  name: "lrc",
  data() {
    return {
      lrc: {},
      lrcData: {},
      keyArr: [],
      musicLrc:''
    };
  },
  props: {
    currentTime: {
      type: [String, Number],
      default: 0
    },
    durationTime: {
      type: [String, Number],
      default: 0
    },
    songId: {
      type: [String, Number],
      default: 0
    }
  },
  watch: {},

  async mounted() {
    const id = this.songId;
    const { data: res } = await getMusicLrc(id)
    this.musicLrc = res.lrc?res.lrc.lyric:''
    this.$nextTick(()=>{

      var lyrics = this.musicLrc.split("\n");
      var lrcObj = {};
      for (var i = 0; i < lyrics.length; i++) {
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if (!timeRegExpArr) continue;
        var clause = lyric.replace(timeReg, "");
        for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
          var t = timeRegExpArr[k];
          var min = Number(String(t.match(/\[\d*/i)).slice(1)),
            sec = Number(String(t.match(/\:\d*/i)).slice(1));
          var time = min * 60 + sec;
          lrcObj[time] = clause;
        }
      }
      this.lrcData = lrcObj;
      console.log(this.lrcData);
      
    })
  },
  computed: {
    getAllKey() {
      for (var i in this.lrcData) {
        this.keyArr.push(i);
      }
    }
    // ...mapGetters(['musicLrc'])
  },
  methods: {
    srcollLrc(key, index) {
      const lrcDiv = this.$refs.lrc;
      if (
        key < this.currentTime &&
        key > this.currentTime - (this.keyArr[index + 1] - this.keyArr[index])
      ) {
        lrcDiv.style.top = -((index - 2) * 30) + "px";
      }
    }
  }
};
</script>

<style scoped>
.lrcContainer {
  width: 90%;
  height: 70%;
  overflow: hidden;
  position: relative;
  text-align: center;
}

.lrc {
  width: 100%;
  position: absolute;
  top: 0;
}

.active {
  color: #fefefe !important;
}

.lrc-p {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 700;
}

.up30 {
  margin-top: -30px;
}
</style>