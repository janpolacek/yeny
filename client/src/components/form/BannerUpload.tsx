import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { useCreateEventFormikContext } from 'components/form/useCreateEventFormikContext';
import axios from 'axios';
import { ImgurResponse } from '_types/Imgur';
import placeholder from 'assets/placeholder_sample.png';
import * as colors from '@material-ui/core/colors';
export const uploadToImgur = async (image: File) => {
    const result = await axios.post<ImgurResponse>('https://api.imgur.com/3/image', image, {
        headers: { Authorization: 'Client-ID f1ab775b582fa27' },
    });

    return result.data.data;
};

const useStyles = makeStyles(theme => ({
    input: {
        display: 'none',
    },
    container: {
        height: '300px',
        overflow: 'hidden',
        position: 'relative',
    },
    clearButton: {
        position: 'absolute',
        right: theme.spacing(2),

        top: theme.spacing(8),
    },
    uploadButton: {
        position: 'absolute',
        right: theme.spacing(2),
        top: theme.spacing(2),
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        overflow: 'hidden',
        border: `1px solid ${colors.grey['300']}`,
    },
}));

export const BannerUpload = () => {
    const classes = useStyles();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const { setFieldValue } = useCreateEventFormikContext();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const { files } = event.target;

        if (files?.[0]) {
            const bannerFile = files[0];

            reader.onload = () => {
                if (reader.result) {
                    setImageSrc(reader.result as string);
                }
            };
            setFieldValue('image', bannerFile);
            reader.readAsDataURL(bannerFile);
        }
    };

    const handleClear = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setImageSrc(null);
        setFieldValue('image', null);
    };
    return (
        <Grid item xs={12}>
            <div className={classes.container}>
                <input
                    id={'image_input'}
                    accept="image/*"
                    className={classes.input}
                    name={'image'}
                    type="file"
                    onChange={handleChange}
                    ref={fileInputRef}
                />
                <label htmlFor={'image_input'} className={classes.uploadButton}>
                    <Button component="span" variant={'contained'}>
                        {imageSrc ? 'Change' : 'Upload'}
                    </Button>
                </label>
                {imageSrc && (
                    <Button
                        component="span"
                        className={classes.clearButton}
                        variant={'contained'}
                        onClick={handleClear}
                    >
                        Remove
                    </Button>
                )}
                <img src={imageSrc ?? placeholder} alt={'Banner preview'} className={classes.image} />
            </div>
        </Grid>
    );
};
