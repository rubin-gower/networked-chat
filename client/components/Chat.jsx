import React from 'react'
import request from 'superagent'

const geturl = "192.168.1.156:3000/api/"
var exampleSocket = new WebSocket("ws://192.168.1.156:3000/", "protocolOne")
class chat extends React.Component {
    state = {
        chatstuff: ""
    }
    componentDidMount(){
        
        exampleSocket.onopen = function (event) {
            exampleSocket.send("Hi there!"); 
        }
    }
    handleSubmit = event => {
        
        event.preventDefault()
        console.log( `broad: ${this.state.chatstuff}`)
        let hi = `broad: ${this.state.chatstuff}`
        exampleSocket.send("broad:" + this.state.chatstuff.toString())
        
        
        
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
                    <div className="chatboxwrap" style={{backgroundColor: "gray", width: "300px", }}>
                    <div className="chatbox" style={{
                        margin: "5px",
                        
                        height: "200px", 
                        backgroundColor: "lightgray"
                        }}></div>
                    <input id="input" type="text" onChange={this.handleChange} placeholder="name" name="name" ></input>
                    <button onClick={this.handleSubmit}>send</button>
                    </div>
            </>
        )
    }

}

export default chat