import React, { useEffect, useState } from 'react'
import { AccountDetail } from './types'
import ExpenseList from './ExpenseList'
import { url } from './util/api'
import './App.css'

function App() {
  const [appErr, setAppErr] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [accountDetail, setAccountDetail] = useState<AccountDetail>()

  useEffect(() => {
    setIsFetching(true)
    let controller = new AbortController()

    fetch(url)
      .then((data) => data.json())
      .then((parsedData: AccountDetail) => {
        setIsFetching(false)
        setAccountDetail(parsedData)
      })
      .catch((err: Error) => {
        setIsFetching(false)
        setAppErr(err.message)
      })

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>your account details</h1>
      </header>
      {appErr ? (
        <h2>{appErr}</h2>
      ) : isFetching ? (
        <h2>fetching data</h2>
      ) : (
        typeof accountDetail !== 'undefined' && (
          <>
            <section className="App__account-info">
              <div>
                <p>
                  {accountDetail.provider.title} - {accountDetail.provider.description}
                </p>
                <p>account number {accountDetail.provider.account_number}</p>
                <p>sort-code {accountDetail.provider.sort_code}</p>
                <p>
                  balance {accountDetail.balance.amount} in {accountDetail.balance.currency_iso}
                </p>
              </div>
            </section>

            <section className="App__account-transactions">
              <ExpenseList transactions={accountDetail.transactions} />
            </section>
          </>
        )
      )}
    </div>
  )
}

export default App
