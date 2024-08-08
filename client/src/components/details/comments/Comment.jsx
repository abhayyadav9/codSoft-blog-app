import { useContext, useState } from "react";

import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';

import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const ErrorMessage = styled(Typography)`
    color: red;
    margin-top: 10px;
`;

const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext);
    const [error, setError] = useState(null);

    const removeComment = async () => {
        try {
            await API.deleteComment(comment._id);
            setToggle(prev => !prev);
            setError(null); // Reset error if successful
        } catch (error) {
            setError('Error deleting comment');
        }
    };

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {comment.name === account.username && <DeleteIcon onClick={removeComment} />}
            </Container>
            <Typography>{comment.comments}</Typography>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Component>
    );
};

export default Comment;
