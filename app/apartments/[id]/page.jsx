import { notFound } from 'next/navigation';
import ListingView from '../../../components/ListingView';
import { LISTINGS, getListing } from '../../../lib/data';

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const l = getListing(id);
  return l ? { title: `${l.title}, ${l.area}`, description: l.description.slice(0, 150) } : {};
}

export default async function Listing({ params }) {
  const { id } = await params;
  const l = getListing(id);
  if (!l) notFound();
  return <ListingView l={l} />;
}
