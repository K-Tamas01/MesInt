import './inputs.scss';
import { useState, useContext } from 'react';
import { DrawContext } from '../../Context/DrawContext/draw.context';

const deafaultValue = {
  citiesCount: 10,
  cities_X: 20,
  cities_Y: 20,
  driverCount: 2,
  generationCount: 10,
  seed: '',
}

const Inputs = (() =>{

    const [data, setData] = useState(deafaultValue)
    const { citiesCount, cities_X, cities_Y, driverCount, generationCount, seed } = data

    const context = useContext(DrawContext)
    const { setDrawData } = context

    const HanleChange = ((event) =>{
      const {name, value} = event.target

      setData({...data, [name]: value})
    })

    const submit = (() =>{
      const data = {
        "citiesCount": citiesCount,
        "citiesDistance_x": cities_X,
        "citiesDistance_y": cities_Y,
        "driverCount": driverCount,
        "generationCount": generationCount,
        "seedData": seed
      }
      fetch('http://localhost:4500/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((res) => setDrawData(res))
    })

    return(
        <div className='form-container'>
      <form>
        <div className='form-input'>
          <label>Kérem adja meg a városok számát: (Ebből 1 depó lesz)</label><br/>
          <input 
            min='10'
            max='500' 
            type="number" 
            name='citiesCount'
            value={citiesCount}
            onChange={HanleChange}
            />
        </div>
        <div className='form-input'>
          <label>Kérem adja meg a városok maximálisan felvehető X koordinátáját:</label><br/>
          <input 
            min='20'
            max='140' 
            type='number' 
            name='cities_X'
            value={cities_X}
            onChange={HanleChange}
            />
        </div>
        <div className='form-input'>
          <label>Kérem adja meg a városok maximálisan felvehető Y koordinátáját:</label><br/>
          <input 
            min='20'
            max='140'
            type='number' 
            name='cities_Y'
            value={cities_Y}
            onChange={HanleChange}
            />
        </div>
        <div className='form-input'>
          <label>Kérem adja meg a sofőrök számát:</label><br/>
          <input 
            min='2'
            max='50' 
            type='number'
            name='driverCount'
            value={driverCount}
            onChange={HanleChange}
            />
        </div>
        <div className='form-input'>
          <label>Kérem adja meg a generációk számát:</label><br/>
          <input 
            min='10'
            max='100000'
            type='number' 
            name='generationCount'
            value={generationCount}
            onChange={HanleChange}
            />
        </div>
        <div className='form-input'>
          <label>Kérem adjon meg egy seed-et:</label><br/>
          <input 
            type='text'
            name='seed'
            value={seed}
            onChange={HanleChange}
          />
        </div>
        <div className='form-input-button'>
          <input className='input-button' type={"button"} value={"Submit"} onClick={submit} />
        </div>
      </form>
    </div>
    )
})

export default Inputs;