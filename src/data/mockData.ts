
export interface Module {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  moduleCode: string;
  instructor: string;
  credits: number;
  contents: ModuleContent[];
}

export interface ModuleContent {
  id: string;
  title: string;
  description: string;
  contentType: 'Video' | 'Syllabus' | 'Notes';
  fileType: 'PDF' | 'Word' | 'Video';
  type: string;
  duration: string;
  size: string;
  moduleCode: string;
}

export interface FileData {
  id: string;
  title: string;
  moduleCode: string;
  fileType: 'DOC' | 'XLS' | 'PDF';
  category: string;
  author: string;
  date: string;
  description: string;
}

export interface Lecturer {
  id: string;
  staffNumber: string;
  name: string;
  department: string;
  moduleCode: string;
  campus: string;
}

export const mockModules: Module[] = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    title: 'Introduction to Computer Science',
    description: 'Learn the fundamentals of programming and computational thinking',
    moduleCode: 'CS101',
    instructor: 'Dr. Smith',
    credits: 3,
    contents: [
      { 
        id: '1', 
        title: 'Programming Basics', 
        description: 'Introduction to basic programming concepts and syntax',
        contentType: 'Video', 
        fileType: 'Video', 
        type: 'video',
        duration: '45 min',
        size: '250 MB',
        moduleCode: 'CS101' 
      },
      { 
        id: '2', 
        title: 'Course Syllabus', 
        description: 'Complete course outline and requirements',
        contentType: 'Syllabus', 
        fileType: 'PDF', 
        type: 'document',
        duration: '5 min read',
        size: '2.1 MB',
        moduleCode: 'CS101' 
      },
      { 
        id: '3', 
        title: 'Lecture Notes Ch1', 
        description: 'Chapter 1 notes covering fundamentals',
        contentType: 'Notes', 
        fileType: 'PDF', 
        type: 'document',
        duration: '15 min read',
        size: '5.3 MB',
        moduleCode: 'CS101' 
      }
    ]
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    title: 'Data Structures & Algorithms',
    description: 'Master essential data structures and algorithmic thinking',
    moduleCode: 'CS201',
    instructor: 'Prof. Johnson',
    credits: 4,
    contents: [
      { 
        id: '4', 
        title: 'Arrays and Linked Lists', 
        description: 'Understanding linear data structures',
        contentType: 'Video', 
        fileType: 'Video', 
        type: 'video',
        duration: '60 min',
        size: '380 MB',
        moduleCode: 'CS201' 
      },
      { 
        id: '5', 
        title: 'Algorithm Analysis', 
        description: 'Big O notation and complexity analysis',
        contentType: 'Notes', 
        fileType: 'PDF', 
        type: 'document',
        duration: '20 min read',
        size: '3.2 MB',
        moduleCode: 'CS201' 
      }
    ]
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    title: 'Database Management Systems',
    description: 'Understanding relational databases and SQL programming',
    moduleCode: 'CS301',
    instructor: 'Dr. Davis',
    credits: 3,
    contents: [
      { 
        id: '6', 
        title: 'SQL Fundamentals', 
        description: 'Basic SQL queries and operations',
        contentType: 'Video', 
        fileType: 'Video', 
        type: 'video',
        duration: '90 min',
        size: '520 MB',
        moduleCode: 'CS301' 
      },
      { 
        id: '7', 
        title: 'Database Design', 
        description: 'ER diagrams and normalization',
        contentType: 'Notes', 
        fileType: 'Word', 
        type: 'document',
        duration: '25 min read',
        size: '4.1 MB',
        moduleCode: 'CS301' 
      }
    ]
  },
  {
    id: '4',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
    title: 'Web Development',
    description: 'Build modern web applications with React and Node.js',
    moduleCode: 'CS401',
    instructor: 'Ms. Wilson',
    credits: 4,
    contents: [
      { 
        id: '8', 
        title: 'React Fundamentals', 
        description: 'Component-based development with React',
        contentType: 'Video', 
        fileType: 'Video', 
        type: 'video',
        duration: '120 min',
        size: '680 MB',
        moduleCode: 'CS401' 
      },
      { 
        id: '9', 
        title: 'Project Guidelines', 
        description: 'Final project requirements and rubric',
        contentType: 'Syllabus', 
        fileType: 'PDF', 
        type: 'document',
        duration: '10 min read',
        size: '1.8 MB',
        moduleCode: 'CS401' 
      }
    ]
  },
  {
    id: '5',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    title: 'Machine Learning',
    description: 'Introduction to artificial intelligence and machine learning',
    moduleCode: 'CS501',
    instructor: 'Dr. Brown',
    credits: 3,
    contents: [
      { 
        id: '10', 
        title: 'ML Basics', 
        description: 'Introduction to machine learning concepts',
        contentType: 'Video', 
        fileType: 'Video', 
        type: 'video',
        duration: '75 min',
        size: '420 MB',
        moduleCode: 'CS501' 
      },
      { 
        id: '11', 
        title: 'Python for ML', 
        description: 'Python libraries for machine learning',
        contentType: 'Notes', 
        fileType: 'PDF', 
        type: 'document',
        duration: '30 min read',
        size: '6.2 MB',
        moduleCode: 'CS501' 
      }
    ]
  }
];

export const mockFiles: FileData[] = [
  { 
    id: '1', 
    title: 'Programming Fundamentals', 
    moduleCode: 'CS101', 
    fileType: 'PDF', 
    category: 'Lecture Notes', 
    author: 'Dr. Smith', 
    date: '2025-05-01', 
    description: 'Comprehensive notes on programming basics and concepts, including variables, control structures, data types, and introductory problem-solving techniques. Covers both theoretical explanations and practical code examples to help students grasp foundational programming skills.' 
  },
  { 
    id: '2', 
    title: 'Assignment 1 Guidelines', 
    moduleCode: 'CS101', 
    fileType: 'DOC', 
    category: 'Assignments', 
    author: 'Dr. Smith', 
    date: '2025-05-03', 
    description: 'Detailed instructions and requirements for Assignment 1, outlining the objectives, submission format, grading criteria, and sample problems. Includes tips for approaching the assignment and common pitfalls to avoid.' 
  },
  { 
    id: '3', 
    title: 'Data Structures Overview', 
    moduleCode: 'CS201', 
    fileType: 'PDF', 
    category: 'Textbook', 
    author: 'Prof. Johnson', 
    date: '2025-05-05', 
    description: 'Overview of essential data structures for CS201, such as arrays, linked lists, stacks, queues, trees, and graphs. Provides diagrams, use cases, and performance analysis for each structure, along with sample implementations.' 
  },
  { 
    id: '4', 
    title: 'Algorithm Complexity', 
    moduleCode: 'CS201', 
    fileType: 'XLS', 
    category: 'Lecture Notes', 
    author: 'Prof. Johnson', 
    date: '2025-05-07', 
    description: 'Spreadsheet analyzing algorithm complexity, including time and space complexity for common algorithms. Features comparative tables, charts, and example calculations to help students understand Big O notation and efficiency trade-offs.' 
  },
  { 
    id: '5', 
    title: 'SQL Tutorial', 
    moduleCode: 'CS301', 
    fileType: 'PDF', 
    category: 'Lecture Notes', 
    author: 'Dr. Davis', 
    date: '2025-05-10', 
    description: 'Step-by-step tutorial for SQL basics, covering database creation, table management, data manipulation (CRUD operations), and query optimization. Includes practical exercises and sample queries for hands-on learning.' 
  },
  { 
    id: '6', 
    title: 'Database Project', 
    moduleCode: 'CS301', 
    fileType: 'DOC', 
    category: 'Assignments', 
    author: 'Dr. Davis', 
    date: '2025-05-12', 
    description: 'Project brief for database design and implementation, detailing project objectives, required deliverables, ER diagram guidelines, and evaluation criteria. Encourages students to apply normalization and best practices in relational database design.' 
  },
  { 
    id: '7', 
    title: 'React Components Guide', 
    moduleCode: 'CS401', 
    fileType: 'PDF', 
    category: 'Textbook', 
    author: 'Ms. Wilson', 
    date: '2025-05-15', 
    description: 'Guide to building reusable React components, including functional and class components, props, state management, and lifecycle methods. Features code samples, best practices, and tips for structuring scalable React applications.' 
  },
  { 
    id: '8', 
    title: 'Web Dev Assignment', 
    moduleCode: 'CS401', 
    fileType: 'DOC', 
    category: 'Assignments', 
    author: 'Ms. Wilson', 
    date: '2025-05-17', 
    description: 'Assignment details for web development project, specifying requirements for frontend and backend implementation, user authentication, and deployment. Includes milestones, submission instructions, and assessment rubrics.' 
  },
  { 
    id: '9', 
    title: 'ML Algorithms', 
    moduleCode: 'CS501', 
    fileType: 'PDF', 
    category: 'Lecture Notes', 
    author: 'Dr. Brown', 
    date: '2025-05-20', 
    description: 'Notes on key machine learning algorithms, such as linear regression, decision trees, clustering, and neural networks. Explains algorithm intuition, mathematical foundations, and practical applications with illustrative examples.' 
  },
  { 
    id: '10', 
    title: 'Final Project Requirements', 
    moduleCode: 'CS501', 
    fileType: 'DOC', 
    category: 'Assignments', 
    author: 'Dr. Brown', 
    date: '2025-05-22', 
    description: 'Requirements and rubric for the final project, outlining project scope, expected outcomes, technical specifications, and evaluation metrics. Provides guidance on project planning, documentation, and presentation.' 
  }
];

export const mockLecturers: Lecturer[] = [
  { id: '1', staffNumber: 'S001', name: 'Dr. John Smith', department: 'Computer Science', moduleCode: 'CS101', campus: 'Main Campus' },
  { id: '2', staffNumber: 'S002', name: 'Prof. Sarah Johnson', department: 'Computer Science', moduleCode: 'CS201', campus: 'Main Campus' },
  { id: '3', staffNumber: 'S003', name: 'Dr. Michael Davis', department: 'Information Technology', moduleCode: 'CS301', campus: 'North Campus' },
  { id: '4', staffNumber: 'S004', name: 'Ms. Emily Wilson', department: 'Computer Science', moduleCode: 'CS401', campus: 'Main Campus' },
  { id: '5', staffNumber: 'S005', name: 'Dr. Robert Brown', department: 'Data Science', moduleCode: 'CS501', campus: 'South Campus' },
  { id: '6', staffNumber: 'S006', name: 'Prof. Lisa Anderson', department: 'Mathematics', moduleCode: 'MATH101', campus: 'Main Campus' },
  { id: '7', staffNumber: 'S007', name: 'Dr. James Taylor', department: 'Physics', moduleCode: 'PHYS101', campus: 'North Campus' },
  { id: '8', staffNumber: 'S008', name: 'Ms. Jennifer Lee', department: 'Chemistry', moduleCode: 'CHEM101', campus: 'South Campus' },
  { id: '9', staffNumber: 'S009', name: 'Dr. David Garcia', department: 'Biology', moduleCode: 'BIO101', campus: 'Main Campus' },
  { id: '10', staffNumber: 'S010', name: 'Prof. Susan Martinez', department: 'English', moduleCode: 'ENG101', campus: 'North Campus' },
  { id: '11', staffNumber: 'S011', name: 'Dr. Thomas Clark', department: 'History', moduleCode: 'HIST101', campus: 'South Campus' },
  { id: '12', staffNumber: 'S012', name: 'Ms. Maria Rodriguez', department: 'Psychology', moduleCode: 'PSY101', campus: 'Main Campus' },
  { id: '13', staffNumber: 'S013', name: 'Dr. Christopher Lewis', department: 'Economics', moduleCode: 'ECON101', campus: 'North Campus' },
  { id: '14', staffNumber: 'S014', name: 'Prof. Amanda Walker', department: 'Sociology', moduleCode: 'SOC101', campus: 'South Campus' },
  { id: '15', staffNumber: 'S015', name: 'Dr. Kevin Hall', department: 'Philosophy', moduleCode: 'PHIL101', campus: 'Main Campus' },
  { id: '16', staffNumber: 'S016', name: 'Ms. Nicole Young', department: 'Art', moduleCode: 'ART101', campus: 'North Campus' },
  { id: '17', staffNumber: 'S017', name: 'Dr. Paul Allen', department: 'Music', moduleCode: 'MUS101', campus: 'South Campus' },
  { id: '18', staffNumber: 'S018', name: 'Prof. Rachel King', department: 'Theatre', moduleCode: 'THR101', campus: 'Main Campus' },
  { id: '19', staffNumber: 'S019', name: 'Dr. Mark Wright', department: 'Physical Education', moduleCode: 'PE101', campus: 'North Campus' },
  { id: '20', staffNumber: 'S020', name: 'Ms. Laura Green', department: 'Business', moduleCode: 'BUS101', campus: 'South Campus' }
];
