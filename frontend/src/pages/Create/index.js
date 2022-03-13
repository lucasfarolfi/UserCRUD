import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { createPerson } from '../../services/user'
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

export default function Create() {
    let history = useHistory()

    const [photo, setPhoto] = useState('')
    const [errorForm, setErrorForm] = useState(null)
    const [newPerson, setNewPerson] = useState({
        name: '',
        email: '',
        phone: '',
        birthdate: ''
    })
  
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

    const handleChangeFile = (e) =>{
        setPhoto(e.target.files[0])
    }

    const handleSubmitCreate = async (e) =>{
        e.preventDefault()
        
        if(!name || !email || !phone || !birthdate || !photo || phone.length !== 15 || birthdate.length !== 10){
            setErrorForm("Dados não preenchidos corretamente")
            console.log({name, email, phone, birthdate, photo})
        }
        else{
            const formData = new FormData();
            formData.append('file', photo);
            formData.set('name', name);
            formData.set('email', email);
            formData.set('phone', phone);
            formData.set('birthdate', birthdate);

            try{
               await createPerson(formData) 
               setErrorForm(null)
               history.push("/")
            }catch(e){
                let err = e
                setErrorForm(err.response.data.message)
            }
        }
        
    }

  return (
    <Form className={styles.form} onSubmit={handleSubmitCreate}>
            <h1>Cadastre uma pessoa</h1>

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

            <Form.Group>
            <Form.Label>Foto <Form.Control type="file" accept='image/png, image/jpeg' name="photo" onChange={handleChangeFile}/></Form.Label>
            </Form.Group>
            
            {errorForm ? <div className={styles.errorMsg}>{errorForm}</div> : null}

            <div className={styles.btnSection}>
              <button className={styles.btnCancel} onClick={()=>{history.push("/")}}>Voltar</button>
              <button type="submit" className={styles.btnSave}>Salvar</button>
            </div>
        </Form>
  );
}
