import React, { useState } from "react"
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { useForm } from "react-hook-form";


const Newsletter = () => {

    const { register, handleSubmit, reset, errors, setError } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const defaultValues = {
        input: ''
    }
  
    const onSubmit =  data => {
        addToMailchimp(data.email)
            .then(data => {
                if (data.result === "error") {
                    setError("email", {
                        type: "manual",
                        message: "Vaya, ha ocurrido un error..."
                      });
                } else {
                    setSubmitted(true);
                    reset({ defaultValues })
                }
            })
    }

    return (
        <div className="newsletter">
            <h3>¡Suscríbete!</h3>
            <p>Te avisaré por correo cada vez que publique un nuevo artículo. Tranquil@, no escribo tan a menudo...</p>      
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="newsletter__input"
                    name="email" 
                    ref={register({ required: 'El campo no puede estar vacío' })}
                    type="email"
                    aria-label="Subscribe"
                    placeholder="Tu correo..."
                />
                <span className="error">{errors.email && errors.email.message}</span>
                <span className="success">{submitted && '¡Hecho! Gracias por tu apoyo'}</span>
                <button className="btn btn--primary btn--flat newsletter__btn" type="submit">¡Me suscribo!</button>
            </form>
        </div>
        
         
    )
}

export default Newsletter