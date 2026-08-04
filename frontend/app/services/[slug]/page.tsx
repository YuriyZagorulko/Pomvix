import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServicePage } from '@/components/service-page';
import { serviceBySlug, services } from '@/lib/services';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = serviceBySlug[params.slug];
  if (!service) return {};
  return pageMetadata(service.title, service.description, `/services/${service.slug}`);
}

export default function ServiceRoute({ params }: { params: { slug: string } }) {
  const service = serviceBySlug[params.slug];
  if (!service) notFound();
  return <ServicePage service={service} />;
}
