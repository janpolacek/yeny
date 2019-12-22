import organizer1 from './organizer1';
import organizer2 from './organizer2';

export default [
    {
        title: 'My past event',
        description: 'Description of my first event',
        password: 'password',
        dateFrom: '2019-12-06T20:02:35.824Z',
        dateTo: '2019-12-08T20:02:35.824Z',
        image: 'https://wapo.st/2P65TfP',
        organizer: organizer1,
        location: {
            longitude: '0',
            latitude: '0',
            name: 'North Pole'
        }
    },
    {
        title: 'My first event',
        description: 'Description of my first event',
        password: 'password',
        dateFrom: '2019-12-09T20:02:35.824Z',
        dateTo: '2019-12-10T20:02:35.824Z',
        image: 'https://wapo.st/2P65TfP',
        organizer: organizer1,
        location: {
            longitude: '0',
            latitude: '0',
            name: 'North Pole'
        }
    },
    {
        title: 'My second event',
        description: 'Description of my second event',
        password: 'password',
        dateFrom: '2019-12-08T20:02:35.824Z',
        dateTo: '2019-12-12T20:02:35.824Z',
        image: 'https://wapo.st/2P65TfP',
        organizer: organizer2
    },
    {
        title: 'My third event',
        description: 'Description of my third event',
        password: 'password',
        dateFrom: '2009-12-08T20:02:35.824Z',
        dateTo: '2029-12-12T20:02:35.824Z',
        image: 'https://wapo.st/2P65TfP',
        organizer: organizer2,
        location: {
            name: 'Middle Earth'
        }
    }
];
