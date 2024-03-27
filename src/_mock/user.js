import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.phone.number(),
  isVerified: faker.vehicle.vrm(),
  status: sample(['banned', 'new']),
  // registeredAt: faker.date.past(),
  role: sample([
    'Aug. 21, 2023, 1:16 p.m.',
    'Aug. 25, 2023, 12:18 p.m.',
    'Sept. 8, 2023, 5:36 p.m.',
    'Aug. 21, 2023, 1:16 p.m.',
    'Aug. 25, 2023, 12:18 p.m.',
    'Sept. 8, 2023, 5:36 p.m.',
    'Aug. 24, 2023, 4:03 p.m.',
    'Aug. 21, 2023, 1:16 p.m.',
    'Aug. 25, 2023, 12:18 p.m.',
    'Sept. 8, 2023, 5:36 p.m.',
  ]),
}));


export default users;
