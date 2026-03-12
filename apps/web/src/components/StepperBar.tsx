import { cn } from '@/lib/utils';

interface StepperBarProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function StepperBar({ steps, currentStep, className }: StepperBarProps) {
  return (
    <div className={cn('flex items-center', className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                  isCompleted
                    ? 'border-success bg-success text-white'
                    : isActive
                      ? 'border-primary-blue bg-primary-blue text-white'
                      : 'border-gray-300 bg-white text-gray-400'
                )}
              >
                {isCompleted ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  'mt-1 text-xs font-medium',
                  isActive ? 'text-primary-blue' : isCompleted ? 'text-success' : 'text-gray-400'
                )}
              >
                {step}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'mb-5 h-0.5 flex-1 transition-colors',
                  isCompleted ? 'bg-success' : 'bg-gray-200'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
