import React from 'react';
import ReactDOM from 'react-dom';
import { AppRunner, asyncComponentLoader as asyncComponent } from 'franz-skeleton-design';
import * as serviceWorker from './serviceWorker';

const routes = [
    {
        path: '/reservation',
        component: asyncComponent(() => import('./components/Reservation')),
        isSecure: true,
        roles: []
    },
    {
        path: '/smallpage',
        component: asyncComponent(() => import('./components/SmallPage')),
        isSecure: true,
        roles: []
    },
    {
        path: '/premiumpage',
        component: asyncComponent(() => import('./components/PremiumPage')),
        isSecure: true,
        roles: []
    },
    {
        path: '/vanpage',
        component: asyncComponent(() => import('./components/VanPage')),
        isSecure: true,
        roles: []
    }
]

const links = [
    {
        path: '/reservation',
        label: 'Reservation',
        leftIcon: 'post_add',
        color: '#21f3b4',
    },
    {
        label: 'Reserved List',
        leftIcon: 'bookmarks',
        color: '#f33d21',
        children: [
            {
                path: '/smallpage',
                label: 'Small Category'
            },
            {
                path: '/premiumpage',
                label: 'Premium Category'
            },
            {
                path: '/vanpage',
                label: 'Van Category'
            }
        ]
    }
]

const notifyCb = message => console.info('Notification', message);

const props = { routes, links, notifyCb }

ReactDOM.render(<AppRunner {...props} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
