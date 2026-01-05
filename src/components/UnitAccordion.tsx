import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TaskItem } from './TaskItem';
import type { Unit } from '@/hooks/useTaskStorage';

interface UnitAccordionProps {
  units: Unit[];
  onToggleTask: (taskId: string) => void;
}

export const UnitAccordion = ({ units, onToggleTask }: UnitAccordionProps) => {
  return (
    <Accordion type="multiple" defaultValue={['unit-1']} className="space-y-3">
      {units.map(unit => {
        const completedCount = unit.tasks.filter(t => t.completed).length;
        const totalCount = unit.tasks.length;
        const isComplete = completedCount === totalCount;

        return (
          <AccordionItem
            key={unit.id}
            value={unit.id}
            className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-secondary/30 transition-colors [&[data-state=open]>svg]:rotate-180">
              <div className="flex items-center gap-3 text-left">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{unit.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {completedCount} of {totalCount} tasks completed
                  </p>
                </div>
                {isComplete && (
                  <span className="px-2.5 py-1 text-xs font-medium bg-success/10 text-success rounded-full">
                    Complete
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-2 pb-2">
              <div className="divide-y divide-border/50">
                {unit.tasks.map(task => (
                  <TaskItem key={task.id} task={task} onToggle={onToggleTask} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};