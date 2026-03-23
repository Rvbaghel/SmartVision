kids-learning-ai/
│
├── frontend/        # React + TypeScript + Tailwind
├── backend/         # FastAPI + ML models
├── dataset/         # Training data (later)
├── docs/            # Project report / diagrams
└── README.md

frontend/
│
├── public/
├── src/
│   ├── assets/        # images, icons, sounds
│   ├── components/    # reusable UI components
│   ├── pages/         # main pages
│   ├── layouts/       # page layouts
│   ├── routes/        # routing
│   ├── services/      # API calls
│   ├── hooks/         # custom hooks
│   ├── types/         # TypeScript types
│   ├── utils/         # helper functions
│   ├── App.tsx
│   └── main.tsx
│
├── tailwind.config.js
├── tsconfig.json
└── package.json


backend/
│
├── app/
│   ├── main.py           # entry point
│   ├── routes/           # API endpoints
│   ├── models/           # ML models
│   ├── schemas/          # request/response schemas
│   ├── services/         # business logic
│   ├── database/         # DB connection
│   └── utils/
│
├── requirements.txt
└── config.py

components/
│
├── Button.tsx
├── Card.tsx
├── Navbar.tsx
├── QuestionBox.tsx
├── ScoreBoard.tsx
├── Loader.tsx