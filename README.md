# TaskManager
 
Fullstack application for manage your tasks.
 
---
 
## Tech Stack
 
**Backend**
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)


**Frontend**
- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [SCSS](https://sass-lang.com/)
---
 
## Getting Started
 
### Backend
 
```bash
cd todo_backend
npm install
npm run start:dev
```
 
### Frontend
 
```bash
cd todo-frontend
npm install
npm run dev
```
 
---
 
## Project Structure
 
```
task-manager/
├── todo-frontend/               # React frontend
│   ├── src/
│   │   ├── store/       # Redux store, RTK Query API
│   │   ├── Pages/
│   │   ├── assets/      # Media
│   │   ├── components/
│   │   ├── features/    # Redux Slices
│   │   ├── hooks/
│   │   └── types/
│   └── package.json
│
└── todo_backend/               # NestJS backend
    ├── prisma/
    ├── src/
    │   ├── dto          # Validation Classes
    │   ├── auth
    │   ├── features     # Guards
    │   ├── lib          # Prisma ORM
    │   ├── tasks
    │   ├── types
    │   ├── users
    │   └── main.ts
    └── package.json
```
 

