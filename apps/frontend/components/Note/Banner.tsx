import { endpoints } from '@/api/endpoints';
import useNote from '@/hooks/useNote'

const Banner = () => {
    const { note } = useNote();
    const url = note?.banner ? endpoints.notes.banner(note.banner) : "/default-bg.jpg"
    
    return (
        <div>
            <img
                src={url}
                className=' object-cover w-full pr-2.5 h-70 rounded-b-2xl'
                height={2000}
                width={2000}
                alt='Bb'
            />
        </div>
    )
}

export default Banner