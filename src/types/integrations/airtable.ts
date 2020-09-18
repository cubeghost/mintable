import { BaseIntegrationConfig, IntegrationId, IntegrationType } from '../integrations'

export interface AirtableCredentials {
  apiKey: string
}

export interface AirtableConfig extends BaseIntegrationConfig {
  id: IntegrationId.Airtable
  type: IntegrationType.Export

  credentials: AirtableCredentials

  baseId: string
}

export const defaultAirtableConfig: AirtableConfig = {
  name: 'Airtable',
  id: IntegrationId.Airtable,
  type: IntegrationType.Export,

  credentials: {
    apiKey: '',
  },

  baseId: '',
}
