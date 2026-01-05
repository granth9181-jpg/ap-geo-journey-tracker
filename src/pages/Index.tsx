import { ProgressHeader } from '@/components/ProgressHeader';
import { UnitAccordion } from '@/components/UnitAccordion';
import { useTaskStorage } from '@/hooks/useTaskStorage';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
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

const Index = () => {
  const { units, toggleTask, resetAllTasks, getProgress } = useTaskStorage();
  const { totalTasks, completedTasks, percentage } = getProgress();

  return (
    <div className="min-h-screen bg-background">
      <ProgressHeader
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        percentage={percentage}
      />

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

export default Index;