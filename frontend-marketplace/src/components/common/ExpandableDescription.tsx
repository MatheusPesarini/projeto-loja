'use client';

import { useState } from 'react';
import { CardDescription } from '../ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';

interface ExpandableDescriptionProps {
  description: string;
  maxLength?: number;
  className?: string;
}

export default function ExpandableDescription({
  description,
  maxLength = 150,
  className = '',
}: ExpandableDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (description.length <= maxLength) {
    return (
      <CardDescription className={`text-sm leading-relaxed ${className}`}>
        {description}
      </CardDescription>
    );
  }

  const truncatedText = description.slice(0, maxLength);
  const displayText = isExpanded ? description : truncatedText + '...';

  return (
    <div className="space-y-2">
      <CardDescription className={`text-sm leading-relaxed ${className}`}>
        {displayText}
      </CardDescription>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="h-auto p-0 text-primary hover:text-primary/80 font-medium text-sm"
      >
        {isExpanded ? (
          <>
            Mostrar menos
            <ChevronUp className="ml-1 h-3 w-3" />
          </>
        ) : (
          <>
            Ler mais
            <ChevronDown className="ml-1 h-3 w-3" />
          </>
        )}
      </Button>
    </div>
  );
}
