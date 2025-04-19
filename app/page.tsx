'use client';

import { useState } from 'react';

export default function Home() {
  const [alias, setAlias] = useState('');
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alias, url }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        setShortenedUrl(`${window.location.origin}/${alias}`);
      }
    } catch {
      setError('Something went wrong.');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-8">URL Shortener</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter Alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          className="border border-gray-300 rounded p-2"
          required
        />
        <input
          type="url"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-300 rounded p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">
          Shorten URL
        </button>
      </form>

      {shortenedUrl && (
        <div className="mt-6">
          <p className="text-green-600 font-semibold">Shortened URL:</p>
          <a href={shortenedUrl} className="text-blue-500 underline" target="_blank">
            {shortenedUrl}
          </a>
        </div>
      )}

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}
    </main>
  );
}
