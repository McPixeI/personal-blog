import React, { useState } from "react"
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { useForm } from "react-hook-form";


const Newsletter = () => {

    const { register, handleSubmit, errors, setError } = useForm();
    const [submitted, setSubmitted] = useState(false);
  
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
                }
            })
    }

    return (
        <div className="newsletter">
            <h3>¡Suscríbete!</h3>
            <p>Entérate al momento cuando publique un artículo que pueda interesarte. Tranquil@, no escribo tan a menudo...</p>      
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="newsletter__input"
                    name="email" 
                    ref={register({ required: 'El campo no puede estar vacío' })}
                    type="email"
                    aria-label="Subscribe"
                    placeholder="Tu correo..."
                />
                <span className="error">{errors.email && errors.email.message}</span>
                <span className="success">{submitted && 'gracias'}</span>
                <button className="btn btn--primary newsletter__btn" type="submit">¡Me suscribo!</button>
            </form>
        </div>
        
         
    )
}

export default Newsletter