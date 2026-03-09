const GENRES = ['ALL', 'TECHNO', 'HOUSE', 'BOLLYWOOD', 'HIP-HOP', 'TECH-HOUSE'];

interface GenreFilterProps {
    selectedGenre: string;
    onGenreChange: (genre: string) => void;
}

export default function GenreFilter({ selectedGenre, onGenreChange }: GenreFilterProps) {
    return (
        <div className="flex flex-wrap gap-3">
            {GENRES.map((genre) => (
                <button
                    key={genre}
                    onClick={() => onGenreChange(genre)}
                    className={`px-4 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.15em] transition-all border ${selectedGenre === genre
                            ? 'bg-neon-slime text-void-black border-neon-slime shadow-slime-glow-soft'
                            : 'bg-white/5 text-brand-gray/40 border-white/10 hover:border-neon-slime/30 hover:text-brand-gray/60'
                        }`}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
}
