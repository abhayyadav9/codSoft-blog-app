import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, Typography, styled } from '@mui/material';
import { API } from '../../../service/api';
import { DataContext } from '../../../context/DataProvider';
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [error, setError] = useState(null);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                } else {
                    setError('Error fetching comments');
                }
            } catch (err) {
                setError('Error fetching comments');
            }
        };
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    };

    const addComment = async () => {
        if (!comment.name || !comment.postId || !comment.comments) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await API.newComment(comment);
            if (response.isSuccess) {
                setComment(initialValue);
                setToggle(prev => !prev);
            } else {
                setError('Error adding comment');
            }
        } catch (err) {
            setError('Error adding comment');
        }
    };

    return (
        <Box>
            {error && <Typography color="error">{error}</Typography>}
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="What's on your mind?"
                    onChange={handleChange} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={addComment}
                >Post</Button>             
            </Container>
            <Box>
                {comments.length > 0 ? comments.map(comment => (
                    <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                )) : <Typography>No comments available</Typography>}
            </Box>
        </Box>
    );
}

export default Comments;
