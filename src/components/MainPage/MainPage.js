import './mainPage.css';
import { useState } from 'react';
import { ReactComponent as PinSvg } from '../../assets/icons/pin.svg';
import { ReactComponent as UnpinSvg } from '../../assets/icons/unpin.svg';
import { ReactComponent as ColorSvg } from '../../assets/icons/color.svg';
import { ReactComponent as DeleteSvg } from '../../assets/icons/delete.svg';
import { Form } from '../Form/Form';

export const MainPage = () => {
    
    const [notes, setNotes] = useState([]);
    const [counter, setCounter] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalNote, setModalNote] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const deleteNote = (key) => {
        const updatedNotes = notes.filter((note) => note.key !== key);
        setNotes(updatedNotes);
    };

    const togglePin = (key) => {
        const updatedNotes = notes.map((note) =>
          note.key === key ? { ...note, pinned: !note.pinned } : note
        );
        setNotes(updatedNotes);
    };

    const updateNoteColor = (key, color) => {
        const updatedNotes = notes.map((note) =>
            note.key === key ? { ...note, bgColor: color } : note
        );
        setNotes(updatedNotes);
    };

    const handleOpenModal = (e, note) => {
        e.preventDefault();
        setModalNote(note);
        setShowModal(true);
    }

    const getPinnedNotes = () => notes.filter((note) => note.pinned);
    const getUnpinnedNotes = () => notes.filter((note) => !note.pinned);

    const indexOfLastNote = currentPage * itemsPerPage;
    const indexOfFirstNote = indexOfLastNote - itemsPerPage;
    const currentNotes = getUnpinnedNotes().slice(indexOfFirstNote, indexOfLastNote);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // useEffect(() => {
    //     const abortController = new AbortController();
    //     const signal = abortController.signal;

    //     (async () => {
    //         const data = notes.map(({ key, ...rest }) => rest);
    //         const response = await fetch('',{
    //             method: 'POST',
    //             body: JSON.stringify(data),
    //             signal,
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         const res = await response.json();
    //     })();

    //     return () => {
    //         abortController.abort();
    //     }
    // }, [notes])

    return(
        <div className='mainpage'>
            <Form setNotes={setNotes} counter={counter} setCounter={setCounter}/>
            {getPinnedNotes().length > 0 && <h4>Pinned notes</h4>}
            <div className="note-container">
                {getPinnedNotes()?.map((note, index) => (
                    <div className="note-item" key={index} style={{backgroundColor: note.bgColor}}>
                        <div onClick={(e) => handleOpenModal(e, note)}>
                            <h2>{note.title}</h2>
                            <p><em>{note.tagline}</em></p>
                            <p>{note.body}</p>
                        </div>
                        <div className='style-div'>
                            <button className='pin-btn' onClick={() => togglePin(note.key)}>{note.pinned ? <UnpinSvg/>:<PinSvg/>}</button>
                            <label className="color-input-label"><ColorSvg/>
                                <input 
                                    type="color"
                                    value={note.bgColor}
                                    onChange={(e) => updateNoteColor(note.key, e.target.value)}
                                />
                            </label>
                            <button className='delete-btn' onClick={() => deleteNote(note.key)}><DeleteSvg/></button>                    
                        </div>
                    </div>
                ))}
            </div>
            {getUnpinnedNotes().length > 0 && <h4>Unpinned notes</h4>}
            <div className='note-container'>
                {currentNotes?.map((note, index) => (
                    <div className="note-item" key={index} style={{backgroundColor: note.bgColor}}>
                        <div onClick={(e) => handleOpenModal(e, note)}>
                            <h2>{note.title}</h2>
                            <p><em>{note.tagline}</em></p>
                            <p>{note.body}</p>
                        </div>
                        <div className='style-div'>
                            <button className='pin-btn' onClick={() => togglePin(note.key)}>{note.pinned ? <UnpinSvg/>:<PinSvg/>}</button>
                            <label className="color-input-label"><ColorSvg/>
                                <input 
                                    type="color"
                                    value={note.bgColor}
                                    onChange={(e) => updateNoteColor(note.key, e.target.value)}
                                />
                            </label>
                            <button className='delete-btn' onClick={() => deleteNote(note.key)}><DeleteSvg/></button>                    
                        </div>
                    </div>
                ))}
            </div>
            {currentNotes.length > 0 && <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
                    {'<'}
                </button>
                {Array.from({ length: Math.ceil(notes.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? 'current-page' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button disabled={currentPage === Math.ceil(notes.length / itemsPerPage)} onClick={() => paginate(currentPage + 1)}>
                    {'>'}
                </button>
            </div>}
            {showModal && <div className='modal-container'>
                <Form setNotes={setNotes} note={modalNote} notes={notes} setShowModal={setShowModal}/>
            </div>}
        </div>
    )
}
