import React, { useState, useEffect } from "react"
import HistoryList from '../../Component/List/HistoryList'
import BookmarkModal from "../../Component/Modal/BookmarkModal"
import { useNavigate } from 'react-router-dom';

export default function Bookmark () {
    const navigate = useNavigate()
    useEffect(() => !localStorage.getItem('authToken') ? 
                        navigate('/login') : 
                        navigate('/Review/History')
    , []);
    const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<></>);

    const closeBookmarkModal = () => {setIsBookmarkModalOpen(false)};

    return (
        <div
        style={{
            overflow: 'scroll',
            height: 'calc(100vh - 64px)'
        }}
    >
        <HistoryList onItemClicked={()=>setIsBookmarkModalOpen(true)} setModalContent={setModalContent}/>
        <BookmarkModal open={isBookmarkModalOpen} onClosed={closeBookmarkModal} modalContent = {modalContent}/>
        </div>
    )
}