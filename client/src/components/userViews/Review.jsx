import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
import ReviewForm from './ReviewForm'
import axios from 'axios'
import { Comment, Avatar, Button, Col } from "antd";
import {
    EditFilled,
    DeleteFilled,
} from '@ant-design/icons';

function Review(props) {

    const [review, setReview] = useState({ ...props.review, isInEditMode: false })

    const changeMode = () => {
        setReview({ ...review, isInEditMode: !review.isInEditMode });
    }

    const updateReview = (newReview) => {
        setReview({ ...newReview, isInEditMode: !review.isInEditMode });
    }

    const deletReview = (reviewID) => {
        const payload = {
            "type": "review",
            "reviewID": reviewID
        }
        axios.delete(`http://localhost:5000/books/${props.bookId}`, { data: payload })
            .then(res => {
                props.updateReviewList(res.data);
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {review.isInEditMode ?
                <Col span={14}>
                    <div>
                        <ReviewForm
                            updateReview={updateReview}
                            bookId={props.bookId} review={review}
                            changeMode={changeMode}
                        />
                        {/* <Button onClick={changeMode} type="primary" danger >X</Button> */}
                    </div>
                </Col>
                :
                <Comment
                    style={{ margin: '20px' }}
                    author={<a>{`${review.user.firstname} ${review.user.lastname}`}</a>}
                    avatar={
                        <Avatar
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2LfV4GzzKg_8tkHFIGSMw4YzYzAlLDnLYlJ2d6A7mMxygJo_j&usqp=CAU"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <p>
                            {review.content}
                            <br />
                            {/* {review.user===} */}
                            <Button type="primary" onClick={changeMode} variant="info">
                                <EditFilled style={{ fontSize: '20px' }} />
                            </Button>
                            <Button type="primary" danger onClick={() => deletReview(review._id)}>
                                <DeleteFilled style={{ fontSize: '20px' }} />
                            </Button>
                        </p>
                    }
                />
            }
        </>
    )
}

export default Review
