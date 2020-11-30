export interface Balance {
  amount: number
  currency_iso: string
}

export interface Provider {
  account_number: string
  description: string
  sort_code: string
  title: string
}

export interface TransactionAmount {
  value: number
  currency_iso: string
}

export interface Transaction {
  amount: TransactionAmount
  category_title: string
  date: string
  description: string
  id: string
}

export interface AccountDetail {
  balance: Balance
  id: string
  provider: Provider
  transactions: Array<Transaction>
}
