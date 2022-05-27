<template>
  <div>
    <div class="mask"></div>
    <div class="signatureBox">
      <div v-el:canvashw class="canvasBox">
        <canvas
          v-el:canvasf
          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd"
          @mousedown="mouseDown"
          @mousemove="mouseMove"
          @mouseup="mouseUp"
        ></canvas>
      </div>
      <div class="signature-btn">
        <p class="btn cancel" type="info" @click="handleGoBack">返回</p>
        <p class="btn retry" type="info" @click="handleOverwrite">重签</p>
        <p class="btn submit" type="info" @click="handleSubmit">确认</p>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
export default {
  name: "Signature",
  data() {
    return {
      points: [],
      canvasTxt: null,
      stage_info: [],
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      isDown: false,
      strokeStyle: "#000",
      lineWidth: 2
    };
  },
  ready() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      let canvas = this.$els.canvasf;
      // 获取画布的高度
      canvas.height = this.$els.canvashw.offsetHeight - 20;
      // 获取画布的宽度
      canvas.width = this.$els.canvashw.offsetWidth - 20;
      // 创建 context 对象
      this.canvasTxt = canvas.getContext("2d");
      this.stage_info = canvas.getBoundingClientRect();
    },
    // 电脑设备事件
    mouseDown(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.isDown = true;
      }
    },
    // 移动设备事件
    touchStart(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stage_info.left,
          y: ev.targetTouches[0].clientY - this.stage_info.top
        };
        this.startX = obj.x;
        this.startY = obj.y;
        console.log(this.canvasTxt)
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
      }
    },
    // 电脑设备事件
    mouseMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.strokeStyle = this.strokeStyle;
        this.canvasTxt.lineWidth = this.lineWidth;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    // 移动设备事件
    touchMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stage_info.left,
          y: ev.targetTouches[0].clientY - this.stage_info.top
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        // 设置线条颜色
        this.canvasTxt.strokeStyle = this.strokeStyle;
        // 设置线条宽度
        this.canvasTxt.lineWidth = this.lineWidth;
        // 绘制开始路径
        this.canvasTxt.beginPath();
        // 定义线条开始坐标
        this.canvasTxt.moveTo(this.startX, this.startY);
        // 定义线条结束坐标
        this.canvasTxt.lineTo(obj.x, obj.y);
        // 绘制线条
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    // 电脑设备事件
    mouseUp(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.points.push({ x: -1, y: -1 });
        this.isDown = false;
      }
    },
    // 移动设备事件
    touchEnd(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stage_info.left,
          y: ev.targetTouches[0].clientY - this.stage_info.top
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.points.push({ x: -1, y: -1 });
      }
    },
    // 返回
    handleGoBack() {
      this.handleOverwrite();
      this.$emit("handlegoback");
    },
    // 重写
    handleOverwrite() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$els.canvasf.width,
        this.$els.canvasf.height
      );
      this.points = [];
    },
    // 提交
    handleSubmit() {
      if (this.points.length < 50) {
        return;
      }
      this.$emit("handlesubmit", this.$els.canvasf.toDataURL());
    }
  }
};
</script>

<style scoped>
.mask {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1;
}
.signatureBox {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 2;
}
  .canvasBox {
    padding: 10px;
    height: 100%;
    box-sizing: border-box;
  }
  .canvasBox canvas {
    border: 1px solid #f26226;
    width: 100%;
    height: 100%;
  }
  .signature-btn {
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    margin: 10px 0;
  }
  .signature-btn .btn i {
    font-style: normal;
    display: inline-block;
  }
  .signature-btn .btn {
    margin: 0 10px;
    padding: 0 10px;
    height: 40px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 6px 0px rgb(121 121 121 / 30%);
    flex: 1;
  }
  .signature-btn .btn.cancel {
    background: #f59269;
  }
  .signature-btn .btn.retry {
    background: #ff5f5f;
  }
  .signature-btn .btn.submit {
    background: #2bccbd;
  }
</style>