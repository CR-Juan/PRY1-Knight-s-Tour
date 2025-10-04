import { useState } from 'react'
import './App.css'
import caballoIcon from './assets/knight.png'

function App() {
  const [size, setSize] = useState(0)
  const [showBoard, setShowBoard] = useState(false)
  const [board, setBoard] = useState([])
  const [oldSelect, setOldSelect] = useState(null)

  const crearBoard = (size) => {
    const newBoard = []
    for (let i = 0; i < size; i++) {
      const row = []
      for (let j = 0; j < size; j++) {
        row.push(0)
      }
      newBoard.push(row)
    }
    return newBoard
  }

  const menuManager = (size) => {
    if (sizeValid(size)) {
      const newBoard = crearBoard(size)
      setBoard(newBoard)
      setShowBoard(true)
      setOldSelect(null)
      setSize(size)
    } else {
      alert('Por favor, introduce un tamaño de tablero válido (5-7).')
    }
  }

  //este es la funcion para seleccionar el indice de la matriz por si acaso
  const seleccionarTablero = (fila, col) => {
    board[fila][col] = 1
    setBoard([...board])

    if (!oldSelect) {
      setOldSelect({ fila, col })
    } else { // por favor realizar la restrccion para que no se setee un 0 en el mismo indice para que no se quite el caballo
      board[oldSelect.fila][oldSelect.col] = 0
      setBoard([...board])
      setOldSelect({ fila, col })
    }
  }

  const getClaseCelda = (val) => {
    if (val === 0) return ''
    if (val === 1) return 'caballo-pos'
    return `move-${val}`
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
                    <td key={ci} 
                      className={getClaseCelda(col)} 
                      onClick={() => seleccionarTablero(i, ci)}>
                      {col === 0 ? '' : col === 1 ? (<img src={caballoIcon} alt="caballo" className='caballo-icon' />) : col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button className="volver-button" onClick={() => {
          setShowBoard(false)
          setSize(0)
          setBoard([])
          setOldSelect(null)
        }}>
          Volver
        </button>
      </div>
    )
  }

  return (
    <div className='chess-container'>
      <h1>Knight's Tour - Recorrido del Caballo</h1>
        <div className='tableros-validos'>
          <p>Tableros válidos:</p>
          <div className='button-container'>
            <button onClick={() => menuManager(4)}>4x4</button>
            <button onClick={() => menuManager(5)}>5x5</button>
            <button onClick={() => menuManager(6)}>6x6</button>
            <button onClick={() => menuManager(7)}>7x7</button>
          </div>
        </div>
    </div>
  )
}

function sizeValid(size) {
  return size >= 4 && size < 8
}

export default App