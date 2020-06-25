import React, { Component } from 'react'
import "../Scss/hbd.css"

export default class HBD extends Component {
    render() {
        return (
            <div className="hbd">
                <div className="card">
                    <div className="imgBox">
                        <div className="jehan"></div>
                        <div className="bark"></div>
                        <img src="https://image.ibb.co/fYzTrb/lastofus.jpg" alt="dino" />
                    </div>
                    <div className="details">
                        <h4 className="color1">Congrats for being older than me</h4>
                        <h4 className="color2 margin">(HAPPY BIRTHDAY JEHAN)</h4>
                        <p>Dear Jehan,</p>
                        <p>Let's see.. .</p>
                        <p>You’re most unique friend I had,</p>
                        <p>you love the music when it's korean</p>
                        <p>practically fight skripsh*t together</p>
                        <p>like, and yet somehow you still</p>
                        <p>manage to be the best skripsh*t friend.</p>
                        <p>How do you do that? :)</p>
                        <p className="text-right">Happy Birthday, Jehan!</p>
                        <p className="text-right">From kentut</p>
                    </div>
                </div>
            </div>
        )
    }
}
