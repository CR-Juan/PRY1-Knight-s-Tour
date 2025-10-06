import { useState } from 'react'
import './App.css'
import caballoIcon from './assets/knight.png'

let detener = false


function App() {
  const [size, setSize] = useState(0)
  const [showBoard, setShowBoard] = useState(false)
  const [board, setBoard] = useState([])
  const [oldSelect, setOldSelect] = useState(null)
  const [actualSelect, setActualSelect] = useState(null)
  const [enCurso, setEnCurso] = useState(false)
  

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
      alert('Por favor, introduce un tamaño de tablero válido (4-7).')
    }
  }

  //este es la funcion para seleccionar el indice de la matriz por si acaso
  const seleccionarTablero = (fila, col) => {
    if (enCurso) return

     if (board[fila][col] === "x") return // Evita seleccionar la misma celda dos veces seguidas

    board[fila][col] = "x"
    setBoard([...board])
    setActualSelect({ fila, col })

    if (!oldSelect) {
      setOldSelect({ fila, col })
    } else { 
      board[oldSelect.fila][oldSelect.col] = 0
      setBoard([...board])
      setOldSelect({ fila, col })
    }
  }

  const animacion = (ms) => new Promise(res => setTimeout(res, ms))

  const movimientoValido = (fila, col) => {
    if (fila < 0 || fila >= size || col < 0 || col >= size || board[fila][col] !== 0) {
      return false
    }
    return true
  }

  const backtrack = async (fila, col, pasos) => {
    const MOVIMIENTOS = [[-2,1], [-1,2], [1,2], [2,1], [2,-1], [1,-2], [-1,-2], [-2,-1]]
    if (detener) return false

    if (pasos === size * size) {
      return true
    }

    for (const move of MOVIMIENTOS) {
      let nueva_fila = fila + move[0]
      let nueva_col = col + move[1]

      if (movimientoValido(nueva_fila, nueva_col)) {
      if (detener) return false

        
        board[nueva_fila][nueva_col] = "x"
        board[fila][col] = pasos + 1
        setBoard([...board])

        await animacion(100)

        if (await backtrack(nueva_fila, nueva_col, pasos + 1)) {
          return true
        }
        
        if (detener) return false

        board[nueva_fila][nueva_col] = "e"
        setBoard([...board])
        await animacion(100)
        
        board[nueva_fila][nueva_col] = 0
        board[fila][col] = "x"
        await animacion(100)
        setBoard([...board])
      }
    }
    return false
  }

  const getClaseCelda = (val) => {
    if (val === 0) return ''
    if (val === "x") return 'caballo-pos'
    if (val === "e")  return 'error'
    return 'paso'
    
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
                      {col === 0 ? '' : col === "x" ? (<img src={caballoIcon} alt="caballo" className='caballo-icon' />) : col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button className={`resolver-button`} onClick={ async() => { //realicen el coso de la animacion de carga mientras se resuelve, esta ya en el css, ademas hagan la alerta de que ya se resolvio o no se pudo resolver
          if (actualSelect) {
            if (enCurso) return
            
            detener = false
            setEnCurso(true)
            backtrack(actualSelect.fila, actualSelect.col, 0)
          }
        }}>Resolver</button>
        <button className="parar-button" onClick={async() => {
          detener = true
          setEnCurso(false)

          const newBoard = crearBoard(size)
          setOldSelect(null)
          setActualSelect(null)
          await animacion(210)
          setBoard(newBoard)
        }}> Detener programa </button>
        <button className="volver-button" onClick={() => {
          setShowBoard(false)
          setSize(0)
          setBoard([])
          setOldSelect(null)
          setActualSelect(null)
          setEnCurso(false)
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