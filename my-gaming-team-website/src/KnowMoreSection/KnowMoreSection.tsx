import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok, faTwitch } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom";

const infoCards = [
    {
     img: "/assets/about.jpg",
    text: "Learn about our mission and journey.",
    link: "/about",   
    },
    {
    img: "/assets/tips.jpg",
    text: "Get pro-level tips on your favorite games.",
    link: "/tips",
  },
  {
    img: "/assets/tips.jpg",
    text: "Get pro-level tips on your favorite games.",
    link: "/tips",
  },
];

export default function KnowMoreSection() {
    return (
        <section className="w-full py-20 bg-[#f3eaf9] text-[#111] font-ubuntu relative">
            {/**Title  & Rotating Icons */}
          {/* Title + Orbit Icons */}
      <div className="text-center mb-16 relative flex justify-center items-center h-[200px]">
        {/* Center Planet */}
        <h2 className="text-3xl md:text-5xl font-bold z-10">Know More About Us</h2>

        {/* Orbiting Icons */}
        <div className="absolute w-[250px] h-[250px]">
          <div className="absolute top-1/2 left-1/2 origin-center animate-orbit">
            <FontAwesomeIcon icon={faTwitch} size="lg" className="text-purple-700" />
          </div>
          <div className="absolute top-1/2 left-1/2 origin-center animate-orbit-slow">
            <FontAwesomeIcon icon={faTiktok} size="lg" className="text-black" />
          </div>
          <div className="absolute top-1/2 left-1/2 origin-center animate-orbit-slower">
            <FontAwesomeIcon icon={faInstagram} size="lg" className="text-pink-500" />
          </div>
        </div>
      </div>
            {/**Cards */}
            <div className="grid md:grid-cols-3 gap-10 px-6 md:px-20">
                {infoCards.map((item, index) => (
                    <div key={index} className="relative group overflow-hidden rounded-xl shadow-xl bg-white text-black transition-all duration-300">
                            <img src={item.img} alt="Card" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="p-6">
                                <p className="text-lg font-semibold">{item.text}</p>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-purple-700 text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Link to={item.link} className="text-sm font-bold uppercase tracking-wide">
                                Know More
                                </Link>
                            </div>
                    </div>
                ))}
            </div>
        </section>
    )
}