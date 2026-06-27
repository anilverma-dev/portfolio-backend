// data.js — single source of truth for portfolio content.
// Edit this file to update your bio, skills, and project links.

export const profile = {
  name: "Anil Verma",
  role: "Web Developer / Software Engineer",
  tagline: "I build fast, reliable WebSites from front to back.",
  location: "Jaipur, Rajasthan, India",
  email: "vermaanil9694@gmail.com",
  phone: "+91 7240384681",
  about:
    "I'm a web developer who enjoys turning ideas into working products — clean UIs on the frontend, solid APIs on the backend. I like learning new tools, fixing tricky bugs, and shipping things that people actually use.",
  skills: ["JavaScript", "React", "HTML & CSS", "Github"],

  social: {
    github: "https://github.com/anilverma-dev",
    linkedin: "https://linkedin.com/in/anil-verma-6a2671359",
    instagram: "https://www.instagram.com/anilvlogs909",
  },
};

export const projects = [
  {
    id: 1,
    title: "Sadhna Report",
    description:
      "A full-stack web application designed to help users build discipline and consistently track their daily spiritual routines. The app gamifies daily habits by automatically evaluating tasks, awarding points for consistency, and penalizing unproductive time.",
    tags: ["React", "Node.js", "MongoDB", "Express.js"],
    link: " https://anilverma-dev.github.io/Sadhna-Report/",
    repo: "https://github.com/anilverma-dev/Sadhna-Report",
  },
  {
    id: 2,
    title: "Task Manager App",
    description:
      "A drag-and-drop task board with real-time updates, built for small teams.",
    tags: ["React", "Express", "Socket.io"],
    link: "https://example.com/project-two",
    repo: "https://github.com/yourusername/project-two",
  },
  {
    id: 3,
    title: "Create Post",
    description:
      "Create Post is a modern web application developed with Vanilla JavaScript that enables users to create and publish posts instantly.",
    tags: ["JavaScript", "HTMl", "CSS"],
    link: "https://anilverma-dev.github.io/Create-Post/",
    repo: "https://github.com/anilverma-dev/Create-Post",
  },
  {
    id: 4,
    title: "Blog Platform",
    description:
      "A markdown-based blogging platform with tags, search, and a comment system.",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "https://example.com/project-four",
    repo: "https://github.com/yourusername/project-four",
  },
];
