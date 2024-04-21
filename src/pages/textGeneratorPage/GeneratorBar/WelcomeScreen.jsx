//React Hooks - Providers
import { useContext } from "react";
import { AIContext } from '../../../providers/AIChatContext.jsx';

//Style - Icons
import { FaBoltLightning } from "react-icons/fa6";
import "./welcomeScreen.css";


const WelcomeScreen = ({ language, theme }) => {
    const { setInput } = useContext(AIContext)

    const handlerFastChatBtn = (promptText) => {
        setInput(promptText);
    }

    return (
        <div>
            <div>
                <h1 className='you-can-ask-title text-[#8e8e8e]'>
                    {language === "en"
                        ? "You can try asking these questions with Hami,"
                        : "Hami ile bunları sormayı deneyebilirsin,"
                    }
                </h1>
            </div>

            <div className='cards'>
                <button
                    onClick={() => handlerFastChatBtn(language === 'en' ? 'What are the features that come with React 19?' : 'React 19 ile gelen özellikler nelerdir?')}
                    className={`card-btn border-[3px] text-[#767676]  ${!theme ? "border-[#3d3d3d] bg-[#2e2e2e00]" : "border-[#c4c4c4]"}'`}>
                    <span><FaBoltLightning /></span>
                    <span className="ml-[10px]">
                        {
                            language === "en"
                                ? "What are the features that come with React 19?"
                                : "React 19 ile gelen özellikler nelerdir?"
                        }
                    </span>
                </button>

                <button
                    onClick={() => handlerFastChatBtn(language === 'en' ? 'Practical ideas to make that time management' : 'Zaman yönetimi yapmak için pratik fikirler')}
                    className={`card-btn border-[3px] text-[#767676]  ${!theme ? "border-[#3d3d3d] bg-[#2e2e2e00]" : "border-[#c4c4c4]"}'`}>
                    <span><FaBoltLightning /></span>

                    <span className="ml-[10px]">
                        {
                            language === "en"
                                ? "Practical ideas to make that time management"
                                : "Zaman yönetimi yapmak için pratik fikirler"
                        }
                    </span>
                </button>

                <button
                    onClick={() => handlerFastChatBtn(language === 'en' ? 'Create a document about useState' : 'useState hakkında bir döküman hazırla')}
                    className={`card-btn border-[3px] text-[#767676]  ${!theme ? "border-[#3d3d3d] bg-[#2e2e2e00]" : "border-[#c4c4c4]"}'`}>
                    <span><FaBoltLightning /></span>
                    <span className="ml-[10px]">
                        {
                            language === "en"
                                ? "Create a document about useState"
                                : "useState hakkında bir döküman hazırla"
                        }
                    </span>
                </button>

                <button
                    onClick={() => handlerFastChatBtn(language === 'en' ? '10 people who shaped the world with their inventions' : 'İcatları ile dünyaya yön veren 10 insan')}
                    className={`card-btn border-[3px] text-[#767676]  ${!theme ? "border-[#3d3d3d] bg-[#2e2e2e00]" : "border-[#c4c4c4]"}'`}>
                    <span><FaBoltLightning /></span>
                    <span className="ml-[10px]">
                        {
                            language === "en"
                                ? "10 people who shaped the world with their inventions"
                                : "İcatları ile dünyaya yön veren 10 insan"
                        }
                    </span>
                </button>
            </div>
        </div>
    )
}

export default WelcomeScreen