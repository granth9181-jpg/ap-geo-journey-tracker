import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Task } from '@/hooks/useCourseStorage';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  return (
    <button
      onClick={() => onToggle(task.id)}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-300 text-left group",
        "hover:bg-secondary/50 active:scale-[0.98]",
        task.completed && "opacity-60"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
          task.completed
            ? "bg-success border-success animate-check-bounce"
            : "border-muted-foreground/40 group-hover:border-primary"
        )}
      >
        {task.completed && <Check className="w-4 h-4 text-success-foreground" strokeWidth={3} />}
      </div>
      <span
        className={cn(
          "text-base transition-all duration-300",
          task.completed && "line-through text-muted-foreground"
        )}
      >
        {task.title}
      </span>
    </button>
  );
};