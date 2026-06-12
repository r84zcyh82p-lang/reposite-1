import Description from "../components/description/Description";
import TopCast from "../components/description/TopCast";
import Header from "../components/header/Header";
import MainMovieSection from "../components/movies/MainMovieSection";

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="w-full h-full pb-10">
        <Description />
        <TopCast />
        <MainMovieSection />
      </div>
    </div>
  )
}
