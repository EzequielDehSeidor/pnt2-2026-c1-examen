
import Link from "next/link";
const API_URL = "https://tp2backend-a5aqduchhdfrdffm.brazilsouth-01.azurewebsites.net/api/movies"

async function fetchMovie(id) {
    const res = await fetch(`${API_URL}/${id}`, { next: { revalidate: 60 } });
    if(!res.ok) return null;
    return res.json();
}

export default async function MovieDetailPage({ params }){

    const { id } = await params;
    // console.log("ID", id)
    const movie = await fetchMovie(id);
    // console.log("Movie", movie)

    if (!movie) {
        return (
            <div>
                <h1>Película no encontrada</h1>
                <Link href="/movies" className="text-blue-500  cursor-pointer">Volver</Link>
            </div>
        )
    }

    return (
        // title, plot, cast, year y genres
        <div className="min-h-screen bg-back text-white p-6">
            <button className="flex items-center justify-center border border-white/10 bg-white/5 h-6 p-4 rounded-lg">
                <Link href="/movies" className="text-zinc-200 cursor-pointer"> ← Volver</Link>
            </button>
            <main className="mx-auto flex max-w-3x1 flex-col items-center justify-center gap-2 py-16 sm:px-10">
                <div className="border border-white/10 w-[50%] p-6 rounded-lg bg-white/5 text-black">

                    <div className="w-full flex items-center justify-center mb-2">
                        <img src={movie.poster} alt={movie.title} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-4xl mb-3 border-b border-[#d1d5db] text-zinc-200">{movie.title}</p>
                        <p className="font-medium text-2xl text-zinc-200">{movie.plot}</p>
                        <p className="font-semibold text-xl text-zinc-200">{movie.cast?.join(", ")}</p>
                        <p className="font-bold text-xl text-zinc-200">{movie.year}</p>
                        <p className="font-semibold text-lg text-zinc-200">{movie.genres?.join(", ")}</p>
                    </div>
                </div>
                
            </main>
        </div>
    )
} 