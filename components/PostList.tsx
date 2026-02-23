"use client";

import { useState } from 'react';
import Link from 'next/link';
import { PostData } from '../lib/posts';

export default function PostList({ posts }: { posts: PostData[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    const searchLower = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="flex flex-col gap-10">
      {/* Buscador */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-[#a3a3a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="search"
          placeholder="Buscar artículos por título o descripción..."
          className="w-full pl-12 pr-4 py-3 bg-[#111] border border-[#333] rounded-xl text-white placeholder-[#a3a3a3] focus:outline-none focus:border-[#666] transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-12">
        {filteredPosts.length === 0 ? (
          <p className="text-[#a3a3a3] text-center py-8">No se encontraron artículos que coincidan con "{searchQuery}".</p>
        ) : (
          <>
            {/* Featured Post */}
            {filteredPosts.length > 0 && (
              <div className="flex flex-col gap-8">
                {filteredPosts.slice(0, 1).map(({ slug, date, title, description, image, protected: isProtected }) => (
                  <div key={slug} className="group">
                    <Link href={`/blog/${slug}`} className="block">
                      <div className="flex flex-col gap-4">
                        {image && (
                          <div className="relative w-full h-64 sm:h-96 overflow-hidden rounded-lg bg-[#262626]">
                            <img
                              src={image}
                              alt={title}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <span className="text-sm text-[#a3a3a3] tabular-nums">
                            {date}
                          </span>
                          <h2 className="text-2xl font-bold group-hover:text-white transition-colors flex items-center gap-2">
                            {title}
                            {isProtected && (
                              <span className="text-xs bg-[#262626] text-[#a3a3a3] px-2 py-0.5 rounded border border-[#333]">
                                Privado 🔒
                              </span>
                            )}
                          </h2>
                          <p className="text-[#a3a3a3] line-clamp-3 text-lg">
                            {description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Grid Posts */}
            {filteredPosts.length > 1 && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.slice(1).map(({ slug, date, title, description, image, protected: isProtected }) => (
                  <li key={slug} className="group">
                    <Link href={`/blog/${slug}`} className="block h-full">
                      <div className="flex flex-col gap-4 h-full">
                        {image && (
                          <div className="relative w-full h-48 overflow-hidden rounded-lg bg-[#262626]">
                            <img
                              src={image}
                              alt={title}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="flex flex-col gap-2 flex-grow">
                          <span className="text-sm text-[#a3a3a3] tabular-nums">
                            {date}
                          </span>
                          <h2 className="text-xl font-semibold group-hover:text-white transition-colors flex items-center gap-2">
                            {title}
                            {isProtected && (
                              <span className="text-xs bg-[#262626] text-[#a3a3a3] px-2 py-0.5 rounded border border-[#333]">
                                Privado 🔒
                              </span>
                            )}
                          </h2>
                          <p className="text-[#a3a3a3] line-clamp-2">
                            {description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
