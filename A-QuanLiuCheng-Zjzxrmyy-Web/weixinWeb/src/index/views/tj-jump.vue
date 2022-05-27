<template>
</template>
<script>
import _ from 'underscore'
export default {
  name: 'TjJumpView',
  vuex: {
    getters: {
      cards: ({ card }) => card.cards,
      card: ({ card }) => _.findWhere(card.cards, { isSelected: true })
    }
  },
  methods: {
    ExamJump: function () {
      var self = this
      setTimeout(() => {
        if (self.card === undefined) {
          self.ExamJump()
        }
        if (self.card.id === '') {
          return
        }
        this.$ajax.get('ExamJump', 'Card', {
          cardId: self.card.id
        }).then(function (data) {
          if (data.ResultCode !== '0') {
            self.showIndex = false
            self.showFailed = true
            self.failedMsg = data.ResultMsg
          } else {
            console.log(data.ResultMsg)
            window.location.href = data.ResultMsg
          }
        })
      }, 150)
    }
  },
  ready: function () {
    var self = this
    self.ExamJump()
  },
  swiper: null
}
</script>
