<p align="center">
  <img src="src/assets/Marcus-Camargo-Logo-Transparente.png" alt="Marcus Camargo Portfólio" width="250" />
</p>

# 💻 Marcus Camargo — Portfólio

> Portfólio profissional para apresentar projetos reais, serviços de desenvolvimento e minha evolução técnica como desenvolvedor.

[![React](https://img.shields.io/badge/React-19.1-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Responsive](https://img.shields.io/badge/Layout-Responsive-ff0a78)](#-experiência-e-responsividade)

🌐 **Portfólio:** https://marcuscamargo-portfolio.mcpt.workers.dev/  
👔 **Área para recrutadores:** https://marcuscamargo-portfolio.mcpt.workers.dev/recrutadores

---

## Sobre o projeto

O **Marcus Camargo — Portfólio** é meu ponto central de apresentação profissional. Ele reúne uma página comercial para serviços e contato, uma área dedicada a recrutadores e estudos de caso dos projetos que já atingiram nível de apresentação pública.

A proposta é mostrar não apenas o resultado visual, mas também contexto, decisões de produto, desafios técnicos, integrações, responsividade, segurança, deploy e evolução de arquitetura.

---

## ✨ Experiência principal

### Página comercial

A página principal apresenta:

- identidade e posicionamento profissional;
- serviços de desenvolvimento e automação;
- carrossel de projetos em destaque;
- previews próprios e responsivos;
- apresentação sobre o trabalho;
- canais de contato;
- acesso direto à área para recrutadores.

### Área para recrutadores

A rota `/recrutadores` concentra estudos de caso técnicos com:

- problema e motivação;
- evolução da solução;
- stack principal;
- dificuldades que exigiram investigação;
- aprendizados;
- links para aplicação e repositório quando disponíveis.

### Política de Privacidade

A rota `/privacidade` mantém a página dedicada às informações de privacidade do site.

O roteamento institucional permanece leve e sem React Router: as rotas são selecionadas diretamente no ponto de entrada da aplicação.

---

## 🚀 Projetos em destaque

### 🎬 Letreiro

Jogo diário de descoberta de filmes com desafio automático, dicas progressivas, calendário de partidas anteriores, persistência local, integração com Supabase e TMDB e automação por GitHub Actions.

🌐 https://letreiro-cine-puzzle.vercel.app/pt-br  
📦 https://github.com/Marcus-W-Camargo/Letreiro

### 🛒 Liste & Compre

Aplicação web para acompanhar uma compra do planejamento à conclusão, com contas individuais, listas sincronizadas, quantidades por unidade ou quilograma, acompanhamento de preços, histórico e reutilização de compras anteriores.

🌐 https://listeecompre.vercel.app/  
📦 https://github.com/Marcus-W-Camargo/liste-e-compre

### 📱 Liste & Compre App

Aplicativo Android independente do ecossistema Liste & Compre, criado em React Native + Expo e integrado ao mesmo backend Supabase da versão web. A experiência mobile possui navegação própria, compra em andamento persistida no aparelho, histórico, autenticação, perfil e tratamento específico para safe areas, gestos, câmera e galeria.

No momento, o projeto é apresentado pelo repositório enquanto a distribuição pública do aplicativo não está documentada.

📦 https://github.com/Marcus-W-Camargo/Liste-Compre-APP

---

## 🖼️ Previews dos projetos

Os previews do portfólio não executam os projetos reais em iframes. São representações visuais construídas no próprio frontend para manter desempenho, preservar a identidade do portfólio e apresentar rapidamente cada solução antes de o visitante abrir a aplicação real.

O preview do Liste & Compre App reproduz a linguagem visual do aplicativo e atualmente destaca a tela de histórico em um mockup de celular.

---

## 🎨 Identidade visual

O portfólio utiliza uma identidade dark/neon com fundo escuro, rosa e magenta como acentos, gradientes, glow, cards arredondados e animações. A mesma linguagem é mantida na página comercial e na área para recrutadores.

O hero usa elementos animados em órbitas ovais ao redor da identidade principal, com trajetórias e opacidade ajustadas para desktop e mobile.

---

## 📱 Experiência e responsividade

O layout possui tratamentos específicos para:

- desktop largo;
- desktop estreito e janelas divididas;
- tablets e larguras intermediárias;
- celulares.

O header possui um estado intermediário próprio para reduzir colisões em janelas estreitas antes de chegar ao layout mobile completo. Projetos, grids, CTAs, tipografia e animações também recebem ajustes por breakpoint.

---

## 🧠 Decisões de implementação

### Dados dos projetos centralizados

Os metadados dos projetos apresentados na página comercial ficam em:

```text
src/data/projects.ts
```

### Componentes reutilizáveis

Cabeçalho, títulos de seção e previews são separados em componentes próprios para reduzir repetição e manter consistência.

### Roteamento institucional leve

As páginas `/`, `/privacidade` e `/recrutadores` são selecionadas diretamente em `src/main.tsx`, mantendo a arquitetura proporcional ao tamanho do projeto.

---

## ☁️ Infraestrutura

A publicação atual utiliza **Cloudflare Workers** com assets estáticos. O `wrangler.jsonc` aponta para `dist`, habilita URLs de preview e usa fallback de SPA para as rotas institucionais.

O deploy é integrado ao GitHub e novos commits na branch de produção são acompanhados pelo pipeline do Cloudflare.

---

## 🏗️ Stack

| Camada | Tecnologia | Responsabilidade |
| --- | --- | --- |
| Interface | React 19.1 | Componentes e estrutura |
| Linguagem | TypeScript 5.8 | Tipagem e manutenção |
| Build | Vite 7.1 | Desenvolvimento e bundle |
| Estilização | CSS | Layout, animações e responsividade |
| Ícones | Lucide React | Elementos visuais |
| Hospedagem | Cloudflare Workers | Publicação dos assets |
| Deploy | Wrangler + GitHub | Build, preview e publicação |

---

## 📁 Estrutura principal

```text
.
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   │   └── projects.ts
│   ├── App.tsx
│   ├── RecruiterPage.tsx
│   ├── PrivacyPage.tsx
│   ├── main.tsx
│   └── *.css
├── wrangler.jsonc
├── vite.config.ts
├── package.json
└── README.md
```

---

## ⚙️ Execução local

```bash
git clone https://github.com/Marcus-W-Camargo/Marcus.Camargo-Portfolio.git
cd Marcus.Camargo-Portfolio
npm install
npm run dev
```

Validação:

```bash
npm run lint
npm run build
```

Preview local do build:

```bash
npm run preview
```

---

## 👨‍💻 Autor

Desenvolvido por **Marcus Camargo**.

**GitHub:** https://github.com/Marcus-W-Camargo  
**Portfólio:** https://marcuscamargo-portfolio.mcpt.workers.dev/  
**Área para recrutadores:** https://marcuscamargo-portfolio.mcpt.workers.dev/recrutadores

---

## Marcus Camargo

**Projetos reais. Evolução contínua. Soluções digitais.**
