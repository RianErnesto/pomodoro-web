"use client"

import * as Select from "@radix-ui/react-select"
import { useMusic, MusicStylesType } from "@/contexts/Music"

const MusicStyleSelect = () => {
    const { setMusicStyleRhythm } = useMusic()

    const selectValueChange = (value: string) => {
        setMusicStyleRhythm(value as MusicStylesType)
    }

    return (
        <Select.Root defaultValue="Jazz" onValueChange={selectValueChange}>
            <Select.Trigger
                className="inline-flex min-w-[100px] items-center justify-center px-2 leading-none border-2 rounded-md border-white gap-[5px] text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
                aria-label="Food"
            >
                <Select.Value placeholder="Select a Rythm" />
            </Select.Trigger>
            <Select.Portal>
                <Select.Content position="popper" className="bg-slate-700 overflow-hidden rounded-b-md w-[--radix-select-trigger-width] max-h-[--radix-select-content-available-height]">
                    <Select.Viewport className="p-2">
                        <Select.Item value="Jazz" className='flex hover:bg-slate-900 justify-center items-center p-2 leading-none text-violet11 rounded-[3px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'>
                            <Select.ItemText>Jazz</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="Lofi" className='flex hover:bg-slate-900 justify-center items-center p-2 leading-none text-violet11 rounded-[3px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'>
                            <Select.ItemText>Lofi</Select.ItemText>
                        </Select.Item>
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}

export default MusicStyleSelect