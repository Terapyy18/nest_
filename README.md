# ManuFactor3D — API NestJS

Projet backend minimal basé sur NestJS pour l'API ManuFactor3D.

Résumé
- API REST construite avec NestJS.
- Interface Swagger intégrée pour découvrir et tester les routes.
- Microservice Redis (optionnel) pour la communication interne / pub-sub.

Prerequis
- Node.js >= 16
- npm
- (optionnel) Redis si vous utilisez le microservice Redis

Installation
1. Installer les dépendances :
   npm install

Démarrage
- Mode développement :
  npm run start:dev

Configuration
- L'application écoute par défaut sur : http://localhost:4000
- Swagger UI (documentation interactive) : http://localhost:4000/api
- Microservice Redis (si activé) : redis://localhost:6379

Routes API (découverte)
- Toutes les routes exposées et leurs schémas sont disponibles dans Swagger : http://localhost:4000/api


Support rapide
- Démarrer Redis (Windows) si besoin :
  - via WSL/Docker ou exécutable redis-server.exe
