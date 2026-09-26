import { useEffect, useState } from "react"

import { useLanguage } from "../../../providers/LanguageContext";
import HamiLogo from '../../../components/HamiLogo';

// Intro animation: what is on screen from each point in time (ms).
const INTRO_TIMELINE = [
    { at: 1600, stage: "none" },
    { at: 2200, stage: "loginInfoTitle" },
    { at: 4200, stage: "none" },
    { at: 4800, stage: "loginInfoReady" },
    { at: 7200, stage: "none" },
    { at: 7600, stage: "loginInfoStart" },
    { at: 11400, stage: "none" },
    { at: 12200, stage: "done" },
];

const HamiLogoAndInfos = ({ onIntroFinished }) => {

    const { t } = useLanguage();
    const [stage, setStage] = useState("logo");

    useEffect(() => {
        const timers = INTRO_TIMELINE.map(({ at, stage }) => setTimeout(() => setStage(stage), at));
        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (stage === "done") onIntroFinished();
    }, [stage, onIntroFinished]);

    const isInfoStage = stage.startsWith("loginInfo");

    return (
        <>
            <div className="hami-logo-box">
                {stage === "logo" && <HamiLogo />}
                {isInfoStage && <p className="hami-login-info">{t(stage)}</p>}
            </div>

            {stage === "done" &&
                <div className="hami-logo-box">
                    <HamiLogo />
                </div>
            }
        </>
    )
}

export default HamiLogoAndInfos
