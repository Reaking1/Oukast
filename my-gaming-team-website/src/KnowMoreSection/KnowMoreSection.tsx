import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok, faTwitch } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

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
     <div className="absolute w-[300px] h-[300px]">
 {/* Clockwise orbit layer */}
  <div className="absolute inset-0 animate-orbit-cw">
    {[0, 90, 180, 270].map((angle, i) => (
      <div
        key={`cw-${i}`}
        className="absolute top-1/2 left-1/2"
        style={{
          transform: `rotate(${angle}deg) translateY(-120px) rotate(-${angle}deg)`
        }}
      >
        <FontAwesomeIcon
          icon={[faTwitch, faGamepad, faInstagram, faTiktok][i]}
          size="2x"
          className="text-white icon-glow"
        />
      </div>
    ))}
  </div>

  {/* Counter-clockwise orbit layer */}
  <div className="absolute inset-0 animate-orbit-ccw">
    {[45, 135, 225, 315].map((angle, i) => (
      <div
        key={`ccw-${i}`}
        className="absolute top-1/2 left-1/2"
        style={{
          transform: `rotate(${angle}deg) translateY(-90px) rotate(-${angle}deg)`
        }}
      >
        <FontAwesomeIcon
          icon={[faGamepad, faTwitch, faInstagram, faTiktok][i]}
          size="2x"
          className="text-white icon-glow"
        />
      </div>
    ))}
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