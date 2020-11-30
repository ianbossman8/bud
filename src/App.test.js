import React from 'react'
import { unmountComponentAtNode, render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import App from './App'

describe('App Component', () => {
  describe('fetch data', () => {
    let container = null

    beforeEach(() => {
      container = document.createElement('div')
      document.body.appendChild(container)
    })

    afterEach(() => {
      unmountComponentAtNode(container)
      container.remove()
      container = null
      global.fetch.mockRestore()
    })

    it('should display error when error', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('error')))

      await act(async () => {
        render(<App />, container)
      })

      expect(container.querySelector('h2').textContent).toBe('error')
    })

    it('should display expenses when success', async () => {
      const mocKRes = {
        id: 'u1',
        balance: {
          amount: 1,
          currency_iso: 'gbp',
        },
        provider: {
          account_number: 'p1',
          description: 'desc',
          sort_code: '10-10-10',
          title: 'Monzo',
        },
        transactions: [
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
        ],
      }

      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mocKRes),
        })
      )

      await act(async () => {
        render(<App />, container)
      })

      const sectionAccountInfo = container
        .getElementsByClassName('App__account-info')[0]
        .firstChild.querySelectorAll('p')

      expect(sectionAccountInfo[0].textContent).toBe(mocKRes.provider.title + ' - ' + mocKRes.provider.description)
      expect(sectionAccountInfo[1].textContent).toBe(`account number ${mocKRes.provider.account_number}`)
      expect(sectionAccountInfo[2].textContent).toBe(`sort-code ${mocKRes.provider.sort_code}`)
      expect(sectionAccountInfo[3].textContent).toBe(
        `balance ${mocKRes.balance.amount} in ${mocKRes.balance.currency_iso}`
      )

      const sectionExpenseList = container.getElementsByClassName('App__account-transactions')[0]
      expect(sectionExpenseList).not.toBeNull()
    })
  })
})
