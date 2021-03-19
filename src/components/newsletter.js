import React, { useState } from "react"
import addToMailchimp from 'gatsby-plugin-mailchimp'

const Newsletter = () => {
    const [email, setEmail] = useState('')

    const handleInputChange = evt => {
       setEmail(evt.target.value)
    }

    const handleSubmit =  evt => {
        evt.preventDefault();
        addToMailchimp(email)
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
        // I recommend setting `result` to React state
        // but you can do whatever you want
      }

    return (
        <div className="newsletter">
            <h3>¡Suscríbete!</h3>
            <p>
                Entérate al momento cada vez que publique un artículo que pueda interesarte.
                Tranquil@, <strong>no recibirás spam</strong> 😊.
            </p>
            <form onSubmit={handleSubmit}>
                <input className="newsletter__input"
                    type="text"
                    aria-label="Subscribe"
                    placeholder="Tu correo..."
                    value={email}
                    onChange={handleInputChange}
                />
                <button className="btn btn--primary newsletter__btn" type="submit">Me suscribo!</button>
            </form>
        </div>
        
         
    )
}

export default Newsletter