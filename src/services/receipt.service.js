import { receiptString } from "../constance/entityName"
import Connection from "../db/connect"

class ReceiptService {
  async createReceipt({ receiptType, idSupplier, receiptDetail, ...rest }) {
    // Caculate total receipt
    let total = null
    receiptDetail.reduce()

    // Create transaction receipt and receipt detail
    await Connection.getInstance().transaction(async transactionEntityManager => {
      await transactionEntityManager.getRepository(receiptString).insert()
    })
  }
}

export default new ReceiptService