# Persistent Priority Queue

SDE Assignment - Aug 2026 (SARALWEB)

A simple priority queue built with Node.js, Express, and PostgreSQL.
The data is stored in Postgres so the queue stays intact even if the
server restarts. Postgres runs in Docker.

## Folder structure

```
.
├── module.js                 # main file - starts the server
├── db.js                     # postgres connection + table setup
├── docker-compose.yml        # postgres container
├── package.json
└── src/
    ├── app.js                # express app setup
    ├── priorityQueue.js      # queue operations (insert, peek, etc.)
    ├── controllers/
    │   └── queueController.js
    └── routes/
        └── queueRoutes.js
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start Postgres with Docker:

```bash
docker compose up -d
```

3. Start the server:

```bash
npm start
```

The server runs on `http://localhost:3000`.

## How it works

- A lower `priority` number means the item comes out first (min-heap).
- Items are stored in a `priority_queue` table in Postgres.
- Each request goes through: route → controller → priorityQueue → database.

## API

| Method | URL                       | Body                          | What it does           |
| ------ | ------------------------- | ----------------------------- | ---------------------- |
| POST   | /items                    | `{ "item": ..., "priority": n }` | Add an item         |
| GET    | /peek?order=min\|max      | -                             | See the top item       |
| POST   | /extract?order=min\|max   | -                             | Remove the top item    |
| PATCH  | /items/:id                | `{ "priority": n }`           | Change an item's priority |
| DELETE | /items/:id                | -                             | Delete an item         |
| GET    | /empty                    | -                             | Check if queue is empty |

## Example

```bash
# add an item
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"item": {"task": "send email"}, "priority": 2}'

# see the top item
curl http://localhost:3000/peek

# remove the top item
curl -X POST http://localhost:3000/extract
```

## Use cases

- Task scheduler (run higher-priority jobs first)
- Support ticket system (urgent tickets shown first)
- Notification system (send important alerts before others)
