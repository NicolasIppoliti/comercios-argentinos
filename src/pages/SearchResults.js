import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Box,
  Pagination,
  Switch,
  FormControlLabel,
} from '@mui/material';
import BusinessCard from '../components/BusinessCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getAverageRating } from '../services/ratingService';
import { grey } from '@mui/material/colors';
import { getCurrentTimeInArgentina, getOpenStatus } from '../utils/timeUtils';

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [openNowFilter, setOpenNowFilter] = useState(false);

  const itemsPerPage = 6;

  const updateBusinessRating = async (businessId) => {
    const averageRating = await getAverageRating(businessId);
    return averageRating;
  };

  const updateBusinessesData = async (businesses) => {
    const updatedBusinesses = await Promise.all(
      businesses.map(async (business) => {
        const averageRating = await getAverageRating(business.id);
        const openStatus = business.openingHours
          ? getOpenStatus(business.openingHours, getCurrentTimeInArgentina())
          : { isOpen: false };
        return { ...business, userRating: averageRating, isOpen: openStatus.isOpen };
      })
    );
    setBusinesses(updatedBusinesses);
  };

  const handleRatingFilterChange = (event, newValue) => {
    setRatingFilter(newValue);
  };

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
  ];

  const color = grey[600];

  useEffect(() => {
    const fetchBusinesses = async () => {
      const businessCollection = collection(db, 'businesses');
      const businessSnapshot = await getDocs(businessCollection);
      const businessList = businessSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const uniqueCategories = [
        ...new Set(businessList.map((business) => business.category)),
      ];
      setCategories(uniqueCategories);

      const uniqueLocations = [
        ...new Set(businessList.map((business) => business.location)),
      ];
      setLocations(uniqueLocations);

      updateBusinessesData(businessList);
    };

    fetchBusinesses();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredBusinesses = (businesses || [])
    .filter((business) => business.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((business) => (categoryFilter ? business.category === categoryFilter : true))
    .filter((business) => (locationFilter ? business.location === locationFilter : true))
    .filter((business) => (ratingFilter ? business.userRating >= ratingFilter : true))
    .filter((business) => (openNowFilter ? business.isOpen : true));

  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);

  return (
    <Box>
      <Typography variant="h2" gutterBottom align="center" pb={2}>
        Busca por categoría, nombre o ubicación
      </Typography>
      <Typography variant="h4" gutterBottom align="center" mb={10}>
        ¡Y encontrá lo que buscas!
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={4}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Filtrar por:
            </Typography>
            <TextField
              label="Buscar"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearch}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel>Categoria</InputLabel>
              <Select
                label="Categoria"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="">
                  <em>Ninguna</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel>Ciudad</InputLabel>
              <Select
                label="Ciudad"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <MenuItem value="">
                  <em>Ninguna</em>
                </MenuItem>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mb: 2, mx: 2, }}>
              <Typography id="rating-slider" gutterBottom color={color}>
                Valoración
              </Typography>
              <Slider
                aria-labelledby="rating-slider"
                valueLabelDisplay="auto"
                step={0.5}
                marks={marks}
                min={0}
                max={5}
                value={ratingFilter}
                onChange={handleRatingFilterChange}
              />
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={openNowFilter}
                  onChange={(e) => setOpenNowFilter(e.target.checked)}
                  name="openNow"
                />
              }
              label="Abierto ahora"
            />
          </Grid>
          <Grid item xs={12} md={12} lg={8}>
            <Grid container spacing={2}>
              {filteredBusinesses
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((business) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={business.id}>
                    <BusinessCard
                      business={business}
                      onUpdateRating={async (newRating) => {
                        const averageRating = await updateBusinessRating(business.id);
                        setBusinesses((prevBusinesses) => {
                          return prevBusinesses.map((b) =>
                            b.id === business.id ? { ...b, userRating: averageRating } : b
                          );
                        });
                      }}
                    />
                  </Grid>
                ))}
            </Grid>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SearchResults;