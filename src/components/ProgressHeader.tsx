import { Progress } from '@/components/ui/progress';
import { Globe } from 'lucide-react';

interface ProgressHeaderProps {
  completedTasks: number;
  totalTasks: number;
  percentage: number;
}

export const ProgressHeader = ({ completedTasks, totalTasks, percentage }: ProgressHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border safe-top">
      <div className="px-5 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AP Human Geography</h1>
            <p className="text-sm text-muted-foreground">Course Timeline</p>
          </div>
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
  );
};