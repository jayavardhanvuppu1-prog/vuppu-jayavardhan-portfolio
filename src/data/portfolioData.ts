import type {
  EditableProfileDetails,
  MilestoneItem,
  ProjectItem,
  SkillItem,
} from '../types/portfolio';

export const PROFILE_PHOTO_PATH = '/assets/aistudio/profile.jpg._766c7cbf.jpeg';
export const GITHUB_PROFILE_URL = 'https://github.com/jayavardhanvuppu1-prog';
export const GITHUB_HANDLE = 'jayavardhanvuppu1-prog';

export const DEFAULT_EDITABLE_DETAILS: EditableProfileDetails = {
  collegeName: '',
  registrationNumber: '',
  email: '',
  linkedinUrl: '',
};

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    level: 'Beginner',
    category: 'Programming',
    summary:
      'Building a strong programming foundation through variables, conditionals, loops, functions, and small CLI utilities.',
    currentFocus: [
      'Control flow and modular functions',
      'Input validation and error handling',
      'Writing clean, readable beginner scripts',
    ],
  },
  {
    id: 'html',
    name: 'HTML',
    level: 'Foundational',
    category: 'Web Foundations',
    summary:
      'Structuring semantic, accessible web pages using modern HTML5 elements, forms, and clear document hierarchies.',
    currentFocus: [
      'Semantic sectioning and landmarks',
      'Accessible labels and form controls',
      'Clean document structure for responsive layouts',
    ],
  },
  {
    id: 'css',
    name: 'CSS',
    level: 'Foundational',
    category: 'Web Foundations',
    summary:
      'Designing responsive, dark-themed interfaces with Flexbox, CSS Grid, spacing systems, and subtle visual transitions.',
    currentFocus: [
      'Flexbox and Grid layout composition',
      'Responsive breakpoints for mobile and desktop',
      'Modern color contrast and typography hierarchy',
    ],
  },
  {
    id: 'genai',
    name: 'Basic Generative AI',
    level: 'Foundational',
    category: 'AI & Prompting',
    summary:
      'Exploring how large language models work, practicing structured prompting, and applying AI tools to accelerate learning.',
    currentFocus: [
      'Clear prompt formulation for code explanation',
      'Iterative debugging alongside AI feedback',
      'Understanding core LLM concepts and limitations',
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'grade-calculator',
    title: 'Student Grade Calculator',
    subtitle: 'Python & Generative AI Learning Project',
    status: 'Learning Project',
    stack: ['Python', 'Generative AI Learning', 'CLI Logic'],
    description:
      'A foundational Python learning project built while exploring Generative AI workflows. Takes subject marks, computes percentage averages, and assigns letter grades using structured conditional logic.',
    learningOutcomes: [
      'Implemented multi-subject mark validation and percentage calculation',
      'Structured clean if-elif-else grading thresholds in Python',
      'Used Generative AI as a study partner to review edge cases and readability',
    ],
    codeSnippet: `def calculate_grade(marks: list[float]) -> tuple[float, str]:
    average = sum(marks) / len(marks)
    if average >= 90:
        grade = "A+"
    elif average >= 80:
        grade = "A"
    elif average >= 70:
        grade = "B"
    elif average >= 60:
        grade = "C"
    elif average >= 50:
        grade = "D"
    else:
        grade = "F"
    return round(average, 2), grade`,
  },
  {
    id: 'basic-calculator',
    title: 'Python Basic Calculator',
    subtitle: 'Core Python Arithmetic & Control Flow',
    status: 'In Progress',
    stack: ['Python', 'Functions', 'Error Handling'],
    description:
      'An ongoing beginner Python project focused on building a reliable command-line arithmetic calculator supporting addition, subtraction, multiplication, division, and safe zero-division checks.',
    learningOutcomes: [
      'Designing modular arithmetic functions with clear return values',
      'Practicing loop-driven user menus and input validation',
      'Adding graceful handling for division by zero and invalid inputs',
    ],
    codeSnippet: `def calculate(a: float, b: float, op: str) -> float | str:
    if op == "+":
        return a + b
    if op == "-":
        return a - b
    if op == "*":
        return a * b
    if op == "/":
        return "Cannot divide by zero" if b == 0 else round(a / b, 4)
    return "Unsupported operator"`,
  },
];

export const MILESTONES_DATA: MilestoneItem[] = [
  {
    id: 'm1',
    index: '01',
    title: 'Started B.Tech in Computer Science',
    timeframe: '1st Year · Ongoing',
    description:
      'Began formal undergraduate studies in Computer Science, establishing core habits in problem solving, logic, and structured programming.',
  },
  {
    id: 'm2',
    index: '02',
    title: 'First Python & Generative AI Learning Project',
    timeframe: 'Learning Milestone',
    description:
      'Completed the Student Grade Calculator to practice Python fundamentals alongside guided Generative AI concepts.',
  },
  {
    id: 'm3',
    index: '03',
    title: 'Building Web & Programming Foundations',
    timeframe: 'Current Focus',
    description:
      'Practicing HTML, CSS, and beginner Python consistently while documenting early learning code on GitHub.',
  },
  {
    id: 'm4',
    index: '04',
    title: 'Developing Python Basic Calculator',
    timeframe: 'In Progress',
    description:
      'Actively refining arithmetic operations, input validation, and clean function design in Python.',
  },
];
