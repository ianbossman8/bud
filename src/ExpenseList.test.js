import React from 'react'
import { unmountComponentAtNode, render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import ExpenseList from './ExpenseList'

describe('ExpenseList Component', () => {
  let container = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })

  it('should handle display if no transactions', () => {
    act(() => {
      render(<ExpenseList transactions={[]} />, container)
    })

    expect(container.querySelector('p').textContent).toBe('no transaction found')
  })

  it('should handle display for transactions', () => {
    const transactions = [
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
      {
        amount: {
          value: -3,
          currency_iso: 'gbp',
        },
        category_title: 'food',
        date: '10/10/19',
        description: 'food',
        id: 't2',
      },
    ]

    act(() => {
      render(<ExpenseList transactions={transactions} numberOfExpense={10} />, container)
    })

    expect(container.querySelector('p').textContent).toBe('showing 10 smallest expenses')
    expect(container.querySelectorAll('li').length).toBe(2)
    expect(container.querySelectorAll('li')[0].querySelectorAll('p')[3].textContent).toBe('Amount: -1 (gbp)')
  })
})
