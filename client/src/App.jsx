import Demo from "./components/Demo";
import Hero from "./components/Hero";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient"/>
      </div>
      <div className="app">
        <Hero/>
        <Demo/>
      </div>
      <Toaster/>
    </main>
  )
}

export default App