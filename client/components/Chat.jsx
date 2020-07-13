import React from 'react'
import request from 'superagent'
import moment from "moment"

const geturl = "http://192.168.1.156:3000/api/"
var exampleSocket = new WebSocket("ws://192.168.1.156:3000/", "protocolOne")

class chat extends React.Component {
    state = {
        chatstuff: "",
        message: [],
        timeatload:  moment().add(2, 's').toDate(),
        Connected: "",
        run: true,
    }
    
    componentDidMount(){
        console.log(Date())
        console.log(moment().add(10, 's').toDate());
       console.log(this.state.timeatload)
        exampleSocket.onopen = function (event) {
            //exampleSocket.send("Connected!"); 
        }
        exampleSocket.onmessage = (event) =>{
            if(document.visibilityState == "hidden") document.title = "new messages!"
           
            
           
                console.log(event.data);
                this.setState({
                    message: [...this.state.message, (event.data)]
                })
                this.rendermessage()
            
            
          }
          let timerloop = setInterval(()=>{
           
            if(exampleSocket.readyState == WebSocket.CLOSED && this.state.run) {
                this.setState({
                    message: [...this.state.message, ("unable to connect to server! might have restarted?")],
                    run: false,
                })
                
            }
            //   if(document.hasFocus) document.title = "chat app"
            //   else{document.title = "no focus"}
             if(document.visibilityState == "visible")  document.title = "chat app"
   
            //   //console.log((new Date()).getTime() > this.state.timeatload.getTime())
            //    if((new Date()).getTime() > this.state.timeatload.getTime()){
            //     console.log("boo!")
            //    } 
            //    else{

            //        console.log("not working");
                   
            //    }
            }, 500);
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
                    chat app {this.state.run ? 
                    <span style={{color: "lightgreen"}}>Connected</span>
                     :
                     <span style={{color: "red"}}>connection broke</span>}
                    <div className="chatbox" id="chatbox" style={{
                        margin: "1%",
                        overflow: "auto",
                        height: "200px", 
                        backgroundColor: "lightgray"
                        }}>
                            {this.state.message.map((elem, i)=>{
                                return <p key={i}>{elem}</p>
                            })}
                            

                        </div>
                    <textarea id="input" type="text" onChange={this.handleChange} placeholder="msg" msg="name" 
                    style={{
                        width: "75%",
                       margin: "1%",
                       height: "40px",
                       display: "inline",
                    }}></textarea>
                     
                    <button onClick={this.handleSubmit} style={{
                        width: "20%",
                        float: "top",
                        height: "40px",
                        display: "inline",
                    }}> send</button>
                    </div>
            </>
        )
    }

}

export default chat