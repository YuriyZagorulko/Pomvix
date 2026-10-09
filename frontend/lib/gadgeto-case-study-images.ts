/** Public paths and metadata for optional Gadgeto case study screenshots. See docs/gadgeto-case-study-assets.md */

import { join } from 'path';

export const GADGETO_CASE_STUDY_IMAGE_SUBDIR = 'images/case-studies/gadgeto';

export type GadgetoCaseStudyImageSlot =
  'homepage' | 'catalogCategory' | 'adminImportReport' | 'productDetail';

export type GadgetoCaseStudyImageSpec = {
  slot: GadgetoCaseStudyImageSlot;
  filename: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  aspectRatio: '16/10' | '16/9';
};

export const gadgetoCaseStudyImageSpecs: Record<
  GadgetoCaseStudyImageSlot,
  GadgetoCaseStudyImageSpec
> = {
  homepage: {
    slot: 'homepage',
    filename: 'gadgeto-homepage.webp',
    alt: 'Gadgeto public storefront homepage showing the electronics e-commerce header and main content',
    caption: 'Live public storefront at gadgeto.com.ua (Next.js).',
    width: 1600,
    height: 1000,
    aspectRatio: '16/10',
  },
  catalogCategory: {
    slot: 'catalogCategory',
    filename: 'gadgeto-catalog-category.webp',
    alt: 'Gadgeto category listing page with product grid and category navigation',
    caption: 'Category catalog view with filters and product listings.',
    width: 1600,
    height: 1000,
    aspectRatio: '16/10',
  },
  adminImportReport: {
    slot: 'adminImportReport',
    filename: 'gadgeto-admin-import-report.webp',
    alt: 'Gadgeto admin interface showing a completed supplier import report with processing statistics',
    caption: 'Import job report: counts, unmapped data, and logs visible to operators.',
    width: 1600,
    height: 900,
    aspectRatio: '16/9',
  },
  productDetail: {
    slot: 'productDetail',
    filename: 'gadgeto-product-detail.webp',
    alt: 'Gadgeto product detail page with specifications and purchase options',
    caption: 'Product detail page with specs driven by normalized catalog attributes.',
    width: 1600,
    height: 1000,
    aspectRatio: '16/10',
  },
};

export function gadgetoCaseStudyPublicPath(filename: string): string {
  return `/${GADGETO_CASE_STUDY_IMAGE_SUBDIR}/${filename}`;
}

export function gadgetoCaseStudyFilesystemPath(filename: string): string {
  return join(process.cwd(), 'public', GADGETO_CASE_STUDY_IMAGE_SUBDIR, filename);
}
