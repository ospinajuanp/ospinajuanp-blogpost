import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

export default function Home() {
  const allPostsData = getSortedPostsData().filter(post => !post.hidden);

  return (
    <section>
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 tracking-tighter text-white">Blog</h1>
        <p className="text-lg text-[#a3a3a3]">
          Este blog nace como un espacio para compartir mi crecimiento en el mundo de la tecnología. Aquí encontrarás contenido sobre herramientas, conceptos y tendencias del sector, pero también mis apuntes personales de cada clase que voy desarrollando en mi formación tecnológica en el SENA.<br/><br/>
          La idea es aprender, documentar y construir conocimiento en público.
        </p>
      </div>

      <ul className="flex flex-col gap-8">
        {allPostsData.map(({ slug, date, title, description, image, protected: isProtected }) => (
          <li key={slug} className="group">
            <Link href={`/blog/${slug}`} className="block">
              <div className="flex flex-col gap-4">
                {image && (
                  <div className="relative w-full h-48 sm:h-64 overflow-hidden rounded-lg bg-[#262626]">
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
    </section>
  );
}
