import { useThreads } from '@liveblocks/react/suspense';

import { 
    AnchoredThreads,
    FloatingComposer,
    FloatingThreads
} from '@liveblocks/react-tiptap'

import { Editor } from '@tiptap/react'

// The Threads component is used to display the threads in the editor. This code is from liveblocks-react documentation.
export function Threads ({ editor}: { editor: Editor | null }) {
    const { threads } = useThreads({ query: { resolved: false } });


    return (
        <>
        <div className='anchored-threads'>
            <AnchoredThreads editor = {editor} threads = {threads} />
        </div>  
            <FloatingThreads threads={threads} editor={editor} />
            <FloatingComposer editor={editor} threads={threads} className='floating-threads'/>
            <FloatingComposer editor={editor} threads={threads} className='floating-composeer'/>
        </>
    )
}