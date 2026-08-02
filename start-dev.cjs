const { execSync } = require('child_process')
process.chdir(__dirname)
execSync('npx vite --port 5173 --host', {
  stdio: 'inherit',
  env: { ...process.env, PATH: 'C:\\Program Files\\nodejs;' + process.env.PATH }
})
