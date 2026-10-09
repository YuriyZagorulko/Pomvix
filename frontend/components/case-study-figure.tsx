import fs from 'fs';
import Image from 'next/image';
import {
  gadgetoCaseStudyFilesystemPath,
  gadgetoCaseStudyPublicPath,
  type GadgetoCaseStudyImageSpec,
} from '@/lib/gadgeto-case-study-images';

export function caseStudyImageExists(filename: string): boolean {
  try {
    return fs.existsSync(gadgetoCaseStudyFilesystemPath(filename));
  } catch {
    return false;
  }
}

export function CaseStudyFigure({
  spec,
  priority = false,
  className = '',
}: {
  spec: GadgetoCaseStudyImageSpec;
  priority?: boolean;
  className?: string;
}) {
  if (!caseStudyImageExists(spec.filename)) {
    return null;
  }

  const src = gadgetoCaseStudyPublicPath(spec.filename);
  const aspectClass = spec.aspectRatio === '16/9' ? 'aspect-video' : 'aspect-[16/10]';

  return (
    <figure className={className}>
      <div
        className={`relative ${aspectClass} overflow-hidden rounded-[14px] border border-white/[.08] bg-white/[.02]`}
      >
        <Image
          src={src}
          alt={spec.alt}
          width={spec.width}
          height={spec.height}
          className="h-full w-full object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1180px) 90vw, 1120px"
          priority={priority}
        />
      </div>
      {spec.caption ? (
        <figcaption className="mt-3 text-sm leading-6 text-slate-500">{spec.caption}</figcaption>
      ) : null}
    </figure>
  );
}
