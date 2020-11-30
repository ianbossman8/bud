import { Transaction } from '../types'

export function transactionsFilter(transactions: Array<Transaction>, numberOfExpense: number = 10) {
  return transactions
    .filter((transaction) => transaction.amount.value <= 0)
    .sort((a, b) => b.amount.value - a.amount.value)
    .slice(0, transactions.length > numberOfExpense ? numberOfExpense : transactions.length)
}
