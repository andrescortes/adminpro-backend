const menuItems = (role: string = 'USER_ROLE') => {
    const menu = [
        {
            title: 'Dashboard',
            icon: 'mdi mdi-gauge',
            subMenu: [
                { title: 'Principal', url: '/dashboard' },
                { title: 'Progress', url: 'progress' },
                { title: 'Promises', url: 'promises' },
                { title: 'Graph1', url: 'graph1' },
                { title: 'RxJs', url: 'rxjs' },
            ]
        },
        {
            title: 'Maintenances',
            icon: 'mdi mdi-folder-lock-open',
            subMenu: [
                { title: 'Hospitals', url: 'hospitals' },
                { title: 'Doctors', url: 'doctors' },
            ]
        }
    ]

    if (role === 'ADMIN_ROLE') {
        menu[ 1 ].subMenu.unshift({ title: 'Users', url: 'users' })
    }

    return menu;
};

export {
    menuItems
};

