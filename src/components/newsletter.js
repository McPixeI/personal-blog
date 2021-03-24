import React, { useState } from "react"
import addToMailchimp from 'gatsby-plugin-mailchimp'
import messages from '../data/messages'

const Newsletter = () => {

    const [formState, setFormState] = useState({
            state: '',
            email: '',
            title: messages.newsletter.initial.title,
            msg: messages.newsletter.initial.text
        })

    const handleInputChange = evt => {
        setFormState({
            ...formState,
            email: evt.target.value
        })
    }

    const handleSubmit =  evt => {
        evt.preventDefault();
        addToMailchimp(formState.email)
            .then(data => {
                if (data.result === "error") {
                    setFormState({
                        ...formState,
                        state: 'error',
                        title: messages.newsletter.error.title,
                        msg: messages.newsletter.error.text,
                        email:''
                    })
                } else {
                    setFormState({
                        ...formState,
                        state: 'success',
                        title: messages.newsletter.succes.title,
                        msg: messages.newsletter.succes.text,
                        email:''
                    })
                }
            })
      }

    return (
        <div className="newsletter">
            <h3>{formState.title}</h3>
            <p className={formState.state}>{formState.msg}</p>      
            <form onSubmit={handleSubmit}>
                <input className="newsletter__input"
                    type="text"
                    aria-label="Subscribe"
                    placeholder="Tu correo..."
                    value={formState.email}
                    onChange={handleInputChange}
                />
                <button className="btn btn--primary newsletter__btn" type="submit">¡Me suscribo!</button>
            </form>
        </div>
        
         
    )
}

export default Newsletter