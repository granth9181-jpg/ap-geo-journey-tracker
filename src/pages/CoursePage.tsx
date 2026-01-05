import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useCourseStorage } from '@/hooks/useCourseStorage';
import { UnitAccordion } from '@/components/UnitAccordion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const CoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { course, units, toggleTask, resetAllTasks, getProgress } = useCourseStorage(courseId || '');
  const { totalTasks, completedTasks, percentage } = getProgress();

  if (!course || units.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">Course Not Available</h1>
          <p className="text-muted-foreground mb-4">This course is coming soon.</p>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border safe-top">
        <div className="px-4 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            All Courses
          </Link>
          
          <div className="mb-4">
            <h1 className="text-xl font-bold text-foreground">{course.name}</h1>
            <p className="text-sm text-muted-foreground">Course Timeline</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-semibold text-foreground">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 pb-24 safe-bottom">
        <UnitAccordion units={units} onToggleTask={toggleTask} />

        <div className="mt-8 flex justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset All Progress
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will uncheck all tasks and reset your progress to 0%. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetAllTasks}>Reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </div>
  );
};

export default CoursePage;