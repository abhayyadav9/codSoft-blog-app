import React, { useState, useEffect, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl, Typography } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                try {
                    const data = new FormData();
                    data.append("name", file.name);
                    data.append("file", file);

                    const response = await API.uploadFile(data);
                    setPost(prevPost => ({ ...prevPost, picture: response.data }));
                    setUploadMessage('File uploaded successfully.');
                } catch (error) {
                    console.error('Error uploading image:', error);
                    setUploadMessage('Error uploading file.');
                }
            }
        };

        getImage();
        setPost(prevPost => ({
            ...prevPost,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username
        }));
    }, [file, location.search, account.username]);

    const validate = () => {
        let isValid = true;
        if (post.title.trim() === '') {
            setTitleError('Title is required.');
            isValid = false;
        } else {
            setTitleError('');
        }

        if (post.description.trim() === '') {
            setDescriptionError('Description is required.');
            isValid = false;
        } else {
            setDescriptionError('');
        }

        return isValid;
    };

    const savePost = async () => {
        if (validate()) {
            try {
                await API.createPost(post);
                navigate('/');
            } catch (error) {
                console.error('Error creating post:', error);
            }
        }
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField 
                    onChange={handleChange} 
                    name='title' 
                    placeholder="Title" 
                    error={Boolean(titleError)}
                />
                <Button onClick={savePost} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>
            {titleError && <Typography color="error">{titleError}</Typography>}

            <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={handleChange}
                style={{ borderColor: descriptionError ? 'red' : 'transparent' }}
            />
            {descriptionError && <Typography color="error">{descriptionError}</Typography>}

            {uploadMessage && <Typography>{uploadMessage}</Typography>}
        </Container>
    )
}

export default CreatePost;
