<template>
  <div>
    <!-- 步骤条 -->
    <div class="step_progress">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
    </div>

    <div>
      <!-- 选择题目卡片 -->
      <el-card class="box-card-whichque" v-show="card_whichque">
        <div slot="header" class="clearfix">
          <span style="font-size: 30px; font-family: KaiTi"
            >请选择题目类型</span
          >
        </div>

        <div>
          <div>
            <!-- 选择 -->
            <img class="choicePic" src="../../../assets/img/choicelogo.png" />
            <!-- <el-radio v-model="radio1" label="1" border fill='#d4237a' class="button1-whichque">选择题</el-radio> -->
            <!-- 填空 -->
            <img class="fillPic" src="../../../assets/img/filllogo.png" />
            <!-- <el-radio v-model="radio1" label="2" border class="button2-whichque">填空题</el-radio> -->
            <!-- 判断 -->
            <img class="judgePic" src="../../../assets/img/judgelogo.png" />
            <!-- <el-radio v-model="radio1" label="3" border class="button3-whichque">判断题</el-radio> -->
          </div>

          <div>
            <!-- 按钮组 -->
            <el-radio-group
              v-model="radio_whichque"
              style="width: 800px"
              fill="#165e48"
              border
            >
              <el-row style="margin-top: 20px">
                <el-col :span="2" :offset="1">
                  <el-radio-button label="1" class="button1-whichque"
                    >选择题</el-radio-button
                  >
                </el-col>
                <el-col :span="4" :offset="5">
                  <el-radio-button label="2" class="button2-whichque"
                    >填空题</el-radio-button
                  >
                </el-col>
                <el-col :span="2" :offset="5">
                  <el-radio-button label="3" class="button3-whichque"
                    >判断题</el-radio-button
                  >
                </el-col>
              </el-row>
            </el-radio-group>
          </div>
        </div>
      </el-card>

      <!-- 选择题题干相关 -->
      <el-card class="box-card-quecontent_choice" v-show="card_quecontent_1">
        <div slot="header" class="clearfix">
          <span style="font-size: 30px; font-family: KaiTi"
            >选择题题目信息</span
          >
        </div>

        <div>
          <!-- 第一行题目难度信息 -->
          <div style="margin-top: 0px">
            <span class="choice_difficulty_word"
              >请确定题目难度：</span
            >
            <el-rate
              v-model="que1_diff"
              @change="showRate"
              :texts="choice_diff_word"
              show-text
              class="choice-rate"
            >
            </el-rate>
          </div>

          <!-- 第二行题目学科 -->
          <div style="margin-top: 20px">
            <div>
              <span class="choice_que1_subject_word"
                >请输入所属学科：</span
              >
              <el-input v-model="que1_subject" class="choice_que1_subject">
              </el-input>
            </div>
          </div>

          <!-- 第三行题目内容 -->
          <div style="margin-top: 20px">
            <div>
              <span class="choice_que1_content_word"
                >请输入题目内容：</span
              >
            </div>
            <div>
              <el-input
                :rows="5"
                type="textarea"
                v-model="que1_content"
                maxlength="100"
                minlength="0"
                show-word-limit
                class="choice_que1_content"
              >
              </el-input>
            </div>
          </div>

          <!-- 第四行题目选项和答案 -->
          <div style="margin-top: 30px">
            <div>
              <span class="choice_que1_answer_word"
                >请输入题目选项及答案：</span
              >
            </div>
            <div style="margin-top: 25px">
              <el-row>
                <el-col :span="2" :offset="1">
                  <el-button
                    @click="choice_selectA"
                    :type="this.choice_buttonA"
                    circle
                    >A</el-button
                  >
                </el-col>
                <el-col :span="2" :offset="0">
                  <el-input
                    v-model="que1_option_A"
                    style="width: 550px"
                  ></el-input>
                </el-col>
              </el-row>

              <el-row style="margin-top: 10px">
                <el-col :span="2" :offset="1">
                  <el-button
                    @click="choice_selectB"
                    :type="this.choice_buttonB"
                    circle
                    >B</el-button
                  >
                </el-col>
                <el-col :span="2" :offset="0">
                  <el-input
                    v-model="que1_option_B"
                    style="width: 550px"
                  ></el-input>
                </el-col>
              </el-row>

              <el-row style="margin-top: 10px">
                <el-col :span="2" :offset="1">
                  <el-button
                    @click="choice_selectC"
                    :type="this.choice_buttonC"
                    circle
                    >C</el-button
                  >
                </el-col>
                <el-col :span="2" :offset="0">
                  <el-input
                    v-model="que1_option_C"
                    style="width: 550px"
                  ></el-input>
                </el-col>
              </el-row>

              <el-row style="margin-top: 10px">
                <el-col :span="2" :offset="1">
                  <el-button
                    @click="choice_selectD"
                    :type="this.choice_buttonD"
                    circle
                    >D</el-button
                  >
                </el-col>
                <el-col :span="2" :offset="0">
                  <el-input
                    v-model="que1_option_D"
                    style="width: 550px"
                  ></el-input>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 填空题题干相关 -->
      <el-card class="box-card-quecontent" v-show="card_quecontent_2">
        <div slot="header" class="clearfix">
          <span style="font-size: 30px; font-family: KaiTi"
            >填空题题目信息</span
          >
        </div>

        <div>
          <!-- 第一行题目难度信息 -->
          <div style="margin-top: 0px">
            <span class="choice_difficulty_word"
              >请确定题目难度：</span
            >
            <el-rate
              v-model="que2_diff"
              @change="showRate"
              :texts="choice_diff_word"
              show-text
              class="choice-rate"
            >
            </el-rate>
          </div>

          <!-- 第二行题目内容 -->
          <div style="margin-top: 20px">
            <div>
              <span class="choice_que2_content_word"
                >请输入题目内容：</span
              >
            </div>
            <div>
              <el-input
                :rows="5"
                type="textarea"
                v-model="que2_content"
                maxlength="100"
                minlength="0"
                show-word-limit
                class="choice_que2_content"
              >
              </el-input>
            </div>
          </div>

          <!-- 第三行题目答案 -->
          <div style="margin-top: 30px">
            <div>
              <span class="choice_que2_answer_word" >请输入题目答案：</span>
            </div>
            <div>
              <el-input
                v-model="que2_answer"
                prefix-icon="el-icon-star-off"
                class="choice_que2_answer"
              >
              </el-input>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 判断题题干相关 -->
      <el-card class="box-card-quecontent" v-show="card_quecontent_3">
        <div slot="header" class="clearfix">
          <span style="font-size: 30px; font-family: KaiTi"
            >判断题题目信息</span
          >
        </div>

        <div>
          <!-- 第一行题目难度信息 -->
          <div style="margin-top: 0px">
            <span class="choice_difficulty_word"
              >请确定题目难度：</span
            >
            <el-rate
              v-model="que3_diff"
              @change="showRate"
              :texts="choice_diff_word"
              show-text
              class="choice-rate"
            >
            </el-rate>
          </div>

          <!-- 第二行题目内容 -->
          <div style="margin-top: 20px">
            <div>
              <span class="choice_que3_content_word"
                >请输入题目内容：</span
              >
            </div>
            <div>
              <el-input
                :rows="5"
                type="textarea"
                v-model="que2_content"
                maxlength="100"
                minlength="0"
                show-word-limit
                class="choice_que3_content"
              >
              </el-input>
            </div>
          </div>

          <!-- 第三行题目答案 -->
          <div style="margin-top: 30px">
            <div>
              <span class="choice_que3_answer_word"
                >请输入题目答案：</span
              >
            </div>
            <div>
              <el-input
                v-model="que3_answer"
                prefix-icon="el-icon-star-off"
                class="choice_que3_answer"
              >
              </el-input>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 所有题目解析 -->
      <el-card class="box-card-queanalyze" v-show="card_queanalyze">
        <div slot="header" class="clearfix">
          <span style="font-size: 30px; font-family: KaiTi"
            >{{ this.que_type }}题目解析</span
          >
        </div>

        <div>
          <!-- 题目解析 -->
          <div style="margin-top: 20px">
            <div>
              <span class="choice_que_analyze_word"
                >请输入题目解析：</span
              >
            </div>
            <div>
              <el-input
                :rows="10"
                type="textarea"
                v-model="que_analyze"
                maxlength="300"
                minlength="0"
                show-word-limit
                class="choice_que_analyze"
              >
              </el-input>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 按钮 -->
    <div style="margin-top: 0px">
      <el-button class="button_out" @click="saveBackward" icon="el-icon-back">{{
        button_out_info
      }}</el-button>
      <el-button class="button_in" @click="saveForward" icon="el-icon-right">{{
        button_in_info
      }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      que_type: "选择题", // 问题类型

      active: 0, // 步骤条默认初始位置
      button_out_info: "退出", // 控制上一步按钮的信息
      button_in_info: "下一步", // 控制下一步按钮的信息

      // 哪个问题
      radio_whichque: "3", // 哪个问题选择按钮
      card_whichque: true, // 哪个问题卡片开关

      // 选择题
      card_quecontent_1: false, // 选择题题干卡片开关
      que1_diff: 1, // 题目难度
      choice_diff_word: ["1", "2", "3", "4", "5"], // 题目难度说明
      que1_content: "", // 填空题题目
      que1_answer: "", // 填空题回答

      que1_option_A: "", // A选项
      que1_option_B: "", // B选项
      que1_option_C: "", // C选项
      que1_option_D: "", // D选项

      test_button: "", // 测试按钮图案
      choice_buttonA: "", // 选择A按钮
      choice_buttonB: "", // 选择B按钮
      choice_buttonC: "", // 选择C按钮
      choice_buttonD: "", // 选择D按钮

      choice_answer: "", // 最后的选项答案

      // 填空题
      card_quecontent_2: false, // 题目题干卡片开关
      que2_diff: 1, // 题目难度
      que2_content: "", // 填空题题目
      que2_answer: "", // 填空题回答

      // 判断题
      card_quecontent_3: false, // 题目题干卡片开关
      que3_diff: 1, // 题目难度
      que3_content: "", // 判断题题目
      que3_answer: "", // 判断题回答

      // 所有题解析
      card_queanalyze: false,
      que_analyze: "",

      // 发送增加试题整理
    };
  },

  methods: {
    // 控制前进后退按钮
    saveForward() {
      this.active++;
      // console.log(this.active);
      if (this.active == 1) {
        this.button_out_info = "上一步"; // 后退按钮信息改变
        this.button_in_info = "下一步"; // 前进按钮信息改变

        if (this.radio_whichque == 1) {
          this.que_type = "选择题";
          this.card_whichque = false;
          this.card_quecontent_1 = true;
          this.card_quecontent_2 = false;
          this.card_quecontent_3 = false;
          this.card_queanalyze = false;
        } else if (this.radio_whichque == 2) {
          this.que_type = "填空题";
          this.card_whichque = false;
          this.card_quecontent_1 = false;
          this.card_quecontent_2 = true;
          this.card_quecontent_3 = false;
          this.card_queanalyze = false;
        } else if (this.radio_whichque == 3) {
          this.que_type = "判断题";
          this.card_whichque = false;
          this.card_quecontent_1 = false;
          this.card_quecontent_2 = false;
          this.card_quecontent_3 = true;
          this.card_queanalyze = false;
        }
      } else if (this.active == 2) {
        this.button_out_info = "上一步"; // 后退按钮信息改变
        this.button_in_info = "确定"; //前进按钮信息改变
        // alert('this.active==2');
        this.card_quecontent_1 = false;
        this.card_quecontent_2 = false;
        this.card_quecontent_3 = false;
        this.card_queanalyze = true;
      }

      if (this.active > 2) {
        this.button_out_info = "退出"; // 后退按钮信息改变
        this.button_in_info = "下一步"; //前进按钮信息改变
        // this.active=0;
        alert("需要接口");
      } // 边界值判断
    },

    saveBackward() {
      this.active--;
      // console.log(this.active);
      if (this.active == 1) {
        this.button_out_info = "上一步"; // 后退按钮信息改变
        this.button_in_info = "下一步"; // 前进按钮信息改变

        if (this.radio_whichque == 1) {
          this.card_whichque = false;
          this.card_quecontent_1 = true;
          this.card_quecontent_2 = false;
          this.card_quecontent_3 = false;
          this.card_queanalyze = false;
        } else if (this.radio_whichque == 2) {
          this.que_type = "填空题";
          this.card_whichque = false;
          this.card_quecontent_1 = false;
          this.card_quecontent_2 = true;
          this.card_quecontent_3 = false;
          this.card_queanalyze = false;
        } else if (this.radio_whichque == 3) {
          this.que_type = "判断题";
          this.card_whichque = false;
          this.card_quecontent_1 = false;
          this.card_quecontent_2 = true;
          this.card_quecontent_3 = false;
          this.card_queanalyze = false;
        }
      } else if (this.active == 0) {
        this.button_out_info = "退出"; // 后退按钮信息改变
        this.button_in_info = "下一步"; // 前进按钮信息改变
        this.card_whichque = true;
        this.card_quecontent_1 = false;
        this.card_quecontent_2 = false;
        this.card_quecontent_3 = false;
        this.card_queanalyze = false;
      }

      if (this.active < 0) {
        this.active = 2;
        this.$router.push({
          path: "/manageBank",
        });
        console.log(this.$router);
      } // 边界值判断
    },

    // 测试
    // 测试评分
    showRate() {
      console.log(this.choice_diff);
    },

    // 测试按钮
    testButton() {
      console.log("testButton");
      this.test_button = "primary";
      console.log(this.test_button);
      // alert();
      this.test_button = "";
    },

    // 选择题按下A按钮
    choice_selectA() {
      this.choice_buttonA = "warning";
      this.choice_buttonB = "";
      this.choice_buttonC = "";
      this.choice_buttonD = "";
      this.choice_answer = "A";
    },

    // 选择题按下B按钮
    choice_selectB() {
      this.choice_buttonB = "warning";
      this.choice_buttonA = "";
      this.choice_buttonC = "";
      this.choice_buttonD = "";
      this.choice_answer = "B";
    },

    // 选择题按下C按钮
    choice_selectC() {
      this.choice_buttonC = "warning";
      this.choice_buttonA = "";
      this.choice_buttonB = "";
      this.choice_buttonD = "";
      this.choice_answer = "C";
    },

    // 选择题按下D按钮
    choice_selectD() {
      this.choice_buttonD = "warning";
      this.choice_buttonB = "";
      this.choice_buttonC = "";
      this.choice_buttonA = "";
      this.choice_answer = "D";
    },

    // 发送增加试题信息
    addQuestion() {},
  },
};
</script>
<style scoped>
.el-rate__icon {
  font-size: 28px;
}
</style>
<style lang="scss" scoped>
/* 步骤条 */
.step_progress {
  width: 800px;
  text-align: left;
  position: relative;
  left: 20%;
}

/* 上一步按钮 */
.button_out {
  margin-top: 50px;
  width: 100px;
  margin-left: 0px;
}

/* 下一步按钮 */
.button_in {
  margin-top: 50px;
  width: 100px;
  margin-left: 100px;
}

/* 选择题 */
.choicePic {
  width: 300px;
  height: 270px;
  padding-top: 20px;
  margin-left: 0px;
  /* position:absolute;
    left:300px; */
}
/* 选择题按钮 */
.button1-whichque {
  position: relative;
  left: -100%;
  margin-left: 0px;
}

/* 填空题 */
.fillPic {
  width: 300px;
  height: 270px;
  /* margin-top:20px; */
  /* margin-left:-750px; */
  padding-left: 80px;
}
/* 填空题按钮 */
.button2-whichque {
  position: relative;
  left: 0%;
  padding-left: 80px;
}

/* 判断题 */
.judgePic {
  width: 300px;
  height: 270px;
  padding-left: 80px;
}
/* 判断题按钮 */
.button3-whichque {
  position: relative;
  left: 150%;
  padding-left: 80px;
}

/* 哪个题目卡片内容 */
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card-whichque {
  width: 1220px;
  height: 500px;
  margin-left: 30px;
  margin-top: 30px;
  background-color: rgb(198, 199, 189);
}

/* 选择题题干 */
// 选择题题干卡片
.box-card-quecontent_choice {
  width: 820px;
  height: 640px;
  margin-left: 230px;
  margin-top: 30px;
  background-color: rgb(198, 199, 189);
}

// 其他题目卡片
.box-card-quecontent {
  width: 820px;
  height: 500px;
  margin-left: 230px;
  margin-top: 30px;
  background-color: rgb(198, 199, 189);
}

// 题目难度
.choice-rate {
  background-color: white;
  width: 200px;
  height: 30px;
  margin-left: 290px;
  margin-top: -28px;
}



.choice_difficulty_word {
  font-size: 22px;
  margin-left: -500px;
  font-family: KaiTi;
  // margin-top:20px;
}

// 选择题
// 选择题 输入题目内容提示
.choice_que1_content_word {
  font-size: 22px;
  margin-left: -500px;
  font-family: KaiTi;
  // margin-top:20px;
  // background-color: orange;
}

// 选择题 输入题目学科提示
.choice_que1_subject_word {
  font-size: 22px;
  margin-left: -240px;
  font-family: KaiTi;
}

// 选择题 输入题目学科内容
.choice_que1_subject {
  width: 200px;
  margin-left: 60px;
}

// 选择题 输入题目内容
.choice_que1_content {
  // font-size:22px;
  margin-left: -80px;
  // font-family:KaiTi;
  margin-top: 20px;
  width: 600px;
}

// 选择题 输入题目答案提示
.choice_que1_answer_word {
  font-size: 22px;
  margin-left: -500px;
  font-family: KaiTi;
  // margin-top:20px;
  // background-color: orange;
}

// 选择题 输入题目答案
.choice_que1_answer {
  // font-size:22px;
  margin-left: -80px;
  // font-family:KaiTi;
  margin-top: 20px;
  width: 600px;
}

// 选择题 选项内容
.choice_option {
  // margin-left:-80px;
  // margin-top:20px;
  width: 100px;
}

.choice_que1_option_word {
}

.choice_que1_option {
  // margin-left:-300px;
  // margin-top:-30px;
  width: 100px;
  // background-color: orange;
}

// 填空题
// 填空题 输入题目内容提示
.choice_que2_content_word {
  font-size: 22px;
  margin-left: -500px;
  font-family: KaiTi;
  // margin-top:20px;
  // background-color: orange;
}

// 填空题 输入题目内容
.choice_que2_content {
  // font-size:22px;
  margin-left: -80px;
  // font-family:KaiTi;
  margin-top: 20px;
  width: 600px;
}

// 填空题 输入题目答案提示
.choice_que2_answer_word {
  font-size: 22px;
  margin-left: -500px;
  font-family: KaiTi;
  // margin-top:20px;
  // background-color: orange;
}

// 填空题 输入题目答案
.choice_que2_answer {
  // font-size:22px;
  margin-left: -80px;
  // font-family:KaiTi;
  margin-top: 20px;
  width: 600px;
}

// 判断题
// 判断题 输入题目内容提示
.choice_que3_content_word {
  font-size: 22px;
  margin-left: -500px;
  font-family: KaiTi;
  // margin-top:20px;
  // background-color: orange;
}

// 判断题 输入题目内容
.choice_que3_content {
  // font-size:22px;
  margin-left: -80px;
  // font-family:KaiTi;
  margin-top: 20px;
  width: 600px;
}

// 判断题 输入题目答案提示
.choice_que3_answer_word {
  font-size: 22px;
  margin-left: -500px;
  font-family: KaiTi;
  // margin-top:20px;
  // background-color: orange;
}

// 判断题 输入题目答案
.choice_que3_answer {
  // font-size:22px;
  margin-left: -80px;
  // font-family:KaiTi;
  margin-top: 20px;
  width: 600px;
}

// 所有题目解析
// 解析卡片
.box-card-queanalyze {
  width: 820px;
  height: 500px;
  margin-left: 230px;
  margin-top: 30px;
  background-color: rgb(198, 199, 189);
}

// 所有题 输入题目内容提示
.choice_que_analyze_word {
  font-size: 22px;
  margin-left: -500px;
  font-family: KaiTi;
}

// 所有题 输入题目内容
.choice_que_analyze {
  // font-size:22px;
  margin-left: -80px;
  // font-family:KaiTi;
  margin-top: 20px;
  width: 600px;
}
</style>
