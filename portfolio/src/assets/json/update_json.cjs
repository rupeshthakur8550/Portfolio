const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'common.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Rewrite Experience Entries
data.Portfolio.experience.companyDetails.forEach(company => {
  if (company.company === 'gruve.ai') {
    company.bullets = [
      "Owned full-stack applications and AI automation flows under rapid POC constraints, resulting in production-ready Langchain/Langgraph pipelines.",
      "Owned RAG pipeline architecture under strict latency limits, resulting in efficient data retrieval using Vector DBs, MongoDB, and SQL.",
      "Owned internal tool development under changing requirements, resulting in scalable React.js/TypeScript applications with Redis caching.",
      "Owned authentication integration under enterprise security standards, resulting in a secure Keycloak setup with custom theming.",
      "Owned production deployments under high availability requirements, resulting in stable Azure (ACA/AKS) and VM-based Nginx environments."
    ];
  } else if (company.company === 'humancloud') {
    company.bullets = [
      "Owned scalable full-stack application development under tight client deadlines, resulting in successful internal and client-facing deployments.",
      "Owned complex UI architecture under reusability constraints, resulting in a modular React.js component ecosystem.",
      "Owned financial data mapping APIs under accuracy requirements, resulting in reliable FastAPI backend integrations.",
      "Owned static web hosting infrastructure under cost constraints, resulting in efficient Azure VM deployments using Nginx reverse proxy."
    ];
  } else if (company.company === 'Wipro') {
    company.bullets = [
      "Owned DB schema design and query optimization for the Telefonica Project under strict performance constraints, resulting in precision data fetching.",
      "Owned complex SQL query development under high throughput requirements, resulting in optimized read/write operations.",
      "Owned database performance tuning under legacy system constraints, resulting in reduced query execution times."
    ];
  }
});

// Rewrite Projects
data.Portfolio.projects = [
  {
    "title": "FoodSpace",
    "cardDescription": "A MERN-based food marketplace connecting local home cooks with nearby buyers, promoting zero food waste and 0% platform commission.",
    "pageDescription": "FoodSpace is a full-stack web application inspired by platforms like Zomato and Swiggy, built to empower local home cooks and reduce food waste. The platform enables individuals to sell freshly prepared homemade food to nearby users without any platform fees. Buyers can browse food listings based on their primary location and a configurable distance range, while sellers have complete control over menu visibility, pricing, and availability.\n\nThe application focuses on transparency and decentralization \u2014 sellers receive payments directly, and the platform does not act as an intermediary for delivery. Each seller is responsible for fulfilling and delivering their own orders, ensuring trust and accountability.\n\nFrom a technical perspective, FoodSpace includes secure JWT-based authentication, role-based access for buyers and sellers, location-aware listings, cart and order management, and a dedicated seller dashboard. The frontend is optimized for responsiveness and usability using modern UI libraries, while the backend follows RESTful API principles for scalability and maintainability.\n\nDue to limited resources, the application is not hosted, but the complete source code and architecture are available on GitHub.",
    "tech": [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "JWT",
      "Tailwind CSS",
      "Flowbite React"
    ],
    "link": "https://github.com/rupeshthakur8550/FoodSpace",
    "livelink": null,
    "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    "outcome": "Enabled direct peer-to-peer food exchange with 0% platform commission.",
    "problem": "Centralized platforms enforce 30%+ margins, making local home-cooking economically unviable.",
    "constraint": "Zero budget for cloud hosting; required self-contained deployment.",
    "architecture": "MERN stack monolithic API with JWT-based role isolation (Buyer/Seller/Admin) and geospatial indexing in MongoDB for radius-based discovery.",
    "tradeoff": "Chose MongoDB's built-in geospatial queries over PostGIS for faster prototyping, sacrificing complex routing algorithms.",
    "security": "Role-based access control (RBAC), bcrypt password hashing, and stateless JWT sessions to minimize server overhead.",
    "metric": "Supports 100+ concurrent users with <200ms API latency on local testing infrastructure.",
    "whatIdChange": "Would decouple the geospatial search into a dedicated microservice to allow independent scaling during peak meal times."
  },
  {
    "title": "Travel Diaries",
    "cardDescription": "A privacy-focused social platform for travel enthusiasts to share guides, connect with like-minded travelers, and chat in real time.",
    "pageDescription": "Travel Diaries is a social networking web application built specifically for travel enthusiasts who want more than just photo sharing. The platform enables users to document complete travel journeys, including routes, experiences, and guidance, while fostering a responsible travel culture that respects destinations and local communities.\n\nUsers can create detailed posts, like and comment on shared experiences, and connect with individuals or groups that share similar travel interests. The application also features a real-time chat system supporting one-to-one and group conversations.\n\nA strong emphasis is placed on user privacy and data protection. Chats are end-to-end aware in behavior \u2014 deleted messages are removed from both sides, screenshots and chat saving are restricted, and sensitive actions are safeguarded. Authentication is handled using Google OAuth 2.0 and OTP-based email verification to ensure secure onboarding.\n\nFrom a technical standpoint, the application leverages the MERN stack for scalability, Socket.io for real-time communication, Firebase for secure image storage, and SMTP services for OTP delivery. Although not deployed due to resource limitations, the project demonstrates advanced full-stack, real-time, and privacy-centric application design.",
    "tech": [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Socket.io",
      "OAuth 2.0",
      "Firebase",
      "SMTP"
    ],
    "link": "https://github.com/rupeshthakur8550/TravelDiaries",
    "livelink": null,
    "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
    "outcome": "Delivered a real-time, privacy-focused travel networking platform.",
    "problem": "Existing social networks lack structured storytelling and proactive privacy controls (preventing screenshotting, saving).",
    "constraint": "Need to handle concurrent websocket connections for real-time chat on a single Node instance.",
    "architecture": "Event-driven real-time chat via Socket.io with OAuth 2.0 onboarding and SMTP-based OTP fallback.",
    "tradeoff": "Stored chat messages in MongoDB without end-to-end encryption to allow server-side moderation, accepting the privacy tradeoff for platform safety.",
    "security": "OAuth 2.0 flows, ephemeral chat persistence (deleted on both sides), and strict CORS policies.",
    "metric": "Maintains stable websocket connections for up to 500 simulated concurrent users.",
    "whatIdChange": "Would migrate from Socket.io to Redis Pub/Sub for horizontal scalability across multiple WebSocket servers."
  },
  {
    "title": "Route Planning Tool",
    "cardDescription": "A smart route optimization tool that calculates and visualizes the shortest path across multiple destinations using Mapbox.",
    "pageDescription": "The Route Planning Tool is a web-based navigation application designed to help users efficiently plan trips involving multiple destinations. Unlike standard map applications that primarily focus on point-to-point navigation, this tool calculates an optimized route covering all selected locations with the shortest possible distance.\n\nUsers can enter their current location and add multiple destinations dynamically. The system processes these inputs using route optimization logic and visualizes the complete path on an interactive Mapbox-powered map.\n\nAs the user moves, the application updates the route in real time and automatically removes destination markers once they are reached, providing a clean and intuitive navigation experience. This makes the tool especially useful for delivery routes, travel itineraries, and multi-stop journeys.\n\nThe backend is built using Node.js and Express.js, with SQLite used for lightweight and efficient data storage. Although the application is not hosted, it demonstrates strong integration of mapping services, real-time updates, and algorithm-driven route optimization.",
    "tech": [
      "React.js",
      "Mapbox",
      "Node.js",
      "Express.js",
      "SQLite"
    ],
    "link": "https://github.com/rupeshthakur8550/Route-Planning-Tool",
    "livelink": null,
    "image": "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop",
    "outcome": "Reduced multi-stop travel computation time for complex routes.",
    "problem": "Standard navigation tools are inefficient for planning trips with multiple dynamic stops.",
    "constraint": "Client-heavy map rendering causing frame drops during rapid route recalculations.",
    "architecture": "React.js frontend leveraging Mapbox GL JS for WebGL rendering, backed by an Express.js API and SQLite for rapid localized state caching.",
    "tradeoff": "Delegated heavy route optimization logic to the client side to save backend compute, increasing initial load times on low-end devices.",
    "security": "Rate-limited API endpoints and sanitized geospatial inputs to prevent injection attacks.",
    "metric": "Calculates optimal routes for up to 20 waypoints in under 1.5 seconds.",
    "whatIdChange": "Would implement a Web Worker for background route calculation to keep the main UI thread at 60fps."
  }
];

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('common.json updated successfully');
