import {useState} from "react";
import { GoSearch } from "react-icons/go";
import "./style.css";

import api from "./service/api";

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState('');

  async function handleSearch() {
    if(input === ''){
      alert('preencha algum cep');
      return;
    }

    try{
      const response = await api.get(input + '/json')
      setCep(response.data);
      setInput('');
      console.log(response)
    }catch{
      alert("Ops!, erro ao buscar");
      setInput('');
    }
  }

  return(
    <>
        
        <div className="container">
          <h1 className="title">Data Local</h1>

          <div className="inputcontainer">
            <input type="text" 
            placeholder="digite o CEP..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />

            <button className="buttonsearch" onClick={handleSearch}>
                <GoSearch size={20}/>
            </button>
          </div>
          {Object.keys(cep).length > 0 && (
            
            <main className="resultcontainer">
              <h2>CEP: {cep.cep}</h2>

              <span>{cep.logradouro}</span>
              <span>Complemento: {cep.conplemento}</span>
              <span>{cep.bairro}</span>
              <span>{cep.localidade} - {cep.uf}</span>
              
            </main>
          )}

        </div>
    </>
        );
}

export default App
