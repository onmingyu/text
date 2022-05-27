/* 就诊卡模块 */
import _ from 'underscore'
import {
  ADD_CARDS,
  DELETE_CARD,
  SET_DEFAULT_CARD,
  SELECT_CARD
} from '../mutation-types'

// initial state
const state = {
  // card object {
  //   id: 0,
  //   type: '',
  //   num: '',
  //   name: '',
  //   isDefault: false,
  //   isSelected: false
  // }
  cards: []
}

// mutations
const mutations = {
  [ADD_CARDS] (state, cards) {
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i]
      state.cards.push(card)
    }
    _.uniq(state.cards, function (val) {
      return val.id
    })
  },
  [DELETE_CARD] (state, cardId) {
    state.cards = _.filter(state.cards,
      (card) => {
        return card.id !== cardId
      })
  },
  [SET_DEFAULT_CARD] (state, cardId) {
    _.each(state.cards, (card) => {
      if (card.id === cardId) {
        card.isDefault = true
      } else {
        card.isDefault = false
      }
    })
  },
  [SELECT_CARD] (state, cardId) {
    _.each(state.cards, (card) => {
      if (card.id === cardId) {
        card.isSelected = true
      } else {
        card.isSelected = false
      }
    })
  }
}

export default {
  state,
  mutations
}
