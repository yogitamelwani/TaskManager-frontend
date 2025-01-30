export interface User {
  username: string;
  password: string;
  email: string;
}

const userData: User[] = [
  {
    username: 'john_doe',
    password: 'john1234', // This should ideally be hashed in a real application
    email: 'john.doe@example.com',
  },
  {
    username: 'mary_smith',
    password: 'mary5678',
    email: 'mary.smith@example.com',
  },
  {
    username: 'alex_jones',
    password: 'alexpassword',
    email: 'alex.jones@example.com',
  },
];

export default userData;
