import React, {useState} from 'react'
import { Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Link.css'
import { VscTrash } from 'react-icons/vsc';

const Link = (props) => {

  const {name, url, vote} = props.currentLinks !== undefined && props.currentLinks;
  const {removeLink, upVote, downVote} = props;

  const [opacity, setOpacity] = useState('opacity-0')
  const [modal, setModal] = useState(false)

  const onHover = (e) => {
    e.type === 'mouseover' ? setOpacity('') : setOpacity('opacity-0')
  }

  const toggle = (e) => setModal(!modal);

  return (

    <div className='link-wrapper' onMouseOver={(e) => onHover(e)} onMouseOut={(e) => onHover(e)}>

      <Button color='danger' data-testid='remove-button' className={`remove-button ${opacity}`} onClick={toggle}>
        <VscTrash />
      </Button>
       
       <div className='votes-of-link' data-testid='link-votes'>
          <Badge color='secondary' className='badge-wrapper'>
            <p className='number'>{vote}</p>
            <p className='text'>Points</p>
          </Badge>
       </div>

       <div className='content-of-link' data-testid='link-content'>
        <p className='link-name'>{name}</p>
        <p className='link-url'>
          <a href={url} target='_blank' rel='noreferrer'>{`(${url})`}</a>
        </p>
        <div className='vote-buttons'>
          <span data-testid='up-vote' onClick={() => upVote()}>+ Up Vote</span>
          {
            vote > 0 &&
            <span onClick={() => downVote()}>- Down Vote</span>
          }
        </div>
       </div>

       <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Remove Link</ModalHeader>
        <ModalBody>
          Do you want to remove: <span className='font-bold'>{name}</span>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={() => removeLink()}>OK</Button>{' '}
          <Button outline color='secondary' onClick={toggle}>CANCEL</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Link
