interface Task {
  id: number;
  task: string;
  status: 'pending' | 'completed';
}

const taskData: Task[] = [
  { id: 1, task: 'Complete React App', status: 'pending' },
  { id: 2, task: 'Write Blog Post', status: 'completed' },
  { id: 3, task: 'Fix Bugs in API', status: 'pending' },
  { id: 4, task: 'Deploy to Production', status: 'completed' },
  { id: 5, task: 'Create Unit Tests', status: 'pending' },
  { id: 6, task: 'Design New UI', status: 'completed' },
  { id: 7, task: 'Integrate Payment Gateway', status: 'pending' },
  { id: 8, task: 'Conduct Code Review', status: 'completed' },
  { id: 9, task: 'Optimize Performance', status: 'pending' },
  { id: 10, task: 'Update Documentation', status: 'completed' },
  { id: 11, task: 'Refactor Code', status: 'pending' },
  { id: 12, task: 'Fix Security Vulnerability', status: 'completed' },
  { id: 13, task: 'Write Tests for UI', status: 'pending' },
  { id: 14, task: 'Add Feature to App', status: 'completed' },
  { id: 15, task: 'Update Dependencies', status: 'pending' },
];

export default taskData;
