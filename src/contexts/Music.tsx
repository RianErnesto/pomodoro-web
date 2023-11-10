"use client"

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { musics } from "@/modal/Musics";

export type MusicStylesType = "Jazz" | "Lofi"
export type MusicType = {
    name: string,
    youtubeUrl: string,
    embedUrl: string
}

type MusicContextProps = {
    playMusic: () => void,
    stopMusic: () => void,
    pauseMusic: () => void,
    setMusicVolume: (volume: number) => void,
    setMusicStyleRhythm: (style: MusicStylesType) => void,
    setPreviousMusic: () => void,
    setNextMusic: () => void
    music: MusicType,
    isPaused: boolean
}

const MusicContext = createContext<MusicContextProps>({} as MusicContextProps)

export const MusicProvider = ({ children }: { children: ReactNode }) => {
    const [player, setPlayer] = useState<any>(null)
    const [musicStyle, setMusicStyle] = useState("Jazz")
    const [music, setMusic] = useState(musics[0].musics[0])
    const [isPaused, setIsPaused] = useState(false)

    const playMusic = () => {
        // @ts-ignore
        player?.playVideo()
        setIsPaused(false)
    }

    const stopMusic = () => {
        // @ts-ignore
        player?.stopVideo()
    }

    const pauseMusic = () => {
        // @ts-ignore
        player?.pauseVideo()
        setIsPaused(true)
    }

    const setMusicVolume = (volume: number) => {
        // @ts-ignore
        player?.setVolume(volume)
    }

    const setPreviousMusic = () => {
        const currentMusicIndex = musics.find(music => music.name === musicStyle)?.musics.indexOf(music)
        if (currentMusicIndex === 0)
            return
        if (currentMusicIndex !== undefined)
            setMusic(previous => 
                musics.find(music => music.name === musicStyle)?.musics[currentMusicIndex - 1] || musics[0].musics[0]
            )
        playMusic()
    }

    const setNextMusic = () => {
        const currentMusicIndex = musics.find(music => music.name === musicStyle)?.musics.indexOf(music)
        const musicLength = musics.find(music => music.name === musicStyle)?.musics.length
        if (musicLength && currentMusicIndex === musicLength - 1)
            return
        if (currentMusicIndex !== undefined)
            setMusic(previous =>
                musics.find(music => music.name === musicStyle)?.musics[currentMusicIndex + 1] || musics[0].musics[0]
            )
        playMusic()
    }

    const setMusicStyleRhythm = (style: MusicStylesType) => {
        setMusicStyle(style)
        setMusic(
            musics.find(m => m.name === style)?.musics[0] || musics[0].musics[0]
        )
    }

    useEffect(() => {
        let tag = document.createElement('script')
        tag.src = "https://www.youtube.com/iframe_api"
        let firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

        // @ts-ignore
        window.onYouTubeIframeAPIReady = () => {
            // @ts-ignore
            setPlayer(new YT.Player('player'))
        }
    }, [])

    const value = {
        pauseMusic,
        stopMusic,
        playMusic,
        setMusicVolume,
        setMusicStyleRhythm,
        music,
        setPreviousMusic,
        setNextMusic,
        isPaused
    }

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    )
}

export const useMusic = () => {
    const context = useContext<MusicContextProps>(MusicContext)

    if (context === undefined) {
        throw new Error("useMusic must be used within a MusicProvider")
    }

    return context
}