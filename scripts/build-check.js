// Contrôle de "build" : le projet n'a pas d'étape de compilation, on vérifie donc que
// 1. tous les fichiers source sont syntaxiquement valides,
// 2. l'application démarre réellement et répond sur /health,
// 3. aucun avertissement Node (dépréciation, etc.) n'est émis pendant le démarrage.
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync, spawn } from 'node:child_process';

const fail = (msg) => {
  console.error(`✖ ${msg}`);
  process.exit(1);
};

// 1. Vérification syntaxique
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.js') ? [p] : [];
  });

const files = walk('src');
for (const file of files) {
  const res = spawnSync(process.execPath, ['--check', file], { encoding: 'utf-8' });
  if (res.status !== 0) fail(`Erreur de syntaxe dans ${file}\n${res.stderr}`);
}
console.log(`✔ Syntaxe valide (${files.length} fichiers)`);

// 2. & 3. Démarrage réel du serveur
const port = 3000 + Math.floor(Math.random() * 1000) + 1000;
const server = spawn(process.execPath, ['src/server.js'], {
  env: { ...process.env, PORT: String(port), NODE_ENV: 'production' },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let stderr = '';
server.stderr.on('data', (d) => (stderr += d));

const stop = (code, msg) => {
  server.kill();
  if (code) fail(msg);
  console.log(`✔ ${msg}`);
  process.exit(0);
};

server.on('exit', (code) => {
  if (code) fail(`Le serveur s'est arrêté avec le code ${code}\n${stderr}`);
});

const deadline = Date.now() + 10_000;
const poll = async () => {
  try {
    const res = await fetch(`http://localhost:${port}/health`);
    if (res.ok) {
      if (/warning/i.test(stderr)) return stop(1, `Avertissement émis au démarrage :\n${stderr}`);
      return stop(0, 'Le serveur démarre et répond sur /health sans avertissement');
    }
  } catch {
    // serveur pas encore prêt
  }
  if (Date.now() > deadline) return stop(1, `Le serveur n'a pas répondu à temps\n${stderr}`);
  setTimeout(poll, 200);
};
poll();
