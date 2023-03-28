
export const mainMenuItems = [
    {
        title: 'Home',
        url: '/',
    },
    {
        title: 'Explore',
        url: '/explore',
    },
    {
        title: 'Contribute',
        url: '/contribute',
        submenu: [
            {
                title: 'Photo upload',
                url: '/contribute/photo-upload'
            },
            {
                title: 'Video upload',
                url: '/contribute/video-upload'
            },
            {
                title: 'Who\'s that species?',
                url: '/contribute/find-species'
            },
            {
                title: 'Machine Learning for citizen science',
                url: 'http://131.175.120.138:61111/GeMI/'
            }
        ]
    },
    {
        title: 'About us',
        url: '/about',
        submenu: [
            {
                title: 'The MoultDB',
                url: '/about/moulting'
            },
            {
                title: 'MoultDB publication',
                url: '/about/publications'
            },
            {
                title: 'MoultDB blog',
                url: '/about/blog'
            },
            {
                title: 'MoultDB privacy notice',
                url: '/about/privacy-notice'
            },
            {
                title: 'Source code',
                url: 'https://github.com/MoultDB/'
            },
            {
                title: 'Machine Learning for citizen science',
                url: 'http://131.175.120.138:61111/GeMI/'
            }
        ]
    },
    {
        title: 'Community',
        url: '/community',
        submenu: [
            {
                title: 'User favorite grid',
                url: '/community/user-grid'
            },
            {
                title: 'User favorite list',
                url: '/community/user-list'
            },
            {
                title: 'User profile',
                url: '/community/user-profile'
            },
            {
                title: 'User rate',
                url: '/community/user-rate'
            }
        ]
    },
    {
        title: 'Help',
        url: '/help'
    }
];
