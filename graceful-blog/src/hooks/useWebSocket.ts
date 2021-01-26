import { WS_URL } from "@/utils/WS_URL"

interface IHandleMessage{
    (e:any): any
}

export  function useWebSocket(handleMessage:IHandleMessage){
    const ws=new WebSocket(WS_URL)
    function init(){
        bindEvent()
    }
    function bindEvent(){
        ws.addEventListener('open',handleOpen,false)
        ws.addEventListener('close',handleClose,false)
        ws.addEventListener('error',handleError,false)
        ws.addEventListener('message',handleMessage,false)
    }

    function handleOpen(e:any){
        console.log('websocket open success',e);
        
    }
    function handleClose(e:any){
        console.log('websocket close success',e);
    }
    function handleError(e:any){
        console.log('websocket connect error',e);
    }
    // function handleMessage(e:any){
    //     console.log('client receive message success',e);
    // }

    init()
    return ws
}


