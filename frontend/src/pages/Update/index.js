import { useEffect, useState } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { getOne, updatePerson } from '../../services/user'
import styles from './style.module.css'
import { Form } from 'react-bootstrap'

function normalizePhoneNumber(value) {
    const formatCardNumber = (text) => {
      const badchars = /[^\d]/g;
      const mask = /(\d{2})(\d{5})(\d{4})/;
      const number = new String(text).replace(badchars, '');
      return number.replace(mask, '($1) $2-$3').substr(0, 15) || '';
    };
    return formatCardNumber(value);
}

export default function Update() {
    let history = useHistory()
    let {id: param} = useParams()

    const [errorForm, setErrorForm] = useState(null)
    const [newPerson, setNewPerson] = useState({})

    useEffect(() =>{
        async function fetchData(){
            let data = await getOne(param)

            setNewPerson({
                name: data.name,
                email: data.email,
                phone: data.phone,
                birthdate: data.birthdate
            })
        }
        fetchData()
    },[])
  
    const {name, email, phone, birthdate} = newPerson

    const handleInputChange = (e) =>{
        let {name, value} = e.target
        if(name === "phone"){
            setNewPerson({ ...newPerson, phone: normalizePhoneNumber(value)})
            
        }
        else{
          setNewPerson({ ...newPerson, [name]: value})  
        }
    }

    const handleSubmitCreate = async (e) =>{
        e.preventDefault()

        if(!name || !email || !phone || !birthdate || phone.length !== 15 || birthdate.length !== 10){
            setErrorForm("Dados não preenchidos corretamente")
        }
        else{
            const form = {
                name, email, phone, birthdate
            }

            try{
               await updatePerson(param, form) 
               setErrorForm(null)
               history.push("/")
            }catch(e){
                let err = e
                setErrorForm(err.response.data.message)
            }
        }
        
    }

  return (
        <>
            {newPerson && 
                <Form className={styles.form} onSubmit={handleSubmitCreate}>
                <h1>Editar pessoa</h1>

                <Form.Group>
                    <Form.Label>Nome <Form.Control type="text" placeholder="Nome" name="name" value={name} onChange={handleInputChange}/></Form.Label>
                </Form.Group>

                <Form.Group>
                <Form.Label>E-mail <Form.Control type="email" placeholder="E-mail" name="email" value={email} onChange={handleInputChange}/></Form.Label>
                </Form.Group>

                <Form.Group>
                <Form.Label>Celular <Form.Control type="text" placeholder="Digite o DDD e o número" name="phone" value={phone} onChange={handleInputChange}/></Form.Label>
                </Form.Group>

                <Form.Group>
                <Form.Label>Data de nascimento <Form.Control type="date" name="birthdate" value={birthdate} onChange={handleInputChange}/></Form.Label>
                </Form.Group>
                
                {errorForm ? <div className={styles.errorMsg}>{errorForm}</div> : null}

                <div className={styles.btnSection}>
                <button className={styles.btnCancel} onClick={()=>{history.push("/")}}>Voltar</button>
                <button type="submit" className={styles.btnSave}>Salvar</button>
                </div>
            </Form>
            }
        </>
  );
}
