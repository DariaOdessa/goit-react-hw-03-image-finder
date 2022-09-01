import axios from "axios";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '28368947-301ca8f9e8bcf54643070db80';


export const getImages = async (query, page) => {
     try {
        const searchParams = new URLSearchParams({
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,
            per_page: 12,
        });

         const response = await axios.get(`?${searchParams}`);
         const totalData = response.data.totalHits;
         const data = response.data.hits;

         const images = {
                hits: response.data.hits.map(({ id, largeImageURL, webformatURL, tags }) => ({
                id,
                largeImageURL,
                webformatURL,
                tags,
                })),
                totalHits: response.data.totalHits,
            }

        if (totalData === 0) {
            Notify.failure('Looks like there is no images for your search :( Try to write something else!', {
                width: '400px',
                fontSize: '20px',
                position: 'center-top',
                distance: '50px'
            });
        } else if (data.length % 12 !== 0) {
            Notify.info("Looks like you've reached to the end of results! Good work!", {
                width: '400px',
                fontSize: '20px',
                position: 'center-bottom',
                distance: '50px'
            });

            return images;
        }
        
        else {
            return images;
        }
        
    } catch (error) {
        console.log(error);
    }

};

