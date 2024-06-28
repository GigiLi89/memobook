import React from 'react'
import { Button, Container, Image } from "react-bootstrap";
import appStyles from '../../App.module.css'
import { useGetProfile } from '../../hooks/useGetProfiles';
import {Link} from 'react-router-dom'

const Profiles = () => {
    const { profiles } = useGetProfile()

    return (
        <div className='mt-3'>
            <Container
                className={`${appStyles.Content}`}
            >
                <p>Messages</p>
                {
                    profiles?.map(d => (
                        <div className='d-flex align-items-center justify-content-between p-2'>
                            <div className='d-flex align-items-center'>
                                <Image src={d.image} width="60" />
                                <h6 className='ml-3 font-weight-bold'>{d.owner}</h6>
                            </div>
                            <Link to={`/message/${d.id}`}>
                                <Button size='sm'>message</Button>
                            </Link>
                        </div>
                    ))
                }
            </Container>
        </div>
    )
}

export default Profiles
