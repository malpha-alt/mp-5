import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { UrlMapping } from '../../../types';

export async function POST(req: Request) {
  const { alias, url }: UrlMapping = await req.json();

  if (!alias || !url) {
    return NextResponse.json({ error: "Alias and URL are required." }, { status: 400 });
  }

  try {
    new URL(url); // Basic backend URL validation
  } catch {
    return NextResponse.json({ error: "Invalid URL." }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const collection = db.collection('urls');

  const existing = await collection.findOne({ alias });

  if (existing) {
    return NextResponse.json({ error: "Alias already exists." }, { status: 409 });
  }

  await collection.insertOne({ alias, url });

  return NextResponse.json({ message: "URL successfully shortened!" });
}
