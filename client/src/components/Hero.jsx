import logo from "../assets/logo.svg"
const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full flex-row mb-10 pt-3">
        <img src={logo} alt="logo" className="w-28 object-contain" />
        <button className="black_btn" onClick={() => window.open("https://tailwindcss.com/docs/guides/vite")}>
          Github
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">GPT-4 API</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with SumUp, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
      {/* <h1 className="blue_gradient text-5xl">Hero</h1> */}
    </header>
  )
}

export default Hero