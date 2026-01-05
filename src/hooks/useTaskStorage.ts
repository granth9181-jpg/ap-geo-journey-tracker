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
    name: 'Unit 1: Thinking Geographically (8-10%)',
    tasks: [
      { id: '1-1', title: 'Learn types of maps: reference, thematic, choropleth, dot distribution', completed: false, unit: 'unit-1' },
      { id: '1-2', title: 'Understand map scale: small-scale vs large-scale maps', completed: false, unit: 'unit-1' },
      { id: '1-3', title: 'Study map projections and their distortions (Mercator, Robinson, etc.)', completed: false, unit: 'unit-1' },
      { id: '1-4', title: 'Master geographic tools: GPS, GIS, and remote sensing', completed: false, unit: 'unit-1' },
      { id: '1-5', title: 'Understand spatial concepts: location, place, region, scale, space', completed: false, unit: 'unit-1' },
      { id: '1-6', title: 'Complete Unit 1 Progress Check in AP Classroom', completed: false, unit: 'unit-1' },
    ],
  },
  {
    id: 'unit-2',
    name: 'Unit 2: Population & Migration (12-17%)',
    tasks: [
      { id: '2-1', title: 'Analyze factors affecting population distribution (physical & human)', completed: false, unit: 'unit-2' },
      { id: '2-2', title: 'Interpret population pyramids for different country types', completed: false, unit: 'unit-2' },
      { id: '2-3', title: 'Master the 5 stages of the Demographic Transition Model', completed: false, unit: 'unit-2' },
      { id: '2-4', title: 'Study Malthusian theory vs. anti-Malthusian perspectives', completed: false, unit: 'unit-2' },
      { id: '2-5', title: 'Identify push and pull factors in migration patterns', completed: false, unit: 'unit-2' },
      { id: '2-6', title: 'Understand types of migration: forced, voluntary, internal, international', completed: false, unit: 'unit-2' },
      { id: '2-7', title: 'Study population policies: pro-natalist and anti-natalist examples', completed: false, unit: 'unit-2' },
      { id: '2-8', title: 'Complete Unit 2 Progress Check in AP Classroom', completed: false, unit: 'unit-2' },
    ],
  },
  {
    id: 'unit-3',
    name: 'Unit 3: Cultural Patterns & Processes (12-17%)',
    tasks: [
      { id: '3-1', title: 'Define culture traits, complexes, and cultural landscapes', completed: false, unit: 'unit-3' },
      { id: '3-2', title: 'Master types of diffusion: relocation, expansion, contagious, hierarchical, stimulus', completed: false, unit: 'unit-3' },
      { id: '3-3', title: 'Map language families and understand lingua franca', completed: false, unit: 'unit-3' },
      { id: '3-4', title: 'Compare universalizing religions (Christianity, Islam, Buddhism) vs ethnic religions', completed: false, unit: 'unit-3' },
      { id: '3-5', title: 'Study effects of colonialism and imperialism on culture', completed: false, unit: 'unit-3' },
      { id: '3-6', title: 'Understand acculturation, assimilation, and multiculturalism', completed: false, unit: 'unit-3' },
      { id: '3-7', title: 'Complete Unit 3 Progress Check in AP Classroom', completed: false, unit: 'unit-3' },
    ],
  },
  {
    id: 'unit-4',
    name: 'Unit 4: Political Patterns & Processes (12-17%)',
    tasks: [
      { id: '4-1', title: 'Understand the concept of nation, state, and nation-state', completed: false, unit: 'unit-4' },
      { id: '4-2', title: 'Study types of boundaries: geometric, physical, ethnic, religious', completed: false, unit: 'unit-4' },
      { id: '4-3', title: 'Learn boundary disputes: definitional, locational, operational, allocational', completed: false, unit: 'unit-4' },
      { id: '4-4', title: 'Analyze gerrymandering: packing, cracking, and electoral impacts', completed: false, unit: 'unit-4' },
      { id: '4-5', title: 'Understand centripetal vs centrifugal forces and devolution', completed: false, unit: 'unit-4' },
      { id: '4-6', title: 'Study supranational organizations: EU, UN, NATO, ASEAN', completed: false, unit: 'unit-4' },
      { id: '4-7', title: 'Complete Unit 4 Progress Check in AP Classroom', completed: false, unit: 'unit-4' },
    ],
  },
  {
    id: 'unit-5',
    name: 'Unit 5: Agriculture & Rural Land Use (12-17%)',
    tasks: [
      { id: '5-1', title: 'Understand origins of agriculture: First Agricultural Revolution', completed: false, unit: 'unit-5' },
      { id: '5-2', title: 'Compare subsistence vs commercial agriculture types', completed: false, unit: 'unit-5' },
      { id: '5-3', title: 'Master the Von Thünen Model and bid-rent theory', completed: false, unit: 'unit-5' },
      { id: '5-4', title: 'Study the Green Revolution: impacts on yields and environment', completed: false, unit: 'unit-5' },
      { id: '5-5', title: 'Analyze agribusiness and industrial agriculture effects', completed: false, unit: 'unit-5' },
      { id: '5-6', title: 'Understand challenges: food deserts, organic farming, fair trade', completed: false, unit: 'unit-5' },
      { id: '5-7', title: 'Complete Unit 5 Progress Check in AP Classroom', completed: false, unit: 'unit-5' },
    ],
  },
  {
    id: 'unit-6',
    name: 'Unit 6: Cities & Urban Land Use (12-17%)',
    tasks: [
      { id: '6-1', title: 'Trace the origin and growth of cities throughout history', completed: false, unit: 'unit-6' },
      { id: '6-2', title: 'Master urban models: Burgess (concentric zone), Hoyt (sector), Harris-Ullman (multiple nuclei)', completed: false, unit: 'unit-6' },
      { id: '6-3', title: 'Compare urban models: Latin American, African, Southeast Asian cities', completed: false, unit: 'unit-6' },
      { id: '6-4', title: 'Understand suburbanization, edge cities, and urban sprawl', completed: false, unit: 'unit-6' },
      { id: '6-5', title: 'Study gentrification: causes, effects, and case studies', completed: false, unit: 'unit-6' },
      { id: '6-6', title: 'Analyze urban sustainability: smart growth, new urbanism', completed: false, unit: 'unit-6' },
      { id: '6-7', title: 'Complete Unit 6 Progress Check in AP Classroom', completed: false, unit: 'unit-6' },
    ],
  },
  {
    id: 'unit-7',
    name: 'Unit 7: Industrial & Economic Development (12-17%)',
    tasks: [
      { id: '7-1', title: 'Study the Industrial Revolution and its geographic diffusion', completed: false, unit: 'unit-7' },
      { id: '7-2', title: 'Master Weber\'s Least Cost Theory for industrial location', completed: false, unit: 'unit-7' },
      { id: '7-3', title: 'Understand Rostow\'s Stages of Economic Growth model', completed: false, unit: 'unit-7' },
      { id: '7-4', title: 'Compare development indicators: GDP, GNI, HDI, GII', completed: false, unit: 'unit-7' },
      { id: '7-5', title: 'Analyze Wallerstein\'s World Systems Theory: core, periphery, semi-periphery', completed: false, unit: 'unit-7' },
      { id: '7-6', title: 'Study globalization: outsourcing, trade agreements, economic alliances', completed: false, unit: 'unit-7' },
      { id: '7-7', title: 'Understand sustainable development and UN development goals', completed: false, unit: 'unit-7' },
      { id: '7-8', title: 'Complete Unit 7 Progress Check in AP Classroom', completed: false, unit: 'unit-7' },
    ],
  },
  {
    id: 'exam-prep',
    name: 'AP Exam Preparation',
    tasks: [
      { id: 'exam-1', title: 'Complete full-length AP Classroom practice exam', completed: false, unit: 'exam-prep' },
      { id: 'exam-2', title: 'Review FRQ rubrics and practice free-response questions', completed: false, unit: 'exam-prep' },
      { id: 'exam-3', title: 'Master all key vocabulary terms across units', completed: false, unit: 'exam-prep' },
      { id: 'exam-4', title: 'Practice stimulus-based multiple choice questions', completed: false, unit: 'exam-prep' },
      { id: 'exam-5', title: 'Review all geographic models and theories', completed: false, unit: 'exam-prep' },
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