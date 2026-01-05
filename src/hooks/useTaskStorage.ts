import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  unit: string;
}

export interface Unit {
  id: string;
  name: string;
  tasks: Task[];
}

const defaultUnits: Unit[] = [
  {
    id: 'unit-1',
    name: 'Unit 1: Thinking Geographically',
    tasks: [
      { id: '1-1', title: 'Read Chapter 1 - Introduction to Geography', completed: false, unit: 'unit-1' },
      { id: '1-2', title: 'Complete map skills worksheet', completed: false, unit: 'unit-1' },
      { id: '1-3', title: 'Study geographic tools and technology', completed: false, unit: 'unit-1' },
      { id: '1-4', title: 'Practice scale and projection problems', completed: false, unit: 'unit-1' },
      { id: '1-5', title: 'Take Unit 1 quiz', completed: false, unit: 'unit-1' },
    ],
  },
  {
    id: 'unit-2',
    name: 'Unit 2: Population & Migration',
    tasks: [
      { id: '2-1', title: 'Read Chapter 2 - Population Patterns', completed: false, unit: 'unit-2' },
      { id: '2-2', title: 'Analyze population pyramids activity', completed: false, unit: 'unit-2' },
      { id: '2-3', title: 'Study demographic transition model', completed: false, unit: 'unit-2' },
      { id: '2-4', title: 'Complete migration patterns assignment', completed: false, unit: 'unit-2' },
      { id: '2-5', title: 'Research push/pull factors project', completed: false, unit: 'unit-2' },
      { id: '2-6', title: 'Take Unit 2 quiz', completed: false, unit: 'unit-2' },
    ],
  },
  {
    id: 'unit-3',
    name: 'Unit 3: Cultural Patterns & Processes',
    tasks: [
      { id: '3-1', title: 'Read Chapter 3 - Cultural Geography', completed: false, unit: 'unit-3' },
      { id: '3-2', title: 'Map world religions activity', completed: false, unit: 'unit-3' },
      { id: '3-3', title: 'Study language families and diffusion', completed: false, unit: 'unit-3' },
      { id: '3-4', title: 'Analyze cultural landscapes essay', completed: false, unit: 'unit-3' },
      { id: '3-5', title: 'Take Unit 3 quiz', completed: false, unit: 'unit-3' },
    ],
  },
  {
    id: 'unit-4',
    name: 'Unit 4: Political Patterns & Processes',
    tasks: [
      { id: '4-1', title: 'Read Chapter 4 - Political Geography', completed: false, unit: 'unit-4' },
      { id: '4-2', title: 'Study types of boundaries and borders', completed: false, unit: 'unit-4' },
      { id: '4-3', title: 'Analyze gerrymandering case studies', completed: false, unit: 'unit-4' },
      { id: '4-4', title: 'Complete supranational organizations worksheet', completed: false, unit: 'unit-4' },
      { id: '4-5', title: 'Take Unit 4 quiz', completed: false, unit: 'unit-4' },
    ],
  },
  {
    id: 'unit-5',
    name: 'Unit 5: Agriculture & Rural Land Use',
    tasks: [
      { id: '5-1', title: 'Read Chapter 5 - Agricultural Geography', completed: false, unit: 'unit-5' },
      { id: '5-2', title: 'Study the Green Revolution impacts', completed: false, unit: 'unit-5' },
      { id: '5-3', title: 'Map agricultural regions activity', completed: false, unit: 'unit-5' },
      { id: '5-4', title: 'Analyze von Thünen model problems', completed: false, unit: 'unit-5' },
      { id: '5-5', title: 'Take Unit 5 quiz', completed: false, unit: 'unit-5' },
    ],
  },
  {
    id: 'unit-6',
    name: 'Unit 6: Cities & Urban Land Use',
    tasks: [
      { id: '6-1', title: 'Read Chapter 6 - Urban Geography', completed: false, unit: 'unit-6' },
      { id: '6-2', title: 'Study urban models (Burgess, Hoyt, Harris-Ullman)', completed: false, unit: 'unit-6' },
      { id: '6-3', title: 'Analyze suburbanization trends', completed: false, unit: 'unit-6' },
      { id: '6-4', title: 'Complete smart growth case study', completed: false, unit: 'unit-6' },
      { id: '6-5', title: 'Take Unit 6 quiz', completed: false, unit: 'unit-6' },
    ],
  },
  {
    id: 'unit-7',
    name: 'Unit 7: Industrial & Economic Development',
    tasks: [
      { id: '7-1', title: 'Read Chapter 7 - Economic Geography', completed: false, unit: 'unit-7' },
      { id: '7-2', title: 'Study Rostow\'s development model', completed: false, unit: 'unit-7' },
      { id: '7-3', title: 'Analyze HDI and GDP indicators', completed: false, unit: 'unit-7' },
      { id: '7-4', title: 'Complete globalization impacts project', completed: false, unit: 'unit-7' },
      { id: '7-5', title: 'Take Unit 7 quiz', completed: false, unit: 'unit-7' },
      { id: '7-6', title: 'Review for AP Exam', completed: false, unit: 'unit-7' },
    ],
  },
];

export const useTaskStorage = () => {
  const [units, setUnits] = useState<Unit[]>(() => {
    const saved = localStorage.getItem('ap-hug-tasks');
    if (saved) {
      return JSON.parse(saved);
    }
    return defaultUnits;
  });

  useEffect(() => {
    localStorage.setItem('ap-hug-tasks', JSON.stringify(units));
  }, [units]);

  const toggleTask = (taskId: string) => {
    setUnits(prevUnits =>
      prevUnits.map(unit => ({
        ...unit,
        tasks: unit.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
      }))
    );
  };

  const resetAllTasks = () => {
    setUnits(defaultUnits);
  };

  const getProgress = () => {
    const totalTasks = units.reduce((acc, unit) => acc + unit.tasks.length, 0);
    const completedTasks = units.reduce(
      (acc, unit) => acc + unit.tasks.filter(task => task.completed).length,
      0
    );
    return { totalTasks, completedTasks, percentage: Math.round((completedTasks / totalTasks) * 100) };
  };

  return { units, toggleTask, resetAllTasks, getProgress };
};