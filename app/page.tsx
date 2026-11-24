import { getPublicPostsData } from '../lib/posts';
import PostList from '../components/PostList';
import styles from './page.module.css';

export default function Home() {
    const allPostsData = getPublicPostsData();

    return (
        <section>
            <div className={styles['page-container']}>
                <h1 className={styles['page-title']}>Blog</h1>
                <p className={styles['page-description']}>
                    Escribo sobre lo que construyo, lo que leo y lo que me cuesta. Acá van los proyectos
                    que abro en público, las lecturas que me cambian la forma de pensar y los temas
                    personales que prefiero contarle a alguien antes que a un hilo de LinkedIn.
                    <br /><br />
                    La idea es aprender, documentar y construir conocimiento en público.
                </p>

                {/* Enlaces Sociales / Perfil */}
                <div className={styles['social-links']}>
                    <a
                        href="https://ospinajuanp-portafolio.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles['social-link']}
                    >
                        <svg viewBox="0 0 24 24" className="icon-stroke">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.222-.62-9-1.745M16 6V4a2 2 0 00-2-2h-2a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 01-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Portafolio</span>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/ospinajuanp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles['social-link']}
                    >
                        <svg viewBox="0 0 24 24">
                            <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zM8.5 18.5h-3v-9h3v9zM7 10.8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11.5 7.7h-3v-4.7c0-1.2-.4-2-1.5-2-1.1 0-1.5.8-1.5 1.9v4.8h-3v-9h3v1.3h.1c.4-.8 1.4-1.6 2.9-1.6 2.1 0 3.5 1.3 3.5 4.1v5.2z" />
                        </svg>
                        <span>LinkedIn</span>
                    </a>

                    <a
                        href="https://github.com/ospinajuanp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles['social-link']}
                    >
                        <svg viewBox="0 0 24 24">
                            <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.1.7.8.6A12 12 0 0012 .3z" />
                        </svg>
                        <span>GitHub</span>
                    </a>

                    <a
                        href="/feed.xml"
                        className={styles['social-link']}
                    >
                        <svg viewBox="0 0 24 24" className="icon-stroke">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16" />
                        </svg>
                        <span>RSS</span>
                    </a>
                </div>
            </div>

            <PostList posts={allPostsData} />
        </section>
    );
}
