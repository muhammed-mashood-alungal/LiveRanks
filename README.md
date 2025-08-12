# Real-Time Leaderboard System

A backend service for real-time game leaderboards built with Node.js, Socket.io, and Redis. This app tracks player scores, maintains leaderboards with real-time updates, supports filtering, and automatically resets daily using Redis TTL.

## Features

- Real-time player score updates via WebSockets (Socket.io)  
- Leaderboard storage and fast querying using Redis sorted sets  
- Fetch top N players efficiently  
- Filtering support by region/game mode (extendable)  
- Automatic daily reset of leaderboard at midnight via Redis TTL  
- Scalable and optimized for performance  

## Tech Stack

- Node.js  
- Socket.io  
- Redis (for leaderboard storage)  
- TypeScript

## Setup and Installation

1. **Clone the repo:**

```bash
git clone <repo-url>
cd <repo-folder>
cd /backend
npm install
npm run dev
```
***Set the env as in env.example***
