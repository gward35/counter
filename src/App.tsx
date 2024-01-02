import { useState } from 'react'
import {
  Box,
  Button,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  Text,
} from '@chakra-ui/react'
import './App.css'

interface HistoryShape {
  op: string
  prev: number
  curr: number
}

function App() {
  const [count, setCount] = useState<number>(0)
  const [history, setHistory] = useState<HistoryShape[]>([])
  const [undoHistory, setUndoHistory] = useState<HistoryShape[]>([])

  const handleOperation = (operation: string) => {
    switch (operation) {
      case 'division':
        {
          setCount(prevState => prevState / 2)
          setHistory([{ op: '/2', prev: count, curr: count / 2 }, ...history])
        }
        break
      case 'subtraction':
        {
          setCount(prevState => prevState - 1)
          setHistory([{ op: '-1', prev: count, curr: count - 1 }, ...history])
        }
        break
      case 'addition':
        {
          setCount(prevState => prevState + 1)
          setHistory([{ op: '+1', prev: count, curr: count + 1 }, ...history])
        }
        break
      case 'multiplication':
        {
          setCount(prevState => prevState * 2)
          setHistory([{ op: '*2', prev: count, curr: count * 2 }, ...history])
        }
        break
      default:
        count
    }

    setUndoHistory([])
  }

  const handleUndo = () => {
    const [currHistory, ...prevHistory] = history
    setCount(currHistory.prev)
    setUndoHistory([currHistory, ...undoHistory])
    setHistory(prevHistory)
  }

  const handleRedo = () => {
    const [currentUndoHistory, ...prevUndoHistory] = undoHistory
    setCount(currentUndoHistory.curr)
    setUndoHistory(prevUndoHistory)
    setHistory([currentUndoHistory, ...history])
  }

  const handleReset = () => {
    setCount(0)
    setHistory([])
    setUndoHistory([])
  }

  const noHistory = history.length === 0
  const noUndoHistory = undoHistory.length === 0
  const buttonStyle = {
    mr: 12,
    bgColor: '#fff',
    color: '#000',
    border: '1px solid',
    borderColor: '#000',
    _hover: {
      bgColor: '#000',
      color: '#fff',
    },
  }
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Button
          onClick={() => handleUndo()}
          {...buttonStyle}
          isDisabled={noHistory}
        >
          Undo
        </Button>
        <Button
          onClick={() => handleRedo()}
          {...buttonStyle}
          isDisabled={noUndoHistory}
        >
          Redo
        </Button>
        <Button
          onClick={() => handleReset()}
          {...buttonStyle}
          isDisabled={noHistory}
        >
          Reset
        </Button>
      </Box>
      <hr />
      <Box display="flex" justifyContent="center">
        <Button onClick={() => handleOperation('division')} {...buttonStyle}>
          /2
        </Button>
        <Button onClick={() => handleOperation('subtraction')} {...buttonStyle}>
          -1
        </Button>
        <Text mr={12} fontSize="20px" fontWeight="bolder" color="purple">
          {count}
        </Text>
        <Button onClick={() => handleOperation('addition')} {...buttonStyle}>
          +1
        </Button>
        <Button
          onClick={() => handleOperation('multiplication')}
          {...buttonStyle}
        >
          x2
        </Button>
      </Box>
      <hr />
      {history.length > 0 && (
        <TableContainer>
          <Table color="#000" width="100%">
            <Thead>
              <Tr>
                <Th>Op</Th>
                <Th>Old</Th>
                <Th>New</Th>
              </Tr>
            </Thead>
            <Tbody>
              {history.map(h => (
                <Tr key={crypto.randomUUID()}>
                  <Td>{h.op}</Td>
                  <Td>{h.prev}</Td>
                  <Td>{h.curr}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default App
