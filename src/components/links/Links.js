import React, {useState, useEffect} from 'react'
import './Links.css'
import LinkItem from '../link/Link'
import { Alert, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, 
  Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {Link} from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage'
import { VscAdd } from 'react-icons/vsc';

import _ from 'lodash';

const Links = () => {
  
  const [currentLinks, setCurrentLinks] = useLocalStorage('Links', []);
  const [dropdownOpen, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [removedItem, setRemovedItem] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  const toggle = () => setOpen(!dropdownOpen);

  useEffect(() => {
    setPageNumber(parseInt(currentLinks.length / 5)+1);
  }, [currentLinks])

  const mostVoted = () => {
    setCurrentLinks(_.orderBy(currentLinks, ['vote', 'date'], ['desc', 'asc']))
  }

  const lessVoted = () => {
    setCurrentLinks(_.orderBy(currentLinks, ['vote'], ['asc', 'desc']))
  }

  const removeLink = (id, name) => {
    setVisible(true)
    setRemovedItem(name);
    const updatedLinks = currentLinks.filter(item => item.id !== id)
    setCurrentLinks(updatedLinks)

    setTimeout(() => {
      setVisible(false)
    }, 2000);
  }

  const upVote = (id) => {
    for(let i=0; i<currentLinks.length; i++) {
      if(currentLinks[i].id === id) {
        currentLinks[i].vote++;
        currentLinks[i].date = Date.now();
      }
    }

    setCurrentLinks(_.orderBy(currentLinks, ['vote', 'date'], ['desc', 'desc']))

  }

  const downVote = (id) => {
    for(let i=0; i<currentLinks.length; i++) {
      if(currentLinks[i].id === id) {
        currentLinks[i].vote--;
        currentLinks[i].date = Date.now();
      }
    }    
    setCurrentLinks(_.orderBy(currentLinks, ['vote', 'date'], ['desc', 'desc']))
  }

  const currentPageHandler = (pn) => {
    setCurrentPage(pn)
  }

  
  return (
    <div className='links-wrapper'>

        <Link to='/add-link'>
          <button className='submit-link-button' data-testid='submit-link-button'>
            <span className='icon-part'> <VscAdd /> </span>
            <span className='text-part'>SUBMIT A LINK</span>
          </button>
        </Link>

      <hr />
      
      {visible &&
        <Alert color='danger'>
          {removedItem} removed!
        </Alert>
      }
      {currentLinks.length > 0  &&
      <div className='sort-wrapper'>
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle outline caret>
          Order By
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => mostVoted()}>{`Most Voted (Z -> A)`}</DropdownItem>        
          <DropdownItem onClick={() => lessVoted()}>{`Less Voted (A -> Z)`}</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
     </div>
      }
      {currentLinks.length === 0  &&
        <p className='no-link'>There is no link</p>
      }
      {
        currentLinks.length > 0 &&
          currentLinks.slice((currentPage-1)*5, (currentPage-1)*5 + 5).map(item => (
            <LinkItem 
              key={item.id}
              currentLinks={item}
              removeLink={() => removeLink(item.id, item.name)}
              upVote={() => upVote(item.id)}
              downVote={() => downVote(item.id)}
            />
          ))
        }

      <PaginationSection 
        currentLinks={currentLinks}
        pageNumber={pageNumber}
        currentPageHandler={(currentPage) => currentPageHandler(currentPage)} 
        currentPage={currentPage}
      />

    </div>
  )
}

const PaginationSection = (props) => {

  const {currentLinks, pageNumber, currentPageHandler, currentPage} = props;
  const [paginationVisible, setPaginationVisible] = useState(false)
  const [paginationArr, setPaginationArr] = useState([])

  useEffect(() => {
    setPaginationVisible(currentLinks.length > 5);
    
    const pageArr = pageNumber && Array(pageNumber).fill(null).map((_, i) => i +=1);
    setPaginationArr(pageArr)
  }, [currentLinks.length, pageNumber])

  return (
      <div className='pagination-wrapper'>
        { paginationVisible &&     
          <Pagination>
            {
              currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink previous onClick={() => currentPageHandler(currentPage-1)}/>
                </PaginationItem>
            )}

            {paginationArr && paginationArr.length &&
             paginationArr.map((page, index) => (
              <PaginationItem key={index} className='pagination-item'>
                <PaginationLink className={currentPage === page ? 'active' : ''} onClick={() => currentPageHandler(page)} >
                  {page}
                </PaginationLink>          
              </PaginationItem>
              ))
            }
             
             {
              currentPage < pageNumber && (
                <PaginationItem>
                  <PaginationLink data-testid='next-page' 
                  next onClick={() => currentPageHandler(currentPage+1)} />
                </PaginationItem>
            )}
          </Pagination>   
        }
      </div>
    )
  }


export default Links;