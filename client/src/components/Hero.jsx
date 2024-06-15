import logo from "../assets/l2.png"

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full flex-row mb-10 pt-3">
        <img src={logo} alt="logo" className="w-40 object-contain" />
        {/* <button className="black_btn" onClick={() => window.open("https://tailwindcss.com/docs/guides/vite")}>
          Github
        </button> */}
      </nav>

      <div className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">SummariEase</span>
        <div className="blue_gradient">(GPT-4 API)</div>
      </div>
      <h2 className="desc">
        Simplify your reading with SummariEase, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries !!
      </h2>
    </header>
  )
}

export default Hero