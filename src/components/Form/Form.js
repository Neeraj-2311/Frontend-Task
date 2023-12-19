import { useState } from 'react';
import { ReactComponent as CheckSvg } from '../../assets/icons/check-icon.svg';
import { ReactComponent as PinSvg } from '../../assets/icons/pin.svg';
import { ReactComponent as UnpinSvg } from '../../assets/icons/unpin.svg';
import { ReactComponent as ColorSvg } from '../../assets/icons/color.svg';

export const Form = ({setNotes, counter, setCounter, notes, note, setShowModal}) => {
    const [inputTitle, setInputTitle] = useState('');
    const [inputPinned, setInputPinned] = useState(false);
    const [inputTagline, setInputTagline] = useState('');
    const [inputBody, setInputBody] = useState('');
    const [inputBg, setInputBg] = useState('#ffffff');

    const createNote = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const tagline = e.target.tagline.value || '';
        const body = e.target.body.value || '';
        const bgColor = e.target.background.value || '#ffffff';
        
        const newNote = { key: counter, title, pinned: inputPinned, tagline, body, bgColor };
        setNotes((prevNotes) => [newNote, ...prevNotes]);
        setCounter(counter + 1);
        
        setInputBody('');
        setInputTagline('');
        setInputTitle('');
        setInputBg('#ffffff');
        setInputPinned(false);
    };

    const updateNote = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const tagline = e.target.tagline.value || '';
        const body = e.target.body.value || '';
        const bgColor = e.target.background.value || '#ffffff';
        
        const updatedNotes = notes.map((item) =>
          item.key === note.key ? { ...item, pinned: inputPinned, tagline, body, title, bgColor} : note
        );
        setNotes(updatedNotes);
        setShowModal(false);
    }

    return (
        <form onSubmit={(e) => note ? updateNote(e):createNote(e)} style={{ backgroundColor: inputBg }}>
            <div className="title-input-div">
                <input required
                    name="title"
                    type='text'
                    id="title"
                    placeholder='Title of the note'
                    value={inputTitle}
                    onChange={(e, val) => setInputTitle(val)}
                    />
                <button className='pin-btn' onClick={(e) => { e.preventDefault(); setInputPinned(!inputPinned) }}>{inputPinned ? <UnpinSvg /> : <PinSvg />}</button>
            </div>
            <hr />
            <input
                name="tagline"
                type='text'
                id="tagline"
                placeholder='Add a tagline'
                value={inputTagline}
                onChange={(e, val) => setInputTagline(val)}
                />
            <hr />
            <textarea
                type='text'
                name="body"
                id="note-body"
                rows={note? 12:6}
                placeholder='Write your content here...'
                value={inputBody}
                onChange={(e, val) => setInputBody(val)}
            />
            <div className='btn-div'>
                <label className="color-input-label">Set background <ColorSvg />
                    <input type="color"
                        name='background'
                        value={inputBg}
                        onChange={(e) => setInputBg(e.target.value)}
                    />
                </label>
                <button type="submit">Done <CheckSvg /></button>
            </div>
        </form>
    )
}
