# awesome-gsc-mcp

**The most powerful Google Search Console MCP server -- analyzes data like an SEO professional with benchmarks, recommendations, and actionable insights.**

[![npm version](https://img.shields.io/npm/v/awesome-gsc-mcp.svg)](https://www.npmjs.com/package/awesome-gsc-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-green.svg)](https://nodejs.org/)

---

## Features

- **27 tools** across 7 categories covering every aspect of Google Search Console
- **Smart analysis engine** with CTR benchmarks, trend detection, query intent classification, opportunity scoring, and a recommendation engine
- **In-memory caching** for fast repeat queries
- **Rate limiting** (20 req/s with burst of 30) to stay within API quotas
- **Dual transport** -- stdio (default) and HTTP for flexible integration
- **Auto-detecting authentication** -- service account, OAuth, or auto-detect from `credentials.json`

---

## Quick Start

```bash
npx awesome-gsc-mcp
```

That's it. The server starts on stdio and is ready to connect to Claude Desktop or Claude Code. You just need valid Google credentials (see below).

---

## Authentication Setup

The server tries authentication methods in priority order and uses the first one that succeeds.

### Option 1: Service Account (recommended for automation)

1. Go to [Google Cloud Console](https://console.cloud.google.com/) and navigate to **IAM & Admin > Service Accounts**
2. Create a service account and download the JSON key file
3. In [Google Search Console](https://search.google.com/search-console/) go to **Settings > Users and permissions** and add the service account email as an owner
4. Set the environment variable:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
```

### Option 2: OAuth (for individual use)

1. Go to [Google Cloud Console](https://console.cloud.google.com/) and navigate to **APIs & Services > Credentials**
2. Click **Create Credentials > OAuth client ID** and select **Desktop app**
3. Download the client secrets JSON file
4. Set the environment variable:

```bash
export GSC_OAUTH_CLIENT_SECRETS_FILE="/path/to/client-secrets.json"
```

5. On first run, the server opens a browser window for you to authorize access. Tokens are cached at `~/.awesome-gsc-mcp/token.json` for subsequent runs.

### Option 3: Auto-detect

Place a `credentials.json` file (either a service account key or OAuth client secrets) in the current working directory. The server inspects the file and detects the type automatically.

---

## Configuration

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gsc": {
      "command": "npx",
      "args": ["awesome-gsc-mcp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/service-account-key.json"
      }
    }
  }
}
```

### Claude Code

Add to your `.claude/settings.json`:

```json
{
  "mcpServers": {
    "gsc": {
      "command": "npx",
      "args": ["awesome-gsc-mcp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/service-account-key.json"
      }
    }
  }
}
```

---

## Tool Reference

All 27 tools organized by category:

### Property Management (4 tools)

| Tool | Description |
| --- | --- |
| `list_properties` | List all Search Console properties accessible to the authenticated account |
| `get_property_details` | Get detailed information about a specific property |
| `add_property` | Add a new site to Search Console |
| `delete_property` | Remove a site from Search Console |

### Performance & Traffic (6 tools)

| Tool | Description |
| --- | --- |
| `get_search_analytics` | Query raw search analytics data with flexible parameters (dimensions, filters, date ranges) |
| `get_performance_summary` | High-level performance overview with automatic period-over-period comparison |
| `compare_periods` | Compare search performance between two custom date periods side by side |
| `get_top_queries` | Top search queries by clicks with CTR benchmark analysis |
| `get_top_pages` | Top pages by clicks with CTR analysis and recommendations |
| `get_traffic_by_device` | Traffic breakdown by device type (desktop, mobile, tablet) with mobile-first insights |

### Smart Opportunity Analysis (5 tools)

| Tool | Description |
| --- | --- |
| `find_quick_wins` | Find "money on the table" SEO opportunities: CTR gaps, almost-page-1 queries, quick position gains |
| `find_declining_content` | Find pages and queries losing traffic with root cause diagnosis |
| `find_ctr_opportunities` | Pages with CTR significantly below benchmarks, with position-specific recommendations |
| `find_content_gaps` | Content creation opportunities: homepage-ranking queries, zero-click queries, new emerging queries |
| `find_what_to_build_next` | Intent-based content planning: questions, comparisons, problems, buying signals grouped by topic cluster |

### URL Inspection & Indexing (3 tools)

| Tool | Description |
| --- | --- |
| `inspect_url` | Inspect a URL for indexing status, crawl info, mobile usability, and rich results |
| `batch_inspect_urls` | Inspect multiple URLs in one call |
| `check_indexing_issues` | Identify common indexing problems across your site |

### Sitemap Management (4 tools)

| Tool | Description |
| --- | --- |
| `list_sitemaps` | List all sitemaps submitted for a property |
| `get_sitemap_details` | Get detailed information about a specific sitemap |
| `submit_sitemap` | Submit a new sitemap to Search Console |
| `delete_sitemap` | Remove a sitemap from Search Console |

### Query Intelligence (3 tools)

| Tool | Description |
| --- | --- |
| `analyze_query_landscape` | Intent distribution, branded vs non-branded split, position bucket analysis |
| `find_new_queries` | Discover emerging and truly new queries between periods |
| `find_cannibalization` | Find multiple pages competing for the same query |

### Composite Reports (2 tools)

| Tool | Description |
| --- | --- |
| `weekly_seo_report` | Full weekly SEO performance report with trends, top movers, and recommendations |
| `seo_health_check` | Comprehensive health check with a letter grade and prioritized action items |

---

## Example Prompts

Once connected to Claude, try natural language prompts like these:

```
"How is my site doing?"
```
```
"What content should I create next?"
```
```
"Find pages with low CTR that I should fix"
```
```
"Show me queries that are declining"
```
```
"What are my quick win opportunities?"
```
```
"Compare my performance this month vs last month"
```
```
"Run a full SEO health check on my site"
```
```
"Are there any indexing issues on my site?"
```
```
"Which queries have keyword cannibalization?"
```
```
"Generate a weekly SEO report"
```

---

## Analysis Engine

The server goes beyond raw data with a built-in analysis engine:

- **CTR Benchmarks** -- Compares your click-through rates against industry-average benchmarks by position. Flags pages that underperform and estimates how many additional clicks you could gain.
- **Trend Detection** -- Analyzes time-series data to detect upward, downward, or stable trends across your queries and pages.
- **Query Classification** -- Classifies queries by user intent (informational, investigational, transactional, navigational, problem-solving) and sub-type (how-to, comparison, review, error/fix, and more).
- **Opportunity Scoring** -- Scores every opportunity by traffic impact potential, factoring in impressions, CTR gap, position proximity, and volume.
- **Recommendation Engine** -- Generates specific, prioritized recommendations based on the data patterns found in your property.

---

## API Limitations

The Google Search Console API has known limitations. The following data is **not available** through the API and therefore not provided by this server:

- **Core Web Vitals** -- Page experience and performance metrics
- **Crawl Stats** -- Crawl requests, response times, host status
- **Manual Actions** -- Penalties and security issues
- **Links Report** -- Internal and external link data
- **Removals** -- URL removal requests
- **Rich Results** -- Detailed rich result reports (basic info is available via URL Inspection)

These reports are only available in the Search Console web interface.

---

## HTTP Transport

For environments that prefer HTTP over stdio, start the server with the `--http` flag:

```bash
npx awesome-gsc-mcp --http
```

The server listens on port 3000 by default. Override with the `PORT` environment variable:

```bash
PORT=8080 npx awesome-gsc-mcp --http
```

Endpoints:

| Path | Method | Description |
| --- | --- | --- |
| `/mcp` | POST | MCP protocol endpoint (Streamable HTTP transport) |
| `/health` | GET | Health check -- returns `{"status":"ok","auth":"..."}` |

---

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Development mode (watch + rebuild)
npm run dev

# Type check
npm run lint

# Start locally (stdio)
npm start

# Start locally (HTTP)
npm start -- --http
```

---

## vs Competitors

| Feature | awesome-gsc-mcp | Basic GSC MCP servers |
| --- | :---: | :---: |
| Raw search analytics | Yes | Yes |
| CTR benchmark analysis | Yes | No |
| Quick win detection | Yes | No |
| Declining content alerts | Yes | No |
| Content gap analysis | Yes | No |
| Intent-based content planning | Yes | No |
| Query cannibalization detection | Yes | No |
| Composite SEO reports | Yes | No |
| Trend detection | Yes | No |
| Opportunity scoring | Yes | No |
| Recommendation engine | Yes | No |
| OAuth + Service Account auth | Yes | Varies |
| HTTP transport | Yes | Rare |
| Caching + rate limiting | Yes | Rare |
| Total tools | 27 | 5-10 |

---

## License

[MIT](LICENSE)
