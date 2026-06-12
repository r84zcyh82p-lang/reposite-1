import MovieSection from "./MovieSection";
import SerialSection from "./SerialSection";

export default function MainMovieSection() {
  return (
    <div className={`mt-10`}> 
      <SerialSection />
      <div className="w-full h-px bg-[rgba(255,255,255,0.1)]"></div>
      <MovieSection />
      <div className="w-full h-px bg-[rgba(255,255,255,0.1)]"></div>
    </div>
  )
}
