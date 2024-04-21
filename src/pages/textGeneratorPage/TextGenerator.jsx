//Layout Component
import Sidebar from "./Sidebar/Sidebar.jsx";
import GeneratorBar from "./GeneratorBar/GeneratorBar.jsx";

//Style
import "../textGeneratorPage/textGenerator.css";

const TextGenerator = ({ theme, language, setPopup }) => {

  return (

    <div className='generator-page-layout  smooth-transitions '>
      {/* Sidebar */}
      <div className={`siderbar-bar md:h-screen md:w-[25%] z-10 smooth-transitions ${theme ? "bg-[#f6f6f6]" : "bg-[#121212]"}`}>
        <Sidebar theme={theme} language={language} setPopup={setPopup} />
      </div>

      {/* Generator Bar */}
      <div className="generator-bar h-screen md:w-[75%] flex flex-col items-center">
        <GeneratorBar theme={theme} language={language} />
      </div>
    </div>

  );
};

export default TextGenerator;
