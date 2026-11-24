'use client';

import { useState } from 'react';
import styles from './PasswordProtection.module.css';

const ERROR_ID = 'password-protection-error';

interface PasswordProtectionProps {
    onSubmit: (password: string) => Promise<boolean>;
}

export default function PasswordProtection({ onSubmit }: PasswordProtectionProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        const isValid = await onSubmit(password);

        if (!isValid) {
            setError(true);
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.intro}>
                <h1 className={styles.title}>Contenido protegido</h1>
                <p className={styles.description}>
                    Este post requiere una clave de acceso para ser visualizado.
                </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa la clave..."
                    aria-label="Clave de acceso"
                    aria-invalid={error}
                    aria-describedby={error ? ERROR_ID : undefined}
                    className={styles.input}
                    autoFocus
                />
                {error && (
                    <p id={ERROR_ID} role="alert" className={styles.error}>
                        Clave incorrecta. Inténtalo de nuevo.
                    </p>
                )}
                <button type="submit" disabled={loading} aria-busy={loading} className={styles.button}>
                    {loading ? 'Verificando...' : 'Desbloquear'}
                </button>
            </form>
        </div>
    );
}
