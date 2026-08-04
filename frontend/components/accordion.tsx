'use client';

import { ChevronDown } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';

type AccordionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  id?: string;
};

/** Shared accessible expandable card used for FAQs and future accordion sections. */
export function Accordion({ title, children, defaultOpen = false, id }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const generatedId = useId().replace(/:/g, '');
  const contentId = id ? `${id}-content` : `accordion-${generatedId}-content`;

  return (
    <div className={`accordion${open ? ' accordion--open' : ''}`} id={id}>
      <button
        type="button"
        className="accordion__summary"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="accordion__title">{title}</span>
        <ChevronDown className="accordion__chevron" size={20} strokeWidth={2} aria-hidden="true" />
      </button>
      <div
        id={contentId}
        className="accordion__body"
        role="region"
        aria-label={`${title} answer`}
        aria-hidden={!open}
      >
        <div className="accordion__inner">{children}</div>
      </div>
    </div>
  );
}
