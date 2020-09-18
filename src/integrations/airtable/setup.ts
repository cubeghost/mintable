import { AirtableConfig, defaultAirtableConfig } from '../../types/integrations/airtable'
import { updateConfig } from '../../common/config'
import { IntegrationId } from '../../types/integrations'
import prompts from 'prompts'
import { logInfo, logError } from '../../common/logging'

export default async () => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('\nThis script will walk you through setting up the Airtable integration. Follow these steps:')
            console.log('\n\t1. Visit https://airtable.com/account')
            console.log("\t2. Get your personal API key")
            console.log("\t3. Go to https://airtable.com/api and select your Base")
            console.log('\t4. Find the ID for your Base\n')
            console.log('\t5. Answer the following questions:\n')

            const responses = await prompts([
                {
                    type: 'text',
                    name: 'name',
                    message: 'What would you like to call this integration?',
                    initial: 'Airtable',
                    validate: (s: string) =>
                        1 < s.length && s.length <= 64 ? true : 'Must be between 2 and 64 characters in length.'
                },
                {
                    type: 'password',
                    name: 'apiKey',
                    message: 'API key',
                    validate: (s: string) => (s.length >= 2 ? true : 'Must be at least 2 characters in length.')
                },
                {
                    type: 'text',
                    name: 'baseId',
                    message: 'Base ID',
                    validate: (s: string) => (s.length >= 2 ? true : 'Must be at least 2 characters in length.')
                }
            ])

            updateConfig(config => {
                let airtableConfig = (config.integrations[IntegrationId.Airtable] as AirtableConfig) || defaultAirtableConfig

                airtableConfig.name = responses.name
                airtableConfig.credentials.apiKey = responses.apiKey
                airtableConfig.baseId = responses.baseId

                config.integrations[IntegrationId.Airtable] = airtableConfig

                return config
            })

            logInfo('Successfully set up Airtable Integration.')
            return resolve()
        } catch (e) {
            logError('Unable to set up Airtable Integration.', e)
            return reject()
        }
    })
}
