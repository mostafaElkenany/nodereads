import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Alert } from "antd";
import {
    CloseSquareFilled,
    SaveFilled,
} from '@ant-design/icons';

const { TextArea } = Input

function ReviewEditForm(props) {

    const [review, setReview] = useState("");
    const [reviewId, setReviewId] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (props.review) {
            setReviewId(props.review._id);
            setReview(props.review.content)
        }

    }, [props.review])


    const handleChange = (e) => {
        setReview(e.target.value)
    }

    const handleCloseAlert = () => {
        setError("")
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (reviewId) {
            const payload = {
                "type": "review",
                "newContent": review,
                "reviewID": reviewId
            }
            axios.patch(`/books/${props.bookId}`, payload)
                .then(res => {
                    // console.log(res.data);
                    if (!res.data.error) {
                        props.updateReview(res.data)
                    } else {

                        setError(res.data.error)
                    }
                })
                .catch(err => console.log(err))
        } else {
            const payload = {
                "type": "review",
                "content": review,
            }

            axios.post(`/books/${props.bookId}`, payload)
                .then(res => {
                    // console.log(res.data.error);
                    if (!res.data.error) {
                        setReview("");
                        props.updateReviewList(res.data);
                        // console.log(res.data);

                    } else setError(res.data.error)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            {
                error ? <Alert
                    description={error}
                    type="warning"
                    showIcon
                    closable
                    onClose={handleCloseAlert}
                /> : ""

            }
            <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
                <TextArea allowClear placeholder="Write your Review..." rows="5" required
                    onChange={handleChange}
                    value={review}
                />

                <Button type="primary" htmlType="submit">
                    {reviewId ? <SaveFilled style={{ fontSize: '20px' }}/> : "Submit Review"}
                </Button>
                {reviewId ?
                    <Button onClick={props.changeMode} type="primary" danger ><CloseSquareFilled style={{ fontSize: '20px' }}/></Button>
                    : ""}
            </form>
        </>
    )
}

export default ReviewEditForm
