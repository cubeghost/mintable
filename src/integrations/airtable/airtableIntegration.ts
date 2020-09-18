import Airtable from 'airtable';
import { Config } from '../../common/config'
import { IntegrationId } from '../../types/integrations'
import { AirtableConfig } from '../../types/integrations/airtable'
import { logInfo, logError } from '../../common/logging'
import { Account } from '../../types/account'
import { sortBy, pick, chunk } from 'lodash'

interface TransactionFields extends Airtable.FieldSet {
    [prop: string]: any;
}

interface BalanceFields extends Airtable.FieldSet {
    [ prop: string ]: any;
}

export class AirtableIntegration {
    config: Config
    airtableConfig: AirtableConfig
    client: Airtable
    base: Airtable.Base
    transactionsTable: Airtable.Table<TransactionFields>
    balancesTable: Airtable.Table<Airtable.FieldSet>

    constructor(config: Config) {
        this.config = config
        this.airtableConfig = config.integrations[IntegrationId.Airtable] as AirtableConfig

        this.client = new Airtable({
            apiKey: this.airtableConfig.credentials.apiKey
        })

        this.base = this.client.base(this.airtableConfig.baseId)
        this.transactionsTable = this.base('Transactions')
        this.balancesTable = this.base('Balances')
    }

    public updateTransactions = async (accounts: Account[]) => {
        // Sort transactions by date
        const transactions = sortBy(accounts.map(account => account.transactions).flat(10), 'date')
        const chunkedTransactions = chunk(transactions, 10);

        try {
            for (const transactionChunk of chunkedTransactions) {
                await this.transactionsTable.create(transactionChunk.map(transaction => ({
                    fields: pick(transaction, this.config.transactions.properties)
                })), {
                    typecast: true
                })
            }

            logInfo('You can view your base here:\n')
            console.log(`https://airtable.com/${this.airtableConfig.baseId}`)
        } catch (error) {
            logError(error);
            return;
        }
    }

    public updateBalances = async (accounts: Account[]) => {

        console.log({ accounts })

        // logInfo('You can view your base here:\n')
        // console.log(`https://airtable.com/${this.airtableConfig.baseId}`)
    }
}
