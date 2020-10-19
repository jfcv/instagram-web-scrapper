
const Footer = () => {
    return(
        <footer className="text-center p-2" style={footerStyle}>
            &copy; Snappr Test | Copyright 2020
        </footer>
    )
}

export default Footer

const footerStyle = {
    position: 'relative',
    bottom: '0',
    width: '100%',
    borderTop: '2px dotted',
}