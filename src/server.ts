import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GscApiClient } from './api/client.js';
import { registerSiteTools } from './tools/sites/index.js';
import { registerSitemapTools } from './tools/sitemaps/index.js';
import { registerPerformanceTools } from './tools/performance/index.js';
import { registerOpportunityTools } from './tools/opportunities/index.js';
import { registerIndexingTools } from './tools/indexing/index.js';
import { registerQueryTools } from './tools/queries/index.js';
import { registerReportTools } from './tools/reports/index.js';

export function createServer(api: GscApiClient): McpServer {
  const server = new McpServer({
    name: 'awesome-gsc-mcp',
    version: '1.0.0',
  });

  // Register all tool groups
  registerSiteTools(server, api);
  registerSitemapTools(server, api);
  registerPerformanceTools(server, api);
  registerOpportunityTools(server, api);
  registerIndexingTools(server, api);
  registerQueryTools(server, api);
  registerReportTools(server, api);

  return server;
}
