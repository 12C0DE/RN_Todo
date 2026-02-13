export interface MockTodo {
  text: string;
  isCompleted: boolean;
}

export const mockEvents: MockTodo[] = [
  {
    text: "Complete project documentation",
    isCompleted: false,
  },
  {
    text: "Review pull requests",
    isCompleted: true,
  },
  {
    text: "Update dependencies",
    isCompleted: false,
  },
  {
    text: "Fix bug in authentication flow",
    isCompleted: true,
  },
  {
    text: "Implement dark mode toggle",
    isCompleted: true,
  },
  {
    text: "Design new UI components",
    isCompleted: false,
  },
  {
    text: "Setup unit tests",
    isCompleted: false,
  },
  {
    text: "Deploy to staging",
    isCompleted: true,
  },
  {
    text: "Schedule team meeting",
    isCompleted: false,
  },
  {
    text: "Refactor database queries",
    isCompleted: false,
  },
];
