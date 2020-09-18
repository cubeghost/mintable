import { PlaidConfig } from './integrations/plaid'
import { GoogleConfig } from './integrations/google'
import { AirtableConfig } from './integrations/airtable'
import { CSVImportConfig } from './integrations/csv-import'
import { CSVExportConfig } from './integrations/csv-export'

export enum IntegrationType {
    Import = 'import',
    Export = 'export'
}

export enum IntegrationId {
    Plaid = 'plaid',
    Google = 'google',
    Airtable = 'airtable',
    CSVImport = 'csv-import',
    CSVExport = 'csv-export'
}

export interface BaseIntegrationConfig {
    id: IntegrationId
    name: string
    type: IntegrationType
}

export type IntegrationConfig = PlaidConfig | GoogleConfig | AirtableConfig | CSVImportConfig | CSVExportConfig
