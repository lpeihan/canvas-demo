<template>
  <div class="container">
    <van-nav-bar title="贪吃蛇" fixed left-arrow @click-left="$router.go(-1)" />

    <canvas class="canvas" ref="canvas" width="600" height="500" />
  </div>
</template>

<script>
export default {
  methods: {
    draw() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      const UNIT = 20;
      const DIRECTION = {
        TOP: 1,
        RIGHT: 2,
        BOTTOM: 3,
        LEFT: 4
      };

      class Rect {
        constructor(x, y, width, height, color) {
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          this.color = color;
        }

        draw() {
          ctx.beginPath();
          ctx.fillStyle = this.color;
          ctx.strokeStyle = "#ff7752";
          ctx.fillRect(this.x, this.y, this.width, this.height);
          ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
      }

      class Snake {
        constructor() {
          this.head = new Rect(
            canvas.width / 2,
            canvas.height / 2 - 10,
            UNIT,
            UNIT,
            "#ff7752"
          );
          this.addEventLisner();

          this.timer = null;
          this.body = [];
          this.direction = DIRECTION.RIGHT;

          let x = this.head.x - UNIT;
          let y = this.head.y;
          for (let i = 0; i < 3; i++) {
            this.body.push(new Rect(x, y, UNIT, UNIT, "#fff6f0"));
            x = x - UNIT;
          }
          this.food = this.getFood();
        }

        static hasEatFood = false;

        addEventLisner() {
          document.onkeydown = e => {
            switch (e.keyCode) {
              case 37: {
                this.direction = DIRECTION.LEFT;
                break;
              }
              case 38: {
                this.direction = DIRECTION.TOP;
                break;
              }
              case 39: {
                this.direction = DIRECTION.RIGHT;
                break;
              }
              case 40: {
                this.direction = DIRECTION.BOTTOM;
                break;
              }
            }
          };
        }

        draw() {
          this.head.draw();

          for (const rect of this.body) {
            rect.draw();
          }

          this.food.draw();
        }

        _getRandom(min, max) {
          return Math.round(Math.random() * (max - min)) + min;
        }

        isRectInSnake(rect) {
          if (rect.x === this.head.x && rect.y === this.head.y) {
            return true;
          }

          for (const body of this.body) {
            if (body.x === this.head.x && body.y === this.head.y) {
              return true;
            }
          }
        }

        getFood() {
          let flag = true;
          while (flag) {
            let x = this._getRandom(0, (canvas.width - UNIT) / UNIT) * UNIT;
            let y = this._getRandom(0, (canvas.height - UNIT) / UNIT) * UNIT;

            const rect = new Rect(x, y, UNIT, UNIT, "green");

            if (!this.isRectInSnake(rect)) {
              return rect;
            }
          }
        }

        isHitWall() {
          const ret =
            this.head.x + UNIT > canvas.width ||
            this.head.x < 0 ||
            this.head.y < 0 ||
            this.head.y + UNIT > canvas.height;

          console.log("isHitWall", ret);
          return ret;
        }

        isHitSelf() {
          for (const rect of this.body) {
            if (rect.x === this.head.x && rect.y === this.head.y) {
              console.log("isHitSelf");
              return true;
            }
          }
        }

        move() {
          const rect = new Rect(
            this.head.x,
            this.head.y,
            this.head.width,
            this.head.height,
            "#fff6f0"
          );

          this.body.unshift(rect);

          if (Snake.hasEatFood === false) {
            this.body.pop();
          }

          switch (this.direction) {
            case DIRECTION.TOP:
              this.head.y -= this.head.height;
              break;

            case DIRECTION.RIGHT:
              this.head.x += this.head.width;
              break;

            case DIRECTION.BOTTOM:
              this.head.y += this.head.height;
              break;

            case DIRECTION.LEFT:
              this.head.x -= this.head.width;
              break;
            default:
              console.log("default");
          }

          if (this.isHitWall() || this.isHitSelf()) {
            clearInterval(this.timer);
            alert("game over");
            return;
          }

          this.draw();

          if (this.food.x === this.head.x && this.food.y === this.food.y) {
            Snake.hasEatFood = true;
            this.food = this.getFood();
          } else {
            Snake.hasEatFood = false;
          }
        }

        start() {
          this.draw();
          this.timer = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.move();
          }, 250);
        }
      }

      const snake = new Snake();
      snake.start();
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
  .canvas {
    border-radius: 4px;
    box-shadow: 0 0 5px 2px rgba(@primary-color, 0.2);
  }
}
</style>
