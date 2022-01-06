import React from 'react'

function ChessIcon({piece}) {
    const whitePieces = ["", "\u2659", "\u2656", "\u2658", "\u2657", "\u2654", "\u2655"];
    const blackPieces = ["", "\u265F", "\u265C", "\u265E", "\u265D", "\u265A", "\u265B",];
    return (
        <div className='text-3xl'>
            {piece > 0 ? blackPieces[piece] : whitePieces[0-piece]}
        </div>
    )
}

export default ChessIcon
