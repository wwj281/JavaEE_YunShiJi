<template>
  <div class="my-body">
    <div class="top-nav">
      <el-row
          style="
          position: fixed;
          top: 0px;
          background-color: white;
          overflow: hidden;
          width: 1520px;
          z-index: 20 !important;
        "
      >
        <el-col :span="2"><h2>LOGO</h2></el-col>
        <el-col :span="4" :offset="2"><h2>考卷二</h2></el-col>
        <el-col :span="2" :offset="12">
          <div style="line-height: 60px">
            <el-button plain type="primary">退出考试</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--  左侧答题卡导航栏  -->
    <el-card class="left-nav">
      <div id="no-use">
        <el-card style="position: fixed;top: 610px;height: 60px;width: 240px;left:80px">
          <div class="left">
            <ul class="l-top">
              <li>
                <a href="javascript:;"></a>
                <span>未答</span>
              </li>
              <li>
                <a href="javascript:;"></a>
                <span>已答</span>
              </li>
              <li>
                <a href="javascript:;"></a>
                <span>标记</span>
              </li>
            </ul>
          </div>
        </el-card>
      </div>
      <div class="nav-title">
        <div class="nav-title-div"></div>
        <span>答题卡</span>
      </div>

      <div class="l-bottom">
        <div class="item">
          <div class="my-item">
            <h4>单选题</h4>
            <ul>
              <li v-for="indexA in choiceLength" :key="indexA" class="tag-li">
                <a
                    :href="'#my-index' + (indexA - 1)"
                    :class="{ bg: written[indexA - 1] === true }"
                >
                  <span :class="{ mark: tag[indexA - 1] }"></span>
                  {{ indexA }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="item">
          <div class="my-item">
            <h4>填空题</h4>
            <ul>
              <li v-for="indexA in fillLength" :key="indexA" class="tag-li">
                <a
                    :href="'#my-index' + (indexA - 1 + choiceLength)"
                    :class="{ bg: written[indexA - 1 + choiceLength] === true }"
                >
                  <span
                      :class="{ mark: tag[indexA - 1 + choiceLength] }"
                  ></span>
                  {{ indexA + choiceLength }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="item">
          <div class="my-item">
            <h4>判断题</h4>
            <ul>
              <li v-for="indexA in judgeLength" :key="indexA" class="tag-li">
                <a
                    :href="'#my-index' + (indexA - 1 + fillLength + choiceLength)"
                    :class="{
                    bg:
                      written[indexA - 1 + fillLength + choiceLength] === true,
                  }"
                >
                  <span
                      :class="{
                      mark: tag[indexA - 1 + fillLength + choiceLength],
                    }"
                  ></span>
                  {{ indexA + fillLength + choiceLength }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 答题区域   -->
    <el-card shadow="never" class="main">
      <transition name="slider-fade">
        <div class="right">
          <!--   选择题   -->
          <div class="myChoice" style="font-weight: bolder">单选题</div>
          <div v-for="(item, indexA) in problem.choiceProblem" :key="indexA">
            <div class="content">
              <!--    标题    -->
              <p class="topic" :id="'my-index' + indexA">
                <span class="number">{{ indexA + 1 }}</span
                >{{ item.title }}
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="标记"
                    placement="top"
                    style="float: right"
                >
                  <el-button
                      size="medium"
                      type="text"
                      icon="el-icon-s-flag"
                      @click="setSign(indexA)"
                  ></el-button>
                </el-tooltip>
              </p>

              <!--    选项    -->
              <div>
                <el-radio-group
                    v-model="choiceAnswer[indexA]"
                    @change="setWritten(choiceAnswer[indexA], indexA)"
                >
                  <el-radio :label="1">{{ item.answer[0] }}</el-radio>
                  <el-radio :label="2">{{ item.answer[1] }}</el-radio>
                  <el-radio :label="3">{{ item.answer[2] }}</el-radio>
                  <el-radio :label="4">{{ item.answer[3] }}</el-radio>
                </el-radio-group>
              </div>

              <!--    正确答案及解析    -->
              <div class="analysis" v-if="true">
                <ul>
                  <li style="text-align: left">
                    <el-tag type="success">正确姿势：</el-tag>
                    <span class="right">{{ item.correctAnswer }}</span>
                  </li>
                  <li>
                    <el-tag>题目解析：</el-tag>
                  </li>
                  <li>
                    {{ item.analysis == null ? "暂无解析" : item.analysis }}
                  </li>
                </ul>
              </div>
              <el-divider></el-divider>
            </div>
          </div>

          <!--   填空题   -->
          <div class="myChoice" style="font-weight: bolder">填空题</div>
          <div class="content">
            <!--    答题区域    -->
            <!--    标题    -->

            <div v-for="(item, indexB) in problem.fillProblem" :key="indexB">
              <p class="topic" :id="'my-index' + (indexB + choiceLength)">
                <span class="number">{{ indexB + choiceLength + 1 }}</span
                >{{ item.title }}
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="标记"
                    placement="top"
                    style="float: right"
                >
                  <el-button
                      size="medium"
                      type="text"
                      icon="el-icon-s-flag"
                      @click="setSign(indexB + choiceLength)"
                  ></el-button>
                </el-tooltip>
              </p>
              <div class="fill">
                <div
                    v-for="indexInner in item.spaceNumber"
                    :key="indexInner"
                    style="margin-bottom: 20px"
                >
                  <span class="my-input">{{ indexInner }}</span>
                  <div style="display: inline-block">
                    <el-input
                        v-model="fillAnswer[indexB][indexInner - 1]"
                        placeholder="请填在此处"
                        clearable
                        @blur="
                        setWritten(
                          fillAnswer[indexB][indexInner - 1],
                          indexB + choiceLength
                        )
                      "
                    ></el-input>
                  </div>
                </div>
              </div>

              <!--    正确答案及解析    -->
              <div class="analysis" v-if="false">
                <ul>
                  <li>
                    <el-tag type="success">正确姿势：</el-tag>
                    <span class="right">{{ item.correctAnswer }}</span>
                  </li>
                  <li>
                    <el-tag>题目解析：</el-tag>
                  </li>
                  <li>
                    {{ item.analysis == null ? "暂无解析" : item.analysis }}
                  </li>
                </ul>
              </div>
              <el-divider></el-divider>
            </div>
          </div>

          <!--   判断题   -->
          <div class="myChoice" style="font-weight: bolder">判断题</div>
          <div class="content">
            <!--    标题    -->

            <div v-for="(item, indexC) in problem.judgeProblem" :key="indexC">
              <p
                  class="topic"
                  :id="'my-index' + (indexC + choiceLength + fillLength)"
              >
                <span class="number">{{
                    indexC + choiceLength + fillLength + 1
                  }}</span
                >{{ item.title }}
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="标记"
                    placement="top"
                    style="float: right"
                >
                  <el-button
                      size="medium"
                      type="text"
                      icon="el-icon-s-flag"
                      @click="setSign(indexC + choiceLength + fillLength)"
                  ></el-button>
                </el-tooltip>
              </p>

              <!--    选项    -->
              <div class="judge">
                <el-radio-group
                    v-model="judgeAnswer[indexC]"
                    @change="
                    setWritten(
                      judgeAnswer[indexC],
                      indexC + choiceLength + fillLength
                    )
                  "
                >
                  <el-radio :label="1">正确</el-radio>
                  <el-radio :label="2">错误</el-radio>
                </el-radio-group>
              </div>

              <!--    正确答案及解析    -->
              <div class="analysis" v-if="false">
                <ul>
                  <li>
                    <el-tag type="success">正确姿势：</el-tag>
                    <span class="right">{{ item.correctAnswer }}</span>
                  </li>
                  <li>
                    <el-tag>题目解析：</el-tag>
                  </li>
                  <li>
                    {{ item.analysis == null ? "暂无解析" : item.analysis }}
                  </li>
                </ul>
              </div>
              <el-divider></el-divider>
            </div>
          </div>
        </div>
      </transition>
    </el-card>

    <!--  右侧提示区  -->
    <el-card class="right-nav">
      <el-row>
        <div>剩余时间</div>
        <div
            style="
            border-bottom: 1px rgb(222, 222, 222) solid;
            margin-bottom: 5px;
            padding-bottom: 15px;
          "
        >
          <div class="my-timer">{{ h + ":" + m + ":" + s }}</div>
        </div>
      </el-row>
      <el-row>
        <div>当前进度</div>
        <div
            style="
            border-bottom: 1px rgb(222, 222, 222) solid;
            margin-bottom: 5px;
            padding-bottom: 15px;
          "
        >
          <div class="my-progress">{{ finished + " / " + allLength }}</div>
          <el-progress
              :show-text="false"
              :percentage="(finished / allLength) * 100"
          ></el-progress>
        </div>
      </el-row>
    </el-card>

    <div class="my-button">
      <el-button type="primary">提交试卷</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "answer",
  data() {
    return {
      problem: {
        choiceProblem: [
          {
            problemID: "1",
            title: "选择题1",
            answer: ["答案A", "答案B", "答案C", "答案D"],
            correctAnswer: 0,
            score: 5,
            analysis: "本题解析",
          },
          {
            problemID: "2",
            title: "选择题1",
            answer: ["答案A", "答案B", "答案C", "答案D"],
            correctAnswer: 0,
            score: 5,
            analysis: "本题解析",
          },
          {
            problemID: "1",
            title: "选择题1",
            answer: ["答案A", "答案B", "答案C", "答案D"],
            correctAnswer: 0,
            score: 5,
            analysis: "本题解析",
          },
          {
            problemID: "1",
            title: "选择题1",
            answer: ["答案A", "答案B", "答案C", "答案D"],
            correctAnswer: 0,
            score: 5,
            analysis: "本题解析",
          },
        ],
        fillProblem: [
          {
            problemID: "1",
            title: "填空题1",
            spaceNumber: 3,
            correctAnswer: ["正确答案一", "正确答案二", "正确答案三"],
            score: 5,
            analysis: "本题解析",
          },
          {
            problemID: "2",
            title: "填空题1",
            spaceNumber: 3,
            correctAnswer: ["正确答案一", "正确答案二", "正确答案三"],
            score: 5,
            analysis: "本题解析",
          },
          {
            problemID: "3",
            title: "填空题1",
            spaceNumber: 3,
            correctAnswer: ["正确答案一", "正确答案二", "正确答案三"],
            score: 5,
            analysis: "本题解析",
          },
          {
            problemID: "3",
            title: "填空题1",
            spaceNumber: 3,
            correctAnswer: ["正确答案一", "正确答案二", "正确答案三"],
            score: 5,
            analysis: "本题解析",
          },
          {
            problemID: "3",
            title: "填空题1",
            spaceNumber: 3,
            correctAnswer: ["正确答案一", "正确答案二", "正确答案三"],
            score: 5,
            analysis: "本题解析",
          },
        ],
        judgeProblem: [
          {
            problemID: "1",
            title: "判断题1",
            spaceNumber: 3,
            correctAnswer: 1,
            score: 5,
            analysis: "本题解析",
          },
          {
            problemID: "1",
            title: "判断题1",
            spaceNumber: 3,
            correctAnswer: 1,
            score: 5,
            analysis: "本题解析",
          },
          {
            problemID: "1",
            title: "判断题1",
            spaceNumber: 3,
            correctAnswer: 1,
            score: 5,
            analysis: "本题解析",
          },
          {
            problemID: "1",
            title: "判断题1",
            spaceNumber: 3,
            correctAnswer: 1,
            score: 5,
            analysis: "本题解析",
          },
          {
            problemID: "1",
            title: "判断题1",
            spaceNumber: 3,
            correctAnswer: 1,
            score: 5,
            analysis: "本题解析",
          },
          {
            problemID: "1",
            title: "判断题1",
            spaceNumber: 3,
            correctAnswer: 1,
            score: 5,
            analysis: "本题解析",
          },
          {
            problemID: "1",
            title: "判断题1",
            spaceNumber: 3,
            correctAnswer: 1,
            score: 5,
            analysis: "本题解析",
          }
        ],
      },
      answer: [],
      allLength: 0,
      choiceAnswer: [],
      fillAnswer: [],
      judgeAnswer: [],
      choiceLength: 0,
      fillLength: 0,
      judgeLength: 0,
      tag: [],
      written: [],
      finished: 0,
      h: 0,
      m: 0,
      s: 0,
    };
  },
  methods: {
    setWritten(val, index) {
      if (val) {
        if (this.finished < this.allLength && !this.written[index]) {
          this.finished++;
        }
        this.written[index] = true;
        this.$forceUpdate();
      }
    },
    setSign(index) {
      this.tag[index] = this.tag[index] !== true;
      this.$forceUpdate();
    },
    countTime() {
      //获取当前时间
      let date = new Date();
      let now = date.getTime();
      //设置截止时间
      let endDate = new Date("2021-12-8 23:23:23");
      let end = endDate.getTime();
      //时间差
      let leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.m = Math.floor((leftTime / 1000 / 60) % 60);
        this.s = Math.floor((leftTime / 1000) % 60);
      }
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(this.countTime, 1000);
    },
  },
  created() {
    this.countTime();
    this.choiceLength = this.problem.choiceProblem.length;
    this.fillLength = this.problem.fillProblem.length;
    this.judgeLength = this.problem.judgeProblem.length;
    this.allLength = this.choiceLength + this.fillLength + this.judgeLength;
    for (let i = 0; i < this.fillLength; i++) {
      let child = [null, null, null];
      this.fillAnswer.push(child);
    }
  },
};
</script>

<style lang="scss">
.fill input.el-input__inner {
  border-radius: 0 4px 4px 0;
}

.left-nav {
  #no-use{
    .el-card__body {
      padding: 5px 5px 5px 0;
    }
  }
}
</style>
<style lang="scss" scoped>
.left-nav {
  padding-top: 20px;
  position: fixed;
  left: 80px;
  top: 90px;
  width: 240px;
  height: 560px;
  text-align: left;
}

.main {
  z-index: 10 !important;
  text-align: left;
  position: relative;
  top: 90px;
  left: 350px;
  width: 940px;
}

.right-nav {
  position: fixed;
  right: 70px;
  top: 90px;
  width: 120px;
  height: 200px;
}

.iconfont.icon-time {
  color: #2776df;
  margin: 0px 6px 0px 20px;
}

.analysis {
  margin-top: 20px;

  .right {
    color: #2776df;
    font-size: 18px;
    border: 1px solid #2776df;
    padding: 0px 6px;
    border-radius: 4px;
    margin-left: 20px;
  }

  ul li:nth-child(2) {
    margin: 20px 0px;
  }

  ul li:nth-child(3) {
    padding: 10px;
    background-color: #d3c6c9;
    border-radius: 4px;
  }
}

.my-item {
  border-bottom: 1px rgb(230, 230, 230) solid;
  padding-bottom: 5px;
}

.analysis span:nth-child(1) {
  font-size: 18px;
}

.mark {
  position: absolute;
  width: 4px;
  height: 4px;
  content: "";
  background-color: red;
  border-radius: 50%;
  top: 0px;
  left: 22px;
}

.border {
  position: relative;
  border: 1px solid #ff90aa !important;
}

.bg {
  color: white !important;
  background-color: rgb(26, 140, 254) !important;
}

.fill .el-input {
  display: inline-flex;
  width: 805px;

  .el-input__inner {
    border: none;
    padding-left: 20px;
  }
}

/* slider过渡效果 */
.slider-fade-enter-active {
  transition: all 0.3s ease;
}

.slider-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slider-fade-enter,
.slider-fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}

.operation .end li:nth-child(2) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(39, 118, 223);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: #fff;
}

.operation .end li {
  cursor: pointer;
  margin: 0 100px;
}

.operation {
  background-color: #fff;
  border-radius: 4px;
  padding: 10px 0px;
  margin-right: 10px;
}

.operation .end {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(39, 118, 223);
}

.content .number {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: rgb(39, 118, 223);
  border-radius: 4px;
  margin-right: 4px;
}

.content {
  padding: 0px 20px;
}

.content .topic {
  padding: 15px 0px 20px;
}

.right .content {
  background-color: #fff;
  margin: 10px 10px 10px 0px;
}

.content .el-radio-group label {
  color: #000;
  margin: 10px 0px;
}

.content .el-radio-group {
  display: flex;
  flex-direction: column;
}

.right .title p {
  margin-left: 20px;
}

.flexarea {
  display: flex;
}

.flexarea .right {
  flex: 1;
}

.auto-right {
  margin-left: auto;
  color: #2776df;
  margin-right: 10px;
}

.right .title {
  margin-right: 10px;
  padding-right: 30px;
  display: flex;
  margin-top: 10px;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
}

.clearfix {
  clear: both;
}

.l-bottom .final {
  cursor: pointer;
  display: inline-block;
  text-align: center;
  background-color: rgb(39, 118, 223);
  width: 240px;
  border-radius: 4px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  margin: 22px 0px 20px 10px;
}

#answer .left .item {
  padding: 0px;
  font-size: 16px;
}

.l-bottom {
  border-radius: 4px;
  background-color: #fff;
}

.l-bottom .item p {
  margin-bottom: 15px;
  margin-top: 10px;
  color: #000;
  margin-left: 10px;
  letter-spacing: 2px;
}

.l-bottom .item li {
  width: 15%;
  margin-left: 8px;
  margin-bottom: 10px;
}

.l-bottom .item {
  display: flex;
  flex-direction: column;
}

.l-bottom .item ul {
  width: 100%;
  margin-bottom: -8px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.l-bottom .item ul li a {
  position: relative;
  justify-content: center;
  display: inline-flex;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #eee;
  text-align: center;
  color: #000;
  font-size: 16px;
}

.left .l-top {
  display: flex;
  justify-content: space-around;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #fff;
}

.left {
  width: 100%;
  height: 100%;
  margin-top: 7px;
}

.left .l-top li:nth-child(1) a {
  border: 1px solid #eee;
}

.left .l-top li:nth-child(2) a {
  background-color: rgb(26, 140, 254);
  border: none;
}

.left .l-top li:nth-child(3) a {
  position: relative;
  border: 1px solid #eee;
}

.left .l-top li:nth-child(3) a::before {
  width: 4px;
  height: 4px;
  content: " ";
  position: absolute;
  background-color: red;
  border-radius: 50%;
  top: 0px;
  left: 16px;
}

.left .l-top li {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.left .l-top li a {
  display: inline-block;
  padding: 10px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #ff90aa;
}

#answer .top {
  background-color: rgb(39, 118, 223);
}

#answer .item {
  color: #fff;
  display: flex;
  padding: 20px;
  font-size: 20px;
}

#answer .top .item li:nth-child(1) {
  margin-right: 10px;
}

#answer .top .item li:nth-child(3) {
  position: relative;
  margin-left: auto;
}

#answer {
  padding-bottom: 30px;
}

.icon20 {
  font-size: 20px;
  font-weight: bold;
}

.item .msg {
  padding: 10px 15px;
  border-radius: 4px;
  top: 47px;
  right: -30px;
  color: #6c757d;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background-color: #fff;
}

.item .msg p {
  font-size: 16px;
  width: 200px;
  text-align: left;
}

.right .myChoice {
  font-size: 18px;
  line-height: 25px;
  padding: 18px 20px;
  background: #fafafa;
  border: 1px solid #dedede;
  position: relative;
}

.my-body {
  padding-bottom: 70px;
  position: relative;
  background-color: rgb(239, 243, 247);
  color: rgb(39, 39, 74);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
}

.my-input {
  width: 28px;
  height: 38px;
  line-height: 40px;
  display: inline-block;
  border: 1px #d8d8d8 solid;
  border-radius: 4px 0 0 4px;
  border-right: none;
  background: #f1f3f8;
  color: #27274a;
  text-align: center;
  vertical-align: top;
}

.nav-title {
  height: 30px;
  overflow: hidden;
  text-align: left;
  line-height: 30px;
}

.nav-title span {
  vertical-align: top;
  display: inline-block;
  font-weight: bolder;
  font-size: 18px;
  margin-left: 10px;
}

.nav-title-div {
  width: 5px;
  height: 30px;
  background-color: rgb(82, 158, 232);
  display: inline-block;
}

.tag-li {
  position: relative;
}

.my-timer {
  margin-top: 10px;
  font-size: 22px;
  line-height: 22px;
  color: #ff0000;
  font-weight: 400;
}

.my-progress {
  margin-top: 5px;
  margin-bottom: 7px;
}

.my-button {
  position: fixed;
  right: 70px;
  bottom: 45px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}
</style>
