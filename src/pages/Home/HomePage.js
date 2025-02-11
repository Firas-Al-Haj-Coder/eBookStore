import HeroSec from "./components/HeroSec"
import FeaturedProdsSec from "./components/FeaturedProdsSec"
import TestimonialsSec from "./components/TestimonialsSec"
import FaqSec from "./components/FaqSec"
import useTitle from "../../hooks/useTitle"

export default function HomePage() {
  useTitle('Home');
  return (
    <main>
        <HeroSec/>
        <FeaturedProdsSec/>
        <TestimonialsSec/>
        <FaqSec/>
    </main>
  )
}
