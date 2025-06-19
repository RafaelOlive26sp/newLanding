import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurações do servidor
const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
  STATIC_DIR: 'dist',
  INDEX_FILE: 'index.html',
};

// Configuração de caminhos
const getCurrentDirConfig = () => {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDir = path.dirname(currentFilePath);
  return {
    staticPath: path.join(currentDir, SERVER_CONFIG.STATIC_DIR),
    indexPath: path.join(currentDir, SERVER_CONFIG.STATIC_DIR, SERVER_CONFIG.INDEX_FILE),
  };
};

const initializeServer = () => {
  const app = express();
  const paths = getCurrentDirConfig();

  // Configuração de middlewares
  app.use(express.static(paths.staticPath));

  // Configuração de rotas
  app.get('*', (req, res) => {
    res.sendFile(paths.indexPath);
  });

  // Inicialização do servidor
  app.listen(SERVER_CONFIG.PORT, () => {
    console.log(`Servidor rodando na porta ${SERVER_CONFIG.PORT}`);
  });

  return app;
};

// Iniciar servidor
initializeServer();
