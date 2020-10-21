<template>
  <div class="container" @touchmove.stop.prevent>
    <van-nav-bar title="刮刮卡" fixed left-arrow @click-left="$router.go(-1)" />

    <div class="canvas-wrapper">
      <img src="../assets/scratch-card.jpg" />
      <canvas class="canvas" ref="canvas" width="200" height="300" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 消除锯齿
    draw() {
      /** @type {HTMLCanvasElement} */
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      let flag = false;
      let x = 0;
      let y = 0;

      ctx.beginPath();
      ctx.fillStyle = "gray";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 30;

      canvas.ontouchstart = canvas.onmousedown = function(e) {
        flag = true;

        const rect = canvas.getBoundingClientRect();

        if (e.type === "touchstart") {
          x = e.changedTouches[0].clientX - rect.x;
          y = e.changedTouches[0].clientY - rect.y;
        } else if (e.type === "mousedown") {
          x = e.clientX - rect.x;
          y = e.clientY - rect.y;
        }

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.moveTo(x, y);
      };

      canvas.ontouchmove = canvas.onmousemove = function(e) {
        if (flag) {
          const rect = canvas.getBoundingClientRect();
          if (e.type === "touchmove") {
            x = e.changedTouches[0].clientX - rect.x;
            y = e.changedTouches[0].clientY - rect.y;
          } else if (e.type === "mousemove") {
            x = e.clientX - rect.x;
            y = e.clientY - rect.y;
          }

          ctx.lineTo(x, y);
          ctx.stroke();
        }
      };

      canvas.ontouchend = canvas.onmouseup = function() {
        flag = false;

        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data; // 获取每一个像素
        let area = 0;
        for (var i = 3, len = data.length; i < len; i += 4) {
          if (data[i] === 0) {
            area++;
          }
        }

        if (area >= canvas.width * canvas.height * 0.8) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };
    }
  },
  mounted() {
    this.draw();
  }
};
</script>

<style lang="less" scoped>
@import "../styles/vars.less";

.container {
  text-align: center;
  padding: 50px 0;

  .canvas-wrapper {
    position: relative;
    width: 200px;
    height: 300px;
    margin: auto;

    img {
      width: 100%;
      height: 100%;
    }
    .canvas {
      position: absolute;
      left: 0;
      top: 0;
    }
    border-radius: 4px;
    box-shadow: 0 0 5px 2px rgba(@primary-color, 0.1);
  }
}
</style>
