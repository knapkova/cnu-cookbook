import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PlaceHolderImage from '/Users/terezaknapkova/Documents/cnu-cookbook/src/images/food-placeholder.png';



//converts minutes to hours and minutes
export function toHoursAndMinutes(preparationTime) {
  const hours = Math.floor(preparationTime / 60);
  const minutes = preparationTime % 60;
  return `🕐${hours > 0 ? ` ${hours} h` : ''}
          ${minutes > 0 ? ` ${minutes} min` : ''}`;
}

// shows side dish if defined
export function showSideDish(sideDish) {
  if (sideDish !== undefined) {
    return ` || 🍴 ${sideDish}`;
  }
}

// converts date
export function LastModDate(lastModifiedDate) {
  // eslint-disable-next-line no-lone-blocks
  {
    var start = new Date(lastModifiedDate);
    var year = start.getFullYear();
    var month = (1 + start.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = start.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return day + '.' + month + '.' + year;
  }
}

export function RecipeCard({ slug, title, sideDish, preparationTime }) {
  return (
    <Link to={`/recept/${slug}`}>
      <Card maxW="sm">
        <CardBody>
          <Image src={PlaceHolderImage} borderRadius="lg" />
        </CardBody>
        <Divider />
        <CardFooter backgroundColor={'pink.50'}>
          <Stack mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
            <Text color="blue.800" fontSize="1.5xl">
              {toHoursAndMinutes(preparationTime)}
              {showSideDish(sideDish)}
            </Text>
          </Stack>
        </CardFooter>
      </Card>
    </Link>
  );
}
