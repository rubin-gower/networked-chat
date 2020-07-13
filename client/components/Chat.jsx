import React from 'react'
import request from 'superagent'

const geturl = "192.168.1.156:3000/api/"
class chat extends React.Component {
    state = {
        chatstuff: ""
    }

    handleSubmit = event => {
       
        event.preventDefault()
        console.log( this.state.formstuff)

        postchat(this.state.formstuff).then(elem => {
            console.log("data base")
        })  
        
      }
      handleChange = event => {
      //  console.log('change!', event.target.name)
    
        console.log(document.getElementById("input").value)
        this.setState({
            chatstuff: document.getElementById("input").value
        })
      }

    render() {
        return (
            <>

                    <div className="chatbox"></div>
                    <input id="input" type="text" onChange={this.handleChange} placeholder="name" name="name" ></input>
                    <button onClick={this.handleclick}>send</button>
                
            </>
        )
    }

}

export default chat