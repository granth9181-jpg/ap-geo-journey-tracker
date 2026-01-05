import { Link } from 'react-router-dom';
import { 
  Globe, 
  Landmark, 
  BookOpen, 
  Earth, 
  Castle, 
  Brain,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { courses, getCourseProgress } from '@/hooks/useCourseStorage';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Landmark,
  BookOpen,
  Earth,
  Castle,
  Brain,
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border safe-top">
        <div className="px-5 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AP Tracker</h1>
              <p className="text-sm text-muted-foreground">Select a course to begin</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 pb-24 safe-bottom">
        <div className="space-y-3">
          {courses.map(course => {
            const IconComponent = iconMap[course.icon] || Globe;
            const progress = getCourseProgress(course.id);
            const isAvailable = course.units.length > 0;

            return (
              <Link
                key={course.id}
                to={isAvailable ? `/course/${course.id}` : '#'}
                className={cn(
                  "block bg-card border border-border rounded-xl p-4 transition-all duration-200",
                  isAvailable 
                    ? "hover:shadow-md hover:border-primary/30 active:scale-[0.98]" 
                    : "opacity-60 cursor-not-allowed"
                )}
                onClick={(e) => !isAvailable && e.preventDefault()}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `hsl(${course.color} / 0.15)` }}
                  >
                    <IconComponent 
                      className="w-6 h-6" 
                      style={{ color: `hsl(${course.color})` }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-semibold text-foreground truncate">
                        {course.name}
                      </h2>
                      {isAvailable && (
                        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                    
                    {isAvailable ? (
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium text-foreground">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-1.5" />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">Coming soon</p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Index;