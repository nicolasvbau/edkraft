// Dev-only: minimal server that mimics Vercel's /api/chat handler.
// Run with: node start-api-dev.cjs  (needs ANTHROPIC_API_KEY in env)

const http = require('http')

const SYSTEM_PROMPT = require('fs').readFileSync(
  require('path').join(__dirname, 'api', 'chat.js'),
  'utf8'
).match(/const SYSTEM_PROMPT = `([\s\S]*?)`/)?.[1] || ''

const PORT = 3001

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.method !== 'POST' || !req.url.startsWith('/api/chat')) {
    res.writeHead(404)
    res.end('Not found')
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY nao configurada. Rode: set ANTHROPIC_API_KEY=sk-ant-xxx antes de iniciar' }))
    return
  }

  let body = ''
  req.on('data', chunk => (body += chunk))
  req.on('end', async () => {
    try {
      const { messages } = JSON.parse(body)
      const anthropicMessages = messages.slice(-20).map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }))

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 400,
          system: SYSTEM_PROMPT,
          messages: anthropicMessages,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Anthropic API error:', data)
        res.writeHead(502, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Erro na API Anthropic', detail: data }))
        return
      }

      const text = data?.content?.[0]?.text || 'Sem resposta'
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ text }))
    } catch (err) {
      console.error(err)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: err.message }))
    }
  })
})

server.listen(PORT, () => {
  console.log(`\n>>> Ed Conselheiro API dev server rodando em http://localhost:${PORT}/api/chat`)
  console.log(`>>> ANTHROPIC_API_KEY ${process.env.ANTHROPIC_API_KEY ? 'OK' : 'NAO CONFIGURADA'}`)
})
