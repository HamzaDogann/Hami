import Sidebar from "./Sidebar/Sidebar.jsx";
import GeneratorBar from "./GeneratorBar/GeneratorBar.jsx";

import { useTheme } from "../../providers/ThemeContext";

import "../textGeneratorPage/textGenerator.css";

const TextGenerator = () => {

  const { isLightTheme } = useTheme();

  return (
    <div className='generator-page-layout  smooth-transitions '>
      {/* Sidebar */}
      <div className={`siderbar-bar md:h-screen md:w-[25%] z-10 smooth-transitions ${isLightTheme ? "bg-[#f6f6f6]" : "bg-[#121212]"}`}>
        <Sidebar />
      </div>

      {/* Generator Bar */}
      <div className="generator-bar h-screen md:w-[75%] flex flex-col items-center">
        <GeneratorBar />
      </div>
    </div>
  );
};

export default TextGenerator;
