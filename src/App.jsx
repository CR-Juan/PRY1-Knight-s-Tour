import { useState } from 'react'
import './App.css'

function App() {
  const [size, setSize] = useState(0)
  const [showBoard, setShowBoard] = useState(false)
  const [board, setBoard] = useState([])

  const crearBoard = (size) => {
    const newBoard = []
    for (let i = 0; i < size; i++) {
      const row = []
      for (let j = 0; j < size; j++) {
        row.push(-1)
      }
      newBoard.push(row)
    }
    return newBoard
  }

  const menuManager = () => {
    if (sizeValid(size)) {
      const newBoard = crearBoard(size)
      setBoard(newBoard)
      setShowBoard(true)
    } else {
      alert('Por favor, introduce un tamaño de tablero válido (5-7).')
    }
  }

  if (showBoard) {
    return (
      <div>
        <h1>Tablero {size}x{size}</h1>
        {board.length > 0 && (
          <table className="board">
            <tbody>
              {board.map((fila, i) => (
                <tr key={i}>
                  {fila.map((col, ci) => (
                    <td key={ci}>
                      {col === -1 ? '' : col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button className="volver-button" onClick={() => setShowBoard(false)}>
          Volver
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1>Knight's Tour - Recorrido del Caballo</h1>
      <div className="input-container">
        <div className="input-row">
          <label htmlFor="size">Tamaño del tablero: </label>
          <input 
            type="number" 
            value={size} 
            onChange={(e) => setSize(parseInt(e.target.value))} 
          />
          <button className="volver-button" onClick={menuManager}>Iniciar Recorrido</button>
        </div>
      </div>
    </div>
  )
}

function sizeValid(size) {
  return size >= 5 && size < 8
}

export default App
