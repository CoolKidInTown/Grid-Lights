import { useState } from 'react'
import './App.css'

// make new Component
function Cell({filled, onClick, isDisabled, label}) { // isDisabled and label optional but important
  return <button type='button' 
          onClick={onClick} aria-label={label}
          disabled={isDisabled}
          className={filled ? "cell cell-activated" : "cell"}
         ></button>
}

// for scalability we have taken 2d array else we can use tables/grids only as in like calculator project also

function App() {
  const [order, setOrder] = useState([])
  const [isDeactivating, setIsDeactivating] = useState(false)

  const config = [ // 1 means cell 0 as no cell
    [1,1,1],
    [1,0,1],
    [1,1,1]
  ];

  const deactivateCells = () => { // when fully filled this gets invoked
    setIsDeactivating(true);

    const timer = setInterval(() => {
      setOrder((originOrder) => {
        const newOrder = originOrder.slice(); // making a deep copy
        newOrder.pop(); 

        if(newOrder.length === 0) { // fully popped 
          clearInterval(timer);
          setIsDeactivating(false);
        }

        return newOrder; // gets new value of order  
      })
    },300)
  }

  const activateCells = (index) => {
    // state to keep track of indices and push them via rest operator

    const newOrder = [...order, index]; // ... initial value
    setOrder(newOrder); // update state
    console.log(newOrder);

    // deactivate
    if(newOrder.length === config.flat(1).filter(Boolean).length) { // 8 aka truthy ones then start deactivation
      // For example, [1, 2, false, 3, '', 4, null, undefined] would become [1, 2, 3, 4] after filter(Boolean).
      deactivateCells();
    }

  }

  return (
    <div className='wrapper'>
      <div className='grid' style={{    // fr==fraction
        gridTemplateColumns: `repeat(${config[0].length}, 1fr)` // (3, 1fr) =|> creates three equal columns
      }}>
        {config.flat(1).map((value, index) => { // flattens array in 1 layer aka single row
          return value ? 
          <Cell key={index}
           label={`cell ${index}`}
           filled={order.includes(index)} // filled={order.includes(index)}: The filled prop is set to true if the order array includes the current index, indicating that the cell is filled.
           onClick={() => {activateCells(index)}} // make into entries of newOrder
           isDisabled={order.includes(index) || isDeactivating} // avoiding repeatative clicking
          /> : <span></span> // rendering for 1 as truthy: SCE concept
        })}
      </div>
    </div>
  )
}

export default App
