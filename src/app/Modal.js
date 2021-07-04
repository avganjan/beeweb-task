

const Modal = ({data})=>{
    return(
        <div style={{
            position: 'absolute',
            left: '70%',
            top: '5%',
            width: '20%',
            height: 'auto',
            padding: '5px',
            borderRadius: '3px',
            backgroundColor: '#0366ee',
            color: 'white'
        }}>
            {data.status}
        </div>
    )
}

export default Modal