import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'https://api.setlist.fm/docs/1.0/ui/swagger.json',
  apiFile: '../services/setlistFm/base.ts',
  apiImport: 'setlistFmApi',
  outputFile: '../services/setlistFm/index.ts',
  exportName: 'setlistFmApi',
  hooks: true,
}

export default config