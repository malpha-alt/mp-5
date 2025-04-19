import { redirect } from 'next/navigation';
import clientPromise from '../../lib/mongodb';

export default async function AliasPage({ params }: { params: { alias: string } }) {
  const { alias } = await params;

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const collection = db.collection('urls');

  const mapping = await collection.findOne({ alias });

  if (mapping) {
    redirect(mapping.url);
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-red-500">404 - Alias Not Found</h1>
      </div>
    );
  }
}
