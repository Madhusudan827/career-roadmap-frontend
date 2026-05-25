export interface CareerRole {
  id: string;
  title: string;
  description: string;
  icon: string;
  totalTopics: number;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  stage: number;
  isCompleted: boolean;
}

export interface UserProgress {
  selectedRole: CareerRole | null;
  completedTopics: string[];
  totalTopics: number;
}

export const careerRoles: CareerRole[] = [
  {
    id: "java-developer",
    title: "Java Developer",
    description: "Master enterprise-grade applications with Java, Spring Boot, and microservices architecture.",
    icon: "☕",
    totalTopics: 12,
  },
  {
    id: "python-developer",
    title: "Python Developer",
    description: "Build powerful applications with Python, Django/Flask, and data processing capabilities.",
    icon: "🐍",
    totalTopics: 11,
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    description: "Create stunning user interfaces with React, TypeScript, and modern CSS frameworks.",
    icon: "🎨",
    totalTopics: 13,
  },
  {
    id: "vlsi-engineer",
    title: "VLSI Engineer",
    description: "Design integrated circuits and semiconductor devices using Verilog and industry tools.",
    icon: "⚡",
    totalTopics: 10,
  },
];

export const roadmapData: Record<string, RoadmapTopic[]> = {
  "java-developer": [
    { id: "java-1", title: "Java Fundamentals", description: "Variables, data types, operators, and control flow", stage: 1, isCompleted: false },
    { id: "java-2", title: "Object-Oriented Programming", description: "Classes, inheritance, polymorphism, and encapsulation", stage: 1, isCompleted: false },
    { id: "java-3", title: "Collections Framework", description: "Lists, Sets, Maps, and iterators", stage: 2, isCompleted: false },
    { id: "java-4", title: "Exception Handling", description: "Try-catch, custom exceptions, and best practices", stage: 2, isCompleted: false },
    { id: "java-5", title: "Java I/O & Serialization", description: "File handling, streams, and object serialization", stage: 2, isCompleted: false },
    { id: "java-6", title: "Multithreading & Concurrency", description: "Threads, executors, and synchronization", stage: 3, isCompleted: false },
    { id: "java-7", title: "JDBC & Database Connectivity", description: "Database connections, queries, and transactions", stage: 3, isCompleted: false },
    { id: "java-8", title: "Spring Framework Basics", description: "Dependency injection, beans, and configuration", stage: 4, isCompleted: false },
    { id: "java-9", title: "Spring Boot", description: "Auto-configuration, REST APIs, and deployment", stage: 4, isCompleted: false },
    { id: "java-10", title: "Hibernate & JPA", description: "ORM, entity mapping, and database operations", stage: 4, isCompleted: false },
    { id: "java-11", title: "Microservices Architecture", description: "Service design, communication, and deployment", stage: 5, isCompleted: false },
    { id: "java-12", title: "Testing & DevOps", description: "JUnit, Mockito, CI/CD, and containerization", stage: 5, isCompleted: false },
  ],
  "python-developer": [
    { id: "python-1", title: "Python Basics", description: "Syntax, data types, and control structures", stage: 1, isCompleted: false },
    { id: "python-2", title: "Functions & Modules", description: "Function definitions, modules, and packages", stage: 1, isCompleted: false },
    { id: "python-3", title: "OOP in Python", description: "Classes, inheritance, and magic methods", stage: 2, isCompleted: false },
    { id: "python-4", title: "File Handling & Exceptions", description: "File I/O, context managers, and error handling", stage: 2, isCompleted: false },
    { id: "python-5", title: "Data Structures", description: "Lists, dictionaries, sets, and comprehensions", stage: 2, isCompleted: false },
    { id: "python-6", title: "Virtual Environments & pip", description: "Package management and dependency isolation", stage: 3, isCompleted: false },
    { id: "python-7", title: "Django Framework", description: "MVC pattern, models, views, and templates", stage: 3, isCompleted: false },
    { id: "python-8", title: "REST APIs with DRF", description: "Django REST Framework and API development", stage: 4, isCompleted: false },
    { id: "python-9", title: "Database Integration", description: "PostgreSQL, SQLAlchemy, and migrations", stage: 4, isCompleted: false },
    { id: "python-10", title: "Testing & Debugging", description: "pytest, unittest, and debugging techniques", stage: 5, isCompleted: false },
    { id: "python-11", title: "Deployment & DevOps", description: "Docker, AWS, and CI/CD pipelines", stage: 5, isCompleted: false },
  ],
  "frontend-developer": [
    { id: "frontend-1", title: "HTML5 Fundamentals", description: "Semantic HTML, forms, and accessibility", stage: 1, isCompleted: false },
    { id: "frontend-2", title: "CSS3 & Layouts", description: "Flexbox, Grid, and responsive design", stage: 1, isCompleted: false },
    { id: "frontend-3", title: "JavaScript Essentials", description: "Variables, functions, and DOM manipulation", stage: 1, isCompleted: false },
    { id: "frontend-4", title: "ES6+ Features", description: "Arrow functions, destructuring, and modules", stage: 2, isCompleted: false },
    { id: "frontend-5", title: "TypeScript", description: "Types, interfaces, and type safety", stage: 2, isCompleted: false },
    { id: "frontend-6", title: "React Fundamentals", description: "Components, JSX, and props", stage: 3, isCompleted: false },
    { id: "frontend-7", title: "React Hooks & State", description: "useState, useEffect, and custom hooks", stage: 3, isCompleted: false },
    { id: "frontend-8", title: "State Management", description: "Context API, Redux, and Zustand", stage: 3, isCompleted: false },
    { id: "frontend-9", title: "CSS Frameworks", description: "Tailwind CSS, styled-components, and CSS modules", stage: 4, isCompleted: false },
    { id: "frontend-10", title: "Next.js", description: "SSR, SSG, and full-stack React", stage: 4, isCompleted: false },
    { id: "frontend-11", title: "Testing", description: "Jest, React Testing Library, and E2E tests", stage: 5, isCompleted: false },
    { id: "frontend-12", title: "Performance Optimization", description: "Lazy loading, code splitting, and caching", stage: 5, isCompleted: false },
    { id: "frontend-13", title: "Deployment & CI/CD", description: "Vercel, Netlify, and GitHub Actions", stage: 5, isCompleted: false },
  ],
  "vlsi-engineer": [
    { id: "vlsi-1", title: "Digital Electronics Basics", description: "Logic gates, Boolean algebra, and number systems", stage: 1, isCompleted: false },
    { id: "vlsi-2", title: "Combinational Circuits", description: "Multiplexers, decoders, and arithmetic circuits", stage: 1, isCompleted: false },
    { id: "vlsi-3", title: "Sequential Circuits", description: "Flip-flops, counters, and state machines", stage: 2, isCompleted: false },
    { id: "vlsi-4", title: "Verilog HDL", description: "Hardware description language fundamentals", stage: 2, isCompleted: false },
    { id: "vlsi-5", title: "FPGA Design", description: "FPGA architecture and implementation", stage: 3, isCompleted: false },
    { id: "vlsi-6", title: "ASIC Design Flow", description: "Synthesis, placement, and routing", stage: 3, isCompleted: false },
    { id: "vlsi-7", title: "Timing Analysis", description: "Setup, hold time, and clock domain crossing", stage: 4, isCompleted: false },
    { id: "vlsi-8", title: "Low Power Design", description: "Power optimization techniques", stage: 4, isCompleted: false },
    { id: "vlsi-9", title: "Verification & Testing", description: "Testbench development and simulation", stage: 5, isCompleted: false },
    { id: "vlsi-10", title: "Physical Design", description: "Floor planning and design rule checking", stage: 5, isCompleted: false },
  ],
};

export const stageNames: Record<number, string> = {
  1: "Foundation",
  2: "Core Concepts",
  3: "Intermediate",
  4: "Advanced",
  5: "Professional",
};
