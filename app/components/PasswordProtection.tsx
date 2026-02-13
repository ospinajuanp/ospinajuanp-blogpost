'use client';

import { useState } from 'react';
import { verifyPostPassword } from '../actions';
import { useRouter } from 'next/navigation';

export default function PasswordProtection({ onUnlock }: { onUnlock: () => void }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        const isValid = await verifyPostPassword(password);

        if (isValid) {
            onUnlock();
        } else {
            setError(true);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-white">Contenido Protegido</h1>
                <p className="text-[#a3a3a3]">Este post requiere una clave de acceso para ser visualizado.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa la clave..."
                    className="bg-[#1a1a1a] border border-[#333] rounded px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                    autoFocus
                />
                {error && (
                    <p className="text-red-400 text-sm">Clave incorrecta. Inténtalo de nuevo.</p>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-white text-black font-medium py-2 px-4 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Verificando...' : 'Desbloquear'}
                </button>
            </form>
        </div>
    );
}
