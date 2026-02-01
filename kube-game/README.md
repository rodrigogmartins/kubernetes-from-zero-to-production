# Kube Game

Kube Game is an educational, game-based project designed to teach Kubernetes concepts in a visual and interactive way.

Instead of only reading documentation, players learn by *acting as Kubernetes itself*, managing nodes, pods, and cluster behavior through hands-on challenges.

## 🎮 How It Works

The game is structured into **phases (worlds)**.  
Each phase represents a conceptual step in Kubernetes learning.

- Players interact with a simulated cluster
- Tasks guide the player’s actions
- Each completed task explains *what happened* and *why*
- Concepts are reinforced through cause-and-effect, not quizzes

## 🧠 Phase 1 – Core Concepts

Phase 1 focuses on the fundamentals:

- Nodes and Pods
- Scheduling behavior
- Lack of self-healing without controllers
- Pod states when no nodes are available

This phase helps players understand **why Kubernetes abstractions exist**, before introducing them.

## 🚀 Running the Game Locally

```bash
npm install
npm run dev
```

The game will be available at:

[http://localhost:5173](http://localhost:5173)

## 🛠 Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Game-style state management
- Deployed as a static site (S3 + CloudFront)

## 🧭 Roadmap

- Phase 2: ReplicaSet & desired state
- Phase 3: Deployments & rollouts
- Phase 4: Services & networking
- Achievements, progression, and visual feedback improvements

## 📌 Project Status

This project is under active development.  
New phases and mechanics will be added progressively.

Contributions and feedback are welcome.
