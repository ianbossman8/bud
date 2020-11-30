import { transactionsFilter } from './helper'

describe('helpers', () => {
  describe('transactions filter', () => {
    let transactions = [
      {
        amount: {
          value: -1,
          currency_iso: 'gbp',
        },
        category_title: 'food',
        date: '10/10/19',
        description: 'food',
        id: 't1',
      },
    ]
    it('should return array length of 1', () => {
      expect(transactionsFilter(transactions).length).toBe(1)
    })

    it('should return array length of 10 and in correct order', () => {
      let trans = []
      for (let i = 1; i < 20; i++) {
        trans.push({
          amount: {
            value: -i,
            currency_iso: 'gbp',
          },
          category_title: 'food',
          date: '10/10/19',
          description: 'food',
          id: `t${i}`,
        })
      }

      expect(transactionsFilter(trans).length).toBe(10)
      expect(transactionsFilter(trans)[0].amount.value).toBe(-1)
      expect(transactionsFilter(trans)[9].amount.value).toBe(-10)
    })

    it('should filter non expenses', () => {
      transactions = [
        ...transactions,
        {
          amount: {
            value: 100,
            currency_iso: 'gbp',
          },
          category_title: 'food',
          date: '10/10/19',
          description: 'food',
          id: 't2',
        },
      ]

      expect(transactionsFilter(transactions).length).toBe(1)
    })
  })
})
