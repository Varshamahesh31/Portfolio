/**
 * Central Portfolio Data & Configuration File
 * 
 * Edit this file to update personal details, links, projects, 
 * timeline entries, skills, and achievements across the entire portfolio.
 */

export const portfolioData = {
  // Personal & Professional Identity
  personal: {
    name: "Varsha M R",
    shortName: "Varsha Mahesh",
    role: "Software Developer | Full-Stack & Backend Developer",
    headline: "Software Developer | Full-Stack & Backend Developer",
    supportingCopy:
      "Building secure, user-focused web applications and machine learning solutions with Python, FastAPI, React, Node.js, SQL, and MongoDB.",
    location: "Nelamangala, Karnataka",
    email: "varshamahesh3101@gmail.com",
    phone: "+91 9035313445",
    github: "https://github.com/Varshamahesh31",
    portfolio: "https://portfoliovarsha-kohl.vercel.app",
    
    // IMPORTANT: Check/replace this LinkedIn URL if your official vanity URL differs
    linkedIn: "https://www.linkedin.com/in/varsha-mahesh-8304b5270",

    // Resume PDF location: Place your resume PDF in frontend/public/ and update this path if needed
    resumePdf: "/VarshaCV.pdf",
    resumeDownloadName: "Varsha_MR_Resume.pdf",

    availability: "Open to software development opportunities and collaborations",
    profileImage: "/varsha.jpeg"
  },

  // Hero Section Statistics
  heroStats: [
    {
      number: "3",
      label: "Featured Projects"
    },
    {
      number: "13 Months",
      label: "Development Experience"
    },
    {
      number: "Rank 1,119",
      label: "Amazon ML Challenge",
      sublabel: "Top 1.4% of 82,000+ Teams"
    }
  ],

  // About Section Copy
  about: {
    paragraph1:
      "I am a Computer Science and Engineering student and software developer with hands-on experience in full-stack development, REST API development, database integration, and machine learning applications. I enjoy building maintainable software solutions that solve real-world problems.",
    paragraph2:
      "My core skills include Python, Java, JavaScript, React.js, Node.js, FastAPI, SQL, MongoDB, and machine learning with Scikit-learn."
  },

  // Experience & Education Timeline
  // Strictly verified entries only - no unconfirmed leadership/cloud/internship claims
  experienceEducation: [
    {
      title: "Software Developer",
      organization: "MyTechZ",
      duration: "7 months",
      type: "Experience",
      description:
        "Contributed to a technology job portal with AI-powered career tools. Worked on profile management, authentication, database integration, application workflows, and resume-building and job-related features.",
      skills: ["React.js", "JavaScript", "Authentication", "Database Integration", "API Integration"]
    },
    {
      title: "Software Development Intern",
      organization: "EtherX",
      duration: "6 months",
      type: "Experience",
      description:
        "Worked on application development tasks involving JavaScript, backend logic, database queries, REST API integration, debugging, testing, and troubleshooting across application components.",
      skills: ["JavaScript", "Backend Logic", "SQL", "REST APIs", "Testing"]
    },
    {
      title: "Bachelor of Engineering in Computer Science and Engineering",
      organization: "Visvesvaraya Technological University",
      duration: "Expected 2026",
      type: "Education",
      description: "Expected graduation: 2026\nCGPA: 8.91/10",
      skills: ["OOP", "DSA", "DBMS", "Software Engineering"]
    },
    {
      title: "Data Science Training",
      organization: "Corizo",
      duration: "Training",
      type: "Training",
      description:
        "Completed data science training focused on machine learning concepts and practical data analysis.",
      skills: ["Python", "Machine Learning", "SQL"]
    }
  ],

  // Skills Section - Strictly organized into 4 confirmed groups
  skillGroups: [
    {
      category: "Frontend",
      skills: ["React.js", "JavaScript", "HTML", "CSS", "Tailwind CSS"]
    },
    {
      category: "Backend and APIs",
      skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "SQLAlchemy", "Pydantic"]
    },
    {
      category: "Databases and tools",
      skills: ["MySQL", "MongoDB", "SQLite", "Git", "GitHub", "Postman", "Pytest"]
    },
    {
      category: "Machine Learning and fundamentals",
      skills: ["Python", "Scikit-learn", "Random Forest", "TF-IDF", "OOP", "DSA", "DBMS"]
    }
  ],

  // Featured Projects - Exactly 3 projects in exact order
  projects: [
    {
      id: 1,
      title: "Smart Loan Approval System with Machine Learning",
      description:
        "Developed a full-stack loan assessment application that integrates a machine learning model into the loan evaluation workflow. Used a Random Forest model to support loan risk prediction from applicant input features. Connected the frontend, backend, database, and machine learning components through APIs and included authentication and access-control functionality.",
      tech: ["React.js", "Node.js", "FastAPI", "MongoDB", "Python", "Random Forest"],
      github: "https://github.com/Varshamahesh31/loan_approval",
      achievement: null
    },
    {
      id: 2,
      title: "Amazon ML Challenge — Product Analysis and Price Prediction",
      description:
        "Built a machine learning workflow for product text analysis, brand classification, and price prediction. Applied TF-IDF for text feature extraction and processed product attributes such as color, size, and material. Evaluated performance with classification accuracy and SMAPE.",
      achievement: "Ranked 1,119 among 82,000+ teams in the Amazon ML Challenge 2025.",
      tech: ["Python", "Scikit-learn", "TF-IDF", "Random Forest"],
      github: "https://github.com/Varshamahesh31/Amazon_hackathon"
    },
    {
      id: 3,
      title: "Finance Data Processing and Access Control Backend",
      description:
        "Developed a REST API backend for financial record management, access control, and financial summary reporting. Implemented record operations, filtering, pagination, validation, standardized JSON responses, financial summary endpoints, rate limiting, and automated API tests.",
      tech: ["Python", "FastAPI", "SQLAlchemy", "SQLite", "Pydantic", "SlowAPI", "Pytest"],
      github: "https://github.com/Varshamahesh31/finance-backend",
      achievement: null
    }
  ],

  // Achievements & Certifications
  achievements: [
    {
      id: 1,
      title: "Amazon ML Challenge 2025",
      highlight: "Ranked 1,119 among 82,000+ teams",
      description: "Ranked 1,119 among 82,000+ teams in the Amazon ML Challenge 2025.",
      image: "/Amazon.jpg",
      badge: "Top 1.4% Globally"
    },
    {
      id: 2,
      title: "IBM Z Datathon 2025",
      highlight: "Participation",
      description: "Global Datathon participation focused on enterprise computing and data challenges.",
      image: "/IBM.jpg",
      badge: "Global Datathon"
    },
    {
      id: 3,
      title: "Data Science Training — Corizo",
      highlight: "Machine Learning & Practical Data Analysis",
      description: "Completed data science training focused on machine learning concepts and practical data analysis.",
      image: "/Corizo.jpg",
      badge: "Training"
    },
    {
      id: 4,
      title: "SQL Skill Assessments — HackerRank",
      highlight: "Verified Assessment",
      description: "Demonstrated proficiency in SQL querying, join operations, aggregations, and relational schema problem solving.",
      image: null,
      badge: "Skill Assessment"
    }
  ]
};

export default portfolioData;
