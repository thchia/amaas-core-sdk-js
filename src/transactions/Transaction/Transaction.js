import { AMaaSModel, Reference } from '../../core'
import uuid from 'uuid'
const Decimal = require('decimal.js')

/** @class */
class Transaction extends AMaaSModel {
  /**
   * Constructs new Transaction object
   * @param {object} transactionData: creation options
   * @param {string} transactionData.assetManagerId: ID of the Transaction's Asset Manager
   * @param {string} transactionData.assetBookId: ID of the Transaction's book
   * @param {string} transactionData.counterpartyBookId: ID of the counterparty to this Transaction
   * @param {string} transactionData.transactionAction: Transaction action e.g. BUY/SELL
   * @param {string} transactionData.assetId: ID of the asset being transacted
   * @param {number} transactionData.quantity: Quantity being transacted
   * @param {date} transactionData.transactionDate: Date of transactionDate
   * @param {date} transactionData.settlementDate: Date of settlement e.g. T+2 where T = transactionDate
   * @param {decimal} transactionData.price: price of Asset being transacted
   * @param {string} transactionData.transactionCurrency: Currency that the Transaction takes place in
   * @param {string} transactionData.settlementCurrency: Currency that the Transaction is settled in
   * @param {Asset} transactionData.transactionType: Type of Transaction e.g. Trade, Allocation
   * @param {*} transactionData.transactionStatus: *
   * @param {date} transactionData.executionTime: Time that the Transaction was executed
   * @param {string} transactionData.transactionId: ID of the Transaction
   * @param {object} transactionData.charges: Object of all charges (Charge class)
   * @param {object} transactionData.codes: Object of all codes (Code class)
   * @param {object} transactionData.references: *
   * @param {*} transactionData.postings: *
   * @param {*} asset: *
   * @param {object} transactionData.coreData: AMaaSModel constructor options
  */
  constructor({ assetManagerId, assetBookId, counterpartyBookId, transactionAction, assetId, quantity, transactionDate, settlementDate, price, transactionCurrency, settlementCurrency, asset, executionTime, transactionType='Trade', transactionId, transactionStatus='New', charges={}, codes={}, comments={}, links={}, parties={}, references={} }, args, coreData) {
    super(coreData)
    this.assetManagerId = assetManagerId
    this.assetBookId = assetBookId
    this.counterpartyBookId = counterpartyBookId
    this.transactionAction = transactionAction
    this.assetId = assetId
    this.quantity = quantity
    this.transactionDate = transactionDate
    this.settlementDate = settlementDate
    this.price = price
    this.transactionCurrency = transactionCurrency
    this.settlementCurrency = settlementCurrency
    this.transactionType = transactionType
    this.transactionStatus = transactionStatus
    this.executionTime = executionTime || new Date()
    this.transactionId = transactionId || uuid()
    this.charges = charges
    this.codes = codes
    this.comments = comments
    this.links = links
    this.parties = parties
    this.references = references
    this.references.AMaaS = new Reference(this.transactionId, args, coreData)
    this.postings = []
    this.asset = asset
  }

  set quantity(newQuantity=0) {
    this._quantity = new Decimal(newQuantity)
  }

  get quantity() {
    return this._quantity
  }

  set price(newPrice=0) {
    this._price = new Decimal(newPrice)
  }

  get price() {
    return this._price
  }

  set grossSettlement(newGrossSettlement=0) {
    this._grossSettlement = new Decimal(newGrossSettlement)
  }

  get grossSettlement() {
    return this._grossSettlement ? this._grossSettlement : this.price.times(this.quantity)
  }

  set netSettlement(newNetSettlement=0) {
    this._netSettlement = new Decimal(newNetSettlement)
  }

  get netSettlement() {
    return this._netSettlement ? this._netSettlement : this.grossSettlement.minus(this.chargesNetEffect)
  }

  chargesNetEffect() {
    let netCharges = new Decimal(0);
    for (let chargeType in this.charges) {
      if (this.charges[chargeType].active && this.charges[chargeType].netAffecting) {
        netCharges = netCharges.plus(this.charges[chargeType].chargeValue)
      }
    }
    return netCharges
  }
}

export default Transaction
