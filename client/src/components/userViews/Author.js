import React, { useState, useEffect } from 'react'
import WithUserHeaders from '../../HOC/WithUserHeaders'
import { Container, Row, Col } from 'react-bootstrap';
import axios from '../../components/api/axios';
import AuthorBook from './AuthorBook'
import BookCard from './BookCard'
import { Layout } from 'antd'

function Author(props) {
    const { match: { params: { authorId } } } = props;
    const [author, setAuthor] = useState({})
    const [books, setBooks] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/authors/${authorId}`)
            .then(res => {
                setAuthor(res.data.author)
                setBooks(res.data.books)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    return (
        <Layout style={{ height: "95vh", overflow: "auto" }}>
            <Container>

                <Row style={{ marginTop: '3rem', marginBottom: '2rem' }}>
                    <Col className="col-12 col-md-3">
                        <img style={{height: "auto", width: "200px"}} src={`/${author.photo}`} alt="author's image" />
                    </Col>
                    <Col className="col-12 col-md-9">
                        <p style={{ fontSize: '2em' }}>Full name: {author.firstname} {author.lastname} </p>
                        <p style={{ fontSize: '2em' }}>Date of birth: {new Date(author.dob).toLocaleDateString('en-US')}</p>
                    </Col>
                </Row>
                <h2>Books</h2>
                <Row>
                    {
                        books ? books.map(book =>
                            <Col key={book._id} style={{ margin: '10px', textAlign: 'center' }} >
                                <BookCard book={book} />
                            </Col>
                        )
                            : <p>No Books</p>
                    }
                </Row>
            </Container>
        </Layout>
    )
}

export default WithUserHeaders(Author)