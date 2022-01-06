import React, {useState} from 'react'

function Tile({piece, width, r, c, select, onPress, valid}) {
    const whitePieces = ["", "\u2659", "\u2656", "\u2658", "\u2657", "\u2654", "\u2655"];
    const blackPieces = ["", "\u265F", "\u265C", "\u265E", "\u265D", "\u265A", "\u265B",];
  
    const toggle = () => {
        onPress?.(r,c, piece);
        // heightIn();
    }

    return (
        <div style = {
        {transition:'all 0.4s'}}
        className = {`w-20 h-20 text-6xl flex-col flex items-center justify-center select-none 
                    ${(r+c) % 2 === 0 ? 'whiteTile' : 'blackTile'} 
                    ${select ? 'select' : ''}
                    ${valid && (r+c) % 2 === 0 ? 'validWhite' : ''}
                    ${valid && (r+c) % 2 === 1 ? 'validBlack' : ''}
                    `}
        onClick={() => toggle()}
        >
            <div className='' style={{marginTop:-2}}>
                {piece > 0 ? blackPieces[piece] : whitePieces[0-piece]}
            </div>
            
        </div>
    )
}

export default Tile
