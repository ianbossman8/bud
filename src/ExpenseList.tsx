import React from 'react'
import { Transaction } from './types'
import { transactionsFilter } from './util/helper'
import './ExpenseList.css'

interface ExpenseListProps {
  transactions: Array<Transaction>
  numberOfExpense?: number
}

function ExpenseList(props: ExpenseListProps) {
  const { transactions, numberOfExpense } = props

  if (transactions.length === 0) {
    return <p>no transaction found</p>
  }

  let expenses = transactionsFilter(transactions, numberOfExpense)

  return (
    <div className="expenses-list">
      <p title="expenses-list__title">showing 10 smallest expenses</p>
      <ul>
        {expenses.map((transaction) => (
          <li key={transaction.id}>
            <p>{transaction.description}</p>
            <p>date- {transaction.date}</p>
            <p>type- {transaction.category_title}</p>
            <p>
              Amount: {transaction.amount.value} ({transaction.amount.currency_iso})
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExpenseList
