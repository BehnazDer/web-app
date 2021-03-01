import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Button,
} from '@chakra-ui/react';

import DayJS from 'react-dayjs';
import appApiClient from '../../api/appApiClient';

const Home = ({ login }) => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await appApiClient.get(`/articles`);
      setArticles(response.data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, [articles]);

  const handleDelete = async (id) => {
    try {
      await appApiClient.delete(`articles/${id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container columns={2} spacing={10}>
      <Button onClick={login}>Log In</Button>
      {articles.map((article, key) => (
        <Box
          key={key}
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          p={5}
          mt={5}>
          <Heading as='h5' size='sm'>
            {article.title}
          </Heading>
          <Image src={article.url_to_image} alt={article.url_to_image} />
          <Box>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              New
            </Badge>
            {article.violence_type.map((type, key) => (
              <Badge borderRadius='full' px='2' colorScheme='pink' key={key}>
                {type}
              </Badge>
            ))}
            <Text fontSize='xs'>{article.text}</Text>
            <Text as='i' fontSize='xs'>
              Author - {article.author} created at{' '}
              <DayJS element='span' format='MM-DD-YYYY'>
                {article.created_at}
              </DayJS>
            </Text>
          </Box>
          <Button
            mt={4}
            colorScheme='pink'
            size='sm'
            // eslint-disable-next-line
            onClick={() => handleDelete(article._id)}>
            Delete Article
          </Button>
        </Box>
      ))}
    </Container>
  );
};

export default Home;
