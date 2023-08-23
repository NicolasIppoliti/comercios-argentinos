import React, { useEffect, useState } from 'react';
import SwiperCore, { Autoplay, EffectCoverflow, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import 'swiper/swiper-bundle.min.css';
import { db } from "../firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

SwiperCore.use([Autoplay, EffectCoverflow, Navigation]);

const PromotedBusiness2 = () => {
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const fetchBusinesses = async () => {
            const businessesRef = collection(db, "businesses");
            const q = query(businessesRef, limit(10));
            const snapshot = await getDocs(q);
            const fetchedBusinesses = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBusinesses(fetchedBusinesses);
        };

        fetchBusinesses();
    }, []);

    return (
        <Box my={9} className='container'>
            <Typography variant="h2" gutterBottom align="center" pb={2}>
                Los comercios mas populares
            </Typography>
            <Typography variant="h5" gutterBottom align="center" pb={5}>
                Descubrí nuestra selección de negocios más recomendados de tu ciudad
            </Typography>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                loop={true}
                slidesPerView={'auto'}
                initialSlide={1}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                    1280: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                className="swiper_container"
            >
                {businesses.map((business) => (
                    <SwiperSlide key={business.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="600"
                                image={business.logoUrl}
                                alt={business.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {business.name}
                                </Typography>
                                <Typography variant="body" color="text.secondary">
                                    {business.category}
                                </Typography>
                            </CardContent>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default PromotedBusiness2;