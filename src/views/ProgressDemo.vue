<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Todo List - Animated progress</p>
    <div class="v-example-todo-list">
      <div class="main-hd">
        <div class="header">
          <input
            type="text"
            placeholder="What are you working on?"
            v-model="state.taskItem"
            @keydown.enter="createTask"
          />
          <v-button
            :inactive="!state.taskItem"
            type="primary"
            icon="edit"
            size="small"
            inline
            round
            @click="createTask"
          ></v-button>
        </div>
        <p class="tasks">Tasks: {{ state.tasks.length }}</p>
      </div>
      <div class="main-bd">
        <p class="remaining">Remaining: {{ state.remainingCount }}</p>
        <p class="completed">Completed: {{ state.completedCount }}</p>
        <div class="row-flex">
          <v-progress-circular
            :size="70"
            :value="state.taskProgress"
            :width="8"
            is-animated
          >
            <span class="progress-value">
              <v-amount
                :value="state.taskProgress * 100"
                :precision="0"
                is-animated
              ></v-amount>%
            </span>
          </v-progress-circular>
        </div>
      </div>
      <div
        class="main-ft"
        v-if="state.tasks.length"
      >
        <div
          class="row"
          v-for="(item, index) in state.tasks"
          :key="index"
        >
          <input
            type="checkbox"
            v-model="item.done"
            :id="`checkbox${index}`"
          />
          <label
            :class="taskCls(item.done)"
            :for="`checkbox${index}`"
          >
            {{ item.text }}
          </label>
          <div class="row-flex">
            <v-icon
              name="right"
              color="#36C"
              v-if="item.done"
            ></v-icon>
            <v-icon
              name="clear"
              color="#CCC"
              @icon-click="deleteTask(index)"
            ></v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="v-example v-example-poc">
    <p>VUI POC</p>
    <img
      alt="Vue logo"
      src="https://vuejs.org/images/logo.png"
      @click="showPopup(true)"
    />
    <hello-world
      ref="compRef"
      msg="Hello VUI"
    />
  </div>
  <div class="v-example">
    <p>Circular Progress - Animated</p>
    <v-progress-circular
      :size="90"
      :value="state.val"
      :width="10"
      :rotate="-90"
      :color="state.strokeColor"
      :duration="600"
      is-animated
    >
      <span class="progress-value">
        <template v-if="state.val < 1">
          <v-amount
            :value="state.val * 100"
            :precision="0"
            is-animated
          ></v-amount>%
        </template>
        <v-icon
          v-else
          color="#F00"
          name="right"
          size="lg"
        ></v-icon>
      </span>
    </v-progress-circular>
    <v-button
      :type="state.btnType"
      :inactive="state.val > 0 && state.val < 1"
      size="small"
      inline
      round
      @click="showProgress"
    >Start test</v-button>
  </div>
  <div class="v-example">
    <p>Circular Progress - Customized color</p>
    <v-progress-circular
      :size="100"
      :value="0.7"
      :width="10"
      linecap="butt"
      color="#F60"
      border-color="#AAA"
    >
      <span class="progress-value">70%</span>
    </v-progress-circular>
  </div>
  <!--
  <div class="v-example">
    <p>Circular Progress - Basic</p>
    <v-progress-circular
      :size="80"
      :value="0.3"
      :width="5"
    >
      <span class="progress-value">30%</span>
    </v-progress-circular>
  </div>
  -->
  <div class="v-example v-example-poc-bottom">
    <p>Circular Progress - LinearGradient</p>
    <v-progress-circular
      :value="0.85"
      :width="10"
      :size="100"
      color="url(#linear)"
      border-color="#EFEFEF"
      linecap="butt"
    >
      <span class="progress-value">85%</span>
      <template #circularDefs>
        <defs>
          <linearGradient
            id="linear"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stop-color="#FF5257"
            />
            <stop
              offset="100%"
              stop-color="#FFC541"
            />
          </linearGradient>
        </defs>
      </template>
    </v-progress-circular>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import HelloWorld from '../components/hello-world/index.vue'
// import VProgressCircular from '../components/progress/circular.vue'
// import VAmount from '../components/amount/index.vue'
// import VButton from '../components/button/index.vue'
// import VIcon from '../components/icon/index.vue'

export default {
  name: 'progress-demo',

  inheritAttrs: false,

  components: {
    HelloWorld
    // VProgressCircular,
    // VAmount,
    // VButton,
    // VIcon
  },

  setup() {
    const state = reactive({
      val: 0,
      btnType: 'primary',
      strokeColor: '#FC9153',
      taskItem: '',
      completedCount: 0,
      remainingCount: 0,
      taskProgress: 0,
      tasks: []
    })

    state.tasks = [
      {
        text: 'Foobar',
        done: false
      },
      {
        text: 'Fizzbuzz',
        done: false
      }
    ]

    state.completedCount = computed(
      () => state.tasks.filter((item) => item.done).length
    )

    state.remainingCount = computed(
      () => state.tasks.length - state.completedCount
    )

    state.taskProgress = computed(() =>
      state.tasks.length ? state.completedCount / state.tasks.length : 0
    )

    const defer = (time) => new Promise((resolve) => setTimeout(resolve, time))

    const showProgress = async () => {
      state.val = 0
      state.btnType = 'primary'
      state.strokeColor = '#FC9153'
      await defer(600)
      state.val = 0.1
      await defer(2000)
      state.val = 0.5
      await defer(2400)
      state.val = 0.9
      await defer(1800)
      state.val = 1
      state.btnType = 'warning'
      state.strokeColor = '#F00'
    }

    const createTask = () => {
      if (!state.taskItem) {
        return
      }

      state.tasks.push({
        text: state.taskItem,
        done: false
      })

      state.taskItem = ''
    }

    const deleteTask = (index) => state.tasks.splice(index, 1)

    const taskCls = (isDone) => {
      return [
        'content',
        {
          'label-done': isDone
        }
      ]
    }

    const compRef = ref('compRef')

    const showPopup = (val) => {
      const comp = compRef && compRef.value
      comp && comp.showPopup(val)
    }

    return {
      state,
      showProgress,
      createTask,
      deleteTask,
      taskCls,
      compRef,
      showPopup
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

.v-example-poc {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50%;
  }
}

.v-example-poc-bottom {
  margin-bottom: 1rem;
}
</style>
