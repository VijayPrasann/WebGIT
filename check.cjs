const { execSync } = require('child_process');
const fs = require('fs');

try { execSync('npx tsc -b', { encoding: 'utf8', stdio: 'pipe' }); } catch (e) { fs.writeFileSync('tsc_out.txt', e.stdout || e.message); }
try { execSync('npx eslint .', { encoding: 'utf8', stdio: 'pipe' }); } catch (e) { fs.writeFileSync('eslint_out.txt', e.stdout || e.message); }
