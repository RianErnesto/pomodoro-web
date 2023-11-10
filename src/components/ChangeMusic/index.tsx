"use client"

import { useMusic } from "@/contexts/Music"
import {FaPlay, FaPause} from "react-icons/fa"
import {MdSkipPrevious, MdSkipNext} from "react-icons/md"

const ChangeMusic = () => {
    const {pauseMusic, playMusic, setPreviousMusic, setNextMusic, isPaused} = useMusic()

    return (
        <div className="flex gap-4 w-full justify-center">
            <button onClick={setPreviousMusic}><MdSkipPrevious size={32}/></button>
            {
                isPaused ?
                <button onClick={playMusic}><FaPlay size={20}/></button> :
                <button onClick={pauseMusic}><FaPause size={20}/></button>
            }
            <button onClick={setNextMusic}><MdSkipNext size={32}/></button>
        </div>
    )
}

export default ChangeMusic