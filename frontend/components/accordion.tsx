import { ChevronDown } from 'lucide-react';
import { useId, type ReactNode } from 'react';

type AccordionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  id?: string;
};

/**
 * Native disclosure. The browser toggles it without client JavaScript, so the
 * answer still opens if the app bundle has not hydrated.
 */
export function Accordion({ title, children, defaultOpen = false, id }: AccordionProps) {
  const generatedId = useId().replace(/:/g, '');
  const contentId = id ? `${id}-content` : `accordion-${generatedId}-content`;

  return (
    <details className="accordion" id={id} {...(defaultOpen ? { open: true } : {})}>
      <summary className="accordion__summary" aria-controls={contentId}>
        <span className="accordion__title">{title}</span>
        <ChevronDown className="accordion__chevron" size={20} strokeWidth={2} aria-hidden="true" />
      </summary>
      <div id={contentId} className="accordion__body" role="region" aria-label={`${title} answer`}>
        <div className="accordion__inner">{children}</div>
      </div>
    </details>
  );
}
