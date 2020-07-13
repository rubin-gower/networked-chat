import React from 'react'
import request from 'superagent'

const geturl = "192.168.1.156:3000/api/"
var exampleSocket = new WebSocket("ws://192.168.1.156:3000/", "protocolOne")

class chat extends React.Component {
    state = {
        chatstuff: "",
        message: []
    }
    
    componentDidMount(){
        
        exampleSocket.onopen = function (event) {
            //exampleSocket.send("Connected!"); 
        }
        exampleSocket.onmessage = (event) =>{
            console.log(event.data);
            this.setState({
                message: [...this.state.message, (event.data)]
            })
            this.rendermessage()
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
    
        //console.log(document.getElementById("input").value)
        this.setState({
            chatstuff: document.getElementById("input").value
        })
      }
      rendermessage = () => {
        console.log("trying to render msg")
        var elem = document.getElementById('chatbox');
        elem.scrollTop = elem.scrollHeight;
      return <p>{this.state.message}</p>
      }

    render() {
        return (
            <>
                    <div className="chatboxwrap" style={{backgroundColor: "gray", width: "300px", }}>
                    <div className="chatbox" id="chatbox" style={{
                        margin: "5px",
                        overflow: "auto",
                        height: "200px", 
                        backgroundColor: "lightgray"
                        }}>
                            {this.state.message.map(elem=>{
                                return <p>{elem}</p>
                            })}
                            

                        </div>
                    <input id="input" type="text" onChange={this.handleChange} placeholder="name" name="name" ></input>
                    {/* <input id="chat" type="text" onChange={this.handleChange} placeholder="name" name="name" ></input> */}
                    <button onClick={this.handleSubmit}>send</button>
                    </div>
            </>
        )
    }

}

export default chat