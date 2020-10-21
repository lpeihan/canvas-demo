<template>
  <div class="container" @touchmove.stop.prevent>
    <van-nav-bar title="涂鸦" fixed left-arrow @click-left="$router.go(-1)" />

    <canvas class="canvas" ref="canvas" width="300" height="500" />
  </div>
</template>

<script>
export default {
  methods: {
    // 消除锯齿
    removeCanvasSawhooth(canvas, ctx) {
      let width = canvas.width;
      let height = canvas.height;
      if (window.devicePixelRatio) {
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.height = height * window.devicePixelRatio;
        canvas.width = width * window.devicePixelRatio;
      }

      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    },
    draw() {
      /** @type {HTMLCanvasElement} */
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      this.removeCanvasSawhooth(canvas, ctx);

      let flag = false;
      let x = 0;
      let y = 0;

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

        ctx.strokeStyle = "blue";
        ctx.lineCap = "round";
        ctx.lineWidth = 10;
        ctx.beginPath();
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
      };
    }
  },
  mounted() {
    this.draw();
  }
};
</script>

<style lang="less" scoped>
.container {
  text-align: center;
  padding: 50px 0;
  .canvas {
    border-radius: 4px;
    box-shadow: 0 0 5px 2px rgba(#ff7752, 0.1);
  }
}
</style>
