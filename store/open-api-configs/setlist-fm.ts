import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'https://api.setlist.fm/docs/1.0/ui/swagger.json',
  apiFile: '../services/setlistFm/base.ts',
  apiImport: 'setlistFmApi',
  outputFile: '../services/setlistFm/api.ts',
  exportName: 'setlistFmApi',
  hooks: true,
}

export default config
