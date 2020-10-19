import Container from '../components/container'

const About = () => {
    return (
        <Container title={'About'}>
            <h1>About</h1>

            <ul>

                <li>
                    <h5>
                        We are a Startup getting into the <strong>Web Scrapping</strong> World,                
                        we actually believe that an inform world is a better one.
                    </h5>                    
                </li>

                <li>
                    <h5>
                        Our MOTTO,
                    </h5>
                </li>

                <li>
                    <h5>
                        <i>                
                            'Never take anything for granted, go there and find out if
                            what somebody told you it's really what's hapenning.'
                        </i>
                    </h5>
                </li>

                <li>
                    <h5>
                        Keep asking, stay curious.
                    </h5>
                </li>

            </ul>

        </Container>
    )
}

export default About